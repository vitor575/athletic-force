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
