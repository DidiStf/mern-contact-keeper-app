import classnames from 'classnames';
import React, { useContext } from 'react';

import AlertContext from '../../context/alert/alertContext';

const Alerts = () => {
  const { alerts } = useContext(AlertContext);

  return (
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div
        key={alert.id}
        className={classnames('alert', `alert-${alert.type}`)}>
        <i className='fas fa-info-circle' /> {alert.message}
      </div>
    ))
  );
};

export default Alerts;
