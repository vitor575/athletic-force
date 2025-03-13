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

export const useStudentData = () => {
    const {data, loading, refetch } = useQuery(GET_ALL_USERS);

    return {
        data,
        loading,
        refetch
    }
}