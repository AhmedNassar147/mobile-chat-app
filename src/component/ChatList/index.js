import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, Left, Text, Thumbnail, Body, Right, Button, Icon } from 'native-base';
import { defaultUserImage } from '../../globals';

const ChatListView = ({ dataSource, handleSelectUser, deleteUser, stillOnSearch }) => (
  <List
    enableEmptySections
    dataArray={dataSource}
    renderRow={({ id, avatar, name, phone, email }, index) => (
      <ListItem
        avatar
        button
        noIndent
        key={id || index}
        onPress={() => handleSelectUser(id, avatar, name, phone, email)}
      >
        <Left>
          <Thumbnail source={{ uri: avatar ? avatar : defaultUserImage }} />
        </Left>
        <Body style={{ paddingBottom: 20 }}>
          <Text children={name ? name : ''} />
          <Text children={email} />
        </Body>
        {stillOnSearch ? null : (
          <Right>
            <Button transparent full onPress={() => deleteUser(id)} >
              <Icon name="delete" color="red" type="MaterialIcons" />
            </Button>
          </Right>
        )}
      </ListItem>
    )}
  />
)

ChatListView.propTypes = {
  dataSource: PropTypes.array,
  handleSelectUser: PropTypes.func,
  deleteUser: PropTypes.func,
  stillOnSearch: PropTypes.bool
}

export default ChatListView;