import { gql } from "@apollo/client";

export const CREATE_ROUTINE = gql`
  mutation CreateRoutine(
    $name: String!
    $desc: String!
    $isActive: Boolean!
    $trainingIds: [String!]
  ) {
    createRoutine(
      name: $name
      desc: $desc
      isActive: $isActive
      trainingIds: $trainingIds
    ) {
      status
      message
    }
  }
`;

export const EDIT_ROUTINE = gql`
  mutation EditRoutine(
    $id: String!
    $name: String
    $desc: String
    $isActive: Boolean
    $trainingIds: [String]
  ) {
    editRoutine(
      id: $id
      name: $name
      desc: $desc
      isActive: $isActive
      trainingIds: $trainingIds
    ) {
      status
      message
    }
  }
`;

export const DEACTIVATE_ROUTINE = gql`
  mutation DeactivateRoutine($id: String!) {
    deactivatedRoutine(id: $id) {
      status
      message
    }
  }
`;
