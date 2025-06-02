import { gql } from "@apollo/client";

export const ASSIGN_ROUTINE = gql`
  mutation AssignRoutineToUser($userId: String!, $routineId: String!) {
    assignTrainingRoutineToUser(userId: $userId, routineId: $routineId) {
      status
      message
    }
  }
`;
