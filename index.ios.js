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
  TouchableOpacity,
  Alert,
  AlertIOS,
  DeviceEventEmitter,
} from 'react-native';
///进行导入NativeModules中的CalendarManger模块
import { NativeModules } from 'react-native';
import { NativeAppEventEmitter } from 'react-native';

var subscription;
var WeChat =require('react-native-wechat');
var openShare = require('react-native-open-share');
var AliPayManager = NativeModules.AliPayManager;
var SocietyLoginManager = NativeModules.SocietyLoginManager;
var UniPayManager = NativeModules.UniPayManager;
var UMNative = require('react-native').NativeModules.UMNative;

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
  componentDidMount(){
      console.log('开始订阅通知...');
      subscription = NativeAppEventEmitter.addListener(
           'EventAliPay',
            (reminder) => {
              AlertIOS.alert(
                  'reminder',
                   JSON.stringify(reminder)
              );
            }
           );
      //增加微信支付回调监听

        DeviceEventEmitter.addListener(
          'WeChat_Resp',
          (response) => {
              alert('支付成功');
          }
      );
    }

  componentWillUnmount(){
       subscription.remove();
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
        var _this = this;
        openShare.qqLogin();

        if (!_this.qqLogin) {
            _this.qqLogin = DeviceEventEmitter.addListener(
                'managerCallback', (response) => {
                    AlertIOS.alert(
                        'response',
                        JSON.stringify(response)
                    );

                    _this.qqLogin.remove();
                    delete _this.qqLogin;
                }
            );
        }
    }

    _wechatLogin() {
        var _this = this;
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
                          UMNative.onEvent('order');
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

                <CustomButton text='微信支付'
                  onPress={() => {
                          WeChat.isWXAppInstalled()
                            .then((isInstalled) => {
                              if (isInstalled) {
                                WeChat.pay({
                                  title:'微信朋友圈测试链接',
                                  partnerId: 'bb22f07fcf744a69a3499f21e56c374b',
                                  prepayId: 'WX1217752501201407033233368018',
                                  nonceStr: '5K8264ILTKCH16CQ2502SI8ZNMTM67VS',
                                  timeStamp: '1412000000',
                                  package: 'Sign=WXPay	',
                                  sign: 'C380BEC2BFD727A4B6845133519F3AD6'
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

                <CustomButton text='支付宝支付'
                  onPress={()=>AliPayManager.aliPay('sdfklsasdads2324dadasdasd333asdad')}
                />

                <CustomButton text='银联支付'
                  onPress={()=>UniPayManager.unionPay('sdfklsasdads2324dadasdasd333asdad')}
                />

                <CustomButton text='微信登陆'
                  onPress={() => {
                          WeChat.isWXAppInstalled()
                            .then((isInstalled) => {
                              if (isInstalled) {
                                this._wechatLogin()
                              } else {
                                Alert.alert('没有安装微信软件，请您安装微信之后再试');
                              }
                            });
                      }}
                />
                <CustomButton text='QQ登陆'
                  onPress={() => {
                          openShare.isQQAppInstalled(
                            (error,events) => {
                              if (events) {
                                this._qqLogin()
                              } else {
                                Alert.alert('没有安装QQ，请您安装QQ之后再试');
                              }
                            });
                      }}
                />
                <CustomButton text='微博登陆'
                  onPress={() => {
                          openShare.isWeiboAppInstalled(
                            (error,events) => {
                              if (events) {
                                this._weiboLogin()
                              } else {
                                Alert.alert('没有安装微博，请您安装微博之后再试');
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
