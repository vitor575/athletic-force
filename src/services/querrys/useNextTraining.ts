import { gql, useQuery } from "@apollo/client";

const GET_MY_NEXT_TRAINING = gql`
query getMyNextTraining {
  getMyNextTraining {
    training {
      id
      name
      description
    }
  }
}
`;

export const useNextTraining = () => {
  const { data, loading, error, refetch } = useQuery(GET_MY_NEXT_TRAINING);

  return {
    nextTraining: data?.getMyNextTraining?.training,
    loading,
    error,
    refetch,
  };
};

