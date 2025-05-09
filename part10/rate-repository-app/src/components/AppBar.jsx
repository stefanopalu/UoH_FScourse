import { View, StyleSheet, Pressable, Text, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native'

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

const onPressFunction = () => {
    console.log('Repositories pressed');
};

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <View style={styles.scrollContent}>
          <Link to="/">
            <Text style={styles.text}>Repositories</Text>
          </Link>
          <Link to="/signin">
            <Text style={styles.text}>Sign In</Text>
          </Link>
        </View>
      </ScrollView>
      
  </View>
  );
};

export default AppBar;