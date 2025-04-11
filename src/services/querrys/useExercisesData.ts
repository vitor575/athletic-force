import { gql, useQuery } from "@apollo/client";

export const EXERCISE_QUERY = gql`
  query getAllExercises {
    getAllExercises {
      id
      name
      muscleGroup
    }
  }
`;

export const useExercisesData = () => {
  const { data, loading, refetch } = useQuery(EXERCISE_QUERY, {
    fetchPolicy: "cache-first",
  });

  return { data, loading, refetch };
};
