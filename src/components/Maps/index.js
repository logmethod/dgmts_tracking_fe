import React, { useEffect, useState } from "react";
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from "react-google-maps";
const Maps = () => {
  const mapData = {
    fieldInfo: [
      {
        id: 1,
        person: "Ishaq",
        role: "Manager",
        place: "habibi i8",
        task: "Eating :P",
        coordinates: { lat: 33.5755705, lng: 73.1514001 },
      },
      {
        id: 2,
        person: "Asad",
        role: "Manager",
        place: "Office i8",
        task: "waiting for abu bakar to bring kachnaar :D",
        coordinates: { lat: 33.66628291980237, lng: 73.0837012487894 },
      },
      {
        id: 2,
        person: "Abu Bakar",
        role: "Field Inspector",
        place: "Kachnar Park",
        task: "assigned to collect kachnaar from park without getting arrested",
        coordinates: { lat: 33.67012247649609, lng: 73.08160912574313 },
      },
    ],
  };
  const [selectedPark, setSelectedPark] = useState(null);
  const [center, setCenter] = useState({ lat: 29.902275015162225, lng: 69.22886571192434 });
  return (
    <GoogleMap defaultZoom={5} defaultCenter={center}>
      {mapData.fieldInfo.map((park) => (
        <Marker
          key={park.id}
          position={{
            lat: park.coordinates.lat,
            lng: park.coordinates.lng,
          }}
          onClick={() => {
            setSelectedPark(park);
            setCenter({ lat: selectedPark?.coordinates.lat, lng: selectedPark?.coordinates.lng });
            setZoom(12);
          }}
          icon={{
            // url: `/skateboarding.svg`,
            scaledSize: new window.google.maps.Size(25, 25),
          }}
        />
      ))}

      {selectedPark && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedPark(null);
          }}
          position={{
            lat: selectedPark.coordinates.lat,
            lng: selectedPark.coordinates.lng,
          }}
        >
          <div>
            <img
              src="https://e7.pngegg.com/pngimages/518/64/png-clipart-person-icon-computer-icons-user-profile-symbol-person-miscellaneous-monochrome-thumbnail.png"
              width="25px"
            />
            <h2>{selectedPark.person}</h2>
            <p>{selectedPark.place}</p>
            <p>{selectedPark.role}</p>
            <p>{selectedPark.task}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};
const WrappedMap = withScriptjs(withGoogleMap(Maps));

export default WrappedMap;
