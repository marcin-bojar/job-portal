import React from 'react';

import { ReactComponent as Clock } from '../../assets/icons/clock.svg';

const SVG = ({ width }) => <Clock style={(width = { width })} />;

export default SVG;
