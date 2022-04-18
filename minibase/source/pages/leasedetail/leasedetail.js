// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { LeaseApi } from "../../apis/lease.api.js";
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
        leasedetail:[],autoplay:false
    })

  }
  onMyShow() {
    var that = this;

    var leaseApi =new LeaseApi()
    leaseApi.leasedetail({id:this.Base.options.id},(res)=>{
        var autoplay=false
        if (res.imglist.length>1) {
          autoplay=true
       
        }else{
          autoplay=false
        }
        res.detail=that.Base.util.HtmlDecode(res.detail);
        WxParse.wxParse('content', 'html', res.detail, that, 10);


        for(let item of res.specslist){
          item.show=0;
        }


        this.Base.setMyData({leasedetail:res,autoplay})
    })



  }
  select(e){
    var  index=  e.currentTarget.dataset['index'];
    var  indexs=  e.currentTarget.dataset['indexs'];
    var leasedetail=this.Base.getMyData().leasedetail
    leasedetail.specslist[index].show=indexs
    this.Base.setMyData({leasedetail})
  }


  
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;

body.select = content.select;

Page(body)