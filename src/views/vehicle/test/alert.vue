<template>
  <div>
    <input type="button" name="popBox" value="弹出框" @click="popBox()">
    <div id="popLayer"></div>
    <div id="popBox">
      <div class="close">
        <a href="javascript:void(0)" @click="closeBox()">关闭</a>
      </div>
      <div class="content">我是弹出层</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'test3',
  methods: {
    popBox () {
      var popBox = document.getElementById('popBox')
      var popLayer = document.getElementById('popLayer')
      popBox.style.display = 'block'
      popLayer.style.display = 'block'
    },
    /* 点击关闭按钮 */
    closeBox () {
      var popBox = document.getElementById('popBox')
      var popLayer = document.getElementById('popLayer')
      popBox.style.display = 'none'
      popLayer.style.display = 'none'
    }
  },
  mounted() {
    console.log('$test123', this.$test123);
    console.log('test333', window.test333);
  }
}
</script>

<style scoped>
  /*背景层*/
  #popLayer {
    display: none;
    background-color: #B3B3B3;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    -moz-opacity: 0.8;
    opacity:.80;
    filter: alpha(opacity=80);/* 只支持IE6、7、8、9 */
  }

  /*弹出层*/
  #popBox {
    display: none;
    background-color: #FFFFFF;
    z-index: 11;
    width: 200px;
    height: 200px;
    position:fixed;
    top:0;
    right:0;
    left:0;
    bottom:0;
    margin:auto;
  }

  #popBox .close{
    text-align: right;
    margin-right: 5px;
    background-color: #F8F8F8;
  }

  /*关闭按钮*/
  #popBox .close a {
    text-decoration: none;
    color: #2D2C3B;
  }

</style>
