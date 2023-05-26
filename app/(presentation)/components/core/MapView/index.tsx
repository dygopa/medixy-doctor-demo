import L, { IconOptions, LatLngExpression } from 'leaflet';
import React, { SetStateAction, useCallback, useMemo, useRef, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

export const MarkerIcon = L.icon({
    iconUrl: icon.toString(),
    shadowUrl: iconShadow.toString()
});

export default function MapView(){

    const [position, setPosition] = useState({
        lat: 51.505,
        lng: -0.09,
    })

    const zoom: number = 15;

    function LocationMarker() {
        const map = useMapEvents({
          click() {
            map.locate()
          },
          locationfound(e:any) {
            setPosition(e.latlng)
            map.flyTo(e.latlng, map.getZoom())
          },
        })
      
        return position === null ? null : (
          <Marker position={position}>
            <Popup>You are here</Popup>
          </Marker>
        )
    }

    return (
        <MapContainer center={position} zoom={zoom} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={MarkerIcon} >
                <Popup></Popup>
            </Marker>
      </MapContainer>
    );
}