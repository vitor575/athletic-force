// src/services/querrys/useRoutinesData.ts
import { gql, useQuery } from "@apollo/client";

const ROUTINES_QUERY = gql`
  query getAllRoutines {
    getAllRoutines {
      id
      name
      description
      isActive
      trainings {
        id
        name
      }
    }
  }
`;

export const useRoutinesData = () => {
  const { data, loading, refetch } = useQuery(ROUTINES_QUERY, {
    fetchPolicy: "cache-first",
  });
  return {
    routines: data?.getAllRoutines || [],
    loading,
    refetch,
  };
};
