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

const CREATE_SUB = gql`
subscription {
traineeAdded {
name
email
createdAt
originalId
_id
}
} 
`;
export { DELETED_TRAINEE_SUB, UPDATED_TRAINEE_SUB, CREATE_SUB };
