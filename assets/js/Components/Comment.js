import React from 'react';
import ReactDOM from 'react-dom';
import Api from '../Common/Api';
import InfiniteScroll from 'react-infinite-scroll-component';
import NewsItem from './NewsItem';
import {getHostname, timeSince} from '../Common/Utils';

// Component to display a comment and any sub comments a comment may have
class Comment extends React.Component {

    constructor() {
        super();

        this.state = {
            comment: [],
            hide: false,
            loaded: false,
        };

        this.hideComment = this.hideComment.bind(this);
    }

    componentDidMount() {
        // Get comment from the id provided from the backend
        Api.getItem(this.props.id)
            .then((comment) => {
                this.setState({comment, loaded: true});
            })
    }

    // Method to hide the comment and all sub comments
    hideComment(){
        this.setState({hide : !this.state.hide});
    }

    render() {
        let content = '';
        let display = this.state.hide ? 'none' : 'block';
        let button = this.state.hide ? '+' : '-';

        // Once loaded populate the sub comments, if none return nothing
        if(this.state.loaded && typeof this.state.comment.kids !== 'undefined')
            content = this.state.comment.kids.map((kid) => <Comment key={kid} id={kid} />);
        else if(this.state.loaded && typeof this.state.comment.kids === 'undefined')
            content = '';

        return (<div className="comment">
                    <span>
                        <b>{this.state.comment.by}</b> 
                        {timeSince(this.state.comment.time)} ago 
                        <div className="commentToggle" onClick={this.hideComment}>[{button}]</div>
                    </span>
                    <div className="commentText" style={{display}} >
                        <div dangerouslySetInnerHTML={{__html: this.state.comment.text}} />
                        <div>
                            {content}
                        </div>
                    </div>
                </div>);
    }
}

export default Comment;