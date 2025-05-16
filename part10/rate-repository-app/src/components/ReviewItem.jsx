import { View, StyleSheet, Pressable, Alert } from 'react-native';
import Text from './Text'
import theme from '../theme';
import { format } from 'date-fns';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 16,
    backgroundColor: 'white',
  },
  contentContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  ratingContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  reviewContent: {
    flex: 1,
    flexDirection: 'column',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#d73a4a',
  },
  viewButton: {
    backgroundColor: theme.colors.primary,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

const ReviewItem = (props) => {
  const { rating, username, createdAt, text, showButtons = false, handleDelete, handleViewRepository } = props;
  const confirmDelete = () => {
    Alert.alert(
      'Delete Review',
      'Are you sure you want to delete this review?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: handleDelete },
      ]
    );
  };

  const formattedDate = format(new Date(createdAt), 'dd.MM.yyyy');

  return (
    <View style={styles.container}>
    <View style={styles.contentContainer}>
      <View style={styles.ratingContainer}>
        <Text color="primary" fontWeight="bold">{rating}</Text>
      </View>
      <View style={styles.reviewContent}>
        <Text fontWeight="bold">{username}</Text>
        <Text color="textSecondary">{formattedDate}</Text>
        <Text>{text}</Text>
      </View>
    </View>
    {showButtons && (
        <View style={styles.buttonRow}>
          <Pressable style={[styles.button, styles.deleteButton]} onPress={confirmDelete}>
            <Text style={styles.buttonText}>Delete</Text>
          </Pressable>
          <Pressable style={[styles.button, styles.viewButton]} onPress={handleViewRepository}>
            <Text style={styles.buttonText}>View Repository</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default ReviewItem;