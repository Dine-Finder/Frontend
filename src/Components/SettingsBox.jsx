//src SettingsBox.jsx
import React, { useEffect, useState } from 'react';
import Setting from './Setting'
import neighbourhoods from '../Data/neighbourhoods.json'
import OptionDropDown from './OptionDropDown';
import Slider from './Slider'
import BusynessChoice from './BusynessChoice';
import DateTime from './DateTime';
import SearchBar from './SearchBar';

const SettingsBox = ({ onDataFromParent }) => {

    const [locationType, setLocationType] = useState(null);
    const hoods=neighbourhoods.features;

    const [longitude, setLongitude] = useState(null)
    const [latitude, setLatitude] = useState(null)
    const [radius, setRadius] = useState(null)
    const [neighborhood,setNeighborhood]=useState("")

    const d = new Date();
    const timezoneOffset = d.getTimezoneOffset();
    let edtOffset = -240;
    let adjustedTime = new Date(d.getTime()+(edtOffset+timezoneOffset)*60*1000);
    const [day,setDay]=useState(adjustedTime.getDay())
    const [time, setTime]=useState(adjustedTime.getHours())

    const [localeBusyness, setLocaleBusyness] = useState([0,0,0])
    const [localeBusynessPriority, setLocaleBusynessPriority] = useState('Preference')

    const [restaurantBusyness, setRestaurantBusyness] = useState([0,0,0])
    const [restaurantBusynessPriority, setRestaurantBusynessPriority] = useState('Preference')

    const[preferences, setPreferences] = useState({
            location:{
                locationType:null,
                coordinates:[null,null],
                radius: null,
                neighborhood: null
            },
            dayTime:{
                day: day,
                time: time
            },
            localeBusyness:{
                Quiet: 0,
                Average: 0,
                Busy: 0,
                priority:"Preference"
            },
            restaurantBusyness:{
                Quiet: 0,
                Average: 0,
                Busy: 0,
                priority:"Preference" 
            }
    })

    useEffect(()=>{
        setPreferences({
            location:{
                coordinates:[longitude,latitude],
                radius: radius,
                neighborhood: neighborhood
            },
            dayTime:{
                day:day,
                time:time
            },
            localeBusyness:{
                Quiet: localeBusyness[0],
                Average: localeBusyness[1],
                Busy: localeBusyness[2],
                priority:localeBusynessPriority
            },
            restaurantBusyness:{
                Quiet: restaurantBusyness[0],
                Average: restaurantBusyness[1],
                Busy: restaurantBusyness[2],
                priority:restaurantBusynessPriority 
            }
        })
    }, [longitude, latitude, radius, neighborhood, day, time, localeBusyness, restaurantBusyness, localeBusynessPriority, restaurantBusynessPriority]);

    useEffect(()=>{
        sendDataToParent();
    }, [preferences]);

    const sendDataToParent = () => {
        onDataFromParent(preferences);
    };

    function handleDataFromRadiusSlider(rad) {
        setRadius(rad);
    };

    function handleDataFromSearchBox(lat, lng) {
        setLatitude(lat);
        setLongitude(lng);
    };

    function handleDataFromDayTime(daytime){
        setDay(daytime[0])
        setTime(daytime[1])
    }

    function handleDataFromLocaleBusyness(matrix){
        setLocaleBusyness(matrix)
    }

    function handleDataFromRestaurantBusyness(matrix){
        setRestaurantBusyness(matrix)
    }

    const hoodList=[];

    function blank(input){
        console.log(input);
    }

    for(let i=0; i<hoods.length; i++){
        hoodList.push(hoods[i]['properties']['ntaname'])
    }
    hoodList.sort();

    return (
        <div className="
        m-[2%]
        px-1
        py-4
        w-[96%]  
        bg-white
        border-2 
        border-main 
        rounded
        font-bold 
        z-10
        "    
        >
            <Setting title={'Location'} optional={false} priorityUpdate={blank}>
                <div className=' mx-[5px] flex bg-grey rounded border-2 border-black'>
                    { (locationType==="Neighborhood")
                        ?
                        <button 
                            className='w-1/2 border-r-2 bg-light text-sm'
                        >
                            Neighborhood
                        </button >
                        :
                        <button 
                            className='w-1/2 border-r-2 hover:bg-white text-sm'
                            onClick={() => setLocationType('Neighborhood')}
                        >
                           Neighborhood
                        </button >
                    }
                    { (locationType==="Address")
                        ?
                        <button 
                            className='w-1/2 bg-light'
                        >
                            Address
                        </button >
                        :
                        <button 
                            className='w-1/2 hover:bg-white'
                            onClick={() => setLocationType('Address')}
                        >
                            Address
                        </button >
                    }
                </div>
                { (locationType==="Neighborhood")
                    ?
                    <>
                     <OptionDropDown 
                        data={hoodList}
                        value={neighborhood}
                        onChange={setNeighborhood}
                     />  
                    </>
                    :
                    <>
                        { (locationType==="Address")
                            ?
                            <>
                                {/* <input
                                    type="number"
                                    id="lon"
                                    value={longitude}
                                    min = {40.7009}
                                    max = {40.8777}
                                    step = {0.001}
                                    onChange={(e) => setLongitude(parseFloat(e.target.value))}
                                    className='m-2 border-[2px] border-main'
                                />
                                
                                <input
                                    type="number"
                                    id="lat"
                                    value={latitude}
                                    min = {-74.0191}
                                    max = {-73.9141}
                                    step = {0.001}
                                    onChange={(e) => setLatitude(parseFloat(e.target.value))}
                                    className='m-2 border-[2px] border-main'
                                /> */}

                                <SearchBar onDataFromParent={handleDataFromSearchBox}/>

                                <Slider min={0} max={5} step={.1} onDataFromParent={handleDataFromRadiusSlider}/>
                            
                            </>
                            :<></>   
                            } 
                    </>
                }
                
            </Setting>



            <Setting title={'Time'}  optional={false} priorityUpdate={blank}>
                <DateTime date={day} time={time} dayTimeUpdate={handleDataFromDayTime}/>
            </Setting>



            <Setting title={'Locale Busyness'}  optional={true} priorityUpdate={setLocaleBusynessPriority}>
                <BusynessChoice onDataUpdate={handleDataFromLocaleBusyness}/>
            </Setting>


            
            <Setting title={'Restaurant Busyness'}  optional={true} priorityUpdate={setRestaurantBusynessPriority}>
                <BusynessChoice onDataUpdate={handleDataFromRestaurantBusyness}/>
            </Setting>

        </div>
    )
}

export default SettingsBox