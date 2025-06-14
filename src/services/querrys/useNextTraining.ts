import { gql, useQuery } from "@apollo/client";

const GET_MY_NEXT_TRAINING = gql`
  query GetMyNextTraining {
    getMyNextTraining {
      id
      name
      description
    }
  }
`;

export const useNextTraining = () => {
  const { data, loading, error, refetch } = useQuery(GET_MY_NEXT_TRAINING);

  return {
    nextTraining: data?.getMyNextTraining,
    loading,
    error,
    refetch,
  };
};
