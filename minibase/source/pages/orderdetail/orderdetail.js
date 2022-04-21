// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { LeaseorderApi } from "../../apis/leaseorder.api.js";
import { OrderApi } from "../../apis/order.api.js";



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

    }
  }
  quxiao(e){
    // 取消订单
    var that = this 
    var id = this.Base.options.id
    var type=this.Base.options.type
    var leaseorderdetail=this.Base.getMyData().leaseorderdetail
    var orderstatus=leaseorderdetail.orderstatus
  
    var orderApi =new OrderApi()
  
    console.log(orderstatus,'orderstatus');
    // return
  
    wx.showModal({
      content: '确定要取消这个订单吗？',
      success(res){
        if (res.confirm) {
          if (id>0) {
  
            if (orderstatus=='B' && type=='A') {
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
            if (orderstatus=='A'&& type=='A') {
              orderApi.update({
                id,type:'A',leixin:'A'
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
  
          
        }else if (res.cancel) {
          console.log('用户点击取消')
        }
  
      }
    })
  }

  shouhuo(e){
    // 确认收货
    var that = this 
    var id = this.Base.options.id
    var type=this.Base.options.type
    var leaseorderdetail=this.Base.getMyData().leaseorderdetail
    var orderstatus=leaseorderdetail.orderstatus

    wx.showModal({
      content: '确定要收货这个订单吗？',
      success(res){
        if (res.confirm) {
          var orderApi =new OrderApi()

          if (type=='A') {
            orderApi.update({
              id,type:'A',leixin:'C'
            },(res)=>{
              if (res.code==0) {
                wx.showToast({
                  title: '收货成功',
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
         
    
    
          
        }else if (res.cancel) {
          console.log('用户点击取消')
        }
    
      }
    })
  
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;

body.shouhuo = content.shouhuo;
body.ordetail = content.ordetail;
body.quxiao = content.quxiao;

Page(body)