// src/services/mutations/exerciseMutations.ts
import { gql } from "@apollo/client";

export const CREATE_EXERCISE = gql`
  mutation CreateExercise($name: String!, $muscleGroup: String!, $qtdSets: Int!, $time: Int) {
    createExercise(name: $name, muscleGroup: $muscleGroup, qtdSets: $qtdSets, time: $time) {
      status
      message
    }
  }
`;