// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { OrderApi } from "../../apis/order.api.js";
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
        list:[
            {id:'', name:'全部'},{id:'A', name:'待付款'},{id:'B', name:'待发货'},{id:'C', name:'待收货'},{id:'D', name:'已完成'}
        ],
        select:0,orderlist:[]
    })
  }
  onMyShow() {
    var that = this;

    


  
this.orlist()


  }
  orlist(){

    var list=this.Base.getMyData().list
    var select=this.Base.getMyData().select
    var orderstatus=list[select]['id'];

    var orderApi =new OrderApi()
    orderApi.orderlist({
      orderstatus
    },(res)=>{
      this.Base.setMyData({orderlist:res.result})

    })
    
  }
  xz(e){
    var id = e.currentTarget.id
  
    this.Base.setMyData({select:id})

    this.orlist()

}
quxiao(e){
  // 取消订单
  var that = this 
  var id = e.currentTarget.id
  var orderstatus = e.currentTarget.dataset['orderstatus'];
  var orderApi =new OrderApi()

  wx.showModal({
    content: '确定要取消这个订单吗？',
    success(res){
      if (res.confirm) {
        if (id>0) {
          orderApi.update({
            id,type:'A',leixin:'A'
          },(res)=>{
            if (res.code==0) {
              wx.showToast({
                title: '取消成功',
                icon:'none'
              })

        that.orlist()
              
            }else{
              wx.showToast({
                title: '操作失败',
              })
            }
        
          })
        }

        
      }else if (res.cancel) {
        console.log('用户点击取消')
      }

    }
  })
}
shangchu(e){
 // 删除订单
 var that = this 
  var id = e.currentTarget.id
wx.showModal({
  content: '确定要删除这个订单吗？',
  success(res){
    if (res.confirm) {
      var orderApi =new OrderApi()
      orderApi.update({
        id,type:'A',leixin:'B'
      },(res)=>{
        if (res.code==0) {
          wx.showToast({
            title: '删除成功',
            icon:'none'
          })

    that.orlist()
          
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
  var id = e.currentTarget.id

  var wechatApi = new WechatApi()
  wechatApi.prepay({
    id
  },(payret)=>{
    payret.complete=function(e){

      console.log(e,'ecomplete');
      if (e.errMsg == "requestPayment:ok") {
        that.Base.toast("支付成功")
        that.orlist()

      }else{
that.Base.toast("支付失败");
      }
    }
    wx.requestPayment(payret)

  })


}

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;

body.zhifu = content.zhifu;
body.shangchu = content.shangchu;
body.quxiao = content.quxiao;
body.orlist = content.orlist;
body.xz = content.xz;
Page(body)