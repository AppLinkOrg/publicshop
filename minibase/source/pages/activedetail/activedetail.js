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
      title: '活动详情',
    })
    this.Base.setMyData({
        activedetail:null,autoplay:false
    })

  }
  onMyShow() {
    var that = this;

    // 活动详情
    var activeApi = new ActiveApi()
    activeApi.activedetail({
        id:this.Base.options.id
    },(res)=>{
        var autoplay=false
        if (res.imglist.length>1) {
            autoplay=true
        }else{
            autoplay=false

        }


        this.Base.setMyData({activedetail:res,autoplay})

    })

  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;
Page(body)