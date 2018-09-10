import React from 'react';
import PropTypes from 'prop-types';
import { Text, Header, Body, Icon, Left, Right, Thumbnail, Button } from 'native-base';
import { defaultUserImage, theme } from './../globals';
const { purple, white } = theme;

const ChatHeader = ({ recieverData, goBack, openFriendModalData }) => (
  <Header style={{ backgroundColor: purple }} >
    <Left>
      <Button transparent full onPress={goBack}>
        <Icon name="ios-arrow-back" type="Ionicons" />
      </Button>
    </Left>
    <Body>
      <Text children={recieverData.name} style={{ color: white, fontSize: 20 }} />
    </Body>
    <Right>
      <Button transparent full onPress={openFriendModalData}>
        <Thumbnail
          source={{ uri: recieverData.avatar ? recieverData.avatar : defaultUserImage }}
        />
      </Button>
    </Right>
  </Header>
)

ChatHeader.propTypes = {
  goBack: PropTypes.func,
  recieverData: PropTypes.object,
  openFriendModalData: PropTypes.func
}

export default ChatHeader;