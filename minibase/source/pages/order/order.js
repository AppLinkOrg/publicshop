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
        list:[
            {id:1, name:'全部'},{id:2, name:'待付款'},{id:3, name:'待发货'},{id:4, name:'待收货'},{id:5, name:'退款/售后'}
        ],
        select:0
    })
  }
  onMyShow() {
    var that = this;
  }
  xz(e){
    var id = e.currentTarget.id
  
    this.Base.setMyData({select:id})

}
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;

body.xz = content.xz;
Page(body)