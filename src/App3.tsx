import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { useCallback, useRef } from "react";
import { useState } from "react";
import ReactMapGL from "react-map-gl";
import { Component } from "react";
import { render } from "react-dom";
import MapGL, {
  Popup,
  Marker,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";

import { dataLayer } from "./map-style.js";
import { updatePercentiles } from "./utils";
import { json as requestJson } from "d3-request";
import ControlPanel from "./controlPanel";
import Pins, { Pin } from "./Pins";
import CityInfo from "./city-info";
import {
  Editor,
  EditingMode,
  DrawLineStringMode,
  DrawPolygonMode,
} from "react-map-gl-draw";

// import Geocoder from "react-map-gl-geocoder";

const geolocateStyle: any = {
  position: "absolute",
  top: 0,
  left: 0,
  padding: "10px",
};

const fullscreenControlStyle: any = {
  position: "absolute",
  top: 36,
  left: 0,
  padding: "10px",
};

const navStyle: any = {
  position: "absolute",
  top: 72,
  left: 0,
  padding: "10px",
};

const scaleControlStyle: any = {
  position: "absolute",
  bottom: 36,
  left: 0,
  padding: "10px",
};

const cities = [
  {
    city: "New York",
    population: "8,175,133",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Above_Gotham.jpg/240px-Above_Gotham.jpg",
    state: "New York",
    latitude: 40.6643,
    longitude: -73.9385,
  },
  {
    city: "Los Angeles",
    population: "3,792,621",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/thumb/5/57/LA_Skyline_Mountains2.jpg/240px-LA_Skyline_Mountains2.jpg",
    state: "California",
    latitude: 34.0194,
    longitude: -118.4108,
  },
  {
    city: "Chicago",
    population: "2,695,598",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/thumb/8/85/2008-06-10_3000x1000_chicago_skyline.jpg/240px-2008-06-10_3000x1000_chicago_skyline.jpg",
    state: "Illinois",
    latitude: 41.8376,
    longitude: -87.6818,
  },
  {
    city: "Houston",
    population: "2,100,263",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Aerial_views_of_the_Houston%2C_Texas%2C_28005u.jpg/240px-Aerial_views_of_the_Houston%2C_Texas%2C_28005u.jpg",
    state: "Texas",
    latitude: 29.7805,
    longitude: -95.3863,
  },
  {
    city: "Phoenix",
    population: "1,445,632",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Downtown_Phoenix_Aerial_Looking_Northeast.jpg/207px-Downtown_Phoenix_Aerial_Looking_Northeast.jpg",
    state: "Arizona",
    latitude: 33.5722,
    longitude: -112.088,
  },
  {
    city: "Philadelphia",
    population: "1,526,006",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Philly_skyline.jpg/240px-Philly_skyline.jpg",
    state: "Pennsylvania",
    latitude: 40.0094,
    longitude: -75.1333,
  },
  {
    city: "San Antonio",
    population: "1,327,407",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Downtown_San_Antonio_View.JPG/240px-Downtown_San_Antonio_View.JPG",
    state: "Texas",
    latitude: 29.4724,
    longitude: -98.5251,
  },
  {
    city: "San Diego",
    population: "1,307,402",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/thumb/5/53/US_Navy_110604-N-NS602-574_Navy_and_Marine_Corps_personnel%2C_along_with_community_leaders_from_the_greater_San_Diego_area_come_together_to_commemora.jpg/240px-US_Navy_110604-N-NS602-574_Navy_and_Marine_Corps_personnel%2C_along_with_community_leaders_from_the_greater_San_Diego_area_come_together_to_commemora.jpg",
    state: "California",
    latitude: 32.8153,
    longitude: -117.135,
  },
  {
    city: "Dallas",
    population: "1,197,816",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Dallas_skyline_daytime.jpg/240px-Dallas_skyline_daytime.jpg",
    state: "Texas",
    latitude: 32.7757,
    longitude: -96.7967,
  },
  {
    city: "San Jose",
    population: "945,942",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Downtown_San_Jose_skyline.PNG/240px-Downtown_San_Jose_skyline.PNG",
    state: "California",
    latitude: 37.2969,
    longitude: -121.8193,
  },
  {
    city: "Austin",
    population: "790,390",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Austin2012-12-01.JPG/240px-Austin2012-12-01.JPG",
    state: "Texas",
    latitude: 30.3072,
    longitude: -97.756,
  },
  {
    city: "Jacksonville",
    population: "821,784",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Skyline_of_Jacksonville_FL%2C_South_view_20160706_1.jpg/240px-Skyline_of_Jacksonville_FL%2C_South_view_20160706_1.jpg",
    state: "Florida",
    latitude: 30.337,
    longitude: -81.6613,
  },
  {
    city: "San Francisco",
    population: "805,235",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/San_Francisco_skyline_from_Coit_Tower.jpg/240px-San_Francisco_skyline_from_Coit_Tower.jpg",
    state: "California",
    latitude: 37.7751,
    longitude: -122.4193,
  },
  {
    city: "Columbus",
    population: "787,033",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Columbus-ohio-skyline-panorama.jpg/240px-Columbus-ohio-skyline-panorama.jpg",
    state: "Ohio",
    latitude: 39.9848,
    longitude: -82.985,
  },
  {
    city: "Indianapolis",
    population: "820,445",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Downtown_indy_from_parking_garage_zoom.JPG/213px-Downtown_indy_from_parking_garage_zoom.JPG",
    state: "Indiana",
    latitude: 39.7767,
    longitude: -86.1459,
  },
  {
    city: "Fort Worth",
    population: "741,206",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/thumb/d/db/FortWorthTexasSkylineW.jpg/240px-FortWorthTexasSkylineW.jpg",
    state: "Texas",
    latitude: 32.7795,
    longitude: -97.3463,
  },
  {
    city: "Charlotte",
    population: "731,424",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Charlotte_skyline45647.jpg/222px-Charlotte_skyline45647.jpg",
    state: "North Carolina",
    latitude: 35.2087,
    longitude: -80.8307,
  },
  {
    city: "Seattle",
    population: "608,660",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/thumb/3/36/SeattleI5Skyline.jpg/240px-SeattleI5Skyline.jpg",
    state: "Washington",
    latitude: 47.6205,
    longitude: -122.3509,
  },
  {
    city: "Denver",
    population: "600,158",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/DenverCP.JPG/240px-DenverCP.JPG",
    state: "Colorado",
    latitude: 39.7618,
    longitude: -104.8806,
  },
  {
    city: "El Paso",
    population: "649,121",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Downtown_El_Paso_at_sunset.jpeg/240px-Downtown_El_Paso_at_sunset.jpeg",
    state: "Texas",
    latitude: 31.8484,
    longitude: -106.427,
  },
];
type L = {
  city: string;
  population: string;
  image: string;
  state: string;
  latitude: Number;
  longitude: Number;
};
const MODES = [
  { id: "drawPolyline", text: "Draw Polyline", handler: DrawLineStringMode },
  { id: "drawPolygon", text: "Draw Polygon", handler: DrawPolygonMode },
  { id: "editing", text: "Edit Feature", handler: EditingMode },
];

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiYWJkdWwwOTU3IiwiYSI6ImNraG9tYjJueTAzNXQyeXRrNzh4NDBlbmcifQ.3CQ0p_HBVavofv5TaASzvA" ||
  "";
const Map: React.FunctionComponent<{ popupInfo?: any }> = () => {
  const [data, setData] = useState(null);
  const [modeId, setModeId] = useState(null);
  const [modeHandler, setModeHandler] = useState<any>("");

  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides,
      });
    },
    [handleViewportChange]
  );

  function _switchMode(evt: any) {
    const modeId2: any = evt.target.value === modeId ? null : evt.target.value;
    const mode = MODES.find((m: any) => m.id === modeId);
    const modeHandler = mode ? new mode.handler() : null;
    // this.setState({ modeId, modeHandler });
    setModeHandler(modeHandler);
    setModeId(modeId2);
  }

  function _renderToolbar() {
    return (
      <div
        style={{ position: "absolute", top: 0, right: 0, maxWidth: "320px" }}
      >
        <select onChange={_switchMode}>
          <option value="">--Please choose a draw mode--</option>
          {MODES.map((mode) => (
            <option key={mode.id} value={mode.id}>
              {mode.text}
            </option>
          ))}
        </select>
      </div>
    );
  }

  React.useEffect(() => {
    // _loadData = data => {
    // this.setState({
    // data: updatePercentiles(data, f => f.properties.income[this.state.year])
    // });
    // };
  });

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100vh",
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });
  const [popupInfo, setpopupInfo] = useState<any>(null);
  const [marker, setMarker] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
  });
  const [events, setEvents] = useState({});

  const geocoderContainerRef = useRef();
  const mapRef = useRef();

  function _onClickMarker(city: any) {
    console.log("city: ", city);
    setpopupInfo(city);
  }

  function _renderPopup() {
    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          closeOnClick={false}
          onClose={() => setpopupInfo(null)}
        >
          <CityInfo info={popupInfo} />
        </Popup>
      )
    );
  }

  function _logDragEvent(name: any, event: any) {
    setEvents({ ...events, [name]: event.lngLat });
    // this.setState({
    //   events: {
    //     ...this.state.events,
    //     [name]: event.lngLat
    //   }
    // });
  }

  function _onMarkerDragStart(event: any) {
    // this._logDragEvent('onDragStart', event);
    _logDragEvent("onDragStart", event);
  }

  function _onMarkerDrag(event: any) {
    _logDragEvent("onDrag", event);
  }

  function _onMarkerDragEnd(event: any) {
    _logDragEvent("onDragEnd", event);
    setMarker({
      longitude: event.lngLat[0],
      latitude: event.lngLat[1],
    });
    // this.setState({
    //   marker: {
    //     longitude: event.lngLat[0],
    //     latitude: event.lngLat[1]
    //   }
    // });
  }

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={MAPBOX_TOKEN}
      onViewportChange={(nextViewport: any) => setViewport(nextViewport)}
    >
      <Marker
        longitude={marker.longitude}
        latitude={marker.latitude}
        offsetTop={-20}
        offsetLeft={-10}
        draggable
        onDragStart={_onMarkerDragStart}
        onDrag={_onMarkerDrag}
        onDragEnd={_onMarkerDragEnd}
      >
        <Pin size={20} />
      </Marker>
      {/* <Pins data={cities} onClick={_onClickMarker} /> */}
      <div style={fullscreenControlStyle}>
        <FullscreenControl />
      </div>
      <div style={geolocateStyle}>
        <GeolocateControl />
      </div>
      {_renderPopup()}
      <Editor
        // to make the lines/vertices easier to interact with
        clickRadius={12}
        mode={modeHandler}
      />
      {_renderToolbar()}

      {/* <Geocoder
        mapRef={mapRef}
        containerRef={geocoderContainerRef}
        onViewportChange={handleViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        position="top-left"
      /> */}
    </ReactMapGL>
  );
};
export default Map;
