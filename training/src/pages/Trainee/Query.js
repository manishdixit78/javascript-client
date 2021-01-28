import { gql } from 'apollo-boost';

const GET_TRAINEE = gql`
query GetTrainee($skip: Int, $limit:Int, $sort:String) {
  getAllTrainees(payload: { skip: $skip, limit: $limit, sort: $sort}) {
    status
    message
    TraineeCount
    record{
      name
      email
      createdAt
    }
    }
  }`;

export { GET_TRAINEE };
