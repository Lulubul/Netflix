import React, { Component } from 'react'
import { Item } from './Item';
import './Container.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Direction = { Back : -1, Forward: 1 }

const NextButton = ({clickEvent}) => <div className="carousel-control right" role="button" onClick={() => clickEvent()}>
        <FontAwesomeIcon icon="angle-right"/>
    </div>;

const PreviousButton = ({clickEvent}) => <div className="carousel-control left" role="button" onClick={() => clickEvent()}>
        <FontAwesomeIcon icon="angle-left"/>
    </div>;

export class Container extends Component {

    constructor(props) {
        super(props);

        this.itemsRef = React.createRef();
        this.state = { position: 0, index: 0, stepSize: 1750, elementWidth: 0, containerSize: 1 };
    }

    componentWillMount() {
        this.updateWindowDimensions(this.props.items && this.props.items.length);
    }

    updateWindowDimensions = (elementCount) => {
        if (!elementCount) {
            return;
        }
        const elementWidth = 330;
        if (elementCount > 0) { 
            const stepSize = window.innerWidth - 120;
            const elementsInContainer = stepSize / elementWidth;
            const containerSize = Math.ceil(elementCount / elementsInContainer);
            this.setState({ ...stepSize, elementWidth, containerSize  });
        }
    }

    goBack = () => this.goToNextPosition(Direction.Back);
    goNext = () => this.goToNextPosition(Direction.Forward);
    hasNextButton = () => this.state.index < this.state.containerSize - 1;
    hasPreviousButton = () => this.state.index > 0;
    
    goToNextPosition = (direction) => {
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
                            {items && items.map((item, index) => (
                                <Link to="/watchingItem" key={index}>
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
