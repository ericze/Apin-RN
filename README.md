# Apin-RN
Apin(爱拼机)React-Native版本
React-Native 微信朋友圈分享 好友分享 QQ分享 微博分享 支付宝支付 微信支付 QQ登陆 微信登陆 微博登陆
React Native的微信插件, 包括登录、分享 #### 注意: react-native版本需要0.17.0及以上 #### 注意：iOS应用只要申请并获取到AppID就可进行调试。Android应用除了获取AppID外，应用还要通过审核，否则无法调起微信进行分享，并且需要在网站上填写包名和签名两个字段，签名需要使用签名生成工具获取。

如何安装

1.首先安装npm包
npm install react-native-pay-share --save
2.link
自动link方法~rnpm requires node version 4.1 or higher
rnpm link react-native-pay-share
link成功命令行会提示

rnpm info Linking react-native-pay-share android dependency 
rnpm info Linking react-native-pay-share ios dependency
手动link~（如果不能够自动link）
ios
a.打开XCode's工程中, 右键点击Libraries文件夹 ➜ Add Files to <...> b.去node_modules ➜ react-native-wx ➜ ios ➜ 选择 RCTWeChat.xcodeproj c.在工程Build Phases ➜ Link Binary With Libraries中添加libRCTWeChat.a

