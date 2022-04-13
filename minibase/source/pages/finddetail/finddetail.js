// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { ConsultApi } from "../../apis/consult.api.js";
import { CaseApi } from "../../apis/case.api.js";

var WxParse = require('../../wxParse/wxParse');


class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    wx.setNavigationBarTitle({
      title: '干货详情',
    })
    this.Base.setMyData({
        consultdetail:null
    })
    
    var consultApi = new ConsultApi()
    if (this.Base.options.type=='A') {
       // 观看人数加1
     consultApi.audienceadd({id:this.Base.options.id,type:'A'},(res)=>{

    })
    }else{
      consultApi.audienceadd({id:this.Base.options.id,type:'B'},(res)=>{

      })
    }
    




  }
  onMyShow() {
    var that = this;


    

    if (this.Base.options.type=='A') {
        var consultApi = new ConsultApi()
        consultApi.consultdetail({id:this.Base.options.id},(res)=>{

            res.content=that.Base.util.HtmlDecode(res.content);
            WxParse.wxParse('content', 'html', res.content, that, 10);
            this.Base.setMyData({consultdetail:res})
        })

       

        
    }else{
        var caseApi = new CaseApi()
        caseApi.casedetail({id:this.Base.options.id},(res)=>{
            res.content=that.Base.util.HtmlDecode(res.content);
            WxParse.wxParse('content', 'html', res.content, that, 10);
            this.Base.setMyData({consultdetail:res})
        })

    }

    






  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;
Page(body)