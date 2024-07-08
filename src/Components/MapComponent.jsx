// src/MapComponent.jsx
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, useMap, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { Icon } from 'leaflet';
import borders from '../Data/neighbourhoods.json'
import boro from '../Data/boro.json'

// Fix for the default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;

const createCustomIcon = (content) => {
  return L.divIcon({
    className: "bg-yellow text-main border-2 border-main rounded-full inline-flex justify-center items-center text-lg font-bold w-[20px] h-[20px] text-center",
    html: `<div style="transform: rotate(29deg);">${content}</div>`,
    iconSize: [30,30],
    iconAnchor: [15,15],
    popupAnchor: [0,-15]
  });
};

const createUserIcon = (content) => {
  return L.divIcon({
    className: "bg-green text-main border-2 border-orange rounded-full inline-flex justify-center items-center text-lg font-bold w-[20px] h-[20px] text-center",
    html: `<div style="transform: rotate(29deg);">${content}</div>`,
    iconSize: [20,20],
    iconAnchor: [10,10],
    popupAnchor: [0,-10]
  });
};


//Style to Hide non Manhattan
const blackOut={
  color: "purple",
  weight: 2,
  opacity: 1,
  fillColor:"black",
  fillOpacity:0.6
}


//Default Style for Neighbourhood
const defGeoStyle={
  color: "purple",
  weight: 0.8,
  opacity: 1,
  fillOpacity:0
};

//Neighbourhood style on hover
const hoverGeoStyle={
  color: "Purple",
  weight: 2,
  opacity: 1,
  fillOpacity:0.5
};

//On hover event
const onMouseHover=(e)=>{
  const layer = e.target;
  layer.setStyle(hoverGeoStyle);
};

//Stop hover event
const onMouseOff = (e) => {
  const layer = e.target;
  layer.setStyle(defGeoStyle);
};

const bindTooltip=(feature,layer)=>{
  if (feature.properties && feature.properties.ntaname) {
    layer.bindTooltip(feature.properties.ntaname)
  }
}

const onClick = (e) => {
  e.target.closePopup();
  //e.target.unbindTooltip();
  e.originalEvent.preventDefault();
  e.originalEvent.stopPropagation();
};

const onEachNeighbourhood = (feature, layer)=>{
  layer.on({
    mouseover: onMouseHover,
    mouseout: onMouseOff,
    click: onClick
  });
  bindTooltip(feature,layer);
};

const MapComponent = ({info, showing, page, currentPage, coordinates, preferences}) => {

  const restuarant = info;

  return (
    <div className="
      relative
      inline-flex
      justify-center
      items-center
      w-[25vw]
      h-[91vh]
      z-0 
      border-4 
      border-main
      shadow-lg
      mr-[2vw]
      float-right
      overflow-hidden
      rounded
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

            {Array.from({ length: currentPage }, (_,index) => (
              <Marker 
                key={index}
                icon={createCustomIcon(index+1+((page-1)*showing))}
                position={[restuarant[index+(page-1)*showing]['coordinates']['latitude'], restuarant[index+(page-1)*showing]['coordinates']['longitude']]}
                riseOnHover= {true}
                zIndexOffset={10*(showing-index)}
              />
              ))}
            {/* {(preferences['coordinates'][0]!=null && preferences['coordinates'][1]!=null)
              ?
              <>
              <Marker 
                key="User"
                icon={createUserIcon("")}
                position={[preferences['coordinates'][0],preferences['coordinates'][1]]}
                zIndexOffset={10*(showing+1)}
              />
              <Circle
                center={{lat: preferences['coordinates'][0], lng: preferences['coordinates'][1]}}
                color='red'
                fillColor='red'
                radius={preferences['radius']*1600}
                setZIndex={10}
              />
              <GeoJSON data={boro} style={blackOut} />

              </>
              :<>
                <GeoJSON data={boro} style={blackOut}/>
              </>
            } */}
            
          
          <GeoJSON data={borders} style={defGeoStyle} onEachFeature={onEachNeighbourhood}/>
        </MapContainer>
      </div>
    </div>
  );
}

export default MapComponent;