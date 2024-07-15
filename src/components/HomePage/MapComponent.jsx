import React, { useEffect, useRef, useState } from 'react';

import { MapContainer, TileLayer, Marker, Popup, GeoJSON, useMap, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { Icon } from 'leaflet';

import borders from '../../Data/geoJson.json'
import borough from '../../Data/borough.json'

// Fix for the default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;

const createCustomIcon = (content) => {
  return L.divIcon({
    className: "bg-dark-gray text-orange border-2 border-orange rounded-full inline-flex justify-center items-center text-lg font-bold w-[20px] h-[20px] text-center",
    html: `<div style="transform: rotate(29deg);">${content}</div>`,
    iconSize: [30,30],
    iconAnchor: [15,15],
    popupAnchor: [0,-15]
  });
};

const createUserIcon = (content) => {
  return L.divIcon({
    className: "bg-orange text-dark-gray border-2 border-dark-gray rounded-full inline-flex justify-center items-center text-lg font-bold w-[20px] h-[20px] text-center",
    html: `<div style="transform: rotate(29deg);">${content}</div>`,
    iconSize: [20,20],
    iconAnchor: [10,10],
    popupAnchor: [0,-10]
  });
};

// Style to Hide non Manhattan
const blackOut={
  color: "orange",
  weight: 2,
  opacity: 1,
  fillColor: "#1D232A",
  fillOpacity: 0.4
}

// Default Style for Neighbourhood
const defGeoStyle={
  color: "orange",
  weight: 0.8,
  opacity: 1,
  fillOpacity: 0
};

// Neighbourhood style on hover
const hoverGeoStyle={
  color: "orange",
  weight: 2,
  opacity: 1,
  fillColor: "orange",
  fillOpacity: 0.5
};

const filterGeoStyle={
  color: "orange",
  weight: 2,
  opacity: 1,
  fillColor: "red",
  fillOpacity: 0.5
};

const selectedGeoStyle={
  color: "orange",
  weight: 2,
  opacity: 1,
  fillColor: "purple",
  fillOpacity: 0.5
};

// On hover event
const onMouseHover=(e)=>{
  const layer = e.target;

  if (layer.currentStyle === defGeoStyle){
    layer.setStyle(hoverGeoStyle);
    layer.currentStyle = hoverGeoStyle;
  }
};

// Stop hover event
const onMouseOff = (e) => {
  const layer = e.target;
  if (layer.currentStyle === hoverGeoStyle){
    layer.setStyle(defGeoStyle);
    layer.currentStyle = defGeoStyle;
  }
};

const bindTooltip=(feature,layer)=>{
  if (feature.properties && feature.properties.ntaname) {
    layer.bindTooltip(feature.properties.ntaname)
  }
}

const MapComponent = ({info, showing, page, currentPage, selectedPreferences, preferences, updatePreferences}) => {
  const geoJSONLayerRef = useRef(null);
  const hoodRef = useRef(preferences['location']['neighborhood']);
  const selHoodRef = useRef(preferences['location']['neighborhood']);

  const onClick = (e) => {
    const newPreferences = {
      location:{
        locationType:"Neighborhood",
        coordinates:preferences['location']['coordinates'],
        radius: preferences['location']['radius'],
        neighborhood: e.target.feature.properties.ntaname
      },
      dayTime:{
        day: preferences['dayTime']['day'],
        time: preferences['dayTime']['time']
      },
      localeBusyness:{
        Quiet: preferences['localeBusyness']['Quiet'],
        Average: preferences['localeBusyness']['Average'],
        Busy: preferences['localeBusyness']['Busy'],
        importance:preferences['localeBusyness']['importance']
      },
      restaurantBusyness:{
        Quiet: preferences['restaurantBusyness']['Quiet'],
        Average: preferences['restaurantBusyness']['Average'],
        Busy: preferences['restaurantBusyness']['Busy'],
        importance:preferences['restaurantBusyness']['importance']
      }
    };
    updatePreferences(newPreferences);
    e.target.closePopup();
    e.originalEvent.preventDefault();
    e.originalEvent.stopPropagation();
  };
  
  const onEachNeighbourhood = (feature, layer)=>{
    layer.on({
      mouseover: onMouseHover,
      mouseout: onMouseOff,
      click: onClick
    });

    layer.currentStyle = defGeoStyle;

    if (feature.properties.ntaname === selHoodRef.current){
      layer.setStyle(selectedGeoStyle);
      layer.currentStyle = selectedGeoStyle;
    } else if (feature.properties.ntaname === hoodRef.current){
      layer.setStyle(filterGeoStyle);
      layer.currentStyle = filterGeoStyle;
    } else {
      layer.setStyle(defGeoStyle);
      layer.currentStyle = defGeoStyle;
    }
  };

  useEffect(() => {
    hoodRef.current = preferences['location']['neighborhood'];
    if (geoJSONLayerRef.current) {
      geoJSONLayerRef.current.clearLayers().addData(borders.features);
    }
  }, [preferences]);

  useEffect(() => {
    selHoodRef.current = selectedPreferences['location']['neighborhood'];
    if (geoJSONLayerRef.current) {
      geoJSONLayerRef.current.clearLayers().addData(borders.features);
    }
  }, [selectedPreferences]);

  const restuarant = info;

  return (
    <div className="
      flex-grow
      relative
      inline-flex
      justify-center
      items-center
      w-[25vw]
      h-[98vh]
      z-0 
      border-4 
      border-orange
      shadow-lg
      mr-[2vw]
      float-right
      overflow-hidden
      rounded
      top-[1vh]
      bg-dark-gray
      "
    >
      <div className="
        inline-flex
        justify-center 
        items-center 
        transform rotate-[-29deg]
        "
      >
        <MapContainer 
          center={[40.79, -73.96]} 
          zoomSnap={0.1}
          zoom={11.7} 
          style={{ height: "200vh", width: "200vh" }}
          zoomControl={false}
          scrollWheelZoom={false}
          doubleClickZoom={false}
          dragging={false}
          attributionControl={false}
          >

          <TileLayer
            url="https://tiles.stadiamaps.com/tiles/stamen_toner_background/{z}/{x}/{y}{r}.png"
            attribution='Stamen Toner'
          />

            {Array.from({ length: currentPage }, (_, index) => (
              <Marker 
                key={index}
                icon={createCustomIcon(index+1+((page-1)*showing))}
                position={[restuarant[index+(page-1)*showing]['latitude'], restuarant[index+(page-1)*showing]['longitude']]}
                riseOnHover= {true}
                zIndexOffset={10*(showing-index)}
              />
              ))}
            {( preferences['location']['coordinates'][0]!=null && preferences['location']['coordinates'][1]!=null)
              ?
              <>
              <Marker 
                key="User"
                icon={createUserIcon("")}
                position={[preferences['location']['coordinates'][0],preferences['location']['coordinates'][1]]}
                zIndexOffset={10*(showing+1)}
              />
              <Circle
                center={{lat: preferences['location']['coordinates'][0], lng: preferences['location']['coordinates'][1]}}
                color='red'
                fillColor='red'
                radius={preferences['location']['radius']*1600}
                setZIndex={10}
              />
              <GeoJSON data={borough} style={blackOut} />

              </>
              :<>
                <GeoJSON data={borough} style={blackOut}/>
              </>
            }
            
          
          <GeoJSON data={borders} style={defGeoStyle} onEachFeature={onEachNeighbourhood} ref={geoJSONLayerRef}/>
        </MapContainer>
      </div>
    </div>
  );
}

export default MapComponent;
