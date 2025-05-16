import { useMutation } from '@apollo/client'
import { useApolloClient } from '@apollo/client';
import { CREATE_USER, LOGIN } from '../graphql/mutations'
import useAuthStorage from './useAuthStorage';

const useSignUp = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(CREATE_USER);
  const [login] = useMutation(LOGIN)

  const signUp = async ({ username, password }) => {
     await mutate({
        variables: {
            user: {
                username,
                password
            }
        }
    });

    const { data } = await login({
        variables: {
            credentials: {
                username,
                password
            }
        }
    })

    console.log('Returned data:', data);
    console.log('Access token:', data.authenticate.accessToken);
    await authStorage.setAccessToken(data.authenticate.accessToken);
    apolloClient.resetStore();
    return data.authenticate;
  };

  return [signUp, result];
};

export default useSignUp;