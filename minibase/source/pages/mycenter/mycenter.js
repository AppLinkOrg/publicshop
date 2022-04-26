// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { MyposterApi } from "../../apis/myposter.api.js";
import { RecommendApi } from "../../apis/recommend.api.js";


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
        myposterlist:[],autoplay:false,recommendlist:[],shoreshow:false
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

  // 人气推荐
  var recommendApi = new RecommendApi()
  recommendApi.recommendlist({},(res)=>{
    this.Base.setMyData({recommendlist:res})
  })


  }
  orderxq(e){
    var id = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/order/order?num='+id,
    })

  }
  tuijain(e){
    var id = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/commoditydetail/commoditydetail?id='+id,
    })
   
  }
  close(){
    this.Base.setMyData({shoreshow:false})
  }
  savePhoto(){
    let that = this
    var erwema = ApiConfig.GetApiUrl()+"inst/qrcode2?inst_id=1&url=%2Fpages%2Fmycenter%2Fmycenter%3Fmemberid%3D"+this.Base.getMyData().memberinfo.id;
    var inst_name=this.Base.getMyData().instinfo.name
    var introduce=this.Base.getMyData().instinfo.introduce

     // 创建画布对象
     const ctx = wx.createCanvasContext("myCanvas", that)

     wx.getImageInfo({
       src:erwema ,
       success:function(res){
        console.log(" 绘制二维码》》》", res)
        let imgH=200
        let imgW=200
        let imgPath = res.path

        that.setData({
          canvasHeight: imgH,
          canvasWidth: imgW
        })
        let width=res.width
        let height=res.height
        
        ctx.drawImage(imgPath, 0, 0, imgH, imgW)



        // ctx.setFontSize(14)
        // ctx.setFillStyle('#333');
        // ctx.fillText(inst_name, 100,100)




     

        ctx.draw()
        
        wx.showLoading({
          title: '正在保存',
          mask: true

        })
        that.xiazai()

       }
     })






  }

  xiazai(){
    let that = this
    setTimeout(() => {
      wx.canvasToTempFilePath({
        canvasId: 'myCanvas',
        success: function(res) {
          console.log("合成的带有小程序码的图片success》》》", res)
          let tempFilePath = res.tempFilePath
          // 保存到相册
          wx.saveImageToPhotosAlbum({
            filePath: tempFilePath,
            success(res) {


              wx.hideLoading()
              wx.showModal({
                title: '温馨提示',
                content: '图片保存成功，可在相册中查看',
                showCancel: false,
                success(res) {
                  wx.clear
                  if (res.confirm) {
                    that.setData({
                      isShow: true
                    })
                  }
                }
              })

             
            },

            fail(err) {
              wx.hideLoading()
              　　if(err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg === "saveImageToPhotosAlbum:fail auth deny" || err.errMsg === "saveImageToPhotosAlbum:fail authorize no response") {
    　　　　　　　　　　wx.showModal({
    　　　　　　　　　　　　title: '提示',
    　　　　　　　　　　　　content: '需要您授权保存相册',
    　　　　　　　　　　　　showCancel: false,
    　　　　　　　　　　　　success: modalSuccess => {
    　　　　　　　　　　　　　　wx.openSetting({
    　　　　　　　　　　　　　　　　success(settingdata) {
    　　　　　　　　　　　　　　　　　　if (settingdata.authSetting['scope.writePhotosAlbum']) {
    　　　　　　　　　　　　　　　　　　　　console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
    　　　　　　　　　　　　　　　　　　}else {
    　　　　　　　　　　　　　　　　　　　　console.log('获取权限失败，给出不给权限就无法正常使用的提示')
    　　　　　　　　　　　　　　　　　　}
    　　　　　　　　　　　　　　　　}
    　　　　　　　　　　　　　　})
    　　　　　　　　　　　　}
    　　　　　　　　　　})
    　　　　　　　　}
              console.log(err)
            }
          })

          console.log("合成的带有小程序码的图片的信息》》》", res)
        },
        fail: function(res) {
          console.log("生成的图拍呢 失败 fail fail fail ", res)
          wx.hideLoading()
          wx.showModal({
            title: '温馨提示',
            content: '小程序码图片合成失败，请重试',
            showCancel: false
          })
        }
      }, that)
    },1500)
  }
  shorebind(){
    this.Base.setMyData({shoreshow:true})
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;

body.shorebind = content.shorebind;
body.xiazai = content.xiazai;
body.savePhoto = content.savePhoto;
body.close = content.close;
body.tuijain = content.tuijain;
body.orderxq = content.orderxq;
Page(body)