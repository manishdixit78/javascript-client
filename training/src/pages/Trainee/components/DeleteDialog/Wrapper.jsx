/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Mutation } from '@apollo/react-components';
import { DELETE_TRAINEE } from './mutation';

import DeleteDialog from './DeleteDialog';

export default class Wrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const prop = this.props;
    return (
      <Mutation mutation={DELETE_TRAINEE}>
        {(deleteTrainee) => (
          <>
            <DeleteDialog deleteTrainee={deleteTrainee} {...prop} />
          </>
        )}
      </Mutation>
    );
  }
}
