import React from 'react';
// import { getMovies } from "../services/fakeMovieService.js";
import { getGenres } from "../services/fakeGenreService";
import Storage from "../localstorage/Storage";

import FormEdit from './template/FormEdit.js';
import Joi from 'joi-browser';

const serverItemMovies = require('../services/fakeMovieService.js');
const getItem = new Storage();
class MoviesForm extends FormEdit {


    constructor(props) {
        super(props);
        this.state = {
            data: {
                title: '',
                genre: '',
                numberInStock: 0, dailyRentalRate: 0
            },

            errors: {},
            genres: [],
            genId: '',
        };

        const datas = JSON.parse(localStorage.getItem("movieItems"))
        const data = datas.find(m => m._id === this.props.match.params.id);
        if (!data) { this.props.history.push('/not-found'); return; }
    }

    schema = {
        _id: Joi.string().required(),
        title: Joi.string().required().label("Title"),
        genre: Joi.string().required().label("Genre"),
        numberInStock: Joi.number().positive().required().label("Number in Stock"),
        dailyRentalRate: Joi.number().required().min(1).max(10).label("Rate")
    };





    componentDidMount() {
        const genres = [...getGenres()];
        this.setState({ genres: genres });
        const datas = getItem.getItemsFromStorage();
        const data = datas.find(m => m._id === this.props.match.params.id);
        if (data) {
            const gen = genres.find(m => m.name === data.genre.name)
            const input = {
                _id: data._id,
                title: data.title,
                genre: data.genre.name,
                numberInStock: parseInt(data.numberInStock),
                dailyRentalRate: parseFloat(data.dailyRentalRate)
            };
            this.setState({ data: input, genId: gen._id });
            console.log(this.state.data);
        }
    }


    doSubmit = () => {
        // const username = this.username.current.value;
        console.log(this.state.data);
        const findGenre = getGenres().find(m => m.name === this.state.data.genre) || {};
        console.log(findGenre);
        // below check if object is empty
        if (Object.getOwnPropertyNames(findGenre) === 0) { console.log(findGenre); return; }
        else {


            const input = {
                _id: this.props.match.params.id,
                title: this.state.data.title,
                genre: { _id: findGenre._id, name: this.state.data.genre },
                numberInStock: parseInt(this.state.data.numberInStock),
                dailyRentalRate: parseFloat(this.state.data.dailyRentalRate).toFixed(1),
            };
            // serverItemMovies.saveMovie(input);
            // getItem.storeItem(input);
            getItem.updateItemStorage(input)
            this.props.history.push("/movies");
        }

    }

    render() {
        const { match, history } = this.props;
        const { data } = this.state;
        // console.log(movies);
        return (
            <div>
                <h1>Movie Form {match.params.id}</h1>
                <form onSubmit={this.handleSubmit} className="container-fluid col-md-4">
                    {this.renderInput('title', 'Title', 'text', true)}
                    {/* dropdown */}
                    {this.renderDropdown('genre', 'Genre')}

                    {this.renderInput('numberInStock', 'Number in Stock', 'number')}
                    {this.renderInput('dailyRentalRate', 'Rate', 'number')}

                    {/* submit button is implemented in Form.jsx */}
                    {this.renderButton('Save')}
                </form>

            </div>
        );
    }
}

export default MoviesForm;