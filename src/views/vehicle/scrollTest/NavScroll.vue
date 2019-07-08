<template>
  <div class="scroll-main">
    <div id="slider" class="mui-slider">
      <div id="sliderSegmentedControl"
           class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <div class="mui-scroll">
          <a class="mui-control-item" :class="activeNav === index ?  'mui-active' : ''" v-for="(item,index) in navList"
             v-bind:key="index" @click="changeActive(index)">
            {{item}}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        startX: '',
        startY: '',
        moveEndX: '',
        moveEndY: '',
        X: '',
        Y: '',
        muicsroll: undefined,
        muislider: undefined,
        lastX: 0, // 上次所在位置
        posX: 0, // 最终位置 上次所在位置 + 移动的距离 this.X
        activeNav: 0
      };
    },
    props: ['navList'],
    mounted: function() {
      this.muicsroll = document.getElementsByClassName('mui-scroll')[0];
      this.muislider = document.getElementsByClassName('mui-slider')[0];
      this.scroll();
    },
    methods: {
      scroll: function() {
        this.muicsroll.addEventListener('touchstart', this.touch, false);
        this.muicsroll.addEventListener('touchmove', this.touch, false);
        this.muicsroll.addEventListener('touchend', this.touch, false);
      },
      touch: function(ev) {
        var ev = ev || window.ev;
        switch (ev.type) {
          case 'touchstart':
            this.startX = ev.touches[0].pageX;
            this.startY = ev.touches[0].pageY;
            break;
          case 'touchmove':
            this.moveEndX = ev.changedTouches[0].pageX;
            this.moveEndY = ev.changedTouches[0].pageY;
            this.X = this.moveEndX - this.startX;
            this.Y = this.moveEndY - this.startY;
            if (Math.abs(this.X) > Math.abs(this.Y) && this.X > 0) {
              this.posX = this.X + this.lastX;
              this.muicsroll.style.transform = 'translate3d(' + this.posX + 'px,0px,0px)';
              this.muicsroll.style.transitionDuration = '0ms';
              this.muicsroll.style.transitionTimingFunction = 'cubic-bezier(0.165, 0.84, 0.44, 1)';
            }
            if (Math.abs(this.X) > Math.abs(this.Y) && this.X < 0) {
              this.posX = this.X + this.lastX;
              this.muicsroll.style.transform = 'translate3d(' + this.posX + 'px,0px,0px)';
              this.muicsroll.style.transitionDuration = '0ms';
              this.muicsroll.style.transitionTimingFunction = 'cubic-bezier(0.165, 0.84, 0.44, 1)';
            }
            break;
          case 'touchend':
            this.lastX = this.posX;
            if (this.posX > 0) {
              this.muicsroll.style.transitionDuration = '500ms';
              this.muicsroll.style.transform = 'translate3d(0px,0px,0px)';
              this.lastX = 0;
            }
            if (this.posX < -(this.muicsroll.offsetWidth - this.muislider.offsetWidth)) {
              this.muicsroll.style.transitionDuration = '500ms';
              this.muicsroll.style.transform = 'translate3d(' + (-(this.muicsroll.offsetWidth - this.muislider.offsetWidth)) + 'px,0px,0px)';
              this.lastX = -(this.muicsroll.offsetWidth - this.muislider.offsetWidth);
            }
            break;
        }
      },
      changeActive: function(index) {
        this.activeNav = index;
        this.$emit('listenEvent', this.activeNav);
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .scroll-main {
    height: 0.8rem;
    line-height: 0.8rem;
    .mui-slider {
      height: 0.8rem;
      line-height: 0.8rem;
      width: 100%;
      background: white;
      padding: 0;
      box-sizing: border-box;
      z-index: 1;
      max-width: 999rem;
      opacity: 1;
      top: 0;
      -webkit-transition: .3s all;
      transition: .3s all
    }
    .mui-slider.mui-scroll-wrapper .mui-slider-indicator .mui-segmented-control .mui-segmented-control-inverted{
      height: 0.8rem;
      overflow: hidden;
      overflow-x: scroll;
      width: 100%;
      -webkit-overflow-scrolling: touch;
    }
    .mui-scroll{
      white-space: nowrap; /* 规定段落中的文本不进行换行*/
    }
    .mui-control-item {
      display: inline-block;
      margin: 0.1rem 0.1rem 0;
      overflow: hidden;
      position: relative;
    }
  }
</style>
