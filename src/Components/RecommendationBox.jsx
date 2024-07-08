//src RecommendationBox.jsx
import React from 'react';
import RecommendationTitle from './RecommendationTitle';

const RecommendationBox = ({children}) => {
  return (
    <div className="
      bg-white
      w-full
      h-[87vh] 
      relative
      inline-flex
      border-b-4
      border-main
      flex-col
      justify-start
      overflow-y-scroll
      overflow-x-hidden
      shadow-lg
    "
    > 
      <div className='
      w-full
      inline-flex
      sticky
      top-0
      z-10
      '>
        <RecommendationTitle/>
      </div>
      <div className='
        h-[300vh]
        relative
      '>
        {children}
      </div>
      <div className='
        h-[1vh]
        relative
      '>
      </div>
    </div>
  )
}

export default RecommendationBox