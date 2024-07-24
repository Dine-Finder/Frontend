import React, { useEffect, useState } from 'react';
import OptionDropDown from './OptionDropDown';

const DateTime = ({ date, time, dayTimeUpdate }) => {

    const [hour, setHour]=useState(time)

    const [day, setDay]=useState(date)

    const hours = ["12 a.m. - 1 a.m.", "1 a.m. - 2 a.m.", "2 a.m. - 3 a.m.", "3 a.m. - 4 a.m.", "4 a.m. - 5 a.m.", "5 a.m. - 6 a.m.", "6 a.m. - 7 a.m.", "7 a.m. - 8 a.m.",
        "8 a.m. - 9 a.m.", "9 a.m. - 10 a.m.", "10 a.m. - 11 a.m.", "11 a.m. - 12 p.m.", "12 p.m. - 1 p.m.", "1 p.m. - 2 p.m.", "2 p.m. - 3 p.m.", "3 p.m. - 4 p.m.",
        "4 p.m. - 5 p.m.", "5 p.m. - 6 p.m.", "6 p.m. - 7 p.m.", "7 p.m. - 8 p.m.", "8 p.m. - 9 p.m.", "9 p.m. - 10 p.m.", "10 p.m. - 11 p.m.", "11 p.m. - 12 a.m."]
    
    
    function handleHourChange(hourString){
        setHour(hours.indexOf(hourString))
    }

    useEffect(()=>{
        dayTimeUpdate([day,hour])
    }, [day, hour]);


    return (
        <div>
            <div className='h-[26px] border rounded-md border-orange-500 text-base'>
                <button className={
                    `w-1/4 
                    h-full
                    ${day===1 ? 'bg-white text-orange-500' : 'text-white'}
                    border-black
                    rounded-md
                    `} 
                    onClick={() => setDay(1)}>
                    Mon
                </button>
                <button className={
                    `w-1/4 
                    h-full
                    ${day===2 ? 'bg-white text-orange-500' : 'text-white'}
                    border-black
                    rounded-md
                    `} 
                    onClick={() => setDay(2)}>
                    Tue
                </button>
                <button className={
                    `w-1/4 
                    h-full
                    ${day===3 ? 'bg-white text-orange-500' : 'text-white'}
                    border-black
                    rounded-md
                    `} 
                    onClick={() => setDay(3)}>
                    Wed
                </button>
                <button className={
                    `w-1/4 
                    h-full
                    ${day===4 ? 'bg-white text-orange-500' : 'text-white'}
                    border-black
                    rounded-md
                    `} 
                     onClick={() => setDay(4)}>
                    Thur
                </button>
            </div>
            <div className='h-[26px] mx-7 mt-1 border rounded-md border-orange-500 text-base'>
                <button className={
                    `w-1/3
                    h-full
                    ${day===5 ? 'bg-white text-orange-500' : 'text-white'}
                    border-black
                    rounded-md
                    `} 
                    onClick={() => setDay(5)}>
                    Fri
                </button>
                <button className={
                    `w-1/3 
                    h-full
                    ${day===6 ? 'bg-white text-orange-500' : 'text-white'}
                    border-black
                    rounded-md
                    `} 
                    onClick={() => setDay(6)}>
                    Sat
                </button>
                <button className={
                    `w-1/3 
                    h-full
                    ${day===0 ? 'bg-white text-orange-500' : 'text-white'}
                    border-black
                    rounded-md
                    `} 
                    onClick={() => setDay(0)}>
                    Sun
                </button>
            </div>

            <OptionDropDown data={hours} value={hours[hour]} onChange={handleHourChange}/>
        </div>
    )
}

export default DateTime