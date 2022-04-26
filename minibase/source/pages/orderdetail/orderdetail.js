// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { LeaseorderApi } from "../../apis/leaseorder.api.js";
import { OrderApi } from "../../apis/order.api.js";
import { ShoporderApi } from "../../apis/shoporder.api.js";
import { WechatApi } from "../../apis/wechat.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);

 


    this.Base.setMyData({
      leaseorderdetail:{},type:''
    })


    this.Base.setMyData({type:this.Base.options.type})


  }
  onMyShow() {

    var that = this;

    

   



that.ordetail()

  }
  ordetail(){
    if (this.Base.options.type=='A') {
      var leaseorderApi  = new LeaseorderApi()
      leaseorderApi.leaseorderdetail({
        id:this.Base.options.id
      },(res)=>{
        this.Base.setMyData({leaseorderdetail:res})
      })

    }else{
      var shoporderApi  =new ShoporderApi()
      shoporderApi.shoporderdetail({
        id:this.Base.options.id
      },(res)=>{
        this.Base.setMyData({leaseorderdetail:res})
      })

    }

  }
  quxiao(e){
    // 取消订单
    var that = this 
    var id = this.Base.options.id
    var orderstatus = e.currentTarget.dataset['orderstatus'];
    var orderApi =new OrderApi()
  
    var types=this.Base.getMyData().type;
    
  
    console.log(types,'orderstatus');
    // return
  
    wx.showModal({
      content: '确定要取消这个订单吗？',
      success(res){
        if (res.confirm) {
          if (id>0) {
  
            if (orderstatus=='B') {
              if (types=='B') {
                var wechatApi =new  WechatApi()
                wechatApi.refund4({
                  id
                },(res)=>{
                  if (res.code==0) {
                    wx.showToast({
                      title: '取消成功',
                      icon:'none'
                    })
                    that.ordetail()
                  }else{
                    wx.showToast({
                      title: '操作失败',
                    }) 
                  }
                })
              }else{
                var wechatApi =new  WechatApi()
                wechatApi.refund2({
                  id
                },(res)=>{
                  if (res.code==0) {
                    wx.showToast({
                      title: '取消成功',
                      icon:'none'
                    })
                    that.ordetail()
               
                  }else{
                    wx.showToast({
                      title: '操作失败',
                    }) 
                  }
                })
              }
         
  
              
            }
            if (orderstatus=='A') {
              var type='';
              if (types=='B') {
                type='D'
              }else{
                type='A'
              }
              
              orderApi.update({
                id,type,leixin:'A'
              },(res)=>{
                if (res.code==0) {
                  wx.showToast({
                    title: '取消成功',
                    icon:'none'
                  })
    that.ordetail()
            // that.orlist()
                  
                }else{
                  wx.showToast({
                    title: '操作失败',
                  })
                }
            
              })
            }
          
          }
  
          
        }else if (res.cancel) {
          console.log('用户点击取消')
        }
  
      }
    })
  }

  shouhuo(e){
    // 确认收货
    var that =this
    var id = this.Base.options.id
    var types=this.Base.getMyData().type;
  
    wx.showModal({
      content: '确定要收货这个订单吗？',
      success(res){
        if (res.confirm) {
          var orderApi =new OrderApi()
  
          var type=''
          if (types=='B') {
            type='D'
          }else{
            type='A'
          }
          orderApi.update({
            id,type,leixin:'C'
          },(res)=>{
            if (res.code==0) {
              wx.showToast({
                title: '收货成功',
                icon:'none'
              })
              that.ordetail()
    
        // that.orlist()
              
            }else{
              wx.showToast({
                title: '操作失败',
              })
            }
        
          })
    
    
          
        }else if (res.cancel) {
          console.log('用户点击取消')
        }
    
      }
    })
  
  }

  afer(){
// 申请售后
var id = this.Base.options.id
var type=this.Base.options.type

wx.navigateTo({
  url: '/pages/applysale/applysale?id='+id+'&type='+type,
})
  }
  afer2(){
    // 申请售后
    var id = this.Base.options.id
    var type=this.Base.options.type
    var leaseorderdetail = this.Base.getMyData().leaseorderdetail
    var safe_id=leaseorderdetail.safe_id
    
    wx.navigateTo({
      url: '/pages/refunddetail/refunddetail?id='+safe_id+'&type='+type,
    })
      }
shangchu(e){
  // 删除订单
  var that = this 
    var id = this.Base.options.id
    var types=this.Base.getMyData().type
  
  wx.showModal({
    content: '确定要删除这个订单吗？',
    success(res){
      if (res.confirm) {
        var orderApi =new OrderApi()
        var type=''
        if (types=='B') {
          type='D'
        }else{
          type='A'
        }
        orderApi.update({
          id,type,leixin:'B'
        },(res)=>{
          if (res.code==0) {
            wx.showToast({
              title: '删除成功',
              icon:'none'
            })
  
      wx.navigateBack({
        delta: 1,
      })
            
          }else{
            wx.showToast({
              title: '操作失败',
            })
          }
      
        })
  
  
        
      }else if (res.cancel) {
        console.log('用户点击取消')
      }
  
    }
  })
  
  }
  zhifu(e){
    // 支付
    var that = this 
    var id = this.Base.options.id
    var types=this.Base.getMyData().type
  
    var wechatApi = new WechatApi()
  
    if (types=='B') {
      wechatApi.prepay2({
        id
      },(payret)=>{
        payret.complete=function(e){
    
          console.log(e,'ecomplete');
          if (e.errMsg == "requestPayment:ok") {
            that.Base.toast("支付成功")
            that.ordetail()
    
          }else{
    that.Base.toast("支付失败");
          }
        }
        wx.requestPayment(payret)
    
      })
    }else{
        wechatApi.prepay({
      id
    },(payret)=>{
      payret.complete=function(e){
  
        console.log(e,'ecomplete');
        if (e.errMsg == "requestPayment:ok") {
          that.Base.toast("支付成功")
          that.ordetail()
  
        }else{
  that.Base.toast("支付失败");
        }
      }
      wx.requestPayment(payret)
  
    })
    }
  
  
  
  }
  faqiao(e){
    var id = this.Base.options.id
    var types=this.Base.getMyData().type
  
    wx.navigateTo({
      url: '/pages/invoice/invoice?type='+types+'&id='+id,
    })
  
  
  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;


body.faqiao = content.faqiao;
body.zhifu = content.zhifu;
body.shangchu = content.shangchu;
body.afer2 = content.afer2;
body.afer = content.afer;
body.shouhuo = content.shouhuo;
body.ordetail = content.ordetail;
body.quxiao = content.quxiao;

Page(body)