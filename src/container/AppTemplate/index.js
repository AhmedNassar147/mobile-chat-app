import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { ImagePicker } from 'expo';
import PropTypes from 'prop-types';
import { Container, Tab, Tabs, Icon, TabHeading, Content, View } from 'native-base';
import ChatListTab from '../ChatListTab';
import { UserProfile, Loader } from '../../component';
import firebase from '../../utilties/firebase';

const dbUsersRef = firebase.database().ref('users');

class AppTemplate extends Component {
  constructor(props) {
    super(props);
    console.ignoredYellowBox = ['Setting a timer']
    this.state = {
      nameText: true,
      phoneText: true,
      nextName: '',
      nextPhone: '',
      currentUser: {},
      errors: { name: '' },
    }
  }

  handleChangeState = (propName, value) => this.setState({ [propName]: value })

  async componentWillMount() {
    const user = await AsyncStorage.getItem('user')
    const { uid } = await JSON.parse(user)
    dbUsersRef.child(uid).once('value', snapshot => {
      const user = snapshot.val()
      this.handleChangeState('currentUser', user)
    })
  }


  handleUpdateCurentUserData = ({ id, valuePropName, value }) => {
    const curentuserRef = dbUsersRef.child(id);
    curentuserRef.update({ [valuePropName]: value });
    curentuserRef.on('child_changed', data => {
      const res = data.val();
      if (valuePropName === 'name') {
        this.handleChangeState('currentUser', { ...this.state.currentUser, name: res })
        return this.handleChangeState('nameText', true);
      }
      else if (valuePropName === 'phone') {
        this.handleChangeState('currentUser', { ...this.state.currentUser, phone: res })
        return this.handleChangeState('phoneText', true)
      }
    })
  }



  uploadImage = async (uri, id) => {
    const res = await fetch(uri);
    const blob = await res.blob();
    let ref = firebase.storage().ref(`images/${id}`);
    ref.put(blob).catch(() => alert('failed to upload your the image'))
      .then(() => ref.getDownloadURL().then(url => {
        this.handleChangeState('currentUser', { ...this.state.currentUser, avatar: url })
      }))
  }

  pickImage = async () => {
    const { id } = this.state.currentUser;
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      mediaTypes: "Images",
      base64: true,
      quality: 1
    });

    if (!result.cancelled) {
      this.uploadImage(result.uri, id);
    }
  }


  handleUpdateName = () => {
    this.handleChangeState('nameText', false)
    const { nextName, currentUser } = this.state;
    if (nextName.length < 4) {
      const error = 'name length should be more the 3 chars';
      this.handleChangeState('errors', { ...this.state.errors, name: error })
    }

    this.handleUpdateCurentUserData({
      id: currentUser.id,
      value: nextName,
      valuePropName: 'name'
    })
  }

  handleUpdatePhone = () => {
    this.handleChangeState('phoneText', false)
    const { nextPhone, currentUser } = this.state;
    if (isNaN(nextPhone)) {
      this.handleChangeState('errors', { ...this.state.errors, phone: 'phone length should be 11 chars' })
    }
    this.handleUpdateCurentUserData({
      id: currentUser.id,
      value: nextPhone,
      valuePropName: 'phone'
    })
  }

  renderTabHeading = (name, type) => (
    <TabHeading style={{ backgroundColor: '#CE93D8' }}>
      <Icon name={name} type={type} color="yellow" />
    </TabHeading>
  )

  componentWillUnmount() {
    dbUsersRef.off();
  }

  render() {
    const { nameText, phoneText, currentUser } = this.state;
    const { navigation } = this.props;
    if (Object.keys(currentUser).length < 1) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Loader />
        </View>
      )
    } else {
      return (
        <Container>
          <Content>
            <Tabs tabBarPosition="top">

              <Tab heading={this.renderTabHeading('users', 'Feather')}>
                <ChatListTab
                  navigation={navigation}
                  currentUserID={currentUser.id}
                  currentUserData={{
                    avatar: currentUser.avatar,
                    currentUserID: currentUser.id,
                    name: currentUser.name
                  }}
                />
              </Tab>

              <Tab heading={this.renderTabHeading('face-profile', 'MaterialCommunityIcons')}>
                <UserProfile
                  onUpdateImage={this.pickImage}
                  isNameText={nameText}
                  isPhoneNoText={phoneText}
                  currentUser={currentUser}
                  onUpdateName={this.handleUpdateName}
                  onUpdatePhone={this.handleUpdatePhone}
                  handleEditState={this.handleChangeState}
                />
              </Tab>

            </Tabs>
          </Content>
        </Container>
      )
    }
  }
}

AppTemplate.propTypes = {
  navigation: PropTypes.object
}

export default AppTemplate;