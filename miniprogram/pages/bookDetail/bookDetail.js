// pages/bookDetail/bookDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 当前book id
    id: "",
    // 当前book 信息
    info:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { id } = options;
    if(!id){
      wx.showToast({
        title: '请从列表进入详情',
      })
    }
    this.setData({
      id
    })
    this.getInfo(id);
  },
 
  getInfo(id){
    wx.cloud.callFunction({
      name: "queryBook",
      data:{id},
      success:res=>{
        console.log(res);
        this.setData({
          info: JSON.stringify(res.result.data)
        })
      },
      fail:err=>{
        console.log(err)
      }
    })
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