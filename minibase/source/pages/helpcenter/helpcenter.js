// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { ProblemApi } from "../../apis/problem.api.js";



class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);

    this.Base.setMyData({
      problemlist:[]
    })
    // wx.setNavigationBarTitle({
    //   title: '帮助中心',
    // })
    // wx.setBackgroundColor({
    //     backgroundColorTop: '#FEF5F6', // 顶部窗口的背景色为白色
    //     backgroundColorBottom: '#FEF5F6', // 底部窗口的背景色为白色
    //   })
    // wx.setBackgroundColor({
    //     backgroundColorTop: '#FEF5F6',
    // })
    

  }
  onMyShow() {
    var that = this;

    var problemApi = new ProblemApi()
    problemApi.problemlist({},(res)=>{
      for(let item of res){
        item.show=false
      }
      this.Base.setMyData({
        problemlist:res
      })
    })


  }
  zhankai(e){
    var index= e.currentTarget.dataset.index
    console.log(e,'e',index);
    var problemlist = this.Base.getMyData().problemlist
    if (problemlist[index].show==false) {
      problemlist[index].show=true
    }else{
      problemlist[index].show=false
    }

    this.Base.setMyData({problemlist})

  }


}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;

body.zhankai = content.zhankai;

Page(body)