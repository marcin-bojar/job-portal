import React from 'react';

import Icon from '../../components/icons/icon-index.component.js';

import './ad-highlight.styles.scss';

const AdHighlight = ({ children, icon }) => (
  <div className="highlight">
    <Icon name={icon} />
    <p className="highlight__text">{children}</p>
  </div>
);

export default AdHighlight;
