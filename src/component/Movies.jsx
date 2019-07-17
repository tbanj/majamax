import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Storage from "../localstorage/Storage";
// import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import Genres from "./genres";
import MoviesTable from "./moviesTable";
import _ from "lodash";

const getMovies = require("../services/fakeMovieService");

let movieListA = [];
const getItem = new Storage();
const getMov = new Storage();
class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    selectedGenre: "",
    sortColumn: { path: "title", order: "asc" }
  };

  componentWillMount() {
    // if (getMovies().length > getItem.getItemsFromStorage().length) {
    //   this.setState({ movies: getMovies() });

    //   return;
    // }

    if (getItem.getItemsFromStorage().length === 0) {
      console.log('equal to 0');

      this.handleStoreItem(getMovies.getMovies());
      return;
    }
    else {
      movieListA = getItem.getItemsFromStorage();
      this.setState({ movies: movieListA });
    }


  }

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ genres: genres });
    // this.handleStoreItem();
  }

  handleStoreItem(data) {
    this.setState({ movies: data });
    getItem.storeItem(data);
  }

  handleDelete = id => {
    getItem.deleteItemFromStorage(id);
    movieListA = getItem.getItemsFromStorage();
    this.setState({ movies: movieListA });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handleGenreSelected = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  // use to sort ascending & descending order
  handleSort = sortColumn => {

    this.setState({ sortColumn: sortColumn });
  };

  getPageData = () => {
    const {
      currentPage,
      pageSize,
      movies: AllMovies,
      selectedGenre,
      sortColumn
    } = this.state;
    const filtered =
      selectedGenre && selectedGenre._id
        ? AllMovies.filter(m => m.genre._id === selectedGenre._id)
        : AllMovies;

    // sorting
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    // array to populate data to users
    const movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: movies };
  }

  render() {
    const {
      currentPage,
      pageSize,
      movies: AllMovies,
      genres,
      sortColumn
    } = this.state;

    const { totalCount, data: movies } = this.getPageData();

    return (
      <div>

        <div className="container-fluid">
          {AllMovies.length > 0 ? (
            <React.Fragment>
              <div className="row my-4">
                <div className="col-md-3">
                  <Genres
                    allGenres={genres}
                    // clickGenre={genres._id}
                    onItemSelect={this.handleGenreSelected}
                    selectedItem={this.state.selectedGenre}
                  // textProperty="name"
                  // valueProperty="_id"
                  />
                </div>

                <div className="col-md-9">
                  <div><Link to="/movies/new" className="btn waves-effect waves-light btn-rounded btn-outline-primary">New Movies</Link></div>
                  <h3>Showing movies {totalCount} in the database</h3>
                  <MoviesTable
                    movies={movies}
                    currentPage={currentPage}
                    sortColumn={sortColumn}
                    onDelete={this.handleDelete}
                    onLike={this.handleLike}
                    onSort={this.handleSort}
                  />
                </div>
              </div>
            </React.Fragment>
          ) : (
              <h3>No movies in the database</h3>
            )}
        </div>
        <Pagination
          onPageChange={this.handlePageChange}
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
        />
      </div>
    );
  }
}

export default Movies;
