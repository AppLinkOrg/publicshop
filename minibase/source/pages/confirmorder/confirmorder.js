// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { AddresApi } from "../../apis/addres.api.js";
import { CartApi } from "../../apis/cart.api.js";
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
    wx.setNavigationBarTitle({
      title: '确认订单',
    })


    this.Base.setMyData({
        addresdetail:null,cartdetail:[],amount:0,remarks:'',type:'',strjson:null,freight:0
    })

    var amount=0
    var freight=0
    amount=amount.toFixed(2)
    freight=freight.toFixed(2)
    this.Base.setMyData({amount,freight})

    if (this.Base.options.strjson!=undefined) {
      var strjson=this.Base.options.strjson
      strjson=JSON.parse(strjson)
      var type=strjson.type
      console.log(strjson,'strjson',type);
      this.Base.setMyData({strjson,type})
      
    }

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

    console.log(this.Base.options.str,'str');

    var str='';
    if (this.Base.getMyData().type=='B') {
      str=this.Base.options.strjson
    }else{
      str=this.Base.options.str
    }

    var type=this.Base.getMyData().type
    

    // 商品详情
    var cartApi = new CartApi()
    cartApi.cartdetail({
        str,type
    },(res)=>{
      if (res.code==0) {
        var amount=0
        var freight=0
         
        for (let item of res.result) {
            amount=amount+item.cart_num*item.pricelist_present
            if (item.freight*1>freight*1) {
              freight=item.freight
            }
        }
        freight=freight*1;

        console.log(freight,'freight');
        amount=amount.toFixed(2)
        freight=freight.toFixed(2)
        this.Base.setMyData({cartdetail:res.result,amount,freight})
        
      }else{
        that.Base.toast(res.return)
      }
       
    })

  }
  sholist(){
      var str = this.Base.options.str
   

  }



  xzaddres(){
    wx.navigateTo({
      url: '/pages/address/address?type=A',
    })

  }
  tijiao(){
    var addresdetail=this.Base.getMyData().addresdetail
    var cartdetail = this.Base.getMyData().cartdetail
    var that =this 

    var amount = this.Base.getMyData().amount
    

    var addresname = addresdetail.name
    var mobile=addresdetail.mobile
    var address=addresdetail.address
    var detailed=addresdetail.detailed
    var remarks=this.Base.getMyData().remarks
    // var str=this.Base.options.str

    var str='';

    if (this.Base.getMyData().type=='B') {
      str=this.Base.options.strjson
    }else{
      str=this.Base.options.str
    }
    


    if (addresname=='') {
    that.Base.toast('请选择地址信息')
    return
    }

    if (str=='') {
      that.Base.toast('请选择商品')
    return
    }

    var type=this.Base.getMyData().type
    var shoporderApi = new ShoporderApi()
    var wechatApi =new WechatApi()
    if (type=='B') {
      shoporderApi.shoporderadd2({
        addresname,mobile,address,detailed,remarks,str
      },(res)=>{
        if (res.code==0) {
          that.Base.toast('提交成功')
          wechatApi.prepay2({
            id:res.return
          },(payret)=>{
            payret.complete=function (e){
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




        //    wx.navigateTo({
        //   url: '/pages/paysucsses/paysucsses',
        // })
  
        }else{
          that.Base.toast(res.return)
        }
  
      })


      return
      
    }



   
    shoporderApi.shoporderadd({
      addresname,mobile,address,detailed,remarks,str
    },(res)=>{
      if (res.code==0) {

        that.Base.toast('提交成功')
        wechatApi.prepay2({
          id:res.return
        },(payret)=>{
          payret.complete=function (e){
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
        
      //    wx.navigateTo({
      //   url: '/pages/paysucsses/paysucsses',
      // })

      }else{
        that.Base.toast(res.return)
      }

    })





     

  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;

body.tijiao= content.tijiao;
body.xzaddres = content.xzaddres;

Page(body)