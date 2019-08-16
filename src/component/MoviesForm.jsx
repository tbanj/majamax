import React from 'react';
import { saveMovieApi } from '../services/movieService.js';
import Storage from "../localstorage/Storage";
import StorageGenre from "../localstorage/StoreGenre.js";

import Form from './template/Form.jsx';
import Joi from 'joi-browser';
import { toast } from "react-toastify";

const getItem = new Storage();
const getGenreItem = new StorageGenre();
class MoviesForm extends Form {


    constructor(props) {
        super(props);
        this.state = {
            data: {
                title: '',
                genre: '',
                numberInStock: 0,
                dailyRentalRate: 0,
                liked: false,
            },

            errors: {},
            genres: [],
            genId: '',

        };
    }

    schema = {
        _id: Joi.string().required(),
        liked: Joi.boolean().default(),
        title: Joi.string().required().label("Title"),
        genreId: Joi.string().required().label("Genre"),
        numberInStock: Joi.number().positive().required().label("Number in Stock"),
        dailyRentalRate: Joi.number().required().min(1).max(10).label("Rate")
    };

    async componentDidMount() {
        const genres = getGenreItem.getItemsFromStorage();
        this.setState({ genres });
        const datas = getItem.getItemsFromStorage();
        const data = datas.find(m => m._id === this.props.match.params.id);
        if (data) {
            this.setState({ data: this.mapToView(data) });
        }

        if (!data) { this.props.history.replace('/not-found'); return; }
    }

    mapToView(data) {
        return {
            _id: data._id,
            title: data.title,
            genreId: data.genre._id,
            numberInStock: parseInt(data.numberInStock),
            dailyRentalRate: parseFloat(data.dailyRentalRate).toFixed(1),
            liked: data.liked
        }
    }

    doSubmit = async () => {
        const { genres, data } = this.state;
        const findGenre = genres.find(m => m._id === this.state.data.genre) || {};
        // below check if object is empty
        if (Object.getOwnPropertyNames(findGenre) === 0) return;
        else {
            const input = { ...data };
            delete input.liked;

            try {
                const res = await saveMovieApi(input);
                getItem.updateItemStorage({ ...res.data, "liked": data.liked });
                this.props.history.push("/dashboard/movies");
                toast.success(`movie ${input.title} updated successfully`);
            } catch (error) {
                if (error.response && error.response.status === 404)
                    toast.error(`movie ${input.title} has being added before`);
            }
        }

    }

    render() {
        return (
            <div>
                <h1 className="container-fluid col-md-4">Movie Review</h1>
                <form onSubmit={this.handleSubmit} className="container-fluid col-md-4">
                    {this.renderInput('title', 'Title', 'text', true)}
                    {/* dropdown */}
                    {this.renderDropdown('genreId', 'Genre')}

                    {this.renderInput('numberInStock', 'Number in Stock', 'number')}
                    {this.renderInput('dailyRentalRate', 'Rate', 'number')}

                    {/* submit button is implemented in Form.jsx */}
                    {this.renderButton('Save', `btn btn-primary`)}
                </form>

            </div>
        );
    }
}

export default MoviesForm;