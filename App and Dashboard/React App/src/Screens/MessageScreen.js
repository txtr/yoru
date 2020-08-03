import React, { useState, useContext, useEffect, useCallback } from 'react';
import {
  GiftedChat,
  InputToolbar,
  SystemMessage,
  Bubble,
  Send,
} from 'react-native-gifted-chat';
import {
  StyleSheet,
  Text,
  View,
  Button,
  AppRegistry,
  PermissionsAndroid,
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
} from 'react-native';
import Voice from '@react-native-community/voice';
import { IconButton } from 'react-native-paper';
import useStatsBar from '../utils/useStatusBar';
import axios from 'axios'
import io from 'socket.io-client';

export default class MessageScreen extends React.Component {
  state = {
    messages: [],
    text: '',
    access_token: '',
    web_messages: [],
    bot_email: 'cesaro@webex.bot',
    previouslength: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      recognized: '',
      started: '',
      results: [],
    };
    this.navigation = props.navigation
    Voice.onSpeechStart = this.onSpeechStart.bind(this);
    Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this);
    Voice.onSpeechResults = this.onSpeechResults.bind(this);
    Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged.bind(this);
    Voice.onSpeechEnd = this.onSpeechEnd.bind(this);
    Voice.onSpeechError = this.onSpeechError.bind(this);
    Voice.onSpeechPartialResults = this.onSpeechPartialResults.bind(this);
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }

  onSpeechStart(e) {
    this.setState({
      started: '√',
    });
  }

  onSpeechRecognized(e) {
    this.setState({
      recognized: '√',
    });
  }

  onSpeechEnd(e) {
    this.setState({
      end: '√',
    });
  }

  onSpeechError(e) {
    // console.log(e)
    this.setState({
      error: JSON.stringify(e.error),
    });
  }

  onSpeechResults(e) {
    // console.log(e.value[1]);
    if (e !== undefined) {
      this.setState({
        text: e.value[1],
      });
    }
    // console.log(this.state.messages);
  }

  onSpeechVolumeChanged(e) {
    // console.log(e)
    this.setState({
      pitch: e.value,
    });
  }

  onSpeechPartialResults(e) {
    // console.log(e)
    this.setState({
      partialResults: e.value,
    });
  }

  async _startRecognition(e) {
    this.setState({
      recognized: '',
      pitch: '',
      error: '',
      started: '',
      results: [],
      partialResults: [],
      end: '',
    });
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Record Permission',
          message: 'Yoru wants to record you',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        await Voice.start('en-US');
      } else {
        // console.log('Microphone permission denied');
      }
    } catch (e) {
      // console.error(e);
    }
  }

  isURL(str) {
    var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/; // fragment locator
    return pattern.test(str);
  }

  renderLoading = () => {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6646ee" />
      </View>
    );
  };
  renderSend = props => {
    if (!props.text) {
      return (
        <IconButton
          icon="microphone"
          onPress={this._startRecognition.bind(this)}
        />
      );
    }
    return (
      <Send {...props}>
        <View>
          <IconButton icon="send-circle" size={28} color="#6646ee" />
        </View>
      </Send>
    );
  };

  scrollToBottomComponent = () => {
    return (
      <View style={styles.bottomComponentContainer}>
        <IconButton icon="chevron-double-down" size={36} color="#6646ee" />
      </View>
    );
  };

  renderSystemMessage = props => {
    return (
      <SystemMessage
        {...props}
        wrapperStyle={styles.systemMessageWrapper}
        textStyle={styles.systemMessageText}
      />
    );
  };
  renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#6646ee',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };

  getMessages = () => {
    // this.setState({messages:[]})
    axios.get(
      'https://webexapis.com/v1/messages/direct?personEmail=cesaro@webex.bot',
      {
        headers: {
          Authorization: `Bearer ${this.state.access_token}`,
        },
      },
    ).then((result) => {
        console.log(result.data)
        this.setState({messages:this.setMessages(result.data)})
      }
    ) 
  }

  setMessages = (messages) => {
    var pmsgs = []
    // let singles = null
    
    messages.items.forEach(function (message) {
      let singles = message.text.split('\n')
      for(let j =singles.length-1; j>-1; j--){
        const messagec = JSON.parse(JSON.stringify(message))
        messagec.text = singles[j]
        messagec.id = message.id + j.toString()
        pmsgs.push(messagec)
      }
    });
    
    pmsgs = pmsgs.map(data => {
      if (data.personEmail == 'cesaro@webex.bot') {
          if (this.isURL(data.text)) {
            var matches = (data.text).match(/\bhttps?:\/\/\S+/gi);
             return {
              _id: data.id,
              image: matches[0],
              user: {
                _id: 2,
                avatar:
                  'https://www.pngitem.com/pimgs/m/122-1223088_one-bot-discord-avatar-hd-png-download.png',
              },
              createdAt: data.created
            };
          } else {
            return {
              _id: data.id,
              text: data.text,
              user: {
                _id: 2,
                avatar:
                  'https://www.pngitem.com/pimgs/m/122-1223088_one-bot-discord-avatar-hd-png-download.png',
              },
              createdAt: data.created
            };
          }
      } else {
        return {
          _id: data.id,
          text: data.text,
          user: {
            _id: 1,
            avatar: 'https://i.imgur.com/r1Adtx1.png',
          },
          createdAt: data.created
        };
      }
    })
    return (pmsgs)
  }

  componentDidMount = () => {
    AsyncStorage.getItem('access_token').then(access_token => {
      if (access_token) {
        this.setState({ access_token: access_token });
        this.getMessages();
      }
    });

  };


  onSend = (messages) => {
    // this.navigation.navigate('Home')
    // this.navigation.navigate('Yoru')
    const data = {
      toPersonEmail: 'cesaro@webex.bot',
      text: messages[0].text,
      createdAt: new Date(),
    }
    axios.post(
      'https://webexapis.com/v1/messages', data,
      {
        headers: {
          Authorization: `Bearer ${this.state.access_token}`,
        },

      },
    ).then(res => {
      this.getMessages();
      setTimeout(() => {
        this.getMessages()
      }, 5000);
    })
      .catch(error => {
        // console.error(error);
      });

  };

  render() {
    console.log(this.state.messages)
    return (
      <GiftedChat
        text={this.state.text}
        renderBubble={this.renderBubble}
        renderLoading={this.renderLoading}
        scrollToBottomComponent={this.scrollToBottomComponent}
        renderSystemMessage={this.renderSystemMessage}
        renderSend={this.renderSend}
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
        showUserAvatar
        scrollToBottom
      />
    );
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomComponentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  systemMessageWrapper: {
    backgroundColor: '#6646ee',
    borderRadius: 4,
    padding: 5,
  },
  systemMessageText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
});
