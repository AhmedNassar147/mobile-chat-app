import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Item, Button, Icon, Input } from 'native-base';
import Loader from './Loader';

const SearchBar = ({ searching, onSearch, searchChanged }) => (
  <View style={styles.searchContainer}>
    <Item>
      <Input placeholder="Search by phone" onChangeText={search => searchChanged(search)} />
      {searching ? <Loader /> : (
        <Button transparent onPress={onSearch}>
          <Icon name="search" style={{ fontSize: 30 }} />
        </Button>
      )}
    </Item>
  </View>
);

const styles = StyleSheet.create({
  searchContainer: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginHorizontal: 5,
    marginVertical: 10
  }
});

export default SearchBar;