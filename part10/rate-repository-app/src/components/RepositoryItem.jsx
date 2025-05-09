import { View, StyleSheet, Image } from 'react-native';
import Text from './Text'
import theme from '../theme';

const styles = StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: 'white',
      borderRadius: 8,
      marginBottom: 3,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center', 
      marginBottom: 12,
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 10, 
      marginRight: 16, 
    },
    infoContainer: {
      flex: 1, 
    },
    languageShape: {
        marginTop: 8, 
        paddingVertical: 4, 
        paddingHorizontal: 12, 
        backgroundColor: theme.colors.primary, 
        borderRadius: 10, 
        alignSelf: 'flex-start', 
      },
      languageText: {
        color: 'white', 
        fontSize: theme.fontSizes.body, 
        fontWeight: theme.fontWeights.bold,
      },
    statsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between', 
      marginTop: 4, 
    },
    statItem: {
      alignItems: 'center', 
      flex: 1, 
    },
  });

  const formatThousands = (number) => {
    if (number >= 1000) {
      return (number / 1000).toFixed(1) + 'k'; 
    }
    return number.toString();
  };

  const RepositoryItem = (props) => {
    const { stargazersCount, forksCount, ratingAverage, description, fullName, reviewCount, language, ownerAvatarUrl } = props;
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Image source={{ uri: ownerAvatarUrl }} style={styles.avatar} />
          <View style={styles.infoContainer}>
            <Text color="textPrimary" fontSize="subheading" fontWeight="bold">
              {fullName}
            </Text>
            <Text color="textSecondary" style={{ marginTop: 5 }}>{description}</Text>
            <View style={styles.languageShape}>
              <Text style={styles.languageText}>{language}</Text>
            </View>
          </View>
        </View>
  
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text color="textPrimary" fontSize="subheading" fontWeight="bold">{formatThousands(stargazersCount)}</Text>
            <Text color="textSecondary">Stars</Text>
          </View>
          <View style={styles.statItem}>
            <Text color="textPrimary" fontSize="subheading" fontWeight="bold">{formatThousands(forksCount)}</Text>
            <Text color="textSecondary">Forks</Text>
          </View>
          <View style={styles.statItem}>
            <Text color="textPrimary" fontSize="subheading" fontWeight="bold">{reviewCount}</Text>
            <Text color="textSecondary">Reviews</Text>
          </View>
          <View style={styles.statItem}>
            <Text color="textPrimary" fontSize="subheading" fontWeight="bold">{ratingAverage}</Text>
            <Text color="textSecondary">Rating</Text>
          </View>
        </View>
      </View>
    );
  };
export default RepositoryItem