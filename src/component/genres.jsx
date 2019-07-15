import React, { Component } from "react";
import { Link } from 'react-router-dom';
class Genres extends Component {
  render() {
    const {
      allGenres,
      textProperty,
      valueProperty,
      selectedItem,
      onItemSelect
    } = this.props;

    // if (!this.props.onClick) classes += " active";
    return (
      <ul className="list-group">
        {/* <li className={classes}>All Genres</li> */}
        {allGenres.map((genre, index) => (
          <li
            style={{ cursor: "pointer" }}
            onClick={() => {
              onItemSelect(genre);
              console.log(genre[textProperty]);
            }}
            className={
              genre === selectedItem
                ? "list-group-item active"
                : "list-group-item"
            }
            key={genre[valueProperty]}
          >
            <Link to={`/genres/${index}`} >{genre[textProperty]}  </Link>
          </li>
        ))}
      </ul>
    );
  }
}

// setting default values for a child component from its parent components
Genres.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default Genres;
