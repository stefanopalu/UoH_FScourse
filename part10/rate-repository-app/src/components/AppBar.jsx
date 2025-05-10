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
    padding: 20,
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
    fontSize: 16,
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
            <Pressable onPress={handleSignOut}>
              <Text style={styles.text}>Sign Out</Text>
            </Pressable>
          ) : (
          <Link to="/signin">
            <Text style={styles.text}>Sign In</Text>
          </Link>
          )}
        </View>
      </ScrollView>
  </View>
  );
};

export default AppBar;