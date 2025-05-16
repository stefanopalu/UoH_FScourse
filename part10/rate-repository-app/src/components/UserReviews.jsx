import useUserReviews from '../hooks/useUserReviews';
import useDeleteReview from '../hooks/useDeleteReview';
import Text from './Text'
import ReviewItem from './ReviewItem';
import { View, StyleSheet, FlatList } from 'react-native';
import theme from '../theme';
import { useNavigate } from 'react-router-native';

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

const UserReviews = () => {
    const { user, loading, refetch } = useUserReviews();
    const [deleteReview, result] = useDeleteReview();
    const navigate = useNavigate();

    const reviews = user?.reviews?.edges.map(edge => edge.node)
    
    console.log("User reviews", reviews)

    if (loading) return <Text>Loading..</Text>;

    const handleDelete = async (id) =>{
        await deleteReview ({ id });
        await refetch();
    };

    return (
    <View>
      <FlatList marginTop={10}
        data={reviews}
        keyExtractor={(item) => item.id.toString()} 
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <ReviewItem
            rating={item.rating}
            username={item.repository.fullName} 
            text={item.text}
            createdAt={item.createdAt}
            showButtons = {true}
            handleDelete={() => handleDelete(item.id)}
            handleViewRepository={() => navigate(`/repository/${item.repositoryId}`)}
          />
        )}
      />
    </View>
  );
};

export default UserReviews;