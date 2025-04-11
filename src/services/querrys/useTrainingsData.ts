// src/services/GetData/useTrainingsData.ts
import { gql, useQuery } from "@apollo/client";

export const GET_ALL_TRAININGS = gql`
  query GetAllTrainings {
    getAllTrainings {
      id
      name
      description
      exercises {
        id
        name
        muscleGroup
      }
    }
  }
`;

export const useTrainingsData = () => {
  const { data, loading, refetch } = useQuery(GET_ALL_TRAININGS, {
    fetchPolicy: "cache-first",
  });

  return { data, loading, refetch };
};
