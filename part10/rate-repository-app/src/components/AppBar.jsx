import { View, StyleSheet, Pressable, Text, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native'
import { useQuery, useApolloClient } from '@apollo/client';
import { ME } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';


const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  scrollContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    minWidth: '100%',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

const AppBar = () => {
  const { data } = useQuery(ME);
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <View style={styles.scrollContent}>
          <Link to="/">
            <Text style={styles.text}>Repositories</Text>
          </Link>

          {data?.me ? (
            <>
              <Link to="/newreview">
                <Text style={styles.text}>Create a review</Text>
              </Link>
              <Link to="/userreviews">
                <Text style={styles.text}>My reviews</Text>
              </Link>
              <Pressable onPress={handleSignOut}>
                <Text style={styles.text}>Sign Out</Text>
              </Pressable>
            </>
          ) : (
            <>
              <Link to="/signin">
                <Text style={styles.text}>Sign In</Text>
              </Link>
              <Link to="/signup">
                <Text style={styles.text}>Sign Up</Text>
              </Link>
            </>
          )}
        </View>
      </ScrollView>
  </View>
  );
};

export default AppBar;