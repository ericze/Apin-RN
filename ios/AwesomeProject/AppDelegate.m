/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import <RCTJPushModule.h>
#ifdef NSFoundationVersionNumber_iOS_9_x_Max
#import <UserNotifications/UserNotifications.h>
#endif

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <React/RCTLinkingManager.h>
#import "OpenShareHeader.h"
#import <AlipaySDK/AlipaySDK.h>
#import "UPPaymentControl.h"
#import <UMMobClick/MobClick.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  
    if ([[UIDevice currentDevice].systemVersion floatValue] >= 10.0) {
 #ifdef NSFoundationVersionNumber_iOS_9_x_Max
    JPUSHRegisterEntity * entity = [[JPUSHRegisterEntity alloc] init];
     entity.types = UNAuthorizationOptionAlert|UNAuthorizationOptionBadge|UNAuthorizationOptionSound;
     [JPUSHService registerForRemoteNotificationConfig:entity delegate:self];
 
#endif
} else if ([[UIDevice currentDevice].systemVersion floatValue] >= 8.0) {
    [JPUSHService registerForRemoteNotificationTypes:(UIUserNotificationTypeBadge |
                                                      UIUserNotificationTypeSound |
                                                      UIUserNotificationTypeAlert)
                                          categories:nil];
  } else {
    [JPUSHService registerForRemoteNotificationTypes:(UIRemoteNotificationTypeBadge |
                                                      UIRemoteNotificationTypeSound |
                                                      UIRemoteNotificationTypeAlert)
                                          categories:nil];
  }
  
  [JPUSHService setupWithOption:launchOptions appKey:@"4bb730dd21449ce6ba927c32"
                        channel:nil apsForProduction:nil];
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"AwesomeProject"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [OpenShare connectQQWithAppId:@"1105694910"];
  [OpenShare connectWeiboWithAppKey:@"wb3448287776"];
  [OpenShare connectWeixinWithAppId:@"wx3783eec7a89a70d5"];

  UMConfigInstance.appKey = @"5765031967e58ef9490001f9";
  [MobClick startWithConfigure:UMConfigInstance];//配置以上参数后调用此方法初始化SDK！
  
  [self.window makeKeyAndVisible];
  return YES;
}
//9.0之前接口
  -(BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(nullable NSString *)sourceApplication annotation:(nonnull id)annotation{
    if ([url.host isEqualToString:@"safepay"]) {
      //跳转支付宝钱包进行支付，处理支付结果
      [[AlipaySDK defaultService] processOrderWithPaymentResult:url standbyCallback:^(NSDictionary *resultDic) {
        NSLog(@"result = %@",resultDic);
      }];
    }
    
    [[UPPaymentControl defaultControl] handlePaymentResult:url completeBlock:^(NSString *code, NSDictionary *data) {
      
      if([code isEqualToString:@"success"]) {
        
        //如果想对结果数据验签，可使用下面这段代码，但建议不验签，直接去商户后台查询交易结果
        if(data != nil){
          //数据从NSDictionary转换为NSString
          NSData *signData = [NSJSONSerialization dataWithJSONObject:data
                                                             options:0
                                                               error:nil];
          NSString *sign = [[NSString alloc] initWithData:signData encoding:NSUTF8StringEncoding];
          
          //此处的verify建议送去商户后台做验签，如要放在手机端验，则代码必须支持更新证书
        }
        
        //结果code为成功时，去商户后台查询一下确保交易是成功的再展示成功
      }
      else if([code isEqualToString:@"fail"]) {
        //交易失败
      }
      else if([code isEqualToString:@"cancel"]) {
        //交易取消
      }
    }];
    
    if ([OpenShare handleOpenURL:url]) {
      return YES;
    }
    return [RCTLinkingManager application:application openURL:url
                        sourceApplication:sourceApplication annotation:annotation];
  }
//9.0之后新接口
-(BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options{
  if ([url.host isEqualToString:@"safepay"]) {
    //跳转支付宝钱包进行支付，处理支付结果
    [[AlipaySDK defaultService] processOrderWithPaymentResult:url standbyCallback:^(NSDictionary *resultDic) {
      NSLog(@"result = %@",resultDic);
    }];
    [[UPPaymentControl defaultControl] handlePaymentResult:url completeBlock:^(NSString *code, NSDictionary *data) {
      
      if([code isEqualToString:@"success"]) {
        
        //如果想对结果数据验签，可使用下面这段代码，但建议不验签，直接去商户后台查询交易结果
        if(data != nil){
          //数据从NSDictionary转换为NSString
          NSData *signData = [NSJSONSerialization dataWithJSONObject:data
                                                             options:0
                                                               error:nil];
          NSString *sign = [[NSString alloc] initWithData:signData encoding:NSUTF8StringEncoding];
          
          //此处的verify建议送去商户后台做验签，如要放在手机端验，则代码必须支持更新证书
        }
        
        //结果code为成功时，去商户后台查询一下确保交易是成功的再展示成功
      }
      else if([code isEqualToString:@"fail"]) {
        //交易失败
      }
      else if([code isEqualToString:@"cancel"]) {
        //交易取消
      }
    }];
  }
  if ([OpenShare handleOpenURL:url]) {
    return YES;
  }
  
  return YES;
}
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
[JPUSHService registerDeviceToken:deviceToken];
}
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo {
[[NSNotificationCenter defaultCenter] postNotificationName:kJPFDidReceiveRemoteNotification object:userInfo];
}
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)   (UIBackgroundFetchResult))completionHandler {
[[NSNotificationCenter defaultCenter] postNotificationName:kJPFDidReceiveRemoteNotification object:userInfo];
}
- (void)jpushNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(NSInteger))completionHandler {
 NSDictionary * userInfo = notification.request.content.userInfo;
 if([notification.request.trigger isKindOfClass:[UNPushNotificationTrigger class]]) {
 [JPUSHService handleRemoteNotification:userInfo];
 [[NSNotificationCenter defaultCenter] postNotificationName:kJPFDidReceiveRemoteNotification object:userInfo];
    }
 completionHandler(UNNotificationPresentationOptionAlert);
}
- (void)jpushNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)())completionHandler {
NSDictionary * userInfo = response.notification.request.content.userInfo;
if([response.notification.request.trigger isKindOfClass:[UNPushNotificationTrigger class]]) {
[JPUSHService handleRemoteNotification:userInfo];
[[NSNotificationCenter defaultCenter] postNotificationName:kJPFOpenNotification object:userInfo];
}
completionHandler();
}
@end
