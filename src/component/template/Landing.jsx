import React from 'react';
import Joi from 'joi-browser';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { upcomingMovies, getUpcomingMovies } from "../../services/externalService.js";
import Form from './Form';
import './landing.css';
import { setTimeout } from 'timers';
let nowShowing = [
  { _id: 1, name: 'Fansa Kauna', duration: "119mins", rated: 'TBC', genre: "drama", genreId: '1 ', img: '/dashboard_assets/assets/images/kitchen_adventurer_caramel.JPG' },
  { _id: 2, name: 'Hobbs & Shaw', duration: "133mins", rated: "15", genre: "action", genreId: ' 2', img: '/dashboard_assets/assets/images/kitchen_adventurer_caramel.JPG' },
  { _id: 3, name: 'The Ten Virgins', duration: "109mins", rated: 'TBC', genre: "drama", genreId: '3', img: '/dashboard_assets/assets/images/kitchen_adventurer_caramel.JPG' },
  { _id: 4, name: 'Crawl', duration: "87mins", rated: '15', genre: "action", genreId: '4', img: '/dashboard_assets/assets/images/kitchen_adventurer_caramel.JPG' },
  { _id: 5, name: `Thank God I'm Funny(TGIF)`, duration: "84mins", rated: '12A', genre: "comedy", genreId: '5', img: '/dashboard_assets/assets/images/kitchen_adventurer_caramel.JPG' },
  { _id: 6, name: 'The Lion King', duration: "84mins", rated: '12A', genre: "adventure", genreId: '6', img: '/dashboard_assets/assets/images/kitchen_adventurer_caramel.JPG' }
]

class Landing extends Form {
  constructor() {
    super()
    this.state = {
      data: { genreId: '' }, errors: {}, cinemaList: [], renameCinemaList: {}, renameCinemaList2: {},
      cinemaListff: [], displayButton: 'd-none', isFetching: true, errorData: 'loading'
    }
  }

  toggle(index) {
    window.location = '/login';
  }

  getUpcomingMovie = async () => {
    try {
      let upcoming = await getUpcomingMovies();
      if (!upcoming) {
        this.setState({ errorData: 'check your network', cinemaList: [], isFetching: false });
        console.log("qeeq ", upcoming);
      } else {
        this.setState({ cinemaList: upcoming, isFetching: false });
        const renameCinemaList = upcoming[0];
        const renameCinemaList2 = upcoming[1];
        this.setState({ cinemaList: upcoming, renameCinemaList, renameCinemaList2, isFetching: false });
      }
    }
    catch (error) {
      console.log("ff ", error);
    }

  }

  componentDidMount() {
    this.getUpcomingMovie();
    // this.setState({ cinemaList: nowShowing });


  }

  componentDidUpdate(prevProps, prevState) {
    console.log("mmm ", this.state.cinemaListff);


  }




  schema = {
    genreId: Joi.string().required().min(1).label("Genre"),
  };



  handleSubmit = () => {
  }

