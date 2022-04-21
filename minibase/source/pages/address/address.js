// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { AddresApi } from "../../apis/addres.api.js";


class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    wx.setNavigationBarTitle({
      title: '收货地址',
    })
    this.Base.setMyData({
      addreslist:[],type:''
    })
    
    
  }
  onMyShow() {
    var that = this;

    var addresApi = new AddresApi()
    addresApi.addreslist({},(res)=>{
      this.Base.setMyData({
        addreslist:res
      })

    })


    if (this.Base.options.type!=undefined) {
      this.Base.setMyData({type:this.Base.options.type})
    }


  }
  fanhui(e){
    var id = e.currentTarget.id;
    let pages = getCurrentPages();
    let prevPage =pages[pages.length-2]
    prevPage.setData({
      address_id:id
    })
    wx.navigateBack({
      delta:1
    })
   

    
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;

body.fanhui = content.fanhui;
Page(body)