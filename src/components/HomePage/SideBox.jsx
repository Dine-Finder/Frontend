// src/SideBox.jsx
import React, { useState } from 'react';
import ApplyButton from './ApplyButton';
import CurrentRestuarants from './CurrentRestuarants';
import SettingsBox from './SettingsBox';
import { Menu, X } from "lucide-react";

const SideBox = ({ preferences, numberOfBusinesses, onDataFromChild, applyPreferences, confirmFilter }) => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const handleDataFromChild = (childData) => {
    onDataFromChild(childData);
  };

  const acceptClicked = () => {
    confirmFilter();
    applyPreferences();
  };

  return (
    <>
      {/* Mobile menu button */}
      <button className="block lg:hidden p-2" onClick={toggleNavbar}>
        {mobileDrawerOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile drawer */}
      <div className={`p-1 absolute left-0 h-full w-full bg-custom-dark z-40 transform ${mobileDrawerOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:hidden`}>
        <button className="p-4" onClick={toggleNavbar}>
          <X size={24} />
        </button>
        <div className="h-[100vh] flex flex-col items-center">
          <CurrentRestuarants numberOfBusinesses={numberOfBusinesses} />
          <SettingsBox prefs={preferences} onDataFromParent={handleDataFromChild} />
          <ApplyButton onClick={acceptClicked} />
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:w-[16vw] lg:flex-col lg:items-center ml-[1vh]">
        <CurrentRestuarants numberOfBusinesses={numberOfBusinesses} />
        <SettingsBox prefs={preferences} onDataFromParent={handleDataFromChild} />
        <ApplyButton onClick={acceptClicked} />
      </div>
    </>
  );
}

export default SideBox;
