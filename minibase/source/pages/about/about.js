// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { AboutusApi } from "../../apis/aboutus.api.js";


class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    wx.setNavigationBarTitle({
      title: '关于我们',
    })
    this.Base.setMyData({
        aboutusdetail:[]
    })

  }
  onMyShow() {
    var that = this;

    var aboutusApi = new AboutusApi()
    aboutusApi.aboutusdetail({id:1},(res)=>{
        this.Base.setMyData({
            aboutusdetail:res
        })

    })



  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;
Page(body)