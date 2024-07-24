// src/PopUp.jsx
import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import ImageCarousel from './ImageCarousel';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L, { Icon } from 'leaflet';
import { Bar } from 'react-chartjs-2';
import PopUpButton from './PopUpButton';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';


// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const hourlyLabels= [
  '12 a.m.', '1 a.m.', '2 a.m.', '3 a.m.', '4 a.m.', '5 a.m.', '6 a.m.', '7 a.m.', 
  '8 a.m.', '9 a.m.', '10 a.m.', '11 a.m.', '12 p.m.', '1 p.m.', '2 p.m.', '3 p.m.',
  '4 p.m.', '5 p.m.', '6 p.m.', '7 p.m.', '8 p.m.', '9 p.m.', '10 p.m.', '11 p.m.','12 a.m.'
]

const createLocationIcon = (content) => {
  return L.divIcon({
    className: "bg-blue-500  border-2 border-white rounded-full inline-flex justify-center items-center text-lg font-bold w-[20px] h-[20px] text-center",
    iconSize: [20,20],
    iconAnchor: [10,10],
    popupAnchor: [0,-10]
  });
};

const PopUp = ({ onClick, info, apidata, selectedRestuarant, day, isLoading }) => {

    // console.log("ordered data received in PopUp :", info)
    // console.log("selectedRestuarant: ", selectedRestuarant)

    const rest = info && info[selectedRestuarant] ? info[selectedRestuarant] : null;

    // console.log("Rest :", rest)

    const [dayOfWeek, setDayOfWeek]=useState(day);

    if (!rest) {
        return <div>Loading...</div>;
    }

    const sendClick = (e) => {
        e.stopPropagation();
        window.open(rest.url, '_blank', 'noopener,noreferrer');
      }

    const busynessByDay=[ 
        JSON.parse(rest.sunday_populartimes),
        JSON.parse(rest.monday_populartimes),
        JSON.parse(rest.tuesday_populartimes),
        JSON.parse(rest.wednesday_populartimes),
        JSON.parse(rest.thursday_populartimes),
        JSON.parse(rest.friday_populartimes),
        JSON.parse(rest.saturday_populartimes),
    ]

    const address=rest.display_address.split(";");

    const yLabelMax= Math.max(
        ...JSON.parse(rest.sunday_populartimes),
        ...JSON.parse(rest.monday_populartimes),
        ...JSON.parse(rest.tuesday_populartimes),
        ...JSON.parse(rest.wednesday_populartimes),
        ...JSON.parse(rest.thursday_populartimes),
        ...JSON.parse(rest.friday_populartimes),
        ...JSON.parse(rest.saturday_populartimes))
        

    const busyData = {
        labels: hourlyLabels,
        datasets: [
        {
            label: 'wait time (mins)',
            backgroundColor: (context) => {
            const value = context.dataset.data[context.dataIndex];
            if (value >= 45) {
                return 'rgba(255,0,0,0.6)'; 
            } else if (value >= 15) {
                return 'rgba(255,255,0,0.6)'; 
            } else {
                return 'rgba(0,255,0,0.6)'; 
            }
            },
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 1,
            data: busynessByDay[dayOfWeek]
        },
        ],
    };

    let scrapedImagesSample=rest.image_url

    if (apidata && apidata.photos) {
        scrapedImagesSample = apidata.photos;
    }

    const options = {
        plugins:{
        legend:{
            display:false,
        }
        },

        scales: {
        x: {
            grid: {
                display: false,
                borderDash: [5, 5],
                color: 'rgba(255, 255, 255, 0.87)'
            },
            border: {
                color: 'white', // Set axis line color to blue
            },
            barPercentage: 1.0,
            categoryPercentage: 1.0,
            offset: true,
            ticks: {
                autoSkip: false,
                maxRotation: 0,
                minRotation: 0,
                callback: function(value, index) {
                    return index % 6 === 0 ? this.getLabelForValue(value) : '';
                },
                color: 'rgba(255,255,255,0.87)', 
            },
        },
        y: {
            beginAtZero: true,
            position: 'left',
            min:0,
            max: Math.min(yLabelMax,99),
            ticks: {
                color: 'rgba(255,255,255,0.87)',
            },
            grid: {
                display: false, 
                borderDash: [5, 5],
                color: 'rgba(255, 255, 255, 0.87)' 
            },
            border: {
                color: 'white', // Set axis line color to blue
            }
        },
        },
    };

    function convertto12Hour(time){
        const hours24 = parseInt(time.substring(0, 2), 10);
        const minutes = time.substring(2);
        const suffix = hours24 >= 12 ? 'PM' : 'AM';
        const hours12 = hours24 % 12 || 12;
        return `${hours12}:${minutes} ${suffix}`;
    }


    const [openingHours,setOpeningHours]=useState({
        0: 'Closed',
        1: 'Closed',
        2: 'Closed',
        3: 'Closed',
        4: 'Closed',
        5: 'Closed',
        6: 'Closed'
    });

    const[categories, setCategories]=useState([])


    useEffect(() => {
        if (!isLoading && apidata && apidata.hours) {
        const updatedOpeningHours = { ...openingHours };
        for (let weekday of apidata.hours[0].open) {
            updatedOpeningHours[weekday.day] = `${convertto12Hour(weekday.start)} - ${convertto12Hour(weekday.end)}`; 
        };
        setOpeningHours(updatedOpeningHours);
        }

        if (!isLoading && apidata && apidata.categories) {
        const updatedCats = [];
        for (let cat of apidata.categories) {
            updatedCats.push(cat.title);
        };
        setCategories(updatedCats)
        
        }

    }, [isLoading, apidata]);

    return (
        <div
        className='fixed h-screen w-screen z-50 backdrop-blur-sm rounded-md p-1 md:p-0'
        onClick={(e) => {
            e.stopPropagation();
            onClick(false);
        }}
        >
        <div
            className='mx-auto md:mt-[4vh] mt-[7vh] p-1 py-2 md:p-0 md:h-5/6 h-[75%] md:w-1/2 bg-custom-dark p-1 md:p-0 border-white border-2 rounded-md'
            // elevation={12}
            onClick={(e) => {
            e.stopPropagation();
            }}
        >
            {isLoading ? (
            
            <div className="flex flex-col h-full w-full items-center">
                <h1
                className='
                    w-[97%]
                    font-bold
                    text-orange-500
                    text-4xl
                    m-4
                    '
                >
                {rest.name}
                </h1>
                <CircularProgress className = "mx-auto" size={200} color="secondary"/>
            </div>
            ):(
            <>
                <div className='w-full h-1/3'>
                    <h1
                    className='
                        font-bold
                        text-orange-500
                        md:text-4xl
                        text-2xl
                        md:m-4
                        '
                    >
                    {rest.name}
                    <PopUpButton onClick={sendClick}/>
                    </h1>

                    <div 
                    className='
                    flex
                    h-[20vh]
                    w-full
                    mx-auto
                    space-x-1
                    items-center
                    justify-center
                    '
                    >
                    <ImageCarousel images={scrapedImagesSample} offset={0}/>
                    <ImageCarousel images={scrapedImagesSample} offset={1}/>
                    <ImageCarousel images={scrapedImagesSample} offset={2}/>

                    </div>

                </div>
            <div className="p-1 flex flex-row w-full h-[5%] md:overflow-x-auto md:overflow-y-hidden px-2">
                {Array.from({ length: categories.length }, (_,index) => (
                    <><button className='bg-transparent hover:bg-blue-500 text-sm text-white px-1 border border-blue-500 rounded-md'> {categories[index]} </button><div className="w-[1%]"></div></>
                    ))}
            </div>


            <div className="flex flex-col md:flex-row h-[60%] md:overflow-y-auto overflow-y-scroll">

                <div 
                    className='
                    w-full
                    md:w-1/2
                    p-4
                    md:overflow-y-auto
                    md:overflow-x-hidden
                    flex-1
                    '
                >
                    <h2
                    className='text-xl font-bold text-orange-500' 
                    >
                    Busyness 
                    </h2>
                    
                    <Bar data={busyData} options={options} />
                    <div 
                    className='
                        w-[96%]
                        m-2
                        border-[1px]
                        rounded
                        border-orange-500
                    '
                    >
                    <button
                    className={`
                        w-[15%]
                        border-r-[1px]
                        ${dayOfWeek===1 ? 'bg-white text-orange-500' : 'text-white'}
                        `
                        }
                        onClick={(e) => {
                        e.stopPropagation();
                        setDayOfWeek(1)
                        }}
                    >
                        Mon
                    </button>
                    <button
                    className={`
                        w-[14%]
                        border-r-[1px]
                        ${dayOfWeek===2 ? 'bg-white text-orange-500' : 'text-white'}
                        `
                        }
                        onClick={(e) => {
                        e.stopPropagation();
                        setDayOfWeek(2)
                        }}
                    >
                        Tue
                    </button>
                    <button
                    className={`
                        w-[14%]
                        border-r-[1px]
                        ${dayOfWeek===3 ? 'bg-white text-orange-500' : 'text-white'}
                        `
                        }
                        onClick={(e) => {
                        e.stopPropagation();
                        setDayOfWeek(3)
                        }}
                    >
                        Wed
                    </button>
                    <button
                    className={`
                        w-[14%]
                        border-r-[1px]
                        ${dayOfWeek===4 ? 'bg-white text-orange-500' : 'text-white'}
                        `
                        }
                        onClick={(e) => {
                        e.stopPropagation();
                        setDayOfWeek(4)
                        }}
                    >
                        Thur
                    </button>
                    <button
                    className={`
                        w-[14%]
                        border-r-[1px]
                        ${dayOfWeek===5 ? 'bg-white text-orange-500' : 'text-white'}
                        `
                        }
                        onClick={(e) => {
                        e.stopPropagation();
                        setDayOfWeek(5)
                        }}
                    >
                        Fri
                    </button>
                    <button
                    className={`
                        w-[14%]
                        border-r-[1px]
                        ${dayOfWeek===6 ? 'bg-white text-orange-500' : 'text-white'}
                        `
                        }
                        onClick={(e) => {
                        e.stopPropagation();
                        setDayOfWeek(6)
                        }}
                    >
                        Sat
                    </button>
                    <button
                    className={`
                        w-[15%]
                        border-r-[1px]
                        ${dayOfWeek===0 ? 'bg-white text-orange-500' : 'text-white'}
                        `
                        }
                        onClick={(e) => {
                        e.stopPropagation();
                        setDayOfWeek(0)
                        }}
                    >
                        Sun
                    </button>
                    
                    </div>
                    <h2
                    className='text-xl font-bold text-orange-500' 
                    >
                    Opening Hours
                    </h2>
                    <div id="opening" className="max-h-[calc(100%-12vh)]">
                    <p>Monday:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {openingHours[0]}</p>
                    <p>Tuesday:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {openingHours[1]}</p>
                    <p>Wednesday:&nbsp; {openingHours[2]}</p>
                    <p>Thursday:&nbsp;&nbsp;&nbsp;&nbsp; {openingHours[3]}</p>
                    <p>Friday:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {openingHours[4]}</p>
                    <p>Saturday:&nbsp;&nbsp;&nbsp;&nbsp; {openingHours[5]}</p>
                    <p>Sunday:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {openingHours[6]}</p>
                    </div>
                </div>

                <div className="w-full md:w-1/2 h-full p-4 flex-1">
                    <div
                    className='mb-4' 
                    >
                    <h2
                        className='text-xl font-bold text-orange-500' 
                    >
                        Location 
                    </h2>
                    <div
                        className='
                        w-full
                        '
                    >
                        <MapContainer
                        center={[rest['latitude'], rest['longitude']]} 
                        zoomSnap={0.1}
                        zoom={15} 
                        style={{ height: "20vh", width: "100%" }}
                        zoomControl={false}
                        scrollWheelZoom={false}
                        doubleClickZoom={false}
                        dragging={false}
                        attributionControl={false}
                        >
                        <TileLayer
                            url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
                            attribution='Yu Li'
                        />

                        <Marker 
                            key="Location"
                            icon={createLocationIcon("")}
                            position={[rest['latitude'],rest['longitude']]}
                        />

                        </MapContainer>
                        
                        {Array.from({ length: address.length }, (_,index) => (
                            <p key={index}>{address[index]}</p>
                        ))}
                    </div>
                    </div>
                
                    <div>
                    <h2
                        className='text-xl font-bold text-orange-500' 
                    >
                        Contact 
                    </h2>
                    
                    {apidata && apidata.display_phone && <p>Phone: {apidata.display_phone}</p>}
                    {apidata && apidata.attributes && apidata.attributes.business_url && (
                        <p>
                        Website: <a className='hover:text-blue-500' href={apidata.attributes.business_url} target="_blank" rel="noopener noreferrer">{apidata.attributes.business_url}</a>
                        </p>
                    )}
                    {apidata && apidata.attributes && apidata.attributes.menu_url && <p>Menu: <a className='hover:text-blue-500' href={apidata.attributes.menu_url} target="_blank" rel="noopener noreferrer">{apidata.attributes.menu_url}</a></p>}
                    </div>
                
                </div>
            </div>
            </>
            )}

      </div>
    </div>
    
  );
};

export default PopUp;
