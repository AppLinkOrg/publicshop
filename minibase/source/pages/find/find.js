// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { ActiveApi } from "../../apis/active.api.js";
import { LunboApi } from "../../apis/lunbo.api.js";
import { ConsultApi } from "../../apis/consult.api.js";
import { ApiUtil } from "../../apis/apiutil.js";
import { CaselunboApi } from "../../apis/caselunbo.api.js";
import { CaseApi } from "../../apis/case.api.js";


class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
        titlelist:[
            {
            id:1,
            name:'干货'
        },{
            id:2,
            name:'活动'
        },{
            id:3,
            name:'案例'
        },
    ],
    select:0,activelist:[],lunbolist:[],autoplay:false,consultlist:[],caselunbolist:[],autoplay2:false,caselist:[]
    })


    wx.setNavigationBarTitle({
      title: '发现',
    })

  }
  onMyShow() {
    var that = this;
   this.xzlist()
   
  }
  hdlist(){
 // 活动列表
 var activeApi = new ActiveApi()
 activeApi.activelist({},(res)=>{
     this.Base.setMyData({activelist:res})
     console.log(res,'res');
 })
  }
  lblist(){
      var lunboApi = new LunboApi()
      lunboApi.lunbolist({},(res)=>{
          var autoplay =false
          if(res.length>1){
            autoplay=true
          }else{
            autoplay=false
          }
        this.Base.setMyData({lunbolist:res,autoplay})
      })


      var consultApi = new ConsultApi()
      consultApi.consultlist({},(res)=>{
          for(let item of res){
              var startDate = item.publish_time
              startDate= startDate.replace(new RegExp("-","gm"),"/");
    var startDateM = (new Date(startDate)).getTime(); 
    // var apiUtil = new ApiUtil()
    item.shuju=ApiUtil.TimeAgo(startDateM/ 1000)
    console.log(startDateM,'startDateM');

          }
          

          this.Base.setMyData({consultlist:res})
      })




  }
  allist(){
      var caselunboApi = new CaselunboApi()
      caselunboApi.caselunbolist({},(res)=>{
        var autoplay2 =false
        if(res.length>1){
            autoplay2=true
        }else{
            autoplay2=false
        }
      this.Base.setMyData({caselunbolist:res,autoplay2})
      })

      var caseApi =new CaseApi()
      caseApi.caselist({},(res)=>{
        for(let item of res){
            var startDate = item.publish_time
            startDate= startDate.replace(new RegExp("-","gm"),"/");
  var startDateM = (new Date(startDate)).getTime(); 
  // var apiUtil = new ApiUtil()
  item.shuju=ApiUtil.TimeAgo(startDateM/ 1000)
  console.log(startDateM,'startDateM');

        }
        

        this.Base.setMyData({caselist:res})
      })

  }

  xq(e){
      var id = e.currentTarget.id;
      if (id>0) {
          wx.navigateTo({
            url: '/pages/activedetail/activedetail?id='+id,
          })
          
      }

  }
  xz(e){
      var id = e.currentTarget.id
      if (id==1) {
          this.hdlist() 
      }
      if(id==0){
          this.lblist()
      }
      if (id==2) {
          this.allist()
          
      }
      this.Base.setMyData({select:id})

  }

  xzlist(){
    var select = this.Base.getMyData().select
    if (select==1) {
        this.hdlist() 
    }
    if(select==0){
        this.lblist()
    }
    if (select==2) {
        this.allist()
    }

}
  ghxq(e){
    var id = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/finddetail/finddetail?id='+id+'&type=A',
    })


  }
  ghxq2(e){
    var id = e.currentTarget.id
    wx.navigateTo({
        url: '/pages/finddetail/finddetail?id='+id+'&type=B',
      })
  }
  ganhuo(e){

    var item = e.currentTarget.dataset['item'];
    var consult_id = item.consult_id;

    if(consult_id>0){
      wx.navigateTo({
        url: '/pages/finddetail/finddetail?id='+consult_id,
      })
    }
  }
  
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;

body.xzlist = content.xzlist;
body.ganhuo = content.ganhuo;
body.allist = content.allist;
body.ghxq2 = content.ghxq2;
body.ghxq = content.ghxq;
body.lblist = content.lblist;
body.xq = content.xq;
body.xz = content.xz;
body.hdlist = content.hdlist;

Page(body)