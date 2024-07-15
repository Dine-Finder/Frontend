import React, { useState } from 'react';
import ImageCarousel from './ImageCarousel';
import RestaurantInfo from './RestaurantInfo';
import RankIcon from './RankIcon';
import PopUpButton from './PopUpButton';



const RestaurantPanel = ({ranking, info, showing, page, onClick, buttonPress}) => {

  const selectedRest = info[ranking-1+showing*(page-1)];

  const sendClick = (e) => {
    e.stopPropagation();
    buttonPress(true);
  }

  return (
    <div className="
        hover:bg-light
        h-[180px]
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
      <ImageCarousel restaurant={selectedRest}/>
      <RankIcon ranking={ranking+(page-1)*showing} />
      <RestaurantInfo restaurant={selectedRest}/>
      <PopUpButton onClick={sendClick}/>
    </div>
  )
}

export default RestaurantPanel