import React, { useEffect, useState } from 'react';

import Setting from './Setting'
import OptionDropDown from './OptionDropDown';
import RangeSlider from './Slider'
import BusynessChoice from './BusynessChoice';
import DateTime from './DateTime';
import SearchBar from './SearchBar';

import neighborhoods from '../../Data/geoJson.json'

const SettingsBox = ({prefs, onDataFromParent }) => {

    const [locationType, setLocationType] = useState(null);
    const hoods=neighborhoods.features;

    const [longitude, setLongitude] = useState(null)
    const [latitude, setLatitude] = useState(null)
    const [radius, setRadius] = useState(null)
    const [neighborhood,setNeighborhood]=useState(prefs['location']['neighborhood'])

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
                locationType: locationType,
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
    }, [locationType, longitude, latitude, radius, neighborhood, day, time, localeBusyness, restaurantBusyness, localeBusynessPriority, restaurantBusynessPriority]);

    useEffect(()=>{
        sendDataToParent();
    }, [preferences]);

    // useEffect(()=>{
    //     setNeighborhood(prefs['location']['neighborhood'])
    // }, [prefs]);

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
    }

    for(let i=0; i<hoods.length; i++){
        hoodList.push(hoods[i]['properties']['ntaname'])
    }
    hoodList.sort();

    return (
        <div className="
        flex flex-col items-center justify-center gap-y-4
        w-[96%]
        border
        rounded-md
        py-3
        px-4
        m-3
        z-10
        text-center
        md:text-xl
        text-lg
        z-10
        "    
        >
            <Setting title={'Location'} optional={false} priorityUpdate={blank}>
                <div className='mx-[5px] flex justify-between items-center rounded-md border border-orange-500'>
                    { (prefs.location.locationType==="Neighborhood")
                        ?
                        <button 
                            className='md:text-base text-sm text-white-500 w-1/2 p-2 rounded-md bg-gradient-to-r from-orange-400 to-orange-800'
                        >
                            Neighborhood
                        </button >
                        :
                        <button 
                            className='w-1/2 p-2 hover:bg-white md:text-base text-sm hover:text-orange-500 rounded-md'
                            onClick={() => setLocationType('Neighborhood')}
                        >
                           Neighborhood
                        </button >
                    }
                    { (prefs.location.locationType==="Address")
                        ?
                        <button 
                            className='md:text-base text-sm text-white-500 w-1/2 p-2 rounded-md bg-gradient-to-r from-orange-800 to-orange-400'
                        >
                            Address
                        </button >
                        :
                        <button 
                            className='w-1/2 p-2 hover:bg-white md:text-base text-sm hover:text-orange-500 rounded-md'
                            onClick={() => setLocationType('Address')}
                        >
                            Address
                        </button >
                    }
                </div>
                { (prefs.location.locationType==="Neighborhood")
                    ?
                    <>
                     <OptionDropDown 
                        label="Neighborhoods"
                        data={hoodList}
                        value={prefs['location']['neighborhood']}
                        onChange={setNeighborhood}
                     />  
                    </>
                    :
                    <>
                        { (prefs.location.locationType==="Address")
                            ?
                            <>

                                <SearchBar onDataFromParent={handleDataFromSearchBox}/>

                                <RangeSlider min={0} max={5} step={.1} onDataFromParent={handleDataFromRadiusSlider}/>
                            
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