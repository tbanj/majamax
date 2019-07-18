import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Like from "./like";
import Table from "./table";

// const x = <h1>ade</h1>; // react element

class MoviesTable extends Component {

  columns = [
    { path: "title", label: "Title", content: (movie) => <Link to={`/movies/${this.props.currentPage}/${movie._id}`} >{movie.title}</Link> },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "Like",
      content: movie => (
        <Like onClick={() => this.props.onLike(movie)} liked={movie.liked} />
      )
    },
    {
      key: "Delete",
      content: movie => (
        <button
          type="button"
          className="btn waves-effect waves-light btn-rounded btn-outline-danger"
          onClick={() => this.props.onDelete(movie._id)}
        >
          Delete
        </button>
      )
    }
  ];

  render() {
    const { movies, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
