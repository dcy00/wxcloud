// pages/booksList/booksList.js
// 列表页面 下拉刷新 上拉加载 删除对应项
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList();
  },
  del(e){
    const id = e.target.dataset.id;
    wx.showLoading({
      title: '正在删除',
    })
    wx.cloud.callFunction({
      name:"delBook",
      data:{
        id
      },
      success: res =>{
        wx.hideLoading();
        let arr = this.data.list;
        const index  = arr.findIndex((item)=>{return item._id === id;})
        arr.splice(index,1);
        this.setData({
          list: arr
        })
      },
      fail: err=>{
        console.log(err)
      }
    })
  },
  getList(){
    wx.showLoading({
      title: '正在加载',
    })
    let page = this.data.page;
    wx.cloud.callFunction({
      name:"getBookList",
      data: {
        page
      },
      success: res=>{
        wx.hideLoading();
        console.log(res)
        wx.stopPullDownRefresh();
        const list = res.result.data;
        if (list.length == 0 ){
          wx.showToast({
            title: '没有更多了',
          })
          return false;
        }
        this.setData({
          list: list.concat(this.data.list),
          page: page + 1
        })
      },
      fail: err =>{
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
    this.setData({
      page: 1,
      list:[]
    })
    console.log("下拉了")
    // 2.2.3支持
    // wx.nextTick(()=>{
    //   this.getList();
    // })
    setTimeout(()=>{
      this.getList();
    },0)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
     this.getList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})