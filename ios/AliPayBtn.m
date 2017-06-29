//
//  AliPayBtn.m
//  AwesomeProject
//
//  Created by wangZL on 2017/6/29.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "AliPayBtn.h"

@implementation AliPayBtn
-(instancetype)initWithFrame:(CGRect)frame{
  if (self=[super initWithFrame:frame]) {
    [self addTarget:self action:@selector(pay) forControlEvents:UIControlEventTouchUpInside];
    [self setBackgroundColor:[UIColor redColor]];
  
  }
  return self;
}
-(void)pay{
  if ([self.delegate respondsToSelector:@selector(buttonClicked)]) {
    [self.delegate buttonClicked];
  }
  NSString *appScheme = @"Apin";
  NSLog(@"支付宝签名：%@",_signedString);
  // NOTE: 调用支付结果开始支付
  [[AlipaySDK defaultService] payOrder:_signedString fromScheme:appScheme callback:^(NSDictionary *resultDic) {
    NSLog(@"支付宝支付结果：reslut = %@",resultDic);
  }];
}
/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
}
*/

@end
