import React, {useState, useEffect} from 'react';
import { motion, AnimatePresence } from "framer-motion";

const ImageCarousel = ({restaurant}) => {
    const images = []
    images.push(restaurant['image_url'])

    const[currentIndex, setCurrentIndex]= useState(0)

    const[direction, setDirection]= useState("left")

    const handleNext = () => {
        setDirection("right");
        setCurrentIndex((prevIndex)=>
            prevIndex+1===images.length ? 0: prevIndex+1
        );
    };

    const handlePrev = () => {
        setDirection("left");
        setCurrentIndex((prevIndex)=>
            prevIndex===0 ? images.length-1: prevIndex-1
        );
    };

    //Automatically change image every 5 seconds
    useEffect(() => {
        const intervalId = setInterval(() => {
            setDirection("left");
            setCurrentIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, []); // Change image every 5 seconds
    
        return () => clearInterval(intervalId);
      }, [images.length]);

    
    const slideVariants={
        hiddenRight:{
            x: "0%",
            opacity:0
        },
        hiddenLeft:{
            x: "0%",
            opacity:0
        },
        visible:{
            x:"0",
            opacity:1,
            transition:{
                duration:1
            },
        },
        exit: {
            opacity:0,
            scale: 0.8,
            transition:{
                duration: 0.5
            }
        }
    }

    return (
      <div className='
        h-full
        w-1/3
        relative
        inline-flex
        overflow-hidden
        float-left
        rounded-md
        z-0
        '>
        <div className='
                h-full
                w-full
                inline-flex
                justify-center 
                items-center 
                ' >
        <AnimatePresence>
            <motion.img
                className="absolute inset-0 w-full h-full object-cover"
                key={currentIndex} 
                src={images[currentIndex]} 
                alt=""
                variants={slideVariants}
                initial={direction === "right" ? "hiddenRight" : "hiddenLeft"}
                animate="visible"
                exit="exit"
            />
        </AnimatePresence>
        </div>
        {/* <div className='
            flex
            justify-between
        '>
            <div className='
                absolute
                bg-transparent
                hover:bg-yellowfade
                h-[20px]
                w-[20px]
                p-[0px_2px_2px_4px]
                my-auto mx-[2px]
                top-0   
                bottom-0
                left-0
                cursor-pointer
                rounded-[50%]
            '
             onClick={handlePrev}>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    height='20'
                    viewBox='0 96 960 960'
                    width='20'
                >
                    <path d='M400 976 0 576l400-400 56 57-343 343 343 343-56 57Z' />
                </svg>
            </div>
            <div className='
                 absolute
                bg-transparent
                hover:bg-yellowfade
                h-[20px]
                w-[20px]
                p-[0px_0px_1px_2px]
                my-auto mx-[2px]
                rounded-[50%]
                top-0
                bottom-0
                right-0
                cursor-pointer
                ' onClick={handleNext}>
                <svg
                        xmlns='http://www.w3.org/2000/svg'
                        height='20'
                        viewBox='0 96 960 960'
                        width='20'
                    >
                        <path d="m304 974-56-57 343-343-343-343 56-57 400 400-400 400Z" />
                </svg>
            </div>
        </div> */}
      </div>
    )
  }
  
  export default ImageCarousel