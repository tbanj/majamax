
import React, { Component } from 'react';
import { Route } from "react-router-dom";
import { Link, Switch } from "react-router-dom";
import { toast } from 'react-toastify';
import { userDatas, github_token } from '../../services/userService.js'
import http from '../../services/httpService.js';
import Sidebar from './Sidebar.jsx';
import InterniaTable from './InterniaTable.jsx';
import Movies from '../Movies.jsx';
import ProtectedRoute from '../template/ProtectedRoute.jsx';
import NewMovie from '../NewMovie.jsx';
import MoviesForm from '../MoviesForm';
import NotFound from '../template/NotFound.jsx';
let removeWidth = { width: '50px' };
let removeAside = 'left-sidebar ';

class Internia extends Component {
    state = {
        removeWidth: '', show: true, removeAside: '', toggleCheck: true, employee: [], allData: []
    }



    componentDidMount() {
        this.getUserData();


    }



    getUserData = async () => {
        try {
            const employeed = await userDatas();
            let newList = [];
            let count = 0;
            employeed.forEach(async spreadlist => {
                const urlData = spreadlist['url'];
                let { data: userInfo } = await http.get(`${urlData}?access_token=${github_token}`);
                if (userInfo['bio'] !== null && userInfo['company'] !== null && count < 5) {
                    newList.push(userInfo);
                    // count++;
                }
                this.setState({ employee: newList });
            });

        }
        catch (error) {
            let dataError = "error encounter";
            this.setState({ dataError });
            console.log(error)
        }
    }

