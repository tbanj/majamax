import React from 'react';
import { getGenres } from "../services/fakeGenreService";
// import { serverMovies } from "../services/fakeMovieService.js";

import Form from './template/Form';
import Joi from 'joi-browser';
import Storage from "../localstorage/Storage";



const serverItemMovies = require('../services/fakeMovieService.js');


const getItem = new Storage();
class NewMovie extends Form {
    state = {
        data: { title: '', gen: '', numberInStock: 0, dailyRentalRate: 0 },
        errors: {},
        genres: [],
    };

    componentDidMount() {
        const genres = [{ _id: "", name: "" }, ...getGenres()];
        this.setState({ genres: genres });

    }

    schema = {
        title: Joi.string().required().label("Title"),
        gen: Joi.string().required().min(1).label("Genre"),
        numberInStock: Joi.number().positive().required().label("Number in Stock"),
        dailyRentalRate: Joi.number().required().min(1).max(10).label("Rate")
    };




    doSubmit = () => {
        // const username = this.username.current.value;
        const findGenre = getGenres().find(m => m._id === this.state.data.gen) || {};

        // below check if object is empty
        if (Object.getOwnPropertyNames(findGenre).length < 1) { console.log(findGenre); return; }
        else {


            const input = {

                title: this.state.data.title,
                genre: { _id: this.state.data.gen, name: findGenre.name },
                numberInStock: parseInt(this.state.data.numberInStock),
                dailyRentalRate: parseFloat(this.state.data.dailyRentalRate)
            };

            serverItemMovies.saveMovie(input);
            getItem.storeItem(serverItemMovies.getMovies());
            this.props.history.push("/movies");
        }

    }


    render() {
        const { genres } = this.state;
        return (
            <div> <h1>
                Movie Form
            </h1>
                <form onSubmit={this.handleSubmit} className="container-fluid col-md-4">
                    {this.renderInput('title', 'Title', 'text', true)}
                    {/* dropdown */}
                    {this.renderDropdown('gen', 'Genre', genres)}

                    {this.renderInput('numberInStock', 'Number in Stock', 'number')}
                    {this.renderInput('dailyRentalRate', 'Rate', 'number')}

                    {/* submit button is implemented in Form.jsx */}
                    {this.renderButton('Save')}
                </form>
            </div>
        );
    }
}

export default NewMovie
    ;