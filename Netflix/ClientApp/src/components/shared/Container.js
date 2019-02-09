import React, { Component } from 'react'
import { Item } from './Item';
import './Container.css';

export const Direction = { Back : 1, Foward : -1 }

export class Container extends Component {

    stepSize = 1750;

    constructor(props) {
        super(props);
        this.state = { position: 0 };
    }
    
    goBack = (event) => {
        this.goToNextPosition(Direction.Back);
    }

    goNext = (event) => {
        this.goToNextPosition(Direction.Foward);
    }
    
    goToNextPosition(direction) {
        const nextPosition = this.state.position + direction * this.stepSize;
        this.setState({ position: nextPosition });
        console.log(this.state.position);
        document.getElementsByClassName("items")[0].style.transform = "translateX(" + nextPosition + "px)";
    }

    render() {
        const { title, items, size } = this.props;
        return (
            <div>
                <h2>{title}</h2>
                <div className="rowContainer">
                    <div className="handle handlePrev active" role="button" aria-label="See more titles" onClick={this.goBack}>
                        <b className="carousel-control-prev-icon"></b>
                    </div>
                    <div className="sliderMask">
                        <div className="items">
                            {items.map((item, index) => (<Item key={index} imageSource={item.image} size={size}></Item>))}
                        </div>
                    </div>
                    <div className="handle handleNext active" role="button" aria-label="See more titles" onClick={this.goNext}>
                        <b className="carousel-control-next-icon"></b>
                    </div>
                </div>
            </div>
        )
    }
}
