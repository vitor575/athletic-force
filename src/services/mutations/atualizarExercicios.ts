import { gql } from "@apollo/client";

export const EDIT_EXERCISE = gql`
  mutation EditExercise($id: String!, $name: String, $muscleGroup: String, $time: Int) {
    editExercise(id: $id, name: $name, muscleGroup: $muscleGroup, time: $time) {
      status
      message
    }
  }
`;
