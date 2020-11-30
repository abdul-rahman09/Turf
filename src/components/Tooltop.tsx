import React from "react";

const Tooltip = (props: { feature:any }) => {
  const { id } = props.feature.properties;

  return (
    <div id={`tooltip-${id}`}>
      <strong>Source Layer:</strong> {props.feature.layer["source-layer"]}
      <br />
      <strong>Layer ID:</strong> {props.feature.layer.id}
    </div>
  );
};

export default Tooltip;