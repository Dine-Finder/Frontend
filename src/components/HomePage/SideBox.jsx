//src SideBox.jsx
import React from 'react';

import ApplyButton from './ApplyButton';
import CurrentRestuarants from './CurrentRestuarants';
import SettingsBox from './SettingsBox';
import Setting from './Setting';

const SideBox = ({preferences, numberOfBusinesses, onDataFromChild, applyPreferences, confirmFilter}) => {

  const handleDataFromChild = (childData)=>{
    onDataFromChild(childData);
  };

  const acceptClicked = ()=>{
    confirmFilter();
    applyPreferences();
  }

  return (
    <div className="w-[16vw] relative z-1 float-left flex flex-col justify-around items-center"> 
      <CurrentRestuarants numberOfBusinesses={numberOfBusinesses}/>
      <SettingsBox prefs={preferences} onDataFromParent={handleDataFromChild}/>
      <ApplyButton onClick={acceptClicked}/>
    </div>
  )
}

export default SideBox
