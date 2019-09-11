import React, { Component } from 'react';
import './tooltip.scss';


class Majatooltip extends Component {
    state = {
        displayTooltip: false
    }
    showTooltip = () => {
        this.setState({ displayTooltip: true })
        console.log('a');

    }

    hideTooltip = () => {
        this.setState({ displayTooltip: false })
        console.log('b');
    }

    render() {
        return (
            <div className='col-md-3 offset-md-4 my-4'>

                <span onMouseOver={this.showTooltip}>
                    <span className="my-4" style={{ position: 'relative' }} onMouseLeave={this.hideTooltip}>{this.state.displayTooltip && <div className={`tooltip-bubble tooltip-bottom`}>
                        <div className='tooltip-message'>{'Hello, I am a super cool tooltip'}</div>
                    </div>}</span>
                    Change to red</span>
            </div>

            // 
            /*  remove the tootip class from the span e.g className='tooltip'
            https://codepen.io/andrewerrico/pen/OjbvvW 
            */


        )
    }
}

export default Majatooltip;