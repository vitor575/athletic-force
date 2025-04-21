import { gql } from "@apollo/client";

export const CREATE_EXERCISE = gql`
  mutation CreateExercise(
    $name: String!
    $muscleGroup: String!
    $qtdSets: Int!
    $time: Int
  ) {
    createExercise(
      name: $name
      muscleGroup: $muscleGroup
      qtdSets: $qtdSets
      time: $time
    ) {
      status
      message
    }
  }
`;

export const EDIT_EXERCISE = gql`
  mutation EditExercise(
    $id: String!
    $name: String
    $muscleGroup: String
    $time: Int
  ) {
    editExercise(id: $id, name: $name, muscleGroup: $muscleGroup, time: $time) {
      status
      message
    }
  }
`;

export const DELETE_EXERCISE = gql`
  mutation DeleteExercise($id: String!) {
    deleteExercise(id: $id) {
      status
      message
    }
  }
`;