    handleSidebarToggle = () => {
        this.setState(prevState => { return { show: !prevState.show } });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.employee.length) {
        }
    }




    styleWidth = {

    }
    handleToggle = () => {
        this.setState({ toggleCheck: !this.state.toggleCheck });
        this.setState(prevState => { return { show: !prevState.show } });
        if (!this.state.toggleCheck) {
            removeWidth = { width: '50px' };
            removeAside = 'left-sidebar ';
        }
        else {
            removeWidth = { width: '50px' };
            removeAside = 'left-sidebar';
        }

    }
    render() {
        const { employee, showSidebar, show } = this.state;
        return (
            <React.Fragment >
                {/* <div className="preloader">
                    <div className="lds-ripple">
                        <div className="lds-pos"></div>
                        <div className="lds-pos"></div>
                    </div>
                </div> */}

                {/* <div className="preloader">
                    <div className="lds-ripple">
                        <div className=""></div>
                        <div className=""></div>
                    </div>
                </div> */}

                <div id="main-wrapper">
                    {/*  */}
                    <header className="topbar" data-navbarbg="skin6">
                        <nav className="navbar top-navbar navbar-expand-md navbar-light" style={{ backgroundColor: '#a6ab99' }}>
                            <div className="navbar-header border-right expand-logo" style={removeWidth} data-logobg="skin6">
                                {/* This is for the sidebar toggle which is visible on mobile only */}

                                <a onClick={this.handleSidebarToggle} className="nav-toggler waves-effect waves-light d-block d-md-none" href="javascript:void(0)"><i style={{ color: "black" }} className="font-18 fa fa-close"></i></a>
                                <Link className="navbar-brand" to="/">
                                    {/* Logo icon */}
                                    <b className="logo-icon">

                                        <img src="/dashboard_assets/assets/images/prop/ab1.PNG" alt="homepage" className="dark-logo" />

                                        <img src="/dashboard_assets/assets/images/prop/ab1.PNG" alt="homepage" className="light-logo" />
                                    </b>

                                    {this.state.show ? <span className="logo-text" >
                                        {/* dark Logo text */}
                                        <img src="/dashboard_assets/assets/images/logos/maja4min.PNG" alt="homepage" className="dark-logo" />
                                        {/* Light Logo text */}
                                        <img src="/dashboard_assets/assets/images/logos/maja4min.PNG" className="px-2 light-logo" alt="homepage" />
                                    </span> : ""}
                                </Link>


                                {/* ============================================================== */}
                                <span data-toggle="collapse" data-target="#navbarSupportedContent" > </span>
                                <a className="topbartoggler d-block d-md-none waves-effect waves-light"
                                    data-toggle="tooltip"
                                    title="" data-original-title="View more"
                                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><i
                                        className=" fa fa-angle-double-right"></i></a>
                            </div>

                            <div className="navbar-collapse collapse" id="navbarSupportedContent" data-navbarbg="skin6">
                                {/* ============================================================== */}
                                {/* toggle and nav items */}
                                {/* ============================================================== */}
                                <ul className="navbar-nav float-left mr-auto col-md-8 offset-md-2" >
                                    <li className="nav-item d-none d-md-block">
                                        <a className="nav-link sidebartoggler waves-effect waves-light" data-sidebartype="mini-sidebar"
                                            data-toggle="tooltip" data-original-title="Collapse">
                                            <i className="fa fa-bars font-18" onClick={this.handleToggle}></i></a>
                                        {/* <a class="btn btn-sm btn-secondary btn-circle waves-effect waves-light m-b-5" title="" data-toggle="tooltip"
                                         data-original-title="View application"><i class="fa fa-eye"></i> </a>*/}

                                    </li>




                                    {/* ----------------------- */}
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle waves-effect waves-dark" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Customers

                                        </a>
                                        <div className="dropdown-menu dropdown-menu-left mailbox animated bounceInDown">
                                            <span className="with-arrow"><span className="bg-primary"></span></span>

                                        </div>
                                    </li>

                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle waves-effect waves-dark" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Rentals

                                        </a>
                                        <div className="dropdown-menu dropdown-menu-left mailbox animated bounceInDown">
                                            <span className="with-arrow"><span className="bg-primary"></span></span>

                                        </div>
                                    </li>


                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle waves-effect waves-dark" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Employee

                                        </a>
                                        <div className="dropdown-menu dropdown-menu-left mailbox animated bounceInDown">
                                            <span className="with-arrow"><span className="bg-primary"></span></span>

                                        </div>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a disabled={true} className="nav-link dropdown-toggle waves-effect waves-dark" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Clients

                                        </a>
                                        <div className="dropdown-menu dropdown-menu-left mailbox animated bounceInDown">
                                            <span className="with-arrow"><span className="bg-primary"></span></span>

                                        </div>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link to="/" className="nav-link " aria-haspopup="true" aria-expanded="false"> Home

                                        </Link>

                                    </li>
                                    {/* ============================================================== */}
                                    {/* End Comment */}
                                    {/* ============================================================== */}
                                    {/* ============================================================== */}
                                    {/* mega menu */}
                                    {/* ============================================================== */}

                                    {/* ============================================================== */}
                                    {/* End mega menu */}
                                    {/* ============================================================== */}
                                </ul>
                                {/* ============================================================== */}
                                {/* Right side toggle and nav items */}
                                {/* ============================================================== */}
                                <ul className="navbar-nav float-right">

                                    {/* ============================================================== */}
                                    {/* User profile and search */}
                                    {/* ============================================================== */}


                                    {/* notification */}
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle waves-effect waves-dark" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i className="fa fa-bell-o"></i>

                                        </a>
                                        <div style={{ left: '-85px' }} className="dropdown-menu dropdown-menu-left mailbox animated bounceInDown">
                                            <span className="with-arrow"><span className="bg-primary"></span></span>
                                            <ul className="list-style-none">
                                                <li>
                                                    <div className="drop-title border-bottom">You have 3 new Tasks</div>
                                                </li>
                                                <li>
                                                    <div className="message-center notifications">
                                                        {/* Message */}
                                                        <a href="javascript:void(0)" className="message-item">
                                                            <span className="btn btn-danger btn-circle"><i className="fa fa-link"></i></span>
                                                            <span className="mail-contnet">
                                                                <h5 className="message-title">Luanch Admin</h5> <span className="mail-desc">Just see the my new admin!</span> <span className="time">9:30 AM</span> </span>
                                                        </a>
                                                        {/* Message */}
                                                        <a href="javascript:void(0)" className="message-item">
                                                            <span className="btn btn-success btn-circle"><i className="ti-calendar"></i></span>
                                                            <span className="mail-contnet">
                                                                <h5 className="message-title">Event today</h5> <span className="mail-desc">Just a reminder that you have event</span> <span className="time">9:10 AM</span> </span>
                                                        </a>
                                                        {/* Message */}
                                                        <a href="javascript:void(0)" className="message-item">
                                                            <span className="btn btn-info btn-circle"><i className="ti-settings"></i></span>
                                                            <span className="mail-contnet">
                                                                <h5 className="message-title">Settings</h5> <span className="mail-desc">You can customize this template as you want</span> <span className="time">9:08 AM</span> </span>
                                                        </a>
                                                        {/* Message */}
                                                        <a href="javascript:void(0)" className="message-item">
                                                            <span className="btn btn-primary btn-circle"><i className="ti-user"></i></span>
                                                            <span className="mail-contnet">
                                                                <h5 className="message-title">Pavan kumar</h5> <span className="mail-desc">Just see the my admin!</span> <span className="time">9:02 AM</span> </span>
                                                        </a>
                                                    </div>
                                                </li>
                                                <li>
                                                    <a className="nav-link text-center mb-1 text-dark" href="javascript:void(0);"> <strong>See all Tasks</strong> <i className="fa fa-angle-right"></i> </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>

                                    {/* ============================================================== */}
                                    {/* Messages */}
                                    {/* ============================================================== */}
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle waves-effect waves-dark" href="#" id="2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i className="font-18 fa fa-envelope-o"></i>

                                        </a>
                                        <div style={{ left: '-85px' }} className="dropdown-menu dropdown-menu-left mailbox animated bounceInDown" aria-labelledby="2">
                                            <ul className="list-style-none">
                                                <li>
                                                    <div className="drop-title border-bottom">You have 4 new messanges</div>
                                                </li>
                                                <li>
                                                    <div className="message-center message-body">
                                                        {/* Message */}
                                                        <a href="javascript:void(0)" className="message-item">
                                                            <span className="user-img"> <img src="/dashboard_assets/assets/images/users/1.jpg" alt="user" className="rounded-circle" /> <span className="profile-status online pull-right"></span> </span>
                                                            <span className="mail-contnet">
                                                                <h5 className="message-title">Pavan kumar</h5> <span className="mail-desc">Just see the my admin!</span> <span className="time">9:30 AM</span> </span>
                                                        </a>
                                                        {/* Message */}
                                                        <a href="javascript:void(0)" className="message-item">
                                                            <span className="user-img"> <img src="/dashboard_assets/assets/images/users/2.jpg" alt="user" className="rounded-circle" /> <span className="profile-status busy pull-right"></span> </span>
                                                            <span className="mail-contnet">
                                                                <h5 className="message-title">Sonu Nigam</h5> <span className="mail-desc">I've sung a song! See you at</span> <span className="time">9:10 AM</span> </span>
                                                        </a>
                                                        {/* Message */}
                                                        <a href="javascript:void(0)" className="message-item">
                                                            <span className="user-img"> <img src="/dashboard_assets/assets/images/users/3.jpg" alt="user" className="rounded-circle" /> <span className="profile-status away pull-right"></span> </span>
                                                            <span className="mail-contnet">
                                                                <h5 className="message-title">Arijit Sinh</h5> <span className="mail-desc">I am a singer!</span> <span className="time">9:08 AM</span> </span>
                                                        </a>
                                                        {/* Message */}
                                                        <a href="javascript:void(0)" className="message-item">
                                                            <span className="user-img"> <img src="/dashboard_assets/assets/images/users/4.jpg" alt="user" className="rounded-circle" /> <span className="profile-status offline pull-right"></span> </span>
                                                            <span className="mail-contnet">
                                                                <h5 className="message-title">Pavan kumar</h5> <span className="mail-desc">Just see the my admin!</span> <span className="time">9:02 AM</span> </span>
                                                        </a>
                                                    </div>
                                                </li>
                                                <li>
                                                    <a className="nav-link text-center link text-dark" href="javascript:void(0);"> <b>See all Notifications</b> <i className="fa fa-angle-right"></i> </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>


                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle waves-effect waves-dark" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <img src="/dashboard_assets/assets/images/users/wahab.jpeg" alt="user" className="rounded-circle" width="36" />
                                            <span className="ml-2 font-medium">Temitope</span><span className="fa fa-angle-down ml-2"></span>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right user-dd animated flipInY">
                                            <div className="d-flex no-block align-items-center p-3 mb-2 border-bottom">
                                                <div className=""><img src="/dashboard_assets/assets/images/users/wahab.jpeg" alt="user" className="rounded" width="80" /></div>
                                                <div className="ml-2">
                                                    <h4 className="mb-0">Alabi Temitope</h4>
                                                    <p className=" mb-0 text-muted">t.banji@rocketmail.com</p>
                                                    <a onClick={() => { toast(`under maintenance`); }} href="javascript:void(0)" className="btn btn-sm btn-danger text-white mt-2 btn-rounded" on>View Profile</a>
                                                </div>
                                            </div>
                                            <a onClick={() => { toast(`under maintenance`); }} className="dropdown-item" href="javascript:void(0)"><i className="ti-user mr-1 ml-1"></i> My Profile</a>
                                            <a onClick={() => { toast(`under maintenance`); }} className="dropdown-item" href="javascript:void(0)"><i className="ti-wallet mr-1 ml-1"></i> My Balance</a>
                                            <a onClick={() => { toast(`under maintenance`); }} className="dropdown-item" href="javascript:void(0)"><i className="ti-email mr-1 ml-1"></i> Inbox</a>
                                            <div onClick={() => { toast(`under maintenance`); }} className="dropdown-divider"></div>
                                            <a onClick={() => { toast(`under maintenance`); }} className="dropdown-item" href="javascript:void(0)"><i className="ti-settings mr-1 ml-1"></i> Account Setting</a>
                                            <div className="dropdown-divider"></div>
                                            <a className="dropdown-item" href="/logout"><i className="fa fa-power-off mr-1 ml-1"></i> Logout</a>
                                        </div>
                                    </li>
                                    {/* ============================================================== */}
                                    {/* User profile and search */}
                                    {/* ============================================================== */}
                                </ul>
                            </div>
                        </nav>
                    </header>
                    {/* ============================================================== */}
                    {/* End Topbar header */}
                    {/* ============================================================== */}
                    {/* ============================================================== */}
                    {/* Left Sidebar - style you can find in sidebar.scss  */}
                    {/* ============================================================== */}
                    <div className="my-5"></div>
                    <Sidebar sendMargin={removeAside} showSidebar={show} />
                    <div className="page-wrapper" style={{ margin: 0, backgroundColor: '#f6f5f8', display: 'block' }}>

                        <div className="clearfix mx-4 px-5">
                            <h2 className="float-left">Movie Inventory</h2>
                            <div className="float-right col-md-2"><button style={{ color: 'white', borderRadius: '60px', backgroundColor: '#0ec8af' }} type="button"
                                className="btn btn-rounded btn-block " onClick={() => { toast(`under maintenance`); }}>server movie</button></div>
                        </div>
                        {/* <div className="row">
                            <div className="col-lg-3 col-md-4 col-xs-12 align-self-center">
                                <h5 className="font-medium  mb-0">employee</h5>
                            </div>
                            <div className="col-lg-9 col-md-8 col-xs-12 align-self-center">


                            </div>
                        </div> */}
                        {/* <div className="container-fluid">
                            
                        </div> */}
                        <div className="page-wrapper px-5 offset-md-2 col-md-8" style={{ backgroundColor: 'transparent', display: 'block' }}>
                            {/* <InterniaTable onEmployee={employee} dataError={this.state.dataError} />
                            <Route path="/admin/users" component={InterniaTable} /> */}
                            {/* inline user protected route */}
                            <Switch>

                                <ProtectedRoute
                                    path="/dashboard/movies/:page/:id"
                                    component={MoviesForm} />
                                <ProtectedRoute
                                    path="/dashboard/movies/new"
                                    component={NewMovie} />
                                <Route path="/dashboard/movies" render={(props) => <Movies {...props} user={this.props.user} />} />

                                <Route path="/dashboard/nexted-api" render={(props) => <InterniaTable {...props} onEmployee={employee} dataError={this.state.dataError} />}
                                />
                                {/* <Redirect from="/dashboard" exact to="/dashboard/movies" /> */}
                                {/* <Route path="/not-found" component={NotFound} />
                                <Redirect to="/not-found" /> */}
                            </Switch>

                        </div>

                        <footer className="footer text-center">
                            All Rights Reserved by Alabi Temitope Wahab <a href="https://github.com/tbanj/"></a>.
                        </footer>

                    </div>

                </div>
            </React.Fragment>
        );
    }
}

export default Internia;