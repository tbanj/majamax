import React, { Component } from 'react';
import Navbar from './template/Navbar';
import Genres from './genres';
import { getGenres } from "../services/fakeGenreService";
// import _ from "lodash";


class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genres: getGenres(),
            selectedGenre: "",
            currentPage: 1,
        }
    }

    handleGenreSelected = genre => {
        this.setState({ selectedGenre: genre, currentPage: 1 });
    };

    componentDidMount() {
        // const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
        // this.setState({ genres: genres });
    }
    render() {
        const { genres } = this.state;

        return (
            <div>
                <Navbar />
                <div>Product Component</div>
                <div className="col-md-3">
                    <Genres allGenres={genres}
                        onItemSelect={this.handleGenreSelected}
                        selectedItem={this.state.selectedGenre} />
                </div>
            </div>
        );
    }
}


export default Product;