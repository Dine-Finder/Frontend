import React, { useState } from 'react'; // Removed unused useEffect and useRef
import 'leaflet/dist/leaflet.css';
import './App.css';
import MapComponent from './Components/MapComponent';
import Header from './Components/Header';
import RecommendationBox from './Components/RecommendationBox';
import SideBox from './Components/SideBox';
import RestuarantPanel from './Components/RestuarantPanel';
import RestaurantInfo from './Data/restaurants2.json';
import PageButton from './Components/PageButton';
import PerPageButton from './Components/PerPageButton';


function App() {

  const businesses = RestaurantInfo.businesses;
  const [numberOfRestuarants, setNumberOfRestuarants] = useState(10);
  const [pageNumber, setPageNumber] =useState(1);
  const numberOfBusinesses = businesses.length;
  const maxPage = Math.floor(numberOfBusinesses/numberOfRestuarants)+Math.ceil((numberOfBusinesses%numberOfRestuarants)/numberOfRestuarants);
  const currentPage = Math.min(numberOfRestuarants,numberOfBusinesses-(pageNumber-1)*numberOfRestuarants)
  const [selectedRestuarant, setSelectedRestuarant] = useState(null);

  const[preferences, setPreferences] = useState({
    location:{
        locationType:null,
        coordinates:[null,null],
        radius: null,
        neighborhood: null
    },
    dayTime:{
        day: null,
        time: null
    },
    localeBusyness:{
        Quiet: 0,
        Average: 0,
        Busy: 0,
        importance:"Preference"
    },
    restaurantBusyness:{
        Quiet: 0,
        Average: 0,
        Busy: 0,
        importance:"Preference" 
    }
  })

  const handleDataFromChild = (childData) => {
    setPreferences(childData);
  };

  function handlePageButtonClick(buttonNumber){
    setPageNumber(buttonNumber)
    setSelectedRestuarant(null)
  };

  function handleNumberOfRestuarants(buttonNumber){
    if (selectedRestuarant===null){
      setPageNumber(Math.ceil(((pageNumber-1)*numberOfRestuarants+1)/buttonNumber))
    }else{
      setPageNumber(Math.ceil(selectedRestuarant/buttonNumber))
    }
    setNumberOfRestuarants(buttonNumber)
  };

  function handleSelectedRestuarant(ranking){
    setSelectedRestuarant(ranking)
  };








  const sendDataToBackend = async () => {
    try {
      const response = await fetch('/connect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({input: preferences})
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data;
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  
  

  return (
    <div className='h-[100vh]'>
      <Header/>
      <div className='
        w-screen
        h-[93vh]
        relative
        top-[7vh]
        '
        >
        
        <SideBox numberOfBusinesses={numberOfBusinesses} onDataFromChild={handleDataFromChild} confirmFilter={sendDataToBackend}/>

        <div className='
        w-[51vw] 
        h-[93vh]
        relative
        inline-flex
        flex-col
        p-0
        mx-[2vw]
        '>
        <RecommendationBox>

          {Array.from({ length: currentPage }, (_,index) => (
            <RestuarantPanel key={index} ranking={index+1} info={businesses} showing={numberOfRestuarants} page={pageNumber} onClick={()=>handleSelectedRestuarant(index+numberOfRestuarants*(pageNumber-1)+1)}/>
          ))}

          <div className='
            h-[1vh]
            relative
            '>
          </div>

        </RecommendationBox>
          <div className='
            bg-white
            h-[5vh]
            w-[51vw] 
            border-0
            flex
            
          '>
            <div className='
            h-[5vh]
            w-[51vw] 
            absolute
            '>
              <div className='block mx-auto w-[24vh]'>

                <PageButton key={1} pageNumber={pageNumber} buttonNumber={1} onClick={() => handlePageButtonClick(1)}/>
                { (maxPage)<=5
                  ? Array.from({ length: maxPage-1 }, (_,index) => (
                    <PageButton key={index+2} pageNumber={pageNumber} buttonNumber={index+2} onClick={() => handlePageButtonClick(index+2)}/>
                    ))
                  : <>
                      <PageButton key={2} pageNumber={pageNumber} buttonNumber={Math.min(Math.max(2,pageNumber-1),maxPage-3)} onClick={() => handlePageButtonClick(Math.min(Math.max(2,pageNumber-1),maxPage-3))}/>
                      <PageButton key={3} pageNumber={pageNumber} buttonNumber={Math.min(Math.max(3,pageNumber),maxPage-2)} onClick={() => handlePageButtonClick(Math.min(Math.max(3,pageNumber),maxPage-2))}/>
                      <PageButton key={4} pageNumber={pageNumber} buttonNumber={Math.min(Math.max(4,pageNumber+1),maxPage-1)} onClick={() => handlePageButtonClick(Math.min(Math.max(4,pageNumber+1),maxPage-1))}/>
                      <PageButton key={5} pageNumber={pageNumber} buttonNumber={Math.min(Math.max(5,pageNumber+5),maxPage)} onClick={() => handlePageButtonClick(Math.max(Math.min(Math.max(5,pageNumber+5),maxPage)))}/>
                    </>
                }
                
              </div>
              <PerPageButton key={1} buttonNumber={20} onClick={() => handleNumberOfRestuarants(20)} numberOfRestuarants={numberOfRestuarants}/>
              <PerPageButton key={2} buttonNumber={10} onClick={() => handleNumberOfRestuarants(10)} numberOfRestuarants={numberOfRestuarants}/>
              <PerPageButton key={3} buttonNumber={5} onClick={() => handleNumberOfRestuarants(5)} numberOfRestuarants={numberOfRestuarants}/>
            </div>
          </div>
        </div>

        <MapComponent info={businesses} showing={numberOfRestuarants} page={pageNumber} currentPage={currentPage} preferences={preferences}/>
      </div>
    </div>
  );
}

export default App;
