import React from 'react';
import ReactDOM from 'react-dom';
import Api from '../Common/Api';
import InfiniteScroll from 'react-infinite-scroll-component';
import NewsItem from './NewsItem';

const style = {
    height: 30,
    border: "1px solid green",
    margin: 6,
    padding: 8
  };

const NUM_ITEMS_PAGE = 30;
const MAX_NUM_ITEMS = 500;


class NewsFeed extends React.Component {


    constructor() {
        super();

        this.state = {
            items: [],
            storyIds: [],
            endingIndex: 0,
            idsLoaded: false,
        };

        this.fetchMoreData = this.fetchMoreData.bind(this);
    }

    componentDidMount() {
        let startingIndex = 0;
        let endingIndex = startingIndex + NUM_ITEMS_PAGE;

        Api.getStoryIds(this.props.type)
            .then((storyIds) => {
                this.setState({storyIds: storyIds, idsLoaded: true});
                this.getData(startingIndex, endingIndex);
            })
        
    }

    getData(startingIndex, endingIndex){
        let actions = this.state.storyIds.slice(startingIndex, endingIndex).map(Api.getItem.bind(Api));
        // Resolve all the promises
        let results = Promise.all(actions);
        results.then(news =>
            {
                let newItems = this.state.items.concat(news);
                this.setState({items : newItems});
            });
    }

    fetchMoreData(){
        this.getData(this.state.items.length, this.state.items.length + NUM_ITEMS_PAGE);
    };

    render() {
        return (<InfiniteScroll
            className="newsFeed"
            dataLength={this.state.items.length}
            next={this.fetchMoreData}
            hasMore={this.state.items.length !== this.state.storyIds.length && this.state.idsLoaded}
            loader={<h4 style={{textAlign: 'center'}}>Loading...</h4>}
            endMessage={
                <p style={{textAlign: 'center'}}>
                  <b>You have reached the end of the internet</b>
                </p>
              }
          >
            {this.state.items.map((i, index) => (
              <NewsItem id={index} key={index} obj={i} />
            ))}
          </InfiniteScroll>)
    }
}

export default NewsFeed;