import { gql } from 'apollo-boost';

const UPDATED_TRAINEE_SUB = gql`
subscription {
  traineeUpdated{
    name,
    originalId,
    email
  }
  }
`;

const DELETED_TRAINEE_SUB = gql`
subscription {
  traineeDeleted{
    status
    message
    data{
      name
      originalId
      email
    }
  }
}
`;
export { DELETED_TRAINEE_SUB, UPDATED_TRAINEE_SUB };
