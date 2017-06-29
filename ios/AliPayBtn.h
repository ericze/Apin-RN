//
//  AliPayBtn.h
//  AwesomeProject
//
//  Created by wangZL on 2017/6/29.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <React/RCTBridge.h>
#import <AlipaySDK/AlipaySDK.h>
#import <React/RCTConvert.h>
#import <React/RCTComponent.h>
#import <React/RCTEventDispatcher.h>
#import <React/UIView+React.h>

@protocol AliPayDelegate <NSObject>

@optional
-(void)buttonClicked;
@end

@interface AliPayBtn : UIButton
@property(nonatomic,weak)id <AliPayDelegate> delegate;
@property(nonatomic,copy)NSString *signedString;

@end

