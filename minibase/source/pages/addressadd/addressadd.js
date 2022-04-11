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
    if (this.Base.options.id==undefined) {
        wx.setNavigationBarTitle({
            title: '添加收货地址',
          })
    }else{
        wx.setNavigationBarTitle({
            title: '编辑收货地址',
          })

    }
    
    this.Base.setMyData({
        more:false,name:'',mobile:'',address:'',detailed:'',type:'A',addresdetail:null,
    })
  }
  onMyShow() {
    var that = this;

    var type ='A'

    if (this.Base.options.id==undefined) {
        type='A'
    }else{
        type='B'

        var addresApi = new AddresApi()
        addresApi.addresdetail({id:this.Base.options.id},(res)=>{
            var more
            if(res.more_value=='Y'){
                more=true
            }else{
                more=false
            }

            this.Base.setMyData({addresdetail:res,name:res.name,mobile:res.mobile,address:res.address,detailed:res.detailed,more})

        })




    }
    this.Base.setMyData({type})

  }
  qiehuan(e){
      this.Base.setMyData({more:e.detail.value})

  }
  changeares(e){
     this.Base.setMyData({address:e.detail.value})
console.log(e,'e');
  }
  baocun(){
      var name = this.Base.getMyData().name
      var mobile = this.Base.getMyData().mobile
      var address = this.Base.getMyData().address
      var detailed = this.Base.getMyData().detailed
      var more = this.Base.getMyData().more
      var more2='N'
      if(more==true){
        more2='Y'
      }else{
        more2='N' 
      }
      console.log(name,'name');
    //   return
      if (name=='') {
          wx.showToast({
            title: '请填写收货人姓名',
            icon:'none'
          })
          return 
      }
      if (mobile=='') {
        wx.showToast({
          title: '请填写收货人手机号',
          icon:'none'
        })
        return 
    }
    if (mobile.length!=11 ) {
        wx.showToast({
          title: '请填写正确的收货人手机号',
          icon:'none'
        })
        return 
    }
    if (address=='') {
        wx.showToast({
          title: '请填写收货地址',
          icon:'none'
        })
        return 
    }
    if (detailed=='') {
        wx.showToast({
          title: '请填写详细地址',
          icon:'none'
        })
        return 
    }

    var id = 0;
    if (this.Base.options.id==undefined) {
        
    }else{
        id=this.Base.options.id
    }

    var addresApi = new AddresApi()
    addresApi.addresadd({
        name,mobile,address,detailed,more:more2,id
    },(res)=>{
        if (res.code==0) {
            wx.showToast({
                title: '保存成功',
              })
            wx.navigateBack({
                delta: 1
              });
        
            
        }else{
            wx.showToast({
              title: '保存失败',
            })
        }

    })

    




  }
  shanchu(){
    var addresApi = new AddresApi()
    var that = this
    wx.showModal({
        content: '是否确定删除订单？',
        success(ress){
            if (ress.confirm) {
                addresApi.addresup({
                    id:that.Base.options.id,
                    type:'A'
                },(res)=>{
                    if (res==0) {
                        wx.showToast({
                          title: '删除成功',
                        })
                        wx.navigateBack({
                            delta: 1
                          });
                        
                    }else{
            
                    }
            
                })

            } else if (ress.cancel) {
          console.log('用户点击取消')
        }

        }
    })
  

  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;

body.shanchu = content.shanchu;
body.baocun = content.baocun;
body.changeares = content.changeares;
body.qiehuan = content.qiehuan;

Page(body)