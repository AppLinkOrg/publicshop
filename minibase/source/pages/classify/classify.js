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
      
      orderstatus:0,wh:160
    })
  }
  onMyShow() {
    var that = this;



  }
  bindchoose(e){
      var that = this;
      this.Base.setMyData({
          
          orderstatus:e.currentTarget.dataset.index
      })
  }
  changeWidth(e){
    var length = e.detail.value.length
    var wh=length*20
    // this.Base.setMyData({wh})
    console.log('changeWidth',e);
    // let input = document.getElementById("myInput");
    // input.size = input.value.length > 4 ? input.value.length : 4;
  }


}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindchoose = content.bindchoose;

body.changeWidth = content.changeWidth;
Page(body)