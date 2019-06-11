import React from 'react';
import ReactDOM from 'react-dom';
import Comment from '../Components/Comment';
import Header from '../Components/Header';
import NewsItem from '../Components/NewsItem';
import Api from '../Common/Api';

class Item extends React.Component {
    constructor() {
        super();

        this.state = {
            item: {},
            loaded: false,
        };
    }

    componentDidMount() {
        Api.getItem(this.props.id)
            .then((item) => {
                this.setState({item, loaded: true});
            })
    }

    render() {
        let comments = '';
        let newsItem = 'Loading..'

        if(this.state.loaded){
            newsItem = (<NewsItem index={this.state.index} obj={this.state.item} />);
            if(typeof this.state.item.kids !== 'undefined' ){
                comments = (this.state.item.kids.map((kid) => <Comment key={kid} id={kid} />));
            } else {
                comments = (<h3 style={{textAlign: 'center'}}>There doesn't seem like there is anything here</h3>);
            }
        }

        return (
            <React.Fragment>
                <Header />
                <div className="container">
                    <div className="newsFeed">
                    {newsItem}
                    {comments}
                    </div>
                </div>
            </React.Fragment>);
    }
}

ReactDOM.render(<Item {...window.REP_LOG_APP_PROPS} />, document.getElementById('root'));