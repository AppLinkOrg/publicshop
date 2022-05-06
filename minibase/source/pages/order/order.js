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
        select:0,orderlist:[],
    })

    if(this.Base.options.num !=undefined){
      this.Base.setMyData({select:this.Base.options.num })
    }

    
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

  var types=e.currentTarget.dataset['type'];
  

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
                  that.orlist()
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
                  that.orlist()
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
  
          that.orlist()
                
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
shangchu(e){
 // 删除订单
 var that = this 
  var id = e.currentTarget.id
  var types=e.currentTarget.dataset.type

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
  var types = e.currentTarget.dataset.type

  var wechatApi = new WechatApi()

  console.log('ffff',types);
  
  // return

  if (types=='B') {
    wechatApi.prepay2({
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
  }else{
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
sale(e){
  // 申请售后
  var id = e.currentTarget.id
  var type=e.currentTarget.dataset.type
  wx.navigateTo({
    url: '/pages/applysale/applysale?id='+id+'&type='+type,
  })

}
sale2(e){
// 查看售后详情
var id = e.currentTarget.id
var type = e.currentTarget.dataset['type'];
wx.navigateTo({
  url: '/pages/refunddetail/refunddetail?id='+id+'&type='+type,
})
}
shouhuo(e){
  // 确认收货
  var that =this
  var id = e.currentTarget.id
  var types=e.currentTarget.dataset.type

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
orderxq(e){
  var id = e.currentTarget.id
  var type=e.currentTarget.dataset.type
  wx.navigateTo({
    url: '/pages/orderdetail/orderdetail?type='+type+'&id='+id,
  })

}
faqiao(e){
  var id = e.currentTarget.id
  var type=e.currentTarget.dataset.type

  wx.navigateTo({
    url: '/pages/invoice/invoice?type='+type+'&id='+id,
  })


}
chakan(e){
  var id = e.currentTarget.id
  var type=e.currentTarget.dataset.type
  var logisticsorderno=e.currentTarget.dataset.logisticsorderno
  if (logisticsorderno=='' || logisticsorderno==undefined) {
    this.Base.toast('商家发货物流单号暂未上传')
    return
  }

  
// return
  wx.navigateTo({
    url: '/pages/logistics/logistics?no='+logisticsorderno,
  })

}



}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;

body.chakan = content.chakan;
body.sale2 = content.sale2;
body.faqiao = content.faqiao;
body.orderxq = content.orderxq;
body.shouhuo = content.shouhuo;
body.sale = content.sale;
body.zhifu = content.zhifu;
body.shangchu = content.shangchu;
body.quxiao = content.quxiao;
body.orlist = content.orlist;
body.xz = content.xz;
Page(body)