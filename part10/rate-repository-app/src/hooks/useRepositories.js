import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES, GET_REPOSITORY } from '../graphql/queries';


const useRepositories = (orderBy, orderDirection, searchKeyword) => {
    const { data, error, loading } = useQuery(GET_REPOSITORIES, {
        variables: { orderBy, orderDirection, searchKeyword },
        fetchPolicy: 'cache-and-network',
    });

    const repositories = data?.repositories
    return { repositories , loading, error };
};

const useRepository = (id) => {
    const { data, error, loading } = useQuery(GET_REPOSITORY, {
        variables: { id },
        fetchPolicy: 'cache-and-network',
    });

    const repository = data?.repository
    return { repository , loading, error };
};

export { useRepositories, useRepository };
