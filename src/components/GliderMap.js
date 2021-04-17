import React from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";

const BELFAST_DEFAULT_LOCATION = {
  lat: 54.607868,
  lng: -5.926437,
};

// const JULIO_DEFAUL_LOCATION = {
//   lat: 39.87343,
//   lng: -104.775,
// };

const GliderMap = withScriptjs(
  withGoogleMap((props) => {
    return (
      <GoogleMap
        defaultZoom={14}
        defaultCenter={BELFAST_DEFAULT_LOCATION}
        {...props}
      >
        <Marker
          position={BELFAST_DEFAULT_LOCATION}
          label={"Hi!"}
          onClick={props.onToggleOpen}
        >
          {props.isOpen && (
            <InfoWindow onCloseClick={props.onToggleOpen}></InfoWindow>
          )}
        </Marker>
      </GoogleMap>
    );
  })
);

export default GliderMap;
