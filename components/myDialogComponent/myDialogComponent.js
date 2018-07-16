Component({
  properties: {
    inputPlaceHalder: {
      type: String,
      value: ' ',
    },

    inputHidden: {
      type: Boolean,
      value: true
    },

    dialogHidden: {
      type: Boolean,
      value: true
    },

    // 这里定义了innerText属性，属性值可以在组件使用时指定
    titleText: {
      type: String,
      value: '提示'
    },

    titleMsg: {
      type: String,
      value: ' '
    },

    inputMsg: {
      type: String,
      value: '请输入你特么想干嘛'
    },

    // 确定
    determineBtn: {
      type: String,
      value: 'default value'
    },

    // 取消
    cancleBtn: {
      type: Boolean,
      value: true
    }

  },

  data: {
    inputValue: '',
    onCancleClick: false
  },

  methods: {
    // 输入值 
    bindKeyInput: function (e) {
      this.SetData({
        inputValue: e.detail.value
      })
    },

    // 这里是一个自定义方法，取消
    cancleBtn: function () {
      console.log('点击取消按钮');
      this.setData({
        dialogHidden: true
      })
    },

    // 确定
    determineBtn: function () {
      var determineDetail = this.data.inputValue; // detail对象， 提供给事件监听函数

      this.triggerEvent('determineevent', determineDetail);
      this.setData({
        inputValue: ''
      })

    }
  }

})