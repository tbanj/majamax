import React, { Component } from 'react';
import './test.css'
class CheckTest extends Component {
    toggle(index) {
        let element = document.getElementById(`${index}-modal`);
        element.classList.toggle('d-table');
    }
    render() {
        const { name, age, strenght, index } = this.props;
        return (
            <div>
                <li className="data-list">
                    <h6>{name}</h6>
                    <p>{age}</p>
                    <p>{strenght}/100</p>
                    <button onClick={() => this.toggle(index)} className="d-none">click Data</button>
                    <p id={`${index}-modal`} className="d-none">This is Modal</p>
                </li>
            </div>
        );
    }
}

export default CheckTest;