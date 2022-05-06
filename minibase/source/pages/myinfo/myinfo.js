// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { MemberApi } from "../../apis/member.api.js";


class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    wx.setNavigationBarTitle({
      title: '个人信息',
    })
    this.Base.setMyData({
      list:[
        {id:0,name:'未知'},{id:1,name:'男'},{id:2,name:'女'}
      ],gender:'',gender_id:0
    })
  }
  onMyShow() {
    var that = this;

    var memberapi = new MemberApi();
        memberapi.info({}, (info) => {
          console.log(info,'memberinfo');
          if(info!=null){
            this.Base.setMyData({gender:info.gender_name})
          }
      })



   

    
  }
  xbbind(e){
    var index= e.detail.value
    var list =this.Base.getMyData().list

    var gender = list[index]['name'];
    var gender_id=list[index]['id'];
    

    var memberapi = new MemberApi();
    memberapi.update3({
      type:'A',gender_id
    },(res)=>{
      if (res.code==0) {
        this.Base.setMyData({gender,gender_id})
      }else{
        that.Base.toast('修改失败')
      }

    })



    console.log(e,'e');
    // model:value="{{memberinfo.gender_name}}  "
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;

body.xbbind = content.xbbind;
Page(body)