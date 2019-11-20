// pages/pages/orderSearch/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    steps: [
      {
        text: '师傅已与你联系，如有疑问请联系客服',
        desc: '06-12 10:30'
      },
      {
        text: '您的申请已通过审核',
        desc: '06-12 10:30'
      },
      {
        text: '您已提交报修申请，正在等待审核',
        desc: '06-12 10:30'
      }
    ],
    show: {
      bottom: false
    },
    value: 1

  },
  onChange(event) {
    const { key } = event.currentTarget.dataset;
    this.setData({
      [key]: event.detail
    });
  },
  toggle(type, show) {
    this.setData({
      [`show.${type}`]: show
    });
  },
  showBottom() {
    this.toggle('bottom', true);
  },

  hideBottom() {
    this.toggle('bottom', false);
  },
  hideModel(){
    this.toggle('bottom', false);
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