// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { AddresApi } from "../../apis/addres.api.js";


class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    wx.setNavigationBarTitle({
      title: '收货地址',
    })
    this.Base.setMyData({
      addreslist:[]
    })
    
    
  }
  onMyShow() {
    var that = this;

    var addresApi = new AddresApi()
    addresApi.addreslist({},(res)=>{
      this.Base.setMyData({
        addreslist:res
      })

    })


  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;
Page(body)