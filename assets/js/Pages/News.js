import React from 'react';
import ReactDOM from 'react-dom';

import Items from '../Components/Items';
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
                <div >
                    <NewsFeed className="container" type={this.props.type} />
                </div>
            </React.Fragment>);
    }
}

ReactDOM.render(<News {...window.REP_LOG_APP_PROPS} />, document.getElementById('root'));