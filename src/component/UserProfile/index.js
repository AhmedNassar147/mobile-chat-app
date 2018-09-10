import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardItem, Form, Body, Right, Left, Icon, Thumbnail, Button, Text, Spinner, Input, Item } from 'native-base';
import { defaultUserImage } from '../../globals';

const RenderIcon = ({ isTextChanged, changeLayout }) => {
  let iconName = 'mode-edit';
  if (isTextChanged) {
    iconName = 'send';
  }
  return (
    <Button onPress={changeLayout} transparent>
      <Icon name={iconName} type="MaterialIcons" color='#CE93D8' />
    </Button>
  )
}

const RenderCloseIcon = ({ changeLayout }) => (
  <Button onPress={changeLayout} transparent>
    <Icon name="md-close" type="Ionicons" color='#CE93D8' />
  </Button>
);

const RenderProfileField = ({ isText, text, handleChange, onCloseIcon, placeholder, textContentType, onUpdate }) => (
  <CardItem>
    <Item>
      {isText ? null : (
        <Left>
          <RenderCloseIcon changeLayout={onCloseIcon} />
        </Left>
      )}
      <Body>
        {isText ? <Text children={text} style={{ textAlign: 'left' }} /> : (
          <Input
            placeholder={placeholder}
            textContentType={textContentType}
            onChangeText={handleChange}
            style={{ width: '100%' }}
          />
        )}
      </Body>
      <Right>
        <RenderIcon isTextChanged={!isText} changeLayout={onUpdate} />
      </Right>
    </Item>
  </CardItem>
)

const UserProfile = ({ onUpdateImage, isNameText, currentUser, onUpdateName, onUpdatePhone, isPhoneNoText, handleEditState }) => {
  if (Object.keys(currentUser).length < 1) {
    return <Spinner color="red" size="large" />
  }
  const { email, name, phone, avatar } = currentUser;
  return (
    <Form style={{ marginBottom: 10, height: '100%', padding: 20 }}>
      <Card style={{ borderRadius: 4, paddingBottom: 30 }}>

        <CardItem header>
          <Body style={{ height: 100 }} >
            <Button transparent onPress={() => onUpdateImage()} style={{ alignSelf: 'center', height: '100%' }}>
              <Thumbnail large source={{ uri: avatar ? avatar : defaultUserImage }} />
            </Button>
          </Body>
        </CardItem>

        <RenderProfileField
          isText={isNameText}
          text={name}
          placeholder="Name"
          handleChange={name => handleEditState('nextName', name)}
          onCloseIcon={() => handleEditState('nameText', true)}
          textContentType="name"
          onUpdate={onUpdateName}
        />

        <RenderProfileField
          isText={isPhoneNoText}
          text={phone}
          placeholder="Phone No"
          handleChange={phone => handleEditState('nextPhone', phone)}
          onCloseIcon={() => handleEditState('phoneText', true)}
          textContentType="telephoneNumber"
          onUpdate={onUpdatePhone}
        />

        <CardItem>
          <Item>
            <Left>
              <Text children={email} />
            </Left>
          </Item>
        </CardItem>

      </Card>

    </Form>
  )
}

UserProfile.propTypes = {
  onUpdateImage: PropTypes.func,
  isNameText: PropTypes.bool,
  onUpdateName: PropTypes.func,
  handleEditState: PropTypes.func,
  onUpdatePhone: PropTypes.func,
  isPhoneNoText: PropTypes.bool,
}

export default UserProfile;