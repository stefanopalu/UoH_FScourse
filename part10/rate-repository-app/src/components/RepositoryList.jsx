import React from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { useRepositories } from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { Searchbar, Menu, Divider, PaperProvider } from 'react-native-paper';
import Text from './Text';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  headerContainer: {
    flexDirection: 'column',
    padding: 10,
  },
  criteriaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  triangleButton: {
    fontSize: 14,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
  state = { menuVisible: false };

  openMenu = () => this.setState({ menuVisible: true });
  closeMenu = () => this.setState({ menuVisible: false });

  handleOrderChange = (orderByValue, orderDirectionValue, label) => {
    this.props.setOrderBy(orderByValue);
    this.props.setOrderDirection(orderDirectionValue);
    this.props.setOrderLabel(label);
    this.closeMenu();
  };

  handlePress =(repositoryId) => {
    this.props.navigate(`/repository/${repositoryId}`)
  };

  renderHeader = () =>  {
    const { searchKeyword, setSearchKeyword, orderLabel } = this.props;
    const { menuVisible } = this.state;
    
  return (
    <View style={styles.headerContainer}>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchKeyword}
        value={searchKeyword}
        style={{ backgroundColor: 'white', borderRadius: 8 }}
        inputStyle={{color: 'black'}}
        placeholderTextColor="gray"
      />
      <View style={styles.criteriaContainer}>
      <Text color="primary" fontWeight="bold">{orderLabel}</Text>
        <Menu
          visible={menuVisible}
          onDismiss={this.closeMenu}
          contentStyle={{ backgroundColor: 'white' }}
          anchor={
            <Pressable onPress={this.openMenu}>
              <Text style={styles.triangleButton}>▼</Text>
            </Pressable>
          }
          >
          <Menu.Item onPress={() => this.handleOrderChange('CREATED_AT', 'DESC', 'Latest')} title="Latest repositories" />
          <Menu.Item onPress={() => this.handleOrderChange('RATING_AVERAGE', 'ASC', 'Lowest rated')} title="Lowest rated repositories" />
          <Menu.Item onPress={() => this.handleOrderChange('RATING_AVERAGE', 'DESC', 'Highest rated')} title="Highest rated repositories" />
          <Divider />
        </Menu>
      </View>
    </View>
    );
  };
  render() {
    const { repositories } = this.props;
    const repositoryNodes = repositories?.edges?.map(edge => edge.node) || [];

    return (
      <PaperProvider>
          <FlatList
              data={repositoryNodes}
              ItemSeparatorComponent={ItemSeparator}
              ListHeaderComponent={this.renderHeader}
              renderItem={({item}) => (
              <Pressable onPress={() => this.handlePress(item.id)}>
                <RepositoryItem 
                  fullName={item.fullName} 
                  description={item.description}
                  language={item.language}
                  forksCount={item.forksCount}
                  stargazersCount={item.stargazersCount}
                  ratingAverage={item.ratingAverage}
                  reviewCount={item.reviewCount}
                  ownerAvatarUrl={item.ownerAvatarUrl}
                />
              </Pressable>
            )}
          />
      </PaperProvider>
    );
  };
};

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const [orderDirection, setOrderDirection] = useState('DESC')
  const [orderLabel, setOrderLabel] = useState('Latest')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500)
  const { repositories } = useRepositories( orderBy, orderDirection, debouncedSearchKeyword);
  const navigate = useNavigate();

  return (
    <RepositoryListContainer 
      repositories={repositories} 
      setOrderBy={setOrderBy}
      setOrderDirection={setOrderDirection}
      orderLabel={orderLabel}
      setOrderLabel={setOrderLabel}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
      navigate={navigate}
    />
  );
};

export default RepositoryList;