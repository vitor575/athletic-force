import { gql } from "@apollo/client";

export const FINISH_TRAINING = gql`
  mutation finishTraining($trainingFinished: TrainingHistoryInput!) {
    finishTraining(trainingFinished: $trainingFinished) {
      status
      message
    }
  }
`;
