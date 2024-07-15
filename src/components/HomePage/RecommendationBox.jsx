import React from 'react';

import TagsInput from './TagsInput';

const RecommendationBox = ({ children, restaurants, onclick }) => {
  return (
    <div className="
      h-[95vh] 
      relative
      inline-flex
      flex-col
      justify-start
      overflow-y-scroll
      overflow-x-hidden
      shadow-lg
      top-[1vh]
    "
    >
      <div className='
      w-full
      inline-flex
      sticky
      top-0
      z-10
      heading
      flex
      flex-col
      '>
        <div className="
        h-20
        w-full
        mb-2
        p-2
        shadow-lg
        text-5xl
        font-bold
        items-center
        z-20
        bg-gradient-to-r from-orange-800 to-orange-400
        text-transparent
        bg-clip-text">
          Top Recommendations
        </div>
        <div>
            <h1 className='text-center'>Enter Preference</h1>
            <TagsInput restaurant={restaurants} onClick={onclick} />
        </div>

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