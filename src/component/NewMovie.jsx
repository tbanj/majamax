import React from 'react';
import { saveMovieApi } from "../services/movieService";
// import { serverMovies } from "../services/fakeMovieService.js";

import Form from './template/Form';
import Joi from 'joi-browser';
import Storage from "../localstorage/Storage";
import StorageGenre from "../localstorage/StoreGenre.js";
import { toast } from "react-toastify"

const getItem = new Storage();
const getGenreItem = new StorageGenre();
class NewMovie extends Form {
    state = {
        data: { title: '', genreId: '', numberInStock: 0, dailyRentalRate: 0 },
        errors: {},
        genres: [],
    };

    componentDidMount() {
        const data = getGenreItem.getItemsFromStorage();
        const genres = [{ _id: "", name: "" }, ...data];
        this.setState({ genres: genres });

    }

    schema = {
        title: Joi.string().required().label("Title"),
        genreId: Joi.string().required().min(1).label("Genre"),
        numberInStock: Joi.number().positive().required().label("Number in Stock"),
        dailyRentalRate: Joi.number().required().min(1).max(10).label("Rate"),

    };

    doSubmit = async () => {
        const { genres, data } = this.state;
        const findGenre = genres.find(m => m._id === this.state.data.genreId) || {};
        // below check if object is empty
        if (Object.getOwnPropertyNames(findGenre).length < 1) { console.log(findGenre); return; }
        else {

            try {
                const res = await saveMovieApi(data);
                console.log(res.data);
                toast.success(`new movie added ${data.title}`);
                this.props.history.push("/movies");
                getItem.storeItem(res.data);

            } catch (error) {
                if (error.response && error.response.status === 404)
                    toast.error('movie has being added before');
            }
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
                    {this.renderDropdown('genreId', 'Genre', genres)}

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