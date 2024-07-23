import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import 'leaflet/dist/leaflet.css';

import MapComponent from '../components/HomePage/MapComponent';
import RecommendationBox from '../components/HomePage/RecommendationBox';
import SideBox from '../components/HomePage/SideBox';
import RestaurantPanel from '../components/HomePage/RestaurantPanel';
import PageButton from '../components/HomePage/PageButton';
import PerPageButton from '../components/HomePage/PerPageButton';
import PopUp from '../components/HomePage/PopUp';
import Navbar from "../components/HomePage/NavbarHome";

import { PREFERENCES, SELECTEDPREFERENCE } from '../constants';

import theme from '../theme';
import '../styles/HomePage/HomePage.css';

function HomePage() {
  const [orderedData, setOrderedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const[preferences, setPreferences] = useState(PREFERENCES);


  const sendDataToBackend = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/restaurants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: preferences })
      });
      if (response.ok) {
        const data = await response.json();
        setOrderedData(data.output || []);
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDataSorted = (sortedData) => {
    setOrderedData([...sortedData]);
  };

  useEffect(() => {
    sendDataToBackend();
  }, []);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 
  const [numberOfRestaurants, setNumberOfRestaurants] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const numberOfBusinesses = orderedData.length;
  const maxPage = Math.floor(numberOfBusinesses/numberOfRestaurants) + Math.ceil((numberOfBusinesses % numberOfRestaurants) / numberOfRestaurants);
  const currentPage = Math.min(numberOfRestaurants, numberOfBusinesses - (pageNumber - 1) * numberOfRestaurants);
  const [selectedRestaurant, setSelectedRestuarant] = useState(null);
  const [popUpState, setPopUpState] = useState(false);

  const[selectedPreferences, setSelectedPreferences] = useState(SELECTEDPREFERENCE);

  const updatePreferences = (newPreferences) => {
    setPreferences(newPreferences)
  };

  const handleDataFromChild = (childData) => {
    setPreferences(childData);
    // console.log("Child data received:", childData);
  };

  function handlePageButtonClick(buttonNumber){
    setPageNumber(buttonNumber);
    setSelectedRestuarant(null);
  };

  function handleNumberOfRestaurants(buttonNumber){
    if (selectedRestaurant === null) {
      setPageNumber(Math.ceil(((pageNumber - 1) * numberOfRestaurants + 1) / buttonNumber));
    } else {
      setPageNumber(Math.ceil(selectedRestaurant / buttonNumber));
    }
    setNumberOfRestaurants(buttonNumber);
  };

  function handleSelectedRestuarant(ranking){
    setSelectedRestuarant(ranking);
  };

  const applyPreferences = () => {
    setSelectedPreferences(preferences);
  };

  useEffect(() => {
  }, [orderedData]);


  useEffect(() => {
  }, [preferences]);

  useEffect(() => {
  }, [selectedPreferences]);

  const handleSideBarChange = (childData) => {
    setIsSidebarOpen(childData);
  };

  if (isLoading) {
    return (
      <div className="loader-container">
        <CircularProgress size={200} color="secondary"/>
      </div>
    );
  }

  return (
    <>
    <div className='md:overflow-y-hidden'>
      <Navbar />
      <ThemeProvider theme={theme}>
        <div>
          <div className='md:h-[100vh]'>
            { popUpState===true
              ?<PopUp onClick={setPopUpState}/>
              :<></>
            }
            <div className='w-screen md:h-[91vh] relative flex md:flex-row flex-col'>
              <SideBox preferences={preferences} numberOfBusinesses={numberOfBusinesses} onDataFromChild={handleDataFromChild} confirmFilter={sendDataToBackend} applyPreferences={applyPreferences} updatePreferences={updatePreferences}/>
              <div className='h-[91vh] relative inline-flex flex-col p-0 mx-[2vw]'>
                  <RecommendationBox restaurants={orderedData} onclick={handleDataSorted}>
                    {Array.from({ length: currentPage }, (_, index) => (
                      <RestaurantPanel key={index} ranking={index + 1} info={orderedData} showing={numberOfRestaurants} page={pageNumber} onClick={() => handleSelectedRestuarant(index + numberOfRestaurants * (pageNumber - 1) + 1)} buttonPress={setPopUpState} />
                    ))}
                    <div className='h-[1vh] relative'></div>
                  </RecommendationBox>
                  <div className='h-[5vh] w-[51vw] border-0 flex'>
                    <div className='h-[5vh] w-[51vw] absolute'>
                      <div className='block mx-auto md:w-[24vh]'>
                        <PageButton key={1} pageNumber={pageNumber} buttonNumber={1} onClick={() => handlePageButtonClick(1)} />
                        {(maxPage) <= 5
                          ? Array.from({ length: maxPage - 1 }, (_, index) => (
                            <PageButton key={index + 2} pageNumber={pageNumber} buttonNumber={index + 2} onClick={() => handlePageButtonClick(index + 2)} />
                          ))
                          : <>
                            <PageButton key={2} pageNumber={pageNumber} buttonNumber={Math.min(Math.max(2, pageNumber - 1), maxPage - 3)} onClick={() => handlePageButtonClick(Math.min(Math.max(2, pageNumber - 1), maxPage - 3))} />
                            <PageButton key={3} pageNumber={pageNumber} buttonNumber={Math.min(Math.max(3, pageNumber), maxPage - 2)} onClick={() => handlePageButtonClick(Math.min(Math.max(3, pageNumber), maxPage - 2))} />
                            <PageButton key={4} pageNumber={pageNumber} buttonNumber={Math.min(Math.max(4, pageNumber + 1), maxPage - 1)} onClick={() => handlePageButtonClick(Math.min(Math.max(4, pageNumber + 1), maxPage - 1))} />
                            <PageButton key={5} pageNumber={pageNumber} buttonNumber={Math.min(Math.max(5, pageNumber + 5), maxPage)} onClick={() => handlePageButtonClick(Math.max(Math.min(Math.max(5, pageNumber + 5), maxPage)))} />
                          </>
                        }
                      </div>
                      <div className='md:relative absolute md:left-0 left-full flex flex-row-reverse'>
                        <PerPageButton key={1} buttonNumber={20} onClick={() => handleNumberOfRestaurants(20)} numberOfRestaurants={numberOfRestaurants} />
                        <PerPageButton key={2} buttonNumber={10} onClick={() => handleNumberOfRestaurants(10)} numberOfRestaurants={numberOfRestaurants} />
                        <PerPageButton key={3} buttonNumber={5} onClick={() => handleNumberOfRestaurants(5)} numberOfRestaurants={numberOfRestaurants} />
                      </div>
                    </div>
                  </div>
                </div>
              <MapComponent info={orderedData} showing={numberOfRestaurants} page={pageNumber} currentPage={currentPage} selectedPreferences={selectedPreferences} preferences={preferences} updatePreferences={updatePreferences}/>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </div>
    </>
  );
}

export default HomePage;
