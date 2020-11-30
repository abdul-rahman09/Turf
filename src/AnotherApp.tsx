import React from 'react';
import './App.css';
import Map from "./map"
// ES6
// import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';
// const Map = ReactMapboxGl({
//   accessToken:
//     'pk.eyJ1IjoiYWJkdWwwOTU3IiwiYSI6ImNraG9tYjJueTAzNXQyeXRrNzh4NDBlbmcifQ.3CQ0p_HBVavofv5TaASzvA'
// });
 
// in render()
{/* <Map
  style="mapbox://styles/mapbox/streets-v9"
  center={[ 74.3233379650232, 31.481747846041145]}
  containerStyle={{
    height: '100vh',
    width: '100vw'
  }}
>
  <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
    <Feature coordinates={[74.3233379650232, 31.481747846041145]} />
  </Layer>
</Map> */}
function App() {
  return (
    <div className="App">
      <Map/>
    </div>
  );
}
export default App;
