// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { LeaselunboApi } from "../../apis/leaselunbo.api.js";
import { LeaseclassApi } from "../../apis/leaseclass.api.js";
import { LeaseApi } from "../../apis/lease.api.js";


class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
        leaselunbolist:[],autoplay:false,leaseclasslist:[],xzshow:0,leaselist:[]
    })
  }
  onMyShow() {
    var that = this;


    // 轮播
    var leaselunboApi = new LeaselunboApi()
    leaselunboApi.leaselunbolist({},(res)=>{
        var autoplay=false
        if (res.length>1) {
          autoplay=true
       
        }else{
          autoplay=false
        }

        this.Base.setMyData({
            leaselunbolist:res,autoplay
        })
    })

    // 分类
    var leaseclassApi = new LeaseclassApi()
    leaseclassApi.leaseclasslist({},(res)=>{
        this.Base.setMyData({
            leaseclasslist:res
        })
        this.list()
    })


  
  }

  xz(e){
    var  index=  e.currentTarget.dataset['index'];
    this.Base.setMyData({xzshow:index})
    this.list()
  }
  list(){
    var xzshow = this.Base.getMyData().xzshow
    var leaseclasslist = this.Base.getMyData().leaseclasslist
    var leaseclass_id=leaseclasslist[xzshow]['id'];



    var leaseApi =new LeaseApi()
    leaseApi.leaselist({leaseclass_id},(res)=>{
      this.Base.setMyData({
        leaselist:res
    })
    })
    
  }
  detail(e){
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/leasedetail/leasedetail?id='+id,
    })

  }



}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;

body.detail = content.detail;
body.xz = content.xz;
body.list = content.list;

Page(body)