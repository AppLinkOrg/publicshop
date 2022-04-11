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
    // wx.setNavigationBarTitle({
    //   title: '帮助中心',
    // })
    // wx.setBackgroundColor({
    //     backgroundColorTop: '#FEF5F6', // 顶部窗口的背景色为白色
    //     backgroundColorBottom: '#FEF5F6', // 底部窗口的背景色为白色
    //   })
    // wx.setBackgroundColor({
    //     backgroundColorTop: '#FEF5F6',
    // })
    

  }
  onMyShow() {
    var that = this;
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;
Page(body)