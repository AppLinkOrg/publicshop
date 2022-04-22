// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { AddresApi } from "../../apis/addres.api.js";
import { CartApi } from "../../apis/cart.api.js";

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
        addresdetail:null,cartdetail:[],amount:0
    })

    var amount=0
    amount=amount.toFixed(2)
    this.Base.setMyData({amount})

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

    // 商品详情
    var cartApi = new CartApi()
    cartApi.cartdetail({
        str:this.Base.options.str
    },(res)=>{
        var amount=0
        for (let item of res) {
            amount=amount+item.cart_num*item.pricelist_present
        }
        amount=amount.toFixed(2)
        this.Base.setMyData({cartdetail:res,amount})
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
      wx.navigateTo({
        url: '/pages/paysucsses/paysucsses',
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