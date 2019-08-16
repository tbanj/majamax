import React, { Component } from 'react';
import CheckTest from './CheckTest';
import './test.css';
class TestingA extends Component {
    constructor() {
        super()
        this.state = {
            showA: '',
            data: [{ id: 0, name: "item1", strenght: 10, age: 10 }, { id: 1, name: "item2", strenght: 11, age: 11 }, {
                id: 2,
                name: "item3",
                strenght: 12,
                age: 15
            }, { id: 3, name: "item4", strenght: 20, age: 25 }, { id: 4, name: "item5", strenght: 30, age: 55 }],
        };

    }

    toggle(index) {
        let element = document.getElementById(`${index}-modal`);
        element.classList.toggle('d-table');
    }


    render() {
        return (
            <ul className="list">
                {this.state.data.map((d, i) => {
                    return (
                        <li className="data-list">
                            <h6>{d.name}</h6>
                            <p>{d.age}</p>
                            <p>{d.strenght}/100</p>
                            <button onClick={() => this.toggle(i)} className="d-none">click Data</button>
                            <p id={`${i}-modal`} className="d-none">This is Modal</p>
                        </li>
                    );
                })
                }
            </ul >
        );
    }
}

export default TestingA;