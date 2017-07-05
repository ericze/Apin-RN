//
//  UniPayManager.m
//  AwesomeProject
//
//  Created by wangZL on 2017/7/1.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "UniPayManager.h"
#import <React/RCTViewManager.h>
#import "UPPaymentControl.h"

#define kMode_Development             @"01"
#define kURL_TN_Normal                @"http://101.231.204.84:8091/sim/getacptn"
#define kURL_TN_Configure             @"http://101.231.204.84:8091/sim/app.jsp?

@interface UniPayManager ()

@end

@implementation UniPayManager

@synthesize bridge=_bridge;

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
}

//默认名称
RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(unionPay:(NSString *)tnString){
  //当获得的tn不为空时，调用支付接口
  if (tnString != nil && tnString.length > 0)
  {
    [[UPPaymentControl defaultControl]
     startPay:kURL_TN_Normal
     fromScheme:@"unionPay"
     mode:kMode_Development
     viewController:self];
  }

}
/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
