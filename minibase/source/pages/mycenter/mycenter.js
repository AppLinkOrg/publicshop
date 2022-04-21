// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { MyposterApi } from "../../apis/myposter.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    wx.setNavigationBarTitle({
      title: '我的',
    })
    this.Base.setMyData({
        myposterlist:[],autoplay:false
    })

  }
  onMyShow() {
    var that = this;

    var myposterApi = new MyposterApi()
    myposterApi.myposterlist({},(res)=>{
        var autoplay = false
        if(res.length>1){
            autoplay=true
        }else{
            autoplay=false
        }
        this.Base.setMyData({
            myposterlist:res,autoplay
        })

    })


  }
  orderxq(e){
    var id = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/order/order?num='+id,
    })

  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;

body.orderxq = content.orderxq;
Page(body)