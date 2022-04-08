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
      indexbanner:[],autoplay:false
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


  }


}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
Page(body)