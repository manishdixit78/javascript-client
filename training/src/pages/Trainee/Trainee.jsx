import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import TraineeList from './TraineeList';
import TraineeDetail from './TraineeDetail';

function Trainee(props) {
  const { match: { path } } = props;
  return (
    <Switch>
      <Route exact path={path} component={TraineeList} />
      <Route exact path={`${path}/:traineeId`} component={TraineeDetail} />
    </Switch>
  );
}
Trainee.propTypes = {
  match: PropTypes.objectOf(PropTypes.object).isRequired,
};
export default Trainee;