  render() {
    const { cinemaList, displayButton, renameCinemaList, renameCinemaList2 } = this.state;
    console.log(renameCinemaList, renameCinemaList.background_img);


    return (<div className="" style={{ backgroundColor: 'white' }}>
      <div id="demo" className="carousel slide" data-ride="carousel">
        <ul className="carousel-indicators col-md-12">
          {/* <li data-target="#demo" data-slide-to="0" className="active"></li>
          <li data-target="#demo" data-slide-to="1"></li>
          <li data-target="#demo" data-slide-to="2"><button className="" >"0"</button></li> */}
          <li style={{ borderRadius: '100%', width: '10px', height: '10px' }}></li>
          <li style={{ borderRadius: '100%', width: '10px', height: '10px' }}></li>
          <li style={{ borderRadius: '100%', width: '10px', height: '10px' }}></li>
        </ul>
        <div className="carousel-inner col-md-12">
          {/* {cinemaList ? cinemaList.map((data, key) => (
            <div key={key} className="carousel-item active">
              <img src={data.img} alt="Upcoming Movie" width="100%" height="500" />
              <div className="carousel-caption">
                <h3>{data.duration}</h3>
                <p>{data.overview}</p>
              </div>
            </div>
          )) : <div>{this.state.cinemaList.length > 1 && this.state.isFetching === false ? "data-available" :
            <div>{this.state.errorData}<span className={this.state.isFetching === true ? "spinner-border text-primary" : ""}></span></div>}</div>} */}
          <div className="carousel-item active">
            <img src={`/dashboard_assets/assets/images/background/movie3.JPG`} alt="Chicago" width="100%" height="500" />
            <div className="carousel-caption">
              <h3>The Kitchen</h3>
              <p>{`2019-08-09`}</p>
              <p>An Irish mob story set in 1970s Hell's Kitchen. After the mobsters are sentenced to jail, their wives take their place — and do as good of a job, if not better.</p>
            </div>
          </div>
          {this.state.cinemaList.length > 1 && this.state.isFetching === false ? <React.Fragment>

            <div className="carousel-item">
              <img src={`/dashboard_assets/assets/images/background/movie2.JPG`} alt="New York" width="100%" height="500" />
              <div className="carousel-caption">
                <h3>{renameCinemaList.name}</h3>
                <p>{renameCinemaList.duration}</p>
                <p>{renameCinemaList.overview}</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src={`/dashboard_assets/assets/images/background/movie1.JPG`} alt="New York" width="100%" height="500" />
              <div className="carousel-caption">
                <h3>{renameCinemaList2.name}</h3>
                <p>{renameCinemaList2.duration}</p>
                <p>{renameCinemaList2.overview}</p>
              </div>
            </div>
          </React.Fragment> : ""}
        </div>
        <a className="carousel-control-prev" href="#demo" data-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </a>
        <a className="carousel-control-next" href="#demo" data-slide="next">
          <span className="carousel-control-next-icon"></span>
        </a>
      </div>
      <div className="container-fluid my-5">
        <div className="col-md-2 offset-md-5 card">

          <form onSubmit={this.handleSubmit} >
            {this.state.cinemaList.length > 1 && this.state.isFetching === false ? this.renderDropdownGeneral('genreId', 'Genre', cinemaList)
              : <span><i className={this.state.isFetching === true ? `spinner-border text-primary` : ""}></i></span>}
          </form>
        </div>

      </div>

      {/* table rows for list of movie currently showing */}
      <div className="row" >
        <div className="col-md-8 offset-md-2 col-sm-8 offset-sm-2 card" style={{ border: '0px transparent' }}>
          <div className="row" >
            <div className="col-md-2 mx-3" style={{ color: '#b329c2' }}>Now Showing</div>
            {/* onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} */}
            <div className="col-md-10 mx-3" ><div className="card" style={{ border: '0px transparent' }}>


              {<div>{this.state.cinemaList.length > 1 && this.state.isFetching === false ? cinemaList.map((data, key) => (

                <div key={key} className="row data-list mx-1 my-4" >

                  <div className={`col-md-4 col-sm-4`} >
                    <img style={{ borderRadius: '9px' }} className="card-img-bottom" src={data.img} alt="Card image cap" />
                  </div>
                  <div className="col-md-8 col-sm-8">
                    <div className="card-body ">
                      <div className={`float-right `}>
                        <button href="https://github.com/tbanj" onClick={() => this.toggle(key)} className="d-none btn btn-primary buttonCheck" style={{ backgroundColor: '#b329c2', color: '#FFFFFF' }}>Book Now</button></div>
                      <h4 className="card-title">{data.name}</h4>
                      <p className="card-text" style={{ color: '#b329c2', fontWeight: 'bold' }}>
                        {data.genre ? data.genre.map((genre, genrekey) => (
                          <span key={genrekey}>{` ${genre}, `}</span>
                        )) : <div>{data.genre.length > 1 && this.state.isFetching === false ? "data-available" :
                          <div>{this.state.errorData}<span><i className={this.state.isFetching === true ? `spinner-border text-primary` : ""}></i></span></div>}</div>}</p>


                      <p className="card-text" style={{ FONTFAMILY: 'SANS-SERIF', fontSize: '14px' }}>Release Date: {data.duration}</p>
                      <p className="card-text" style={{ FONTFAMILY: 'SANS-SERIF', fontSize: '14px' }}>{`Preview Ratings: ${data.rated}`}</p>
                      <p className="card-text" style={{ FONTFAMILY: 'SANS-SERIF', fontSize: '14px' }}>{`${data.overview}`}</p>
                      <p className="card-text" style={{ FONTFAMILY: 'SANS-SERIF', fontSize: '14px' }}>
                        <a data-toggle="tooltip" className="waves-effect waves-light"
                          title="" data-original-title="Watch video"><i id="playerIcon" className="fa fa-play" style={{ marginRight: '3px' }}></i> </a>WATCH TRAILER</p>

                    </div>
                  </div>
                </div>


              )) :
                <div>{`${this.state.errorData} `}<span><i className={this.state.isFetching === true ? `spinner-border text-primary` : ""}></i></span></div>}</div>}

            </div>
            </div>
          </div>

        </div>

      </div>

      {/* testing center */}

      {/* test end */}
    </div>);
  }
}

export default Landing;