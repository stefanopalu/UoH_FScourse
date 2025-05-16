import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../graphql/queries';

const useUserReviews = (includeReviews = true ) => {
    const { data, loading, refetch } = useQuery(GET_CURRENT_USER, {
        variables: { includeReviews },
        fetchPolicy: 'cache-and-network',
    });

    const user = data?.me
    return { user, loading, refetch };
};

export default useUserReviews;