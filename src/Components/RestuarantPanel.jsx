//src RestuarantPanel.jsx
import React from 'react';
import ImageCarousel from './ImageCarousel';
import RestuarantInfo from './RestuarantInfo';
import RankIcon from './RankIcon';

const RestuarantPanel = ({ranking, info, showing, page, onClick}) => {
  const selectedRest = info[ranking-1+showing*(page-1)];
  return (
    <div className="
        bg-white
        hover:bg-yellowfade
        h-[128px]
        w-full
        z-100
        mb-2
        mr-2
        border-4
        border-main
        shadow-lg
        p-2
        flex
        justify-center
        relative
        rounded
        "
        onClick={onClick}
    > 
      <ImageCarousel restuarant={selectedRest}/>
      <RankIcon ranking={ranking+(page-1)*showing} />
      <RestuarantInfo restuarant={selectedRest}/>
    </div>
  )
}

export default RestuarantPanel