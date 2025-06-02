import { gql, useQuery } from "@apollo/client";

const GET_ALL_USERS = gql`
  query GetAllUsers {
    findAllUsers {
      id
      name
      email
      role
      cellphone
    }
  }
`;

const GET_USER_TRAININGS = gql`
  query GetUserTrainings($userId: String!) {
    getUserById(userId: $userId) {
      id
      name
      routine {
        id
        name
        description
        trainings {
          id
          name
          description
        }
      }
    }
  }
`;

export const useStudentTrainings = (userId: string) => {
  const { data, loading, error, refetch } = useQuery(GET_USER_TRAININGS, {
    variables: { userId },
    fetchPolicy: "cache-first",
  });

  return {
    user: data?.getUserById,
    routines: data?.getUserById?.routine?.trainings || [],
    loading,
    error,
    refetch,
  };
};

export const useStudentData = () => {
  const { data, loading, refetch } = useQuery(GET_ALL_USERS);

  return {
    data,
    loading,
    refetch,
  };
};
