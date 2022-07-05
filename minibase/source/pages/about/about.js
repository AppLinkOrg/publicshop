// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { AboutusApi } from "../../apis/aboutus.api.js";
var WxParse = require('../../wxParse/wxParse');


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
      res.content = that.Base.util.HtmlDecode(res.content);
      console.log( res.content,' res.content');
      WxParse.wxParse('content', 'html', res.content, that, 10);

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