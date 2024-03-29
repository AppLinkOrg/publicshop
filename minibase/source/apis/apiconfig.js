export class ApiConfig {

  static GetApiUrl() {
    return "https://shenlongcms.zxtriple.com/api/";
  }
  static GetUploadPath() {
    return "https://zxchenlong.oss-accelerate.aliyuncs.com/";
  }
  static GetFileUploadAPI() {
    return "https://shenlongcms.zxtriple.com/fileupload";
  }

  // static GetApiUrl() {
  //   return "https://cmsdev.app-link.org/alucard263096/publicshop/api/";
  // }
  // static GetUploadPath() {
  //   return "https://alioss.app-link.org/alucard263096/publicshop/";
  // }
  // static GetFileUploadAPI() {
  //   return "https://cmsdev.app-link.org/alucard263096/publicshop/fileupload";
  // }

  static GetHeader() {
    var headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'UNICODE': ApiConfig.UNICODE,
      'TOKEN': ApiConfig.TOKEN
    };
    return headers;
  }
  static UNICODE = "";
  static SetUnicode(unicode) {
    ApiConfig.UNICODE = unicode;
  }
  static TOKEN = "";
  static SetToken(token) {
    ApiConfig.TOKEN = token;
  }

  static showLoadingCounter = 0;
  static ShowLoading = function () {
    return;
    if (ApiConfig.showLoadingCounter == 0) {
      wx.showLoading({
        title: '加载中',
      });
    }
    ApiConfig.showLoadingCounter = ApiConfig.showLoadingCounter + 1;
  }

  static CloseLoading = function () {
    return;
    ApiConfig.showLoadingCounter = ApiConfig.showLoadingCounter - 1;
    if (ApiConfig.showLoadingCounter == 0) {
      console.log(ApiConfig.showLoadingCounter);
      wx.hideLoading();
    }
  }




}