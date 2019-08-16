import React from 'react';
import Joi from 'joi-browser';
import { Link } from 'react-router-dom';
import Form from './Form';
import './landing.css'
import CheckTest from './CheckTest';
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
      data: { genreId: '' },
      errors: {},
      cinemaList: [],
      displayButton: 'd-none',

    }


  }


  toggle(index) {
    // let element = document.getElementById(`${index}-modal`);
    // // element.classList.toggle('d-table');
    window.location = '/login';
  }


  componentDidMount() {
    this.setState({ cinemaList: nowShowing });

  }


  schema = {
    genreId: Joi.string().required().min(1).label("Genre"),
  };



  handleSubmit = () => {
  }

  render() {
    const { cinemaList, displayButton } = this.state;
    return (<div className="" style={{ backgroundColor: 'white' }}>
      <div id="demo" className="carousel slide" data-ride="carousel">
        <ul className="carousel-indicators col-md-12">
          {/* <li data-target="#demo" data-slide-to="0" className="active"></li>
          <li data-target="#demo" data-slide-to="1"></li>
          <li data-target="#demo" data-slide-to="2"></li> */}
          <li style={{ borderRadius: '100%', width: '10px', height: '10px' }}><button className="" >"0"</button></li>
          <li style={{ borderRadius: '100%', width: '10px', height: '10px' }}><button className="">"1</button></li>
          <li style={{ borderRadius: '100%', width: '10px', height: '10px' }}><button className="">"2"</button></li>
        </ul>
        <div className="carousel-inner col-md-12">
          <div className="carousel-item active">
            <img src="/dashboard_assets/assets/images/kitchen_adventurer_caramel.JPG" alt="Los Angeles" width="100%" height="500" />
            <div className="carousel-caption">
              <h3>Los Angeles</h3>
              <p>We had such a great time in LA!</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src="/dashboard_assets/assets/images/kitchen_adventurer_caramel.JPG" alt="Chicago" width="100%" height="500" />
            <div className="carousel-caption">
              <h3>Chicago</h3>
              <p>Thank you, Chicago!</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src="/dashboard_assets/assets/images/kitchen_adventurer_caramel.JPG" alt="New York" width="100%" height="500" />
            <div className="carousel-caption">
              <h3>New York</h3>
              <p>We love the Big Apple!</p>
            </div>
          </div>
        </div>
        <a className="carousel-control-prev" href="#demo" data-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </a>
        <a className="carousel-control-next" href="#demo" data-slide="next">
          <span className="carousel-control-next-icon"></span>
        </a>
      </div>
      <div className="row my-3">
        <div className="col-md-2 offset-md-5 card">

          <form onSubmit={this.handleSubmit} >
            {this.renderDropdownGeneral('genreId', 'Genre', cinemaList)}
          </form>
        </div>

      </div>

      {/* table rows for list of movie currently showing */}
      <div className="row" >
        <div className="col-md-8 offset-md-2 card" style={{ border: '0px transparent' }}>
          <div className="row" style={{ marginTop: '2%' }}>
            <div className="col-md-2" style={{ color: '#b329c2' }}>Now Showing</div>
            {/* onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} */}
            <div className="col-md-10" ><div className="card" style={{ border: '0px transparent' }}>


              {cinemaList.map((data, key) => (

                <div key={key} className="row data-list" style={{ marginBottom: '3%', height: '300px' }}>

                  <div className={`col-md-3 `} >
                    <img style={{ height: '100%', borderRadius: '9px' }} className="card-img-top img-responsive" src="/dashboard_assets/assets/images/kitchen_adventurer_caramel.JPG" alt="Card image cap" />
                  </div>
                  <div className="col-md-9">
                    <div className="card-body ">
                      <div className={`float-right `}>
                        <button href="https://github.com/tbanj" onClick={() => this.toggle(key)} className="d-none btn btn-primary buttonCheck" style={{ backgroundColor: '#b329c2', color: '#FFFFFF' }}>Book Now</button></div>
                      <p className="card-text" style={{ color: '#b329c2', fontWeight: 'bold' }}>{data.genre.toUpperCase()}</p>

                      <h4 className="card-title">{data.name}</h4>
                      <p className="card-text" style={{ FONTFAMILY: 'SANS-SERIF', fontSize: '14px' }}> {data.duration} | {`RATED ${data.rated}`}</p>
                      <p className="card-text" style={{ FONTFAMILY: 'SANS-SERIF', fontSize: '14px' }}>
                        <a data-toggle="tooltip" className="waves-effect waves-light"
                          title="" data-original-title="Watch video"><i id="playerIcon" className="fa fa-play" style={{ marginRight: '3px' }}></i> </a>WATCH TRAILER</p>

                    </div>
                  </div>
                </div>


              ))}
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