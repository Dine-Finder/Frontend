//src SideBox.jsx
import React from 'react';
import ApplyButton from './ApplyButton';
import CurrentRestuarants from './CurrentRestuarants';
import SettingsBox from './SettingsBox';
import Setting from './Setting';

const SideBox = ({numberOfBusinesses, onDataFromChild, confirmFilter}) => {

  const handleDataFromChild = (childData)=>{
    onDataFromChild(childData);
  };

  const acceptClicked = ()=>{
    confirmFilter();
  }


  return (
    <div className="
      bg-light
      w-[16vw]
      h-[91vh] 
      ml-[2vw]
      relative
      z-1
      shadow-lg
      inline-flex
      flex-col
      float-left
      border-4
      border-main
      rounded
      overflow-x-hidden
      overflow-y-auto
    "
    > 
      <CurrentRestuarants numberOfBusinesses={numberOfBusinesses}/>
      <SettingsBox onDataFromParent={handleDataFromChild}/>
      <ApplyButton onClick={acceptClicked}/>
      
    </div>
  )
}

export default SideBox