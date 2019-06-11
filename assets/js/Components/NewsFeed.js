import React from 'react';
import ReactDOM from 'react-dom';
import Api from '../Common/Api';
import InfiniteScroll from 'react-infinite-scroll-component';
import NewsItem from './NewsItem';

// Number of items that will be displayed on a page
const NUM_ITEMS_PAGE = 30;

class NewsFeed extends React.Component {

    constructor() {
        super();

        this.state = {
            items: [],
            storyIds: [],
            idsLoaded: false,
            errors: false,
        };

        this.fetchMoreData = this.fetchMoreData.bind(this);
    }

    componentDidMount() {
        let startingIndex = 0;
        let endingIndex = startingIndex + NUM_ITEMS_PAGE;

        // Get story ids from the endpoint passed from PHP
        Api.getStoryIds(this.props.type)
            .then((storyIds) => {
                this.setState({storyIds: storyIds, idsLoaded: true});
                this.getData(startingIndex, endingIndex);
            })
            .catch(
                err => this.setState({errors: true})
            );
    }

    // Method to populate items from the story id array
    getData(startingIndex, endingIndex){
        // Get the Ids inbetween two indexes and map them to their item promis
        let actions = this.state.storyIds.slice(startingIndex, endingIndex).map(Api.getItem.bind(Api));
        // Resolve all the promises
        let results = Promise.all(actions);
        results.then(news =>
            {
                // Add new resolved items to the state
                let newItems = this.state.items.concat(news);
                this.setState({items : newItems});
            })
            .catch(
                err => this.setState({errors: true})
            );
    }

    // Method to be called to get next lot of items
    fetchMoreData(){
        this.getData(this.state.items.length, this.state.items.length + NUM_ITEMS_PAGE);
    };

    render() {
        if(this.errors){
            return (<h4 style={{textAlign: 'center'}}>Something has gone wrong</h4>)
        } else {
            return (
                <InfiniteScroll
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
                    <NewsItem key={index} obj={i} />
                    ))}
                </InfiniteScroll>)
        }
    }
}

export default NewsFeed;