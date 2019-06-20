import React, { Component } from "react";
import Like from "./like";

class MoviesTable extends Component {
  raiseSort = path => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };
  render() {
    const { movies, onDelete, onLike } = this.props;
    console.log(this.props.onLike);

    return (
      <table className="table">
        <thead>
          <tr>
            <th onClick={() => this.raiseSort("title")} scope="col">
              Title
            </th>
            <th onClick={() => this.raiseSort("genre.name")} scope="col">
              Genre
            </th>
            <th onClick={() => this.raiseSort("numberInStock")} scope="col">
              Stock
            </th>
            <th onClick={() => this.raiseSort("dailyRentalRate")} scope="col">
              Rate
            </th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {/* to implement pagination, you need to make use of array which is local
                      dont make use of the state array so as to effect*/}
          {movies.length > 0 ? (
            movies.map((movie, index) => (
              <tr key={index}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like onClick={() => onLike(movie)} liked={movie.liked} />
                </td>

                <td>
                  <button
                    type="button"
                    className="btn waves-effect waves-light btn-rounded btn-outline-danger"
                    onClick={() => {
                      onDelete(movie);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">
                <i>No movies stored yet</i>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
}

export default MoviesTable;
