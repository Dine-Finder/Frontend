//src ImageCarousel.jsx
import React, {useState, useEffect} from 'react';
import { motion, AnimatePresence } from "framer-motion";

const ImageCarousel = ({images,offset}) => {

    const[currentIndex, setCurrentIndex]= useState(offset)

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
        }, 3000); // Change image every 3 seconds
    
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
        w-[32%]
        relative
        inline-flex
        border-2
        border-secondary
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
      </div>
    )
  }
  
  export default ImageCarousel