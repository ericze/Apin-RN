/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  FlatList,
  View,
  TouchableHighlight,
  Alert,
} from 'react-native';
var WeChat=require('react-native-wechat');

class CustomButton extends Component {
  render() {
    return (
      <TouchableHighlight
        style={styles.button}
        underlayColor="#a5a5a5"
        onPress={this.props.onPress}>
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </TouchableHighlight>
    );
  }
}

export default class AwesomeProject extends Component {
  constructor(props) {
      super(props);
      //应用注册
      WeChat.registerApp('wx3783eec7a89a70d5');
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Reactiveasdsad Native!
        </Text>
        <Text style={styles.red}>just red</Text>

        <CustomButton text='微信好友分享-文本'
           onPress={() => {
                   WeChat.isWXAppInstalled()
                     .then((isInstalled) => {
                       if (isInstalled) {
                         WeChat.shareToSession({type: 'text', description: '测试微信好友分享文本'})
                         .catch((error) => {
                           Alert.alert(
                             error.message,
                           )
                         });
                       } else {
                         Alert.alert(
                           '没有安装微信软件，请您安装微信之后再试',
                         )
                       }
                     });
               }}
         />

         <CustomButton text='微信好友分享-链接'
                  onPress={() => {
                          WeChat.isWXAppInstalled()
                            .then((isInstalled) => {
                              if (isInstalled) {
                                WeChat.shareToSession({
                                  title:'微信好友测试链接',
                                  description: '分享自:江清清的技术专栏(www.lcode.org)',
                                  thumbImage: 'http://mta.zttit.com:8080/images/ZTT_1404756641470_image.jpg',
                                  type: 'news',
                                  webpageUrl: 'http://www.lcode.org'
                                })
                                .catch((error) => {
                                  Alert.alert(
                                    error.message,
                                  )
                                });
                              } else {
                                Alert.alert('没有安装微信软件，请您安装微信之后再试');
                              }
                            });
                      }}
                />
                <CustomButton text='微信朋友圈分享-文本'
                  onPress={() => {
                          WeChat.isWXAppInstalled()
                            .then((isInstalled) => {
                              if (isInstalled) {
                                WeChat.shareToTimeline({type: 'text', description: '测试微信朋友圈分享文本'})
                                .catch((error) => {
                                  Alert.alert(
                                    error.message,
                                  )
                                });
                              } else {
                              Alert.alert('没有安装微信软件，请您安装微信之后再试');
                              }
                            });
                      }}
                />
                <CustomButton text='微信朋友圈分享-链接'
                  onPress={() => {
                          WeChat.isWXAppInstalled()
                            .then((isInstalled) => {
                              if (isInstalled) {
                                WeChat.shareToTimeline({
                                  title:'微信朋友圈测试链接',
                                  description: '分享自:江清清的技术专栏(www.lcode.org)',
                                  thumbImage: 'http://mta.zttit.com:8080/images/ZTT_1404756641470_image.jpg',
                                  type: 'news',
                                  webpageUrl: 'http://www.lcode.org'
                                })
                                .catch((error) => {
                                  Alert.alert(
                                    error.message,
                                  )
                                });
                              } else {
                                Alert.alert('没有安装微信软件，请您安装微信之后再试');
                              }
                            });
                      }}
                />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  red: {
    textAlign: 'center',
    color: 'red',
    marginBottom: 5,
    backgroundColor:'skyblue'
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  button: {
    margin:5,
    backgroundColor:'white',
    padding:15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor:'#cdcdcd',
  }
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
