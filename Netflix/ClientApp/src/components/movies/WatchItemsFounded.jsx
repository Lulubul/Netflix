import React, { Component } from 'react';
import './WatchItemsFounded.css';
import { Container, Row, Button } from 'react-bootstrap';
import { HistoryAsync } from '../../resources/Api';
import { connect } from "react-redux";
import { Item } from '../shared/Item';
import { GO_BACK } from '../../constants/actionTypes';
import { WATCH_ITEM, UPDATE_SEARCH_INPUT } from '../../constants/actionTypes';

const mapStateToProps = state => ({ ...state.movies, ...state.common, ...state.profile });
const mapDispatchToProps = dispatch => ({
  goBack: () => dispatch({ type: GO_BACK }),
  onMovieSelected: watchingItemId => dispatch({ type: WATCH_ITEM, watchingItemId }),
  onUpdateSearchInput: (value) => dispatch({ type: UPDATE_SEARCH_INPUT, value }),
});

class WatchItemsFounded extends Component {

  onGoBackClick = () => {
    this.props.onUpdateSearchInput("");
    this.props.goBack();
  }

  onMovieSelected = (item) => {
    const {history} = this.props;
    let historyItemsIds = history.map((item) => item.watchingItemId);
    this.props.onUpdateSearchInput("");
    if (historyItemsIds.indexOf(item.id) < 0) {
      const historyItem = { 
        userId: this.props.userId,
        profileId: this.props.selectedProfile.id,
        releaseYear: item.releaseYear,
        genres: item.genres,
        watchingItemId: item.id,
        watchingItemType: "Movies"
      };
      HistoryAsync.post(historyItem).then(() => this.props.onMovieSelected(item.videoId));
    }
    else {
      this.props.onMovieSelected(item.videoId)
    }
  }

  render() {
    const { watchItems } = this.props;
    return (
      <div className="watchItems">
        <div>
          <Button variant="outline-success" onClick={() => this.onGoBackClick()}> back </Button> 
          <h1>Explore related titles</h1>
        </div>
        <Container  className="col-lg-12 col-md-12">
          <Row>
            {watchItems && watchItems.map((item, index) => (
              <Item onClick={() => this.onMovieSelected(item)} key={index} imageSource={item.image} />
            ))}
          </Row>
        </Container>
      </div>
    );
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WatchItemsFounded);