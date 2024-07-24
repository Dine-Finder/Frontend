import React, { useState } from 'react';
import ImageCarousel from './ImageCarousel';
import RestaurantInfo from './RestaurantInfo';
import RankIcon from './RankIcon';
import PopUpButton from './PopUpButton';



const RestaurantPanel = ({ranking, info, showing, page, onClick, buttonPress}) => {

  const selectedRest = info[ranking-1+showing*(page-1)];

  const sendClick = (e) => {
    e.stopPropagation();
    //window.open(selectedRest.url, '_blank', 'noopener,noreferrer');
    buttonPress(true, ranking-1+showing*(page-1));
  }

  const images = []
  images.push(selectedRest['image_url'])


  return (
    <div className="
        hover:bg-light
        h-[250px]
        md:h-[250px]
        w-full
        z-100
        mb-6
        mr-2
        shadow-xl
        p-4
        flex
        justify-center
        relative
        rounded-md
        "
        onClick={onClick}
    > 
      <ImageCarousel images={images} offset={0}/>
      <RankIcon ranking={ranking+(page-1)*showing} />
      <RestaurantInfo restaurant={selectedRest}/>
      <PopUpButton onClick={sendClick}/>
    </div>
  )
}

export default RestaurantPanel