import { gql, useQuery } from "@apollo/client";

export const GET_MY_NEXT_TRAINING = gql`
query getMyNextTraining {
  getMyNextTraining {
    training {
      id
      name
      description
      exercises {
        id
        name
        muscleGroup
        qtdSets
        qtdReps
        time
      }
    }
  }
}
`;

export const useNextTraining = () => {
  const { data, loading, error, refetch } = useQuery(GET_MY_NEXT_TRAINING, {
    fetchPolicy: "cache-first",
  });

  return {
    nextTraining: data?.getMyNextTraining?.training,
    loading,
    error,
    refetch,
  };
};

