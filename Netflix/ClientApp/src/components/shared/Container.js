import React, { Component } from 'react'
import { Item } from './Item';
import './Container.css';

export class Container extends Component {
    render() {
        const { title, items, size } = this.props;
        return (
            <div>
                <h2>{title}</h2>
                <div className="rowContainer row">
                    <div className="handle handlePrev active" role="button" aria-label="See more titles">
                        <b className="carousel-control-prev-icon"></b>
                    </div>
                    {items.map((item, index) => (<Item key={index} imageSource={item.image} size={size}></Item>))}
                    <div className="handle handleNext active" role="button" aria-label="See more titles">
                        <b className="carousel-control-next-icon"></b>
                    </div>
                </div>
            </div>
        )
    }
}
