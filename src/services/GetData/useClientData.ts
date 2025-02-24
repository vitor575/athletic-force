import { gql, useQuery } from "@apollo/client";

const ME_QUERY = gql`
    query Me {
      me{
        id
        name
        email
        role
      }
    }
  `;

export const useClientData = () => {
    const {data, loading, refetch } = useQuery(ME_QUERY);

    return {
        client: data?.me,
        loading,
        refetch
    }
}