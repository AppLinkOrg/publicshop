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
      title: '物流信息',
    })
    this.Base.setMyData({
      dataList:[
        {
          content:'【广州市】快件到达驿站请及时领取',
          time:'12-22 12:23'
        },
        {
          content:'快件正在派送',
          time:'12-22 12:23'
        }
      ]

    })

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