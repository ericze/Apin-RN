/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  FlatList,
  View,
  TouchableHighlight,
  Alert,
  AlertIOS,
  DeviceEventEmitter,
} from 'react-native';

var WeChat=require('react-native-wechat');
var openShare = require('react-native-open-share');

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
  _weiboLogin() {
        var _this = this;
        openShare.weiboLogin();

        if (!_this.weiboLogin) {
            _this.weiboLogin = DeviceEventEmitter.addListener(
                'managerCallback', (response) => {
                    AlertIOS.alert(
                        'response',
                         JSON.stringify(response)
                    );

                    _this.weiboLogin.remove();
                    delete _this.weiboLogin;
                }
            );
        }
    }

    _qqLogin() {

        openShare.qqLogin();

        if (!this.qqLogin) {
            this.qqLogin = DeviceEventEmitter.addListener(
                'managerCallback', (response) => {
                    AlertIOS.alert(
                        'response',
                        JSON.stringify(response)
                    );


                }
            );
        }
    }

    _wechatLogin() {
        var _this = this;
        if (WeChat.isWXAppInstalled) {

        }
        openShare.wechatLogin();

        if (!_this.wechatLogin) {
            _this.wechatLogin = DeviceEventEmitter.addListener(
                'managerCallback', (response) => {
                    AlertIOS.alert(
                        'response',
                        JSON.stringify(response)
                    );

                    _this.wechatLogin.remove();
                    delete _this.wechatLogin;
                }
            );
        }
    }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Reactiveasdsad Native!
        </Text>
        <Text style={styles.red}>just red</Text>

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

                <CustomButton text='微信登陆'
                  onPress={this._wechatLogin}
                />
                <CustomButton text='QQ登陆'
                  onPress={this._qqLogin}
                />
                <CustomButton text='微博登陆'
                  onPress={this._weiboLogin}
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
