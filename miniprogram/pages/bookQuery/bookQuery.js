// miniprogram/pages/bookQuery/bookQuery.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    query:"",
    list:[]
  },
  upper(){
    console.log("滚动到顶部了")
  },
  lower(){
    console.log("滚动到底部了")
  },
  scroll(){
    console.log("滚动时触发")
  },
  goDetail(e){
    console.log(e.target.dataset.id);
    wx.navigateTo({
      url: '../bookDetail/bookDetail?id=' + e.target.dataset.id,
    })
  },
  bindInput(e){
    this.setData({
      query: e.detail.value
    })
  },
  bindquery(){
   wx.showLoading({
     title: '正在查询',
   })
   wx.cloud.callFunction({
     name:"selectBook",
     data:{
       query: this.data.query
     },
     success: res =>{
       wx.hideLoading();
       console.log(res)
       this.setData({
         list: res.result.data
       })
     },
     fail: err =>{
      console.log(err)
     }
   })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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