import React, { Component } from 'react';
import PropTypes from "prop-types";
class InterniaTable extends Component {
    state = {}
    render() {
        const { onEmployee } = this.props;
        return (
            <div className="col-12 ">
                <div className="card">
                    <div className="card-body" style={{ paddingTop: '0px' }}>


                        <div className="table-responsive">
                            <div id="add-contact" className="modal fade in" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                                            <h4 className="modal-title" id="myModalLabel">Add New Contact</h4> </div>
                                        <div className="modal-body">
                                            <div className="form-horizontal form-material">
                                                <div className="form-group">
                                                    <div className="col-md-12 m-b-20">
                                                        <input type="text" className="form-control" placeholder="Type name" /> </div>
                                                    <div className="col-md-12 m-b-20">
                                                        <input type="text" className="form-control" placeholder="Email" /> </div>
                                                    <div className="col-md-12 m-b-20">
                                                        <input type="text" className="form-control" placeholder="Phone" /> </div>
                                                    <div className="col-md-12 m-b-20">
                                                        <input type="text" className="form-control" placeholder="Designation" /> </div>
                                                    <div className="col-md-12 m-b-20">
                                                        <input type="text" className="form-control" placeholder="Age" /> </div>
                                                    <div className="col-md-12 m-b-20">
                                                        <input type="text" className="form-control" placeholder="Date of joining" /> </div>
                                                    <div className="col-md-12 m-b-20">
                                                        <input type="text" className="form-control" placeholder="Salary" /> </div>
                                                    <div className="col-md-12 m-b-20">
                                                        <div className="fileupload btn btn-danger btn-rounded waves-effect waves-light"><span><i className="ion-upload m-r-5"></i>Upload Contact Image</span>
                                                            <input type="file" className="upload" /> </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-info waves-effect" data-dismiss="modal">Save</button>
                                            <button type="button" className="btn btn-default waves-effect" data-dismiss="modal">Cancel</button>
                                        </div>
                                    </div>
                                    {/*  */}
                                    {/* /.modal-content */}
                                </div>
                                {/* /.modal-dialog */}
                            </div><table id="demo-foo-addrow" className="table m-t-30 table-hover contact-list footable-loaded footable" data-page-size="10">
                                <thead>
                                    <tr>
                                        <th className="footable-sortable"><div className="form-check-inline">
                                            <label className="form-check-label">
                                                <input type="checkbox" className="form-check-input" value=""
                                                    style={{
                                                        width: '30px',
                                                        height: '18px',
                                                        borderRadius: '30px'
                                                    }} />
                                            </label>
                                        </div></th>
                                        <th className="footable-sortable"><span className=""></span></th>
                                        <th className="footable-sortable">Employee <span className="fa fa-arrow-up"></span></th>
                                        <th className="footable-sortable">Salary <span className="fa fa-arrow-up"></span></th>
                                        <th className="footable-sortable">Status <span className="fa fa-arrow-up"></span></th>
                                        <th className="footable-sortable">Manage <span className="fa fa-arrow-up"></span></th>
                                        <th className="footable-sortable"></th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {onEmployee.length > 0 ? onEmployee.map((item, key) => (
                                        <tr key={key} className="footable-even" style={{}}>
                                            <td> <label className="form-check-label">
                                                <input type="checkbox" className="form-check-input mx-1" value=""
                                                    style={{
                                                        width: '30px',
                                                        height: '18px',
                                                        borderRadius: '30px'
                                                    }} />
                                            </label></td>
                                            <td>
                                                <div className="col-md-4"><img style={{ borderRadius: '50%' }} src={item.avatar_url} alt="user" width="60" className="img-circle" /></div>


                                            </td>

                                            <td>
                                                <div>
                                                    <div>
                                                        <span style={{ fontSize: '20px', fontWeight: 'bold' }}>{item.name.split(" ")[0]}</span>
                                                    </div>
                                                    <span style={{ color: '#999999' }}>{item.name.split(" ")[1]}</span></div>

                                            </td>

                                            <td><div>
                                                <div>
                                                    <span style={{ fontSize: '20px', fontWeight: 'bold' }}>{item.company} </span>
                                                    <span className="badge badge-danger"> {item.site_admin === false ? 'false' : 'true'}</span>
                                                </div>
                                                <span style={{ color: '#999999' }}>{item.location}</span></div></td>
                                            <td><div ><h4>{item.public_repos}</h4><span style={{ color: '#999999' }}>{item.followers}</span></div></td>
                                            <td style={{ fontSize: '2.5em' }}><span className="fa fa-pencil"></span> </td>
                                            <td style={{ fontSize: '2.5em' }}><span className="fa fa-trash-o"></span> </td>

                                        </tr>
                                    )) : <tr ><td className="footable-even colSpan-7">{this.props.dataError ? "No data found" : "please wait, data loading in progress"}</td></tr>}



                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>
            </div>


        );
    }
}

// using prop-types to check for types in react
// InterniaTable.propTypes = {
//     onEmployee: PropTypes.object.isRequired,

// };

export default InterniaTable;