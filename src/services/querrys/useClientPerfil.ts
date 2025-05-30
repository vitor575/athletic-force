// services/querrys/useClientPerfil.ts
import { gql, useQuery } from "@apollo/client";

// A query real
const ME_QUERY = gql`
  query Me {
    me {
      id
      name
      email
      address
      cellphone
      cpf
    }
  }
`;

export const useClientPerfil = () => {
  const { data, loading, error, refetch } = useQuery(ME_QUERY);

  return {
    client: data?.me,
    loading,
    error,
    refetch,
  };
};
