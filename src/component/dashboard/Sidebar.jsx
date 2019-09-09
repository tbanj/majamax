import React, { Component } from 'react';
import { toast } from 'react-toastify';
import "./sidebar.css";
// let sidebarTab =[{id: 1, logourl: '/dashboard_assets/assets/images/users/5.jpg', name: 'Arena Sports'},
//                 {id: 2, logourl: '/dashboard_assets/assets/images/users/5.jpg', name: 'DSV'},
//                 {id: 3, logourl: '/dashboard_assets/assets/images/users/5.jpg', name: 'Seafood Mall'},
//                 {id: 1, logourl: '/dashboard_assets/assets/images/users/5.jpg', name: 'FireStar'},
//                 {id: 1, logourl: '/dashboard_assets/assets/images/users/5.jpg', name: 'Zeta Bank'},
//                 ];
class Sidebar extends Component {
    state = {}

    handleLogout = () => {
        window.location = "/logout";
    }

    render() {
        const { sendMargin, showSidebar } = this.props;
        return (
            <div className=" roundsidebar" >
                {showSidebar ?
                    <aside className={sendMargin} data-spy="scroll" data-target="sidebara" data-offset="20" style={{ borderRadius: '10px 10px 0px 0px', marginTop: '12%', marginBottom: '30px', backgroundColor: 'white', paddingTop: '0px', height: '20%' }}>
                        {/* Sidebar scroll */}
                        <div className="" style={{ marginTop: '10%', height: ' 500px', overflowX: 'hidden' }}>
                            {/* Sidebar navigation */}
                            <nav className="sidebar-nav " >
                                <ul id="sidebarnav " style={{ backgroundColor: 'transparent' }}>
                                    <li className="sidebar-item" style={{ backgroundColor: 'white' }}><div className="row mx-2"><div className="col-md-4 my-1"><img src="/dashboard_assets/assets/images/prop/logob.PNG"
                                        alt="user" width="60" className="img-circle" style={{ borderRadius: '50%' }} /></div><div className="col-md-8 my-4">
                                            <h6>All Inventory</h6></div></div></li>

                                    <li className="sidebar-item" style={{ backgroundColor: 'white', color: '#e5e5eb' }}><div className="row mx-2">DIRECTORY</div></li>


                                    <li className="sidebar-item addpointer">
                                        <div id="accordion">
                                            <div className="card" style={{ marginBottom: '0px', border: '0px' }}>
                                                <div className="" id="headingOne" style={{ borderBottom: '1px solid #edf1f5' }}>
                                                    <div className="" id="headingOne" style={{ borderBottom: '1px solid #edf1f5' }}><div className="row mx-2"><div className="col-md-4 my-1"><img src="/dashboard_assets/assets/images/prop/2a.PNG"
                                                        alt="user" width="60" className="img-circle" style={{ borderRadius: '50%' }} /></div><div className="col-md-8 my-3">
                                                            <a onClick={() => { toast(`under maintenance`); }}
                                                                data-toggle="collapse" data-target="#collapseOne"
                                                                aria-expanded="true" aria-controls="collapseOne">Customers</a></div></div>
                                                    </div>

                                                    <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                                                        <div className="card-body">
                                                            Anim pariatur cliche reprehenderit,
                                     </div>
                                                    </div>
                                                </div>
                                                <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                                                    <div className="card-body">
                                                        Anim pariatur cliche reprehenderit,
                                            </div>
                                                </div>
                                            </div></div>
                                    </li>


                                    <li className="sidebar-item addpointer">
                                        <div id="accordion">
                                            <div className="card" style={{ marginBottom: '0px', border: '0px' }}>
                                                <div className="" id="headingTwo" style={{ borderBottom: '1px solid #edf1f5' }}>
                                                    <div className="" id="headingTwo" style={{ borderBottom: '1px solid #edf1f5' }}><div className="row mx-2"><div className="col-md-4 my-1"><img src="/dashboard_assets/assets/images/prop/3a.PNG"
                                                        alt="user" width="60" className="img-circle" style={{ borderRadius: '50%' }} /></div><div className="col-md-8 my-4">
                                                            <a data-toggle="collapse" data-target="#collapseTwo" onClick={() => { toast(`under maintenance`); }}
                                                                aria-expanded="true" aria-controls="collapseTwo">Rentals</a></div></div>
                                                    </div>

                                                </div>

                                            </div></div>
                                    </li>


                                    <li className="sidebar-item addpointer">
                                        <div id="accordion">
                                            <div className="card" style={{ marginBottom: '0px', border: '0px' }}>
                                                <div className="" id="headingThree" style={{ borderBottom: '1px solid #edf1f5' }}>
                                                    <div className="" id="headingThree" style={{ borderBottom: '1px solid #edf1f5' }}><div className="row mx-2"><div className="col-md-4 my-1"><img src="/dashboard_assets/assets/images/prop/4a.PNG"
                                                        alt="user" width="60" className="img-circle" style={{ borderRadius: '50%' }} /></div><div className="col-md-8 my-3">
                                                            <a data-toggle="collapse" data-target="#collapseThree" onClick={() => { toast(`under maintenance`); }}
                                                                aria-expanded="true" aria-controls="collapseThree">Employee</a></div></div>
                                                    </div>


                                                </div>

                                            </div></div>
                                    </li>


                                    <li className="sidebar-item addpointer">
                                        <div id="accordion">
                                            <div className="card" style={{ marginBottom: '0px', border: '0px' }}>
                                                <div className="" id="headingFour" style={{ borderBottom: '1px solid #edf1f5' }}>
                                                    <div className="" id="headingFour" style={{ borderBottom: '1px solid #edf1f5' }}><div className="row mx-2"><div className="col-md-4 my-1"><img src="/dashboard_assets/assets/images/prop/5a.PNG"
                                                        alt="user" width="60" className="img-circle" style={{ borderRadius: '50%' }} /></div><div className="col-md-8 my-3">
                                                            <a data-toggle="collapse" data-target="#collapseFour" onClick={() => { toast(`under maintenance`); }}
                                                                aria-expanded="true" aria-controls="collapseFour">Clients</a></div></div>
                                                    </div>


                                                </div>

                                            </div></div>
                                    </li>









                                    <li className="sidebar-item" style={{ backgroundColor: 'white', color: '#e5e5eb' }}><div className="row mx-2">STATUS</div></li>



                                    <li className="sidebar-item addpointer" style={{ position: 'relative' }}>

                                        <div id="accordion">
                                            <div className="card" style={{ marginBottom: '0px', borderRadius: '0px 0px 10px 10px' }}>
                                                <div className="" id="headingSeven" style={{ borderBottom: '1px solid #edf1f5' }}>
                                                    <div className="" id="headingSeven" style={{ borderBottom: '1px solid #edf1f5', marginBottom: '10%', borderBottom: '0px ' }}><div className="row mx-2"><div className="col-md-4 my-1"><img src="/dashboard_assets/assets/images/prop/8a.PNG"
                                                        alt="user" width="60" className="img-circle" style={{ borderRadius: '50%' }} /></div><div className="col-md-8 my-3"><a
                                                            data-toggle="collapse" data-target="#collapseSeven" onClick={() => { toast(`under maintenance`); }}
                                                            aria-expanded="true" aria-controls="collapseSeven">Equipments</a></div></div>
                                                    </div>


                                                </div>

                                            </div></div>
                                        <button style={{
                                            color: 'white', borderRadius: '60px', backgroundColor: '#8454df',
                                            top: '-15px', left: '35px'
                                        }} type="button" onClick={this.handleLogout}
                                            className="btn btn-rounded btn-block col-md-8">Logout</button>
                                    </li>




                                </ul>
                            </nav>
                            {/* End Sidebar navigation */}
                        </div>
                        {/* End Sidebar scroll */}
                    </aside>
                    : ""}
            </div>
        );
    }
}

export default Sidebar;