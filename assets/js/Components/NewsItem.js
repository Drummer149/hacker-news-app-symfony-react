import React from 'react';
import { getHostname, timeSince} from '../Common/Utils';

// Populates a NewsItem from a news object
const NewsItem = ({ obj }) => (
    <div className="newsItem">
      <div className="section">
        <span className="title"><a href={obj.url}>{obj.title}</a></span>
        <span className="websiteName"> {getHostname(obj.url)}</span>
      </div>
      <div className="section sublinks">
        <span>{obj.score} points</span>
        <span> by {obj.by}</span>
        <a href={`/item?id=${obj.id}`}><span> {timeSince(obj.time)} ago</span></a>
        <a href={`/item?id=${obj.id}`}><span> {obj.descendants} Comments</span></a>
      </div>
    </div>
);

export default NewsItem;