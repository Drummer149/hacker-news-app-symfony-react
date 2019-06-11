import React from 'react';
import ReactDOM from 'react-dom';

import Header from '../Components/Header';
import NewsFeed from '../Components/NewsFeed';
import Api from '../Common/Api';

class News extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
    }

    render() {
        return (
            <React.Fragment>
                <Header />
                <NewsFeed type={this.props.type} />
            </React.Fragment>);
    }
}

ReactDOM.render(<News {...window.REP_LOG_APP_PROPS} />, document.getElementById('root'));