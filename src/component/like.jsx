import React from "react";
// Input liked: boolean
const Like = props => {

  let classes = "fa fa-heart";
  if (!props.liked) classes += "-o";
  return (
    <span data-toggle="tooltip" id="like"
      data-original-title={!props.liked ? "like this movie" : 'unlike this movie'}><i
        onClick={props.onClick}
        style={{ cursor: "pointer" }}
        className={classes}
        aria-hidden="true"
      /></span>

  );
};

export default Like;
