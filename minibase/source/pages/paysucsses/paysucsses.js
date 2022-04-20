// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      amount:0
    })

  }
  onMyShow() {
    
    var that = this;
    this.Base.setMyData({amount:this.Base.options.amount})


  }
  xq(){
  
      wx.navigateTo({
        url: '/pages/order/order',
      })
      
    

  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;

body.xq = content.xq;

Page(body)