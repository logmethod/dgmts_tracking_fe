import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import React, { Component } from "react";

export class MapContainer extends Component {
  render() {
    const style = {
      width: "100%",
      height: "100%",
    };
    return (
      <Map google={this.props.google} zoom={14} style={style}>
        <Marker name={"Current location"} />

        <InfoWindow>
          <div>
            <h1>SELECTED PLACE</h1>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBpI4lcmxMKdnkrrRlZUF-eQanA2ZSDZVI",
})(MapContainer);
