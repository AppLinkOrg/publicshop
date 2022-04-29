// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { AddresApi } from "../../apis/addres.api.js";
import { LeaseApi } from "../../apis/lease.api.js";
import { LeaseorderApi } from "../../apis/leaseorder.api.js";
import { WechatApi } from "../../apis/wechat.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);

    wx.setNavigationBarTitle({
      title: '租赁订单',
    })

    this.Base.setMyData({
      addresdetail:null,leasedetail2:null,remarks:'',totle:0
    })
    
  }
  onMyShow() {
    var that = this;


    let pages=getCurrentPages()
    let currPage =pages[pages.length - 1];
    console.log(currPage.data,'currPage');

    var address_id=0;
    if (currPage.data.address_id) {
      address_id=currPage.data.address_id
    }else{
      address_id=0
    }

  

    var addresApi = new AddresApi()
    addresApi.addresdetail({id:address_id},(res)=>{

      this.Base.setMyData({addresdetail:res})

    })


    var leaseApi =new LeaseApi()
    leaseApi.leasedetail2({
      id:this.Base.options.id,
      sealseprice_id:this.Base.options.sealseprice_id
    },(res)=>{
      var totle=0
      totle=res.deposit*1+res.freight*1+res.jiamu.presentprice*1
      totle=totle.toFixed(2)
      this.Base.setMyData({leasedetail2:res,totle})

    })

    


  }
  xzaddres(){
    wx.navigateTo({
      url: '/pages/address/address?type=A',
    })

  }
  tijiao(){
    var addresdetail = this.Base.getMyData().addresdetail
    var id=this.Base.options.id
    var sealseprice_id=this.Base.options.sealseprice_id
    var remarks = this.Base.getMyData().remarks
    var that = this
    var leasedetail2 = this.Base.getMyData().leasedetail2

    var amount = leasedetail2.deposit*1+leasedetail2.freight*1+leasedetail2.jiamu.presentprice*1

    if (addresdetail==null) {
      wx.showToast({
        title: '请选择地址',
        icon:'none'
      })
      return
    }
    if (id<=0&&sealseprice_id<=0) {
      wx.showToast({
        title: '参数不对请重新选择',
        icon:'none'
      })
      return
    }

    var leaseorderApi = new LeaseorderApi()
    leaseorderApi.leaseorderadd({
      lease_id:this.Base.options.id,
      addres_id:addresdetail.id,
      sealseprice_id:this.Base.options.sealseprice_id,
      remarks
    },(res)=>{
      if (res.code==0) {
        var wechatApi = new WechatApi()
        wechatApi.prepay({
          id:res.return
        },(payret)=>{
          payret.complete=function(e){

            console.log(e,'ecomplete');
            if (e.errMsg == "requestPayment:ok") {
              that.Base.toast("支付成功")
              wx.navigateTo({
                url: '/pages/paysucsses/paysucsses?amount='+amount,
              })

            }else{
that.Base.toast("支付失败");
            }
          }
          wx.requestPayment(payret)



          
        })






        
      }else{
        wx.showToast({
          title: '提交失败',
          icon:'none'
        })

      }



    })







   


  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;

body.tijiao = content.tijiao;
body.xzaddres = content.xzaddres;
Page(body)