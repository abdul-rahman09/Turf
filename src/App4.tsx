import * as React from "react";
import { Component } from "react";
import { render } from "react-dom";
import MapGL, { Source, Layer } from "react-map-gl";

import { dataLayer } from "./map-style";
import { updatePercentiles } from "./utils";
import { json as requestJson } from "d3-request";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiYWJkdWwwOTU3IiwiYSI6ImNraG9tYjJueTAzNXQyeXRrNzh4NDBlbmcifQ.3CQ0p_HBVavofv5TaASzvA"; // Set your mapbox token here

class App extends Component<
  {},
  { hoveredFeature: any; data: any; year: any; x: any; y: any; viewport: any }
> {
  state = {
    year: 2015,
    x: 1.0,
    y: 2.0,
    data: "",
    hoveredFeature: null,
    viewport: {
      latitude: 40,
      longitude: -100,
      zoom: 3,
      bearing: 0,
      pitch: 0,
    },
  };

  componentDidMount() {
    requestJson(
      "https://raw.githubusercontent.com/uber/react-map-gl/master/examples/.data/us-income.geojson",
      (error, response) => {
        if (!error) {
          this._loadData(response);
        }
      }
    );
  }

  _loadData = (data: any) => {
    this.setState({
      data: updatePercentiles(
        data,
        (f: any) => f.properties.income[this.state.year]
      ),
    });
  };

  _updateSettings = (name: string, value: string) => {
    if (name === "year") {
      this.setState({ year: value });

      const { data } = this.state;
      if (data) {
        // trigger update
        this.setState({
          data: updatePercentiles(data, (f: any) => f.properties.income[value]),
        });
      }
    }
  };

  _onViewportChange = (viewport: any) => this.setState({ viewport });

  _onHover = (event: any) => {
    const {
      features,
      srcEvent: { offsetX, offsetY },
    } = event;
    const hoveredFeature =
      features && features.find((f: any) => f.layer.id === "data");

    this.setState({ hoveredFeature, x: offsetX, y: offsetY });
  };

  _renderTooltip() {
    const { hoveredFeature, x, y } = this.state;
    const hover: any = hoveredFeature;

    return (
      hoveredFeature && (
        <div className="tooltip" style={{ left: x, top: y }}>
          <div>State: {hover.properties.name}</div>
          <div>Median Household Income: {hover.properties.value}</div>
          <div>Percentile: {(hover.properties.percentile / 8) * 100}</div>
        </div>
      )
    );
  }

  render() {
    const { viewport, data } = this.state;

    return (
      <div style={{ height: "100vh", position: "relative" }}>
        <MapGL
          {...viewport}
          width="100%"
          height="100vh"
          mapStyle="mapbox://styles/mapbox/light-v9"
          onViewportChange={this._onViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          onHover={this._onHover}
        >
          <Source type="geojson" data={data}>
            <Layer {...dataLayer} />
          </Source>
          {this._renderTooltip()}
        </MapGL>
      </div>
    );
  }
}
export default App;
