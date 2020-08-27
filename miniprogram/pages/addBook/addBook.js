// miniprogram/pages/addBook.js
const BOOKS_TYPES = ["散文","小说","传记","说明文"];
const BOOKS_TAGS = ["优美","真实","枯燥"];
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:"",
    id:"",//如果传过来有id参数 则是修改信息
    isIn:false,
    types:BOOKS_TYPES,
    type:"",
    title:"",
    author:"",
    tagsArr: BOOKS_TAGS,
    tags:[],
    desc:"",
    checkBoolArr:new Array(BOOKS_TAGS.length).fill(false),//控制复选框回显时的选中
  },
  
  // 改变Switch
  bindSwitch(e){
   this.setData({
     isIn: e.detail.value
   })
  },
  // 改变radio
  bindRadio(e){
    this.setData({
      type:e.detail.value
    })
  },
  // 改变checkbox
  bindCheckbox(e){
    this.setData({
      tags:e.detail.value
    })
  },
  // 改变input
  bindInput(e){
    this.setData({
      title:e.detail.value
    })
  },
  bindInputAuthor(e){
    this.setData({
      author: e.detail.value
    })
  },
  // 改变textarea
  bindTextarea(e){
    this.setData({
      desc: e.detail.value
    })
  },
  // 修改
  updateInfo(e){
    wx.showLoading({
      title: '正在修改',
    })
    //  console.log(e.detail.value)
    wx.cloud.callFunction({
      name: "updateBook",
      data: {
        id: this.data.id,
        value: e.detail.value
      },
      success: res => {
        wx.hideLoading();
        wx.redirectTo({
          url: '../bookDetail/bookDetail?id=' + this.data.id
        })
        console.log(res)
      },
      fail: err => {
        wx.showToast({
          title: '更新失败',
        })
        //  console.log(err)
      }
    })
  },
  // 提交
  formSubmit(e){
   if(this.data.id){
     this.updateInfo(e);
     return false;
   }
   wx.showLoading({
     title: '正在录入',
   })
  //  console.log(e.detail.value)
   wx.cloud.callFunction({
     name: "addbook",
     data:e.detail.value,
     success: res =>{
       wx.hideLoading();
       wx.redirectTo({
         url: '../bookDetail/bookDetail?id='+res.result._id
       })
       console.log(res)
     },
     fail: err =>{
       wx.showToast({
         title: '录入失败',
       })
      //  console.log(err)
     }
   })
  },
  // 重置
  formReset(){
   console.log("formreset")
    console.log(this.data.title)
  },
  // 获取详情
  getInfo(id) {
    wx.cloud.callFunction({
      name: "queryBook",
      data: { id },
      success: res => {
        console.log(res);
        const info = res.result.data;
        const arr = BOOKS_TAGS.map(item =>{
          return info.tags.includes(item);
        })
        this.setData({
          isIn: info.isIn,
          type: info.type,
          tags: info.tags,
          title: info.title,
          author: info.author,
          desc: info.desc,
          checkBoolArr: arr
        })
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { id } = options;
    if(id){
      this.setData({
        id
      })
      wx.setNavigationBarTitle({
        title: '修改录入数据',
      })
      this.getInfo(id);
    }
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})