// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { ActivelunboApi } from "../../apis/activelunbo.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      indexbanner:[],autoplay:false,autoplay2:false,activelunbolist:[]
    })
  }
  onMyShow() {
    var that = this;

    var instApi = new InstApi()
    instApi.indexbanner({},(res)=>{
      var autoplay=false
      if (res.length>1) {
        autoplay=true
     
      }else{
        autoplay=false
      }
      this.Base.setMyData({indexbanner:res,autoplay})

    })

// 活动
    var activelunboApi = new ActivelunboApi()
    activelunboApi.activelunbolist({},(res)=>{
      var autoplay2=false
      if (res.length>1) {
        autoplay2=true
     
      }else{
        autoplay2=false
      }
      this.Base.setMyData({activelunbolist:res,autoplay2})
    })


  }


}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
Page(body)