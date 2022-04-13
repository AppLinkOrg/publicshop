// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { FeedbackApi } from "../../apis/feedback.api.js";


class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    wx.setNavigationBarTitle({
      title: '意见反馈',
    })

    this.Base.setMyData({
        link:'',opinion:''
    })


  }
  onMyShow() {
    var that = this;
  }
  tijiao(){
      var link = this.Base.getMyData().link
      var opinion=this.Base.getMyData().opinion
      if(link==''){
          wx.showToast({
            title: '留下联系方式，更可能解决问题～',
            icon:'none'
          })
          return
      }
      if(opinion==''){
        wx.showToast({
            title: '留下写下你的反馈内容',
            icon:'none'
          })
          return
      }


      var feedbackApi = new FeedbackApi()
      feedbackApi.feedbackadd({
        link,opinion
      },(res)=>{
          if (res.code==0) {
            wx.showToast({
                title: '提交成功',
                icon:'none'
              })
              this.Base.setMyData({link:'',opinion:''})
          }else{
            wx.showToast({
                title: '提交失败',
                icon:'none'
              })
          }

      })




  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;

body.tijiao = content.tijiao;
Page(body)