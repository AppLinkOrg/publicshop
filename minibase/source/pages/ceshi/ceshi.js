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
  }
  onMyShow() {
    var that = this;
  }
  savePhoto(){
    let that = this
    var erwema = ApiConfig.GetApiUrl()+"inst/qrcode2?inst_id=1&url=%2Fpages%2Fmycenter%2Fmycenter%3Fid%3D"+this.Base.getMyData().memberinfo.id;
    var inst_name=this.Base.getMyData().instinfo.name
    var introduce=this.Base.getMyData().instinfo.introduce

     // 创建画布对象
     const ctx = wx.createCanvasContext("myCanvas", that)

     wx.getImageInfo({
       src:erwema ,
       success:function(res){
        console.log(" 绘制二维码》》》", res)
        let imgH=100
        let imgW=100
        let imgPath = res.path

        that.setData({
          canvasHeight: 400,
          canvasWidth: 300,
        })
        let width=res.width
        let height=res.height
        
        ctx.drawImage(imgPath, 100, 50, imgH, imgW)



        ctx.setFontSize(14)
        ctx.setFillStyle('#333');
        ctx.font = 'normal bold 14px Arial,sans-serif '
        ctx.fillText(inst_name,100,200)

        ctx.setFontSize(14)
        ctx.setFillStyle('#333');
        ctx.font = 'normal bold 14px Arial,sans-serif '
        ctx.fillText(introduce,100,200)




     

        ctx.draw()

        // that.xiazai()

       }
     })






  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;

body.savePhoto = content.savePhoto;

Page(body)