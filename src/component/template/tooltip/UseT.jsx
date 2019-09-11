import React, { Component } from 'react';
import NewTes from './Majatooltip';
class UseT extends Component {
    state = {}
    render() {
        return (
            <div className='container'>
                <p>Here is a <NewTes message={'Hello, I am a super cool tooltip'} position={'bottom'}>tooltip</NewTes> on bottom.</p>
                <p>Here is a <NewTes message={'Hello, I am a super cool tooltip'} position={'right'}>tooltip</NewTes> on right.</p>
            </div>
        )
    }
}

export default UseT;