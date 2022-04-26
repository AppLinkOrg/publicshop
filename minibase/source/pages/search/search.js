// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { ShopApi } from "../../apis/shop.api.js";


class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      summary:''
    })
  }
  onMyShow() {
    var that = this;
    
  }
  sousuo(){
    var summary = this.Base.getMyData().summary

    var shopApi = new ShopApi()
    shopApi.shoplist2({
      summary
    },(res)=>{
      this.Base.setMyData({shoplist2:res})

    })

  }
  tuijain(e){
    var id=e.currentTarget.id
    wx.navigateTo({
      url: '/pages/commoditydetail/commoditydetail?id='+id,
    })

  }


}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;

body.tuijain = content.tuijain;
body.sousuo = content.sousuo;
Page(body)