import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import _ from "lodash";
import Storage from "../localstorage/Storage";
import StoreGenre from "../localstorage/StoreGenre";
import { getMoviesApi, deleteMovieApi } from "../services/movieService.js";
import { getGenresApi } from "../services/genreService.js";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";

import Genres from "./genres";
import MoviesTable from "./moviesTable";

import SearchBox from "./template/SearchBox";



let movieListA = [];
const getItem = new Storage();
const getGenre = new StoreGenre();
class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    selectedGenre: null,
    searchQuery: "",
    searchGenre: "",
    searchStock: "",
    searchRate: "",
    sortColumn: { path: "title", order: "asc" }
  };


  async componentDidMount() {
    /* write place to call api is componentDidMount()
      pending still checking for data
      resolved (success)
      rejected (failure)
    */


    if (getItem.getItemsFromStorage().length === 0) {
      this.handleStoreItem();
      return;
    }
    else {
      movieListA = getItem.getItemsFromStorage();
      const genresArray = getGenre.getItemsFromStorage();
      const genres = [{ _id: "", name: "All Genres" }, ...genresArray]
      this.setState({ movies: movieListA });
      this.setState({ genres });

      try {
        const res = await getMoviesApi();
        if (getItem.getItemsFromStorage().length < res.data.length) {
          this.setState({ movies: res.data });
        }
      } catch (error) {
        if (error.response && error.response.status === 404)
          toast.error('error encounter when fetching additional movies');
      }
    }

  }

  async handleStoreItem() {



    try {
      const res = await getMoviesApi();
      const { data } = await getGenresApi();
      toast(`welcome user`);

      if (res.data && data) {
        const genres = [{ _id: "", name: "All Genres" }, ...data];
        this.setState({ genres: genres, movies: res.data });
        getItem.storeItem(res.data);
        getGenre.storeItem(data);
      }


    } catch (error) {
      if (error.response && error.response.status === 404)
        toast.error('error encounter when fetching movies');
    }


  }

  handleDelete = async id => {
    getItem.deleteItemFromStorage(id);

    movieListA = getItem.getItemsFromStorage();
    this.setState({ movies: movieListA });
    try {
      const res = await deleteMovieApi(id);
      toast.success(`movie ${res.data.title} deleted`);
    } catch (error) {
      if (error.response && error.response.status === 404)
        toast.error('already being deleted');
    }
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    getItem.storeItem(movies);
    this.setState({ movies });
  };

  handleGenreSelected = genre => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
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
      searchQuery,
      searchGenre,
      searchStock,
      searchRate,
      sortColumn
    } = this.state;



    let filtered = AllMovies;
    if (isNaN(searchQuery)) {
      let searchQuer = searchQuery.toLowerCase();
      filtered = AllMovies.filter((movie) => movie.title.toLowerCase().startsWith(searchQuer));
    }
    else if (isNaN(searchGenre)) {
      let searchGenr = searchGenre.toLowerCase();
      filtered = AllMovies.filter((movie) => movie.genre.name.toLowerCase().startsWith(searchGenr));
    }

    else if (searchStock) {
      filtered = AllMovies.filter((movie) => movie.numberInStock.toString().startsWith(searchStock));
    }

    else if (searchRate) {
      filtered = AllMovies.filter((movie) => movie.dailyRentalRate.toString().startsWith(searchRate));
    }

    else if (selectedGenre && selectedGenre._id)
      filtered = AllMovies.filter(m => m.genre._id === selectedGenre._id);

    // sorting
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    // array to populate data to users
    const movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: movies };
  }

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 })
  }

  handleSearchGenre = (query) => {
    this.setState({ searchGenre: query, selectedGenre: null, currentPage: 1 })
  }

  handleSearchStock = (query) => {
    this.setState({ searchStock: query, selectedGenre: null, currentPage: 1 })
  }

  handleSearchRate = (query) => {
    this.setState({ searchRate: query, selectedGenre: null, currentPage: 1 })
  }


  render() {
    const {
      currentPage,
      pageSize,
      movies: AllMovies,
      genres,
      searchQuery,
      searchGenre,
      searchStock,
      searchRate,
      sortColumn
    } = this.state;
    const { user } = this.props;

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
                  {user && (
                    <React.Fragment>
                      <div><Link to="/movies/new" className="btn waves-effect waves-light btn-rounded btn-outline-primary">New Movies</Link></div>

                    </React.Fragment>
                  )}
                  <h3>Showing movies {totalCount} in the database</h3>
                  {/* <input type="text" className="form-control" id="moviewSearch" aria-describedby="emailHelp" placeholder="Search Movie" /> */}

                  <div className="row col-md-8 ">
                    <div className="col-md-3">
                      <SearchBox value={searchQuery} onChange={this.handleSearch} placeholder={"Search by Title"} /></div>
                    <div className="col-md-3">
                      <SearchBox value={searchGenre} onChange={this.handleSearchGenre} placeholder={"Search by Genre"} /></div>
                    <div className="col-md-3">
                      <SearchBox value={searchStock} onChange={this.handleSearchStock} placeholder={"Search by Stock"} /></div>
                    <div className="col-md-3">
                      <SearchBox value={searchRate} onChange={this.handleSearchRate} placeholder={"Search by Rate"} /></div>
                  </div>
                  <MoviesTable

                    movies={movies}
                    currentPage={currentPage}
                    sortColumn={sortColumn}
                    onDelete={this.handleDelete}
                    onLike={this.handleLike}
                    onSort={this.handleSort}
                    user={user}
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
