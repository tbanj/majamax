import React from "react";
// Input liked: boolean
const Like = props => {

  let classes = "fa fa-heart";
  if (!props.liked) classes += "-o";
  return (
    <a data-toggle="tooltip"
      data-original-title={!props.liked ? "like this movie" : 'unlike this movie'}><i
        onClick={props.onClick}
        style={{ cursor: "pointer" }}
        className={classes}
        aria-hidden="true"
      /></a>

  );
};

export default Like;
