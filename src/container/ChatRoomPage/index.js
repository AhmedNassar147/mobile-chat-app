import React, { Component } from 'react';
import { KeyboardAvoidingView, Clipboard } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container } from 'native-base';
import { GiftedChat } from 'react-native-gifted-chat'
import { ChatHeader, FriendProfile, Spinner } from '../../component';
import firebase from '../../utilties/firebase';

const msgRef = firebase.database().ref('messages');

class ChatRoomPage extends Component {
  constructor(props) {
    super(props);
    console.ignoredYellowBox = ['Setting a timer']
    this.state = {
      messages: [],
      modalVisible: false,
    }
  }


  componentDidMount() {
    const { selectedUser, currentUserData } = this.props;
    const { id } = selectedUser;
    const messageKey = `${currentUserData.currentUserID}_${id}`;
    msgRef.child(messageKey).on('child_added', snapshot => {
      if (snapshot.exists()) {
        const modifiedMessages = { _id: snapshot.key, ...snapshot.val() };
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, modifiedMessages),
        }))
      }
    })
  }

  componentWillUnmount() {
    msgRef.off();
  }

  sendMessage = (message, id, currentUserID) => {
    const messageKey = `${currentUserID}_${id}`;
    for (let i = 0; i < message.length; i++) {
      return msgRef.child(messageKey).push().set({
        text: message[i].text,
        createdAt: Date.now(),
        user: message[i].user,
      })
    }
  }

  toggleModal = value => this.setState({ modalVisible: value });

  navigateBackToChats = () => this.props.navigation.goBack();

  deleteMessage = (msgId, msgKey) => {
    msgRef.child(msgKey).child(msgId).remove();
    let messages = this.state.messages;
    const messgaeIndex = messages.findIndex(message => message._id === msgId);
    messages.splice(messgaeIndex, 1);

    this.setState({
      messages: GiftedChat.append([], messages, inverted = false),
    })
  }

  onLongMessagePress = (context, message, currentUserID, id) => {
    const options = ['Copy Text', 'Cancel', 'Delete'];
    const cancelButtonIndex = 1;
    const deleteButtonIndex = 2;
    const msgKey = `${currentUserID}_${id}`;
    const { _id, text } = message;
    context.actionSheet().showActionSheetWithOptions({
      options,
      cancelButtonIndex,
      deleteButtonIndex
    },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            Clipboard.setString(text);
            break;
          case 2:
            this.deleteMessage(_id, msgKey)
            break;
        }
      });
  }

  render() {
    const { selectedUser, currentUserData } = this.props;
    const { currentUserID, name, avatar } = currentUserData;
    const { messages, modalVisible } = this.state;
    const { id } = selectedUser;

    return (
      <Container style={{ flex: 1 }}>
        <ChatHeader
          recieverData={selectedUser}
          goBack={this.navigateBackToChats}
          openFriendModalData={() => this.toggleModal(true)}
        />
        <GiftedChat
          messages={messages}
          isAnimated={true}
          renderLoading={() => <Spinner />}
          showUserAvatar
          showAvatarForEveryMessage
          renderAvatarOnTop
          keyboardShouldPersistTaps="never"
          onLongPress={(context, message) => this.onLongMessagePress(context, message, currentUserID, id)}
          onSend={message => this.sendMessage(message, id, currentUserID)}
          user={{ _id: currentUserID, name, avatar }}
        />
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={80} />

        <FriendProfile
          handlClose={() => this.toggleModal(false)}
          modalVisible={modalVisible}
          friendData={selectedUser}
        />
      </Container>
    )
  }
}

ChatRoomPage.propTypes = {
  navigation: PropTypes.object,
  selectedUser: PropTypes.object,
  currentUserData: PropTypes.object,
}

const mapStateToProps = state => {
  const newState = state.chat;
  return {
    selectedUser: newState.selectedUser,
    currentUserData: newState.user
  }
}

export default connect(mapStateToProps, {})(ChatRoomPage);