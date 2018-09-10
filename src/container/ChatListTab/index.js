import React, { Component } from 'react';
import { Keyboard, View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ChatListView, SearchBar } from '../../component';
import firebase from '../../utilties/firebase';
import chatActions from '../../modules/Actions/chat';

const dataBase = firebase.database();
const dbUserRef = dataBase.ref('users');
const dbMessages = dataBase.ref('messages');

export class ChatListTab extends Component {
  constructor(props) {
    super(props)
    console.ignoredYellowBox = ['Setting a timer']
    this.state = {
      friends: [],
      searchValue: '',
      searching: false,
      searchResult: [],
      stillOnSearch: false
    }
  }


  async componentWillMount() {
    const { currentUserID } = await this.props;
    await dbMessages.on('child_added', snapshot => {
      if (snapshot.exists()) {
        const msgkey = snapshot.key;
        if (msgkey.includes(currentUserID)) {
          const curIdLength = currentUserID.length;
          const friendId = msgkey.substring(curIdLength + 1)
          dbUserRef.child(friendId).on('value', values => {
            this.setState({ friends: [...this.state.friends, values.val()] })
          })
          dbUserRef.off();
        } else {
          return false;
        }
      }
    })
  }

  componentDidMount() {
    const { currentUserID } = this.props;
    const getRemovedUserId = snapshot => {
      dbMessages.off()
      const msgKey = snapshot.key;
      if (msgKey.includes(currentUserID)) {
        const curIdLength = currentUserID.length;
        const friendId = msgKey.substring(curIdLength + 1)
        this.state.friends.map(({ id: usrId }, index) => {
          if (usrId === friendId) {
            let newFrinds = this.state.friends;
            newFrinds.splice(index, 1);
            this.setState({ friends: newFrinds })
          }
        })
      }
    }
    dbMessages.on('child_removed', snapshot => getRemovedUserId(snapshot))
  }

  handleSeletUser = async (id, avatar, name, phone) => {
    const { currentUserData, getSelectedUser, navigation } = this.props;
    if (id === currentUserData.currentUserID) return;
    else {
      getSelectedUser(currentUserData, { id, name, avatar, phone });
      this.setState({ searchResult: [], stillOnSearch: false, searchValue: '' });
      navigation.navigate('chatRoom');
    }
  }

  handleSeachChanged = value => {
    this.setState({
      searchValue: value,
      searching: false,
      searchResult: [],
      stillOnSearch: false
    });
  }

  onSearch = () => {
    const { searchValue } = this.state;
    this.setState({ searching: true });
    return dbUserRef.orderByChild('phone')
      .equalTo(searchValue).limitToFirst(60).on('child_added', snapshot => {
        const { name, email, id, avatar, phone } = snapshot.val();
        if (phone === searchValue) {
          Keyboard.dismiss()
          this.setState({
            searching: false,
            stillOnSearch: true,
            searchResult: [...this.state.searchResult, { name, email, id, avatar }],
          })
        } else return false;
      });
    dbUserRef.off()
  }

  deleteSelectedUser = id => {
    const { currentUserID } = this.props;
    const messagekey = `${currentUserID}_${id}`
    return dbMessages.child(messagekey).on('value', snapshot => {
      if (snapshot.exists()) {
        dbMessages.child(messagekey).remove().then(() => dbMessages.off())
      }
    })
  }

  componentWillUnmount() {
    dbMessages.off();
    dbUserRef.off()
  }

  render() {
    const { searching, friends, searchResult, stillOnSearch } = this.state;
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <SearchBar
          searching={searching}
          onSearch={this.onSearch}
          searchChanged={this.handleSeachChanged}
        />

        <ChatListView
          dataSource={searchResult.length > 0 ? searchResult : friends}
          handleSelectUser={this.handleSeletUser}
          deleteUser={this.deleteSelectedUser}
          stillOnSearch={stillOnSearch}
        />
      </View>
    )
  }
}

ChatListTab.propTypes = {
  currentUserID: PropTypes.string,
  getSelectedUser: PropTypes.func,
  navigation: PropTypes.object,
  currentUserData: PropTypes.object
}

const mapStateToProps = (state) => ({
  state
})

const mapDispatchToProps = dispatch => {
  return {
    getSelectedUser: (currentUserData, selecteduser) => dispatch(chatActions.getStartingChat(currentUserData, selecteduser))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatListTab);