import { useParams } from 'react-router-native';
import { useRepository } from '../hooks/useRepositories';
import Text from './Text'
import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';
import { View, Pressable, Linking, StyleSheet, FlatList } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  buttonShape: {
      marginTop: 20,
      paddingVertical: 10,
      backgroundColor: theme.colors.primary,
      borderRadius: 8,
      justifyContent: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: theme.fontSizes.body,
      fontWeight: theme.fontWeights.bold,
      textAlign: 'center',
    },
    separator: {
        height: 10,
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryView = () => {
    const { id } = useParams();
    const { repository, loading } = useRepository(id);
    const reviews = repository?.reviews?.edges.map(edge => edge.node)
    console.log("all the reviews:", reviews)
    console.log(id)

    if (loading) return <Text>Loading...</Text>;

    return (
    <View>
      <RepositoryItem {...repository}>
        <Pressable
          style={styles.buttonShape}
          onPress={() => Linking.openURL(repository.url)}>
          <Text style={styles.buttonText}>Open in GitHub</Text>
        </Pressable>
      </RepositoryItem>
   
      <FlatList marginTop={10}
        data={reviews}
        keyExtractor={(item) => item.id.toString()} 
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <ReviewItem
            rating={item.rating}
            username={item.user.username} 
            text={item.text}
            createdAt={item.createdAt}
          />
        )}
      />
    </View>
  );
};

export default RepositoryView;