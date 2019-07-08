<template>
  <div class="group-main">
    <div class="lr_nb">
      <div class="slider_wrap line">
        <div class="wx_items">
          <div class="item_cell current">
            <span>类型一</span>
          </div>
          <div class="item_cell">
            <span>类型二</span>
          </div>
          <div class="item_cell">
            <span>类型三</span>
          </div>
          <div class="item_cell">
            <span>类型四</span>
          </div>
          <div class="item_cell">
            <span>类型五</span>
          </div>
          <div class="item_cell">
            <span>类型六</span>
          </div>
          <div class="item_cell">
            <span>类型七</span>
          </div>
          <div class="item_cell">
            <span>类型八</span>
          </div>
        </div>
      </div>
    </div>
    <div class="lr_nb_after"></div>
  </div>
</template>

<script>
  export default {
    name: "RollBarXTest"
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .group-main {
    height: 100%;
    width: 100%;
    /*滚动水平导航栏 start*/
    .lr_nb {
      border-bottom: 1px solid #E8E8E8;
      border-top: 1px solid #E8E8E8;
      height: 40px;
      line-height: 40px;
      width: 100%;
      position: absolute;
      background: #fff;
      padding: 0px 10px;
      box-sizing: border-box;
      z-index: 1;
      max-width: 1080px;
      opacity: 1;
      top: 0;
      -webkit-transition: .3s all;
      transition: .3s all
    }

    .lr_nb .slider_wrap.line {
      overflow: hidden;
      overflow-x: scroll;
      width: 100%;
      -webkit-overflow-scrolling: touch;
    }

    .lr_nb .slider_wrap.line .item_cell {
      display: inline-block;
      margin: 0px 10px;;
      overflow: hidden;
      position: relative;
    }

    .lr_nb .slider_wrap.box {
      overflow: hidden;
      width: 100%
    }

    .lr_nb .slider_wrap::-webkit-scrollbar {
      display: none
    }

    .lr_nb .wx_items {
      white-space: nowrap
    }

    .lr_nb .wx_items span {
      color: #666;
      font-size: 15px;
      white-space: nowrap;
      display: block;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      text-align: center;
      cursor: pointer
    }

    .lr_nb .wx_items .current span, .lr_nb .wx_items .current a:visited, .lr_nb .wx_items .current a:link, .lr_nb .wx_items .current a:hover, .lr_nb .wx_items .current a:focus {
      color: #4fbeab;
    }

    .lr_nb_after {
      height: 40px;
      display: block;
      clear: both;
    }
  }
  ::-webkit-scrollbar {
    display: none
  }
</style>
