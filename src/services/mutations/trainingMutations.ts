// src/services/mutations/createTrainingMutation.ts
import { gql } from "@apollo/client";

export const CREATE_TRAINING = gql`
  mutation CreateTraining($name: String!, $description: String!, $exerciseIds: [String!]!) {
    createTraining(name: $name, description: $description, exerciseIds: $exerciseIds) {
      status
      message
    }
  }
`;

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

export const DELETE_TRAINING = gql`
  mutation DeleteTraining($id: String!) {
    deleteTraining(id: $id) {
      status
      message
    }
  }
`;