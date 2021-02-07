import { gql } from 'apollo-boost';

const DELETE_TRAINEE = gql`
mutation Deletetrainee($id: ID!) {
    deleteTrainee(payload: {id: $id} )
}
`;

export {
  DELETE_TRAINEE,
};
