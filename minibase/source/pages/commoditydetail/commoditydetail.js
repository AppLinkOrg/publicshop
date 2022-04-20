// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { ActiveApi } from "../../apis/active.api.js";


class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    wx.setNavigationBarTitle({
      title: '商品详情',
    })
    this.Base.setMyData({
      showDialog:false,
      flag:false,
      buttom_flag:false,
      show:false
    })

  }
  onMyShow() {
    var that = this;

  }

  toggleDialog(e) {
    this.Base.setMyData({
      showDialog: !this.data.showDialog,
      flag:!this.data.flag
    });
  }
  toggleDialog_buttom(e) {
    this.Base.setMyData({
      show: !this.data.show,
      buttom_flag:!this.data.buttom_flag
    });
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;
body.toggleDialog = content.toggleDialog;
body.toggleDialog_buttom=content.toggleDialog_buttom;
Page(body)