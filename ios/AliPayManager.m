//
//  AliPayManager.m
//  AwesomeProject
//
//  Created by wangZL on 2017/6/29.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "AliPayManager.h"
#import <React/RCTViewManager.h>
#import "AliPayBtn.h"
#import "OpenShareHeader.h"

@implementation AliPayManager

@synthesize bridge=_bridge;

//默认名称
RCT_EXPORT_MODULE()
 
//对外提供方法
RCT_EXPORT_METHOD(aliPay:(NSString *)signedString){
  NSString *appScheme = @"Apin";
  NSLog(@"支付宝签名：%@",signedString);
  // NOTE: 调用支付结果开始支付
  [[AlipaySDK defaultService] payOrder:signedString fromScheme:appScheme callback:^(NSDictionary *resultDic) {
    NSLog(@"支付宝支付结果：reslut = %@",resultDic);
    [self.bridge.eventDispatcher sendAppEventWithName:@"EventAliPay" body:@{@"result":resultDic}];
  }];
}

@end
