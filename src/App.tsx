import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { concave, polygon, multiPoint, featureCollection } from "@turf/turf";
import * as turf from "@turf/turf";
import "./map.css";
import Tooltip from "./components/Tooltop";
import ReactDOM from "react-dom";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYWJkdWwwOTU3IiwiYSI6ImNraG9tYjJueTAzNXQyeXRrNzh4NDBlbmcifQ.3CQ0p_HBVavofv5TaASzvA";
var hospitals: any = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        Name: "VA Medical Center -- Leestown Division",
        Address: "2250 Leestown Rd",
      },
      geometry: { type: "Point", coordinates: [-84.539487, 38.072916] },
    },
    {
      type: "Feature",
      properties: { Name: "St. Joseph East", Address: "150 N Eagle Creek Dr" },
      geometry: { type: "Point", coordinates: [-84.440434, 37.998757] },
    },
    {
      type: "Feature",
      properties: {
        Name: "Central Baptist Hospital",
        Address: "1740 Nicholasville Rd",
      },
      geometry: { type: "Point", coordinates: [-84.512283, 38.018918] },
    },
    {
      type: "Feature",
      properties: {
        Name: "VA Medical Center -- Cooper Dr Division",
        Address: "1101 Veterans Dr",
      },
      geometry: { type: "Point", coordinates: [-84.506483, 38.02972] },
    },
    {
      type: "Feature",
      properties: {
        Name: "Shriners Hospital for Children",
        Address: "1900 Richmond Rd",
      },
      geometry: { type: "Point", coordinates: [-84.472941, 38.022564] },
    },
    {
      type: "Feature",
      properties: {
        Name: "Eastern State Hospital",
        Address: "627 W Fourth St",
      },
      geometry: { type: "Point", coordinates: [-84.498816, 38.060791] },
    },
    {
      type: "Feature",
      properties: {
        Name: "Cardinal Hill Rehabilitation Hospital",
        Address: "2050 Versailles Rd",
      },
      geometry: { type: "Point", coordinates: [-84.54212, 38.046568] },
    },
    {
      type: "Feature",
      properties: { Name: "St. Joseph Hospital", ADDRESS: "1 St Joseph Dr" },
      geometry: { type: "Point", coordinates: [-84.523636, 38.032475] },
    },
    {
      type: "Feature",
      properties: {
        Name: "UK Healthcare Good Samaritan Hospital",
        Address: "310 S Limestone",
      },
      geometry: { type: "Point", coordinates: [-84.501222, 38.042123] },
    },
    {
      type: "Feature",
      properties: { Name: "UK Medical Center", Address: "800 Rose St" },
      geometry: { type: "Point", coordinates: [-84.508205, 38.031254] },
    },
  ],
};
var libraries: any = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { Name: "Village Branch", Address: "2185 Versailles Rd" },
      geometry: { type: "Point", coordinates: [-84.548369, 38.047876] },
    },
    {
      type: "Feature",
      properties: { Name: "Northside Branch", ADDRESS: "1733 Russell Cave Rd" },
      geometry: { type: "Point", coordinates: [-84.47135, 38.079734] },
    },
    {
      type: "Feature",
      properties: { Name: "Central Library", ADDRESS: "140 E Main St" },
      geometry: { type: "Point", coordinates: [-84.496894, 38.045459] },
    },
    {
      type: "Feature",
      properties: { Name: "Beaumont Branch", Address: "3080 Fieldstone Way" },
      geometry: { type: "Point", coordinates: [-84.557948, 38.012502] },
    },
    {
      type: "Feature",
      properties: { Name: "Tates Creek Branch", Address: "3628 Walden Dr" },
      geometry: { type: "Point", coordinates: [-84.498679, 37.979598] },
    },
    {
      type: "Feature",
      properties: {
        Name: "Eagle Creek Branch",
        Address: "101 N Eagle Creek Dr",
      },
      geometry: { type: "Point", coordinates: [-84.442219, 37.999437] },
    },
  ],
};
const Map = () => {
  const mapContainerRef: any = useRef(null);
  const tooltipRef = useRef(new mapboxgl.Popup({ offset: 15 }));
  var pointA = turf.point([-84.548369, 38.047876]);
  var pointB = turf.destination(pointA, 50, 45, { units: "kilometers" });
  //create a bbox that extends to include all the features
  var bbx = turf.bbox(turf.featureCollection([pointA, pointB]));
  var line = turf.lineString([
    [-84.548369, 38.047876],
    [-78, 42],
    [-82, 35],
  ]);
  console.log(line);
  var pgn: any = turf.bboxPolygon(bbx); //convert it to Polygon feature
  var pt = turf.point([-84.548369, 38.047876]);
  var poly = turf.polygon([
    [
      [-81, 41],
      [-81, 47],
      [-72, 47],
      [-72, 41],
      [-81, 41],
    ],
  ]);

  var polygon = turf.polygon([
    [
      [-81, 41],
      [-88, 36],
      [-84, 31],
      [-80, 33],
      [-77, 39],
      [-81, 41],
    ],
  ]);

  var poly1 = turf.polygon([
    [
      [-122.801742, 45.48565],
      [-122.801742, 45.60491],
      [-122.584762, 45.60491],
      [-122.584762, 45.48565],
      [-122.801742, 45.48565],
    ],
  ]);

  var poly2 = turf.polygon([
    [
      [-122.520217, 45.535693],
      [-122.64038, 45.553967],
      [-122.720031, 45.526554],
      [-122.669906, 45.507309],
      [-122.723464, 45.446643],
      [-122.532577, 45.408574],
      [-122.487258, 45.477466],
      [-122.520217, 45.535693],
    ],
  ]);
  var line1 = turf.lineString([
    [126, -11],
    [129, -21],
  ]);
  var line2 = turf.lineString([
    [123, -18],
    [131, -14],
  ]);
  var intersects = turf.lineIntersect(line1, line2);
  console.log("line intersect", intersects);

  var poly11 = turf.polygon(
    [
      [
        [-82.574787, 35.594087],
        [-82.574787, 35.615581],
        [-82.545261, 35.615581],
        [-82.545261, 35.594087],
        [-82.574787, 35.594087],
      ],
    ],
    { fill: "#0f0" }
  );
  var poly12 = turf.polygon(
    [
      [
        [-82.560024, 35.585153],
        [-82.560024, 35.602602],
        [-82.52964, 35.602602],
        [-82.52964, 35.585153],
        [-82.560024, 35.585153],
      ],
    ],
    { fill: "#00f" }
  );

  var union = turf.union(poly11, poly12);
  console.log("union", union);

  var intersection = turf.intersect(poly1, poly2);

  console.log("intersection", intersection);

  var centroid = turf.centroid(polygon);

  //addToMap
  var addToMap = [polygon, centroid];

  console.log(addToMap);

  let data23: any = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-0.12766, 51.507276],
        },
      },
    ],
  };

  let data24: any = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-0.12766, 50.507276],
        },
      },
    ],
  };

  var radius = 20;

  function pointOnCircle(angle: any): any {
    return {
      type: "Point",
      coordinates: [Math.cos(angle) * radius, Math.sin(angle) * radius],
    };
  }

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-96, 37.8],
      zoom: 2,
    });

    map.on("load", () => {
      map.on("click", function (e) {
        // Return any features from the 'libraries' layer whenever the map is clicked
        var libraryFeatures: any = map.queryRenderedFeatures(e.point, {
          layers: ["libraries"],
        });
        if (!libraryFeatures.length) {
          return;
        }
        var libraryFeature = libraryFeatures[0];
        let lc = libraryFeature.geometry.coordinates;
        // console.log("library ", libraryFeature.geometry.coordinates);
        for (let i = 0; i < hospitals.features.length; i++) {
          let hc = hospitals.features[i].geometry.coordinates;
          var from = turf.point(lc);
          var to = turf.point(hc);
          var options: any = { units: "miles" };

          var distance = turf.distance(from, to, options);
          console.log("Hospital ", distance);
        }

        // Using Turf, find the nearest hospital to library clicked
        var nearestHospital = turf.nearest(libraryFeature, hospitals);

        // If a nearest library is found
        if (nearestHospital !== null) {
          // Update the 'nearest-library' data source to include
          // the nearest library
          const sour: any = map.getSource("nearest-hospital");
          sour.setData({
            type: "FeatureCollection",
            features: [nearestHospital],
          });
          // Create a new circle layer from the 'nearest-library' data source
          map.addLayer(
            {
              id: "nearest-hospital",
              type: "circle",
              source: "nearest-hospital",
              paint: {
                "circle-radius": 12,
                "circle-color": "#486DE0",
              },
            },
            "hospitals"
          );
        }
      });

      map.addSource("markers", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [-77, 39],
              },
              properties: {
                title: "A",
                "marker-symbol": "default_marker",
              },
            },
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [-122, 38],
              },
              properties: {
                title: "B",
                "marker-color": "#ff00ff",
                "marker-symbol": "secondary_marker",
              },
            },
          ],
        },
      });
      map.addLayer({
        id: "markers",
        source: "markers",
        type: "circle",
        paint: {
          "circle-radius": 10,
          "circle-color": "#007cbf",
        },
      });
      let line = {
        type: "LineString",
        coordinates: [
          [-77, 39],
          [-90, 50],
          [-122, 38],
        ],
      };
      let data25: any = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: line,
          },
        ],
      };
      map.addLayer({
        id: "line",
        source: {
          type: "geojson",
          data: data25,
        },
        type: "line",
        paint: {
          "line-color": "black",
        },
      });

      map.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: [
              [-84.48369693756104, 38.83381888486939],
              [-84.48348236083984, 38.83317489144141],
              [-84.48339653015138, 38.83270036638107],
              [-84.48356819152832, 38.832056363179625],
              [-84.48404026031496, 38.83114119107971],
              [-84.48404026031496, 38.83049717427869],
              [-84.48348236083984, 38.829920943955045],
              [-84.48356819152832, 38.82954808664175],
              [-84.48507022857666, 38.82944639795659],
              [-84.48610019683838, 38.82880236636284],
              [-84.48695850382314, 38.82931081282506],
              [-84.48700141906738, 38.83080223556934],
              [-84.48751640319824, 38.83168351665738],
              [-84.48803138732912, 38.832158048267786],
              [-84.48888969421387, 38.83297152392784],
              [-84.48987674713133, 38.83263257682617],
              [-84.49043464660643, 38.832938629287755],
              [-84.49125003814696, 38.832429207817725],
              [-84.49163627624512, 38.832564787218985],
              [-84.49223809106445, 38.83338825839438],
              [-84.49388204345702, 38.83368330777276],
            ],
          },
        },
      });
      map.addLayer({
        id: "route",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#888",
          "line-width": 8,
        },
      });

      // map.addLayer({
      //   id: "maine",
      //   type: "fill",
      //   source: {
      //     type: "geojson",
      //     data: addToMap,
      //   },
      //   layout: {},
      //   paint: {
      //     "fill-color": "#088",
      //     "fill-opacity": 0.3,
      //   },
      // });

      map.addLayer({
        id: "maine",
        type: "fill",
        source: {
          type: "geojson",
          // data: {
          //   type: "Feature",
          //   properties: {},
          //   geometry: {
          //     type: "Polygon",
          //     coordinates: [
          //       [
          //         [-84.548369, 38.047876],
          //         [-84.14284825710168, 38.047876],
          //         [-84.14284825710168, 38.365138642211924],
          //         [-84.548369, 38.365138642211924],
          //         [-84.548369, 38.047876],
          //       ],
          //     ],
          //   },
          // },
          data: pgn,
        },
        layout: {},
        paint: {
          "fill-color": "#088",
          "fill-opacity": 0.3,
        },
      });

      map.addSource("nearest-hospital", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      });
      map.addLayer({
        id: "hospitals",
        type: "symbol",
        source: {
          type: "geojson",
          data: hospitals,
        },
        layout: {
          "icon-image": "hospital-15",
          "icon-allow-overlap": true,
        },
        paint: {},
      });
      map.addLayer({
        id: "libraries",
        type: "symbol",
        source: {
          type: "geojson",
          data: libraries,
        },
        layout: {
          "icon-image": "library-15",
        },
        paint: {},
      });

      map.addSource("point34", {
        type: "geojson",
        data: pointOnCircle(0),
      });
      map.addLayer({
        id: "point34",
        source: "point34",
        type: "circle",
        paint: {
          "circle-radius": 10,
          "circle-color": "#007cbf",
        },
      });

      function animateMarker(timestamp: any) {
        // Update the data to a new position based on the animation timestamp. The
        // divisor in the expression `timestamp / 1000` controls the animation speed.
        let r: any = map.getSource("point34");
        r.setData(pointOnCircle(timestamp / 1000));

        // Request the next frame of the animation.
        requestAnimationFrame(animateMarker);
      }

      // Start the animation.
      animateMarker(0);

      map.loadImage(
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/201408_cat.png",
        function (error: any, image: any) {
          if (error) throw error;
          map.addImage("cat", image);
          map.addSource("point2", {
            type: "geojson",
            data: data24,
          });
          map.addLayer({
            id: "points24",
            type: "symbol",
            source: "point2",
            layout: {
              "icon-image": "cat",
              "icon-size": 0.25,
            },
          });
        }
      );

      map.addSource("point", {
        type: "geojson",
        data: data23,
      });

      map.addLayer({
        id: "points",
        type: "symbol",
        source: "point",
        layout: {
          "icon-image": "gradient",
        },
      });

      map.addSource("sample", {
        type: "geojson",
        data:
          "https://raw.githubusercontent.com/chelm/grunt-geo/master/samples/postgis.geojson",
      });
      // one layer per GeoJSON feature type, see http://stackoverflow.com/a/36927026
      map.addLayer({
        id: "sample-line",
        type: "line",
        source: "sample",
        filter: ["==", "$type", "LineString"],
        paint: {
          "line-color": "white",
        },
      });
      map.addLayer({
        id: "sample-point",
        type: "circle",
        source: "sample",
        filter: ["==", "$type", "Point"],
        paint: {
          "circle-radius": 5,
          "circle-color": "red",
        },
      });
    });

    var width = 64; // The image will be 64 pixels square
    var bytesPerPixel = 4; // Each pixel is represented by 4 bytes: red, green, blue, and alpha.
    var data = new Uint8Array(width * width * bytesPerPixel);

    for (var x = 0; x < width; x++) {
      for (var y = 0; y < width; y++) {
        var offset = (y * width + x) * bytesPerPixel;
        data[offset + 0] = (y / width) * 255; // red
        data[offset + 1] = (x / width) * 255; // green
        data[offset + 2] = 128; // blue
        data[offset + 3] = 255; // alpha
      }
    }

    map.addImage("gradient", { width: width, height: width, data: data });

    // change cursor to pointer when user hovers over a clickable feature
    map.on("mouseenter", (e) => {
      if (e.features.length) {
        map.getCanvas().style.cursor = "pointer";
      }
    });

    // reset cursor to default when user is no longer hovering over a clickable feature
    map.on("mouseleave", () => {
      map.getCanvas().style.cursor = "";
    });

    // add tooltip when users mouse move over a point
    map.on("mousemove", (e) => {
      const features = map.queryRenderedFeatures(e.point);
      if (features.length) {
        const feature = features[0];

        // Create tooltip node
        const tooltipNode = document.createElement("div");
        ReactDOM.render(<Tooltip feature={feature} />, tooltipNode);

        // Set tooltip on map
        tooltipRef.current
          .setLngLat(e.lngLat)
          .setDOMContent(tooltipNode)
          .addTo(map);
      }
    });

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className="map-container" ref={mapContainerRef} />
      <div>Hello</div>
    </div>
  );
};

export default Map;
