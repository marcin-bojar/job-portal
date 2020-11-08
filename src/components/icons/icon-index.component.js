import React from 'react';

import Truck from './truck-icon.component';
import Forklift from './forklift-icon.component';
import Warehouse from './warehouse-icon.component';
import Office from './office-icon.component';

const Icon = props => {
  switch (props.name) {
    case 'driver':
      return <Truck {...props} />;
    case 'forklift':
      return <Forklift width={'70%'} {...props} />;
    case 'warehouse':
      return <Warehouse width={'70%'} {...props} />;
    case 'office':
      return <Office width={'70%'} {...props} />;
    default:
      return null;
  }
};

export default Icon;
