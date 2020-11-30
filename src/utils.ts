import { range } from "d3-array";
import { scaleQuantile } from "d3-scale";

export function updatePercentiles(featureCollection: any, accessor: any) {
  const { features } = featureCollection;
  const scale = scaleQuantile().domain(features.map(accessor)).range(range(9));
  return {
    type: "FeatureCollection",
    features: features.map((f: any) => {
      const value = accessor(f);
      const properties = {
        ...f.properties,
        value,
        percentile: scale(value),
      };
      return { ...f, properties };
    }),
  };
}
