// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { LeaseorderApi } from "../../apis/leaseorder.api.js";
import { OrderApi } from "../../apis/order.api.js";
import { SafeApi } from "../../apis/safe.api.js";
import { BusinessApi } from "../../apis/business.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);

 


    this.Base.setMyData({
        safedetail:{},type:'',businessinfo:{},company:'',logisticsorderno:''
    })


    this.Base.setMyData({type:this.Base.options.type})


  }
 
  onMyShow() {

    var that = this;

    var businessApi = new BusinessApi()
    businessApi.businessinfo({},(res)=>{
      this.Base.setMyData({businessinfo:res})
    })

    

   



that.safexq()

  }
  safexq(){
    var safeApi = new SafeApi()
    safeApi.safedetail({
        id:this.Base.options.id
    },(res)=>{
        this.Base.setMyData({safedetail:res})

    })


}

chexiao(){
    var id = this.Base.options.id
    var that = this
     

    var orderApi = new OrderApi()
    wx.showModal({
      content: '确定要撤销这个订单吗？',
      success(res){
          if (res.confirm) {
            orderApi.update({
                id,type:'B',leixin:'A'
            },(res)=>{
                if (res.code==0) {
                    wx.navigateBack({
                        delta: 1
                      });
                      that.safexq()
                }else{
                  that.Base.toast('撤销失败')
        
                }
        
            })
              
          }else if (res.cancel) {
            console.log('用户点击取消')
          }

      }
    })
  
}

safetijiao(){
  var logisticsorderno= this.Base.getMyData().logisticsorderno
  var company= this.Base.getMyData().company
  var id = this.Base.options.id
  var that = this

  if (logisticsorderno=='') {
    that.Base.toast('请输入物流单号')
    return
  }
  if (company=='') {
    that.Base.toast('请输入物流公司')
    return
  }

  var orderApi = new OrderApi()
  orderApi.update({
    id,type:'B',leixin:'B',logisticsorderno,company
},(res)=>{
    if (res.code==0) {
      that.Base.toast('提交成功')
      that.safexq()
        
    }else{
      that.Base.toast('失败')
    }

})




}

 

 
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;

body.safetijiao = content.safetijiao;
body.chexiao = content.chexiao;
body.safexq = content.safexq;
body.ordetail = content.ordetail;
body.quxiao = content.quxiao;

Page(body)