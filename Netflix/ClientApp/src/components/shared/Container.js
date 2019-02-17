import React, { Component } from 'react'
import { Item } from './Item';
import './Container.css';
import { Link } from 'react-router-dom';

export const Direction = { Back : -1, Forward: 1 }

const NextButton = ({clickEvent}) => <a className="carousel-control right" role="button" onClick={() => clickEvent()}>
        <span className="glyphicon glyphicon-chevron-right"></span>
    </a>;

const PreviousButton = ({clickEvent}) => <a className="carousel-control left" role="button" onClick={() => clickEvent()}>
        <span className="glyphicon glyphicon-chevron-left"></span>
    </a>;

export class Container extends Component {

    constructor(props) {
        super(props);

        this.itemsRef = React.createRef();
        this.state = { position: 0, index: 0, stepSize: 1750, elementWidth: 0, containerSize: 1 };
    }

    componentDidMount() {
        window.addEventListener('resize', () => this.updateWindowDimensions(this.props.items.length));
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions(this.props.items.length));
    }

    componentDidUpdate(prevProps) {
        if (prevProps.items.length < this.props.items.length) {
            this.updateWindowDimensions(this.props.items.length);
        }
    }

    updateWindowDimensions = (elementCount) => {
        const boxartContainer = document.getElementsByClassName('boxart-container')[0];
        if (elementCount > 0) { 
            const defaultWidth = 341;
            const elementWidth = boxartContainer.offsetWidth > 200 ? boxartContainer.offsetWidth : defaultWidth;
            const stepSize = window.innerWidth - 120;
            const elementsInContainer = stepSize / elementWidth;
            const containerSize = Math.ceil(elementCount / elementsInContainer);
            this.setState({ ...stepSize, elementWidth, containerSize  });
        }
    }

    goBack = (event) => {
        this.goToNextPosition(Direction.Back);
    }

    goNext = (event) => {
        this.goToNextPosition(Direction.Forward);
    }

    hasNextButton = () => {
        return this.state.index < this.state.containerSize - 1;
    }

    hasPreviousButton = () => {
        return this.state.index > 0;
    }
    
    goToNextPosition(direction) {
        const {index, position, stepSize} = this.state;
        const nextPosition = position - direction * stepSize;
        const nextIndex = index + direction;
        this.setState({ position: nextPosition, index: nextIndex });

        this.itemsRef.current.style.transform = "translateX(" + nextPosition + "px)";
    }

    render() {
        const { title, items, size } = this.props;
        return (
            <div>
                <div>
                    <h2>{title}</h2>
                    <ol className="carousel-indicators"></ol>
                </div>
                <div className="rowContainer">
                    <div className="handle handlePrev active">
                        {this.hasPreviousButton() ? <PreviousButton clickEvent={() => this.goBack()} /> : ""}
                    </div>
                    <div className="sliderMask">
                        <div className="items" ref={this.itemsRef}>
                            {items.map((item, index) => (
                                <Link to="/watchingItem">
                                    <Item key={index} imageSource={item.image} size={size} />
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="handle handleNext active">
                        {this.hasNextButton() ? <NextButton clickEvent={() => this.goNext()} /> : ""}
                    </div>
                </div>
            </div>
        )
    }
}
