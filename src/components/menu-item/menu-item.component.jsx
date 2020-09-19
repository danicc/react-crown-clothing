import React from 'react';
import { withRouter } from 'react-router-dom';

import './menu-item.styles.scss';

function MenuItem({
  title,
  imageUrl,
  size,
  linkUrl,
  location,
  history,
  match,
}) {
  return (
    <div
      className={`menu-item ${size}`}
      onClick={() => history.push(`${match.path}${linkUrl}`)}
    >
      <div
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className="content">
        <div className="title">{title.toUpperCase()}</div>
        <span className="subtitle">SHOP NOW</span>
      </div>
    </div>
  );
}

export default withRouter(MenuItem);
