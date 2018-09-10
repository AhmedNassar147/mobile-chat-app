import React from 'react';
import { Modal, View } from 'react-native';
import PropTypes from 'prop-types';
import AppGradient from './AppGradient';
import { Card, CardItem, Body, Left, Thumbnail, Text, Icon, Button } from 'native-base';
import { defaultUserImage } from '../globals';

const FriendProfile = ({ modalVisible, handlClose, friendData }) => {
  const { name, avatar, phone } = friendData;
  return (
    <View style={{ marginTop: 22 }}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={handlClose}
      >
        <AppGradient style={{ minHeight: '96%', flex: 1, paddingTop: '4%', paddingHorizontal: 10 }} >
          <Card style={{ minHeight: '60%' }}>
            <CardItem>
              <Left>
                <Button transparent full onPress={handlClose}>
                  <Icon name="ios-arrow-back" type="Ionicons" style={{ fontSize: 30 }} />
                </Button>
              </Left>
            </CardItem>

            <CardItem>
              <Body style={{ height: 75 }}>
                <Thumbnail
                  style={{ alignSelf: 'center', height: '100%' }}
                  large
                  source={{ uri: avatar ? avatar : defaultUserImage }}
                />
              </Body>
            </CardItem>

            <CardItem>
              <Left>
                <Text children="Name" />
              </Left>
              <Body>
                <Text children={name} />
              </Body>
            </CardItem>

            <CardItem>
              <Left>
                <Text children="Phone" />
              </Left>
              <Body>
                <Text children={phone} />
              </Body>
            </CardItem>
          </Card>
        </AppGradient>
      </Modal>
    </View>
  )
}

FriendProfile.propTypes = {
  modalVisible: PropTypes.bool,
  handlClose: PropTypes.func,
  friendData: PropTypes.object
}
export default FriendProfile;