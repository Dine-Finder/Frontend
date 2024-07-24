import React from 'react';

import StarRatings from 'react-star-ratings';
import Button from '@mui/material/Button';
import AnimateText from '../Animations/AnimateText';

import { sampleSize } from 'lodash';

const RestaurantInfo = ({ restaurant }) => {
  let restaurantBusyness = restaurant.restaurant_busyness_string;
  restaurantBusyness = restaurantBusyness.charAt(0).toUpperCase() + restaurantBusyness.slice(1);
  let localeBusyness = restaurant.zone_busyness_string;
  localeBusyness = localeBusyness.charAt(0).toUpperCase() + localeBusyness.slice(1);
  let address = restaurant.display_address;

  const tagsArray = restaurant.tags.split(',');
  const randomTags = sampleSize(tagsArray, 3);

  return (
    <div className="
        h-full
        w-2/3
        relative
        inline-flex
        flex-col
        md:overflow-hidden
        overflow-y-scroll
        z-4
        "
    > 
      <div className='
      absolute
      pl-2
      '>
        <div className='
          text-main
          font-bold
          md:text-2xl
          text-xl
          overflow-none
          text-orange-500
          '>
            <AnimateText>{restaurant.name}</AnimateText>
        </div>
        <p className='md:text-lg text-sm '><AnimateText>{address}</AnimateText></p>
        <div>
          <StarRatings
            rating={restaurant.rating}
            starDimension="20px"
            starSpacing="2px"
            starRatedColor="gold"
            numberOfStars={5}
          />
        </div>
        <p className='inline md:text-lg text-sm '><AnimateText>Locale Busyness: </AnimateText></p>
        <p className={`inline md:text-lg text-sm  ${localeBusyness=="Busy" ? 'text-red-500' : localeBusyness=="Average" ? 'text-orange-500':'text-green-500'}`}><AnimateText>{localeBusyness}</AnimateText></p>
        <br />
        <p className='inline md:text-lg text-sm '><AnimateText>Restaurant Busyness: </AnimateText></p>
        <p className={`inline md:text-lg text-sm ${restaurantBusyness==="Busy" ? 'text-red-500' : restaurantBusyness==="Average" ? 'text-orange-500':'text-green-500'}`}><AnimateText>{restaurantBusyness}</AnimateText></p>
        <p className='md:text-lg text-sm text-green-500'><AnimateText>Price Range: {restaurant.price}</AnimateText></p>
        {randomTags.map((tag, index) => (
          <span key={index} className='text-sm text-blue-500 hover:text-blue-700 cursor-pointer'>
          <AnimateText>
            <button className='bg-transparent hover:bg-blue-700 text-white px-1 ml-1 border border-blue-700 rounded-md'>{tag.trim()}</button>
          </AnimateText>
          </span>
        ))}
      </div>
    </div>
  )
}

export default RestaurantInfo;
