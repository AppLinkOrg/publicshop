// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { ContentApi } from "../../apis/content.api.js";
var WxParse = require('../../wxParse/wxParse');

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);

    this.Base.setMyData({
        contentlist:null
    })

  }
  onMyShow() {
    var that = this;

    var contentApi = new ContentApi()
    contentApi.contentlist({
        id:this.Base.options.id
    },(res)=>{
        res.content=that.Base.util.HtmlDecode(res.content);
        WxParse.wxParse('content', 'html', res.content, that, 10);
        this.Base.setMyData({contentlist:res})

        if (res!=null) {
            wx.setNavigationBarTitle({
              title: res.name,
            })
            
        }

    })



  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;
Page(body)