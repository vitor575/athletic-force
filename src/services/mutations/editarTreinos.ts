import { gql } from "@apollo/client";

export const EDIT_TRAINING = gql`
  mutation EditTraining(
    $id: String!
    $name: String
    $description: String
    $exerciseIds: [String]
  ) {
    editTraining(
      id: $id
      name: $name
      description: $description
      exerciseIds: $exerciseIds
    ) {
      status
      message
    }
  }
`;
