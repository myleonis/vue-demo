<template>
  <div class="mall">
    <div class="wrapper" ref='wrapper'>
      <ul class="cate-left">
        <li class="ellipsis" @click="changeCate(index)" :class="{active: index === activeIndex}"
            v-for="(list,index) in shopData.left" :key='index'>{{list}}
        </li>
      </ul>
    </div>
    <div class="wrapper2" ref='wrapper2' @scroll.native='scroll'>
      <ul class="cate-right">
        <li class="ellipsis" ref='contents' v-for="(list,index) in shopData.right" :key='index'>
          <div class="title">{{list.leftTitle}}</div>
          <div class="goods-box">
            <div class="goods" v-for='item in 5' :key='item'>
              <div class="footer">商品标题</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    data() {
      return {
        lists: ['测试'],
        activeIndex: 0,
        shopData: {
          left: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 12, 12, 12, 2, 1, 21, 21, 2, 12, 1, 2, 1, 2, 1, 2, 12, 1, 12, 12, 21, 21, 2, 2, 21, 12, 21, 12,],
          right: [
            {
              leftTitle: 1,
            },
            {
              leftTitle: 1,
            },
            {
              leftTitle: 1,
            },
            {
              leftTitle: 1,
            },
            {
              leftTitle: 1,
            },
            {
              leftTitle: 1,
            },
            {
              leftTitle: 1,
            },
            {
              leftTitle: 1,
            },
            {
              leftTitle: 1,
            },
            {
              leftTitle: 1,
            },
            {
              leftTitle: 1,
            },
            {
              leftTitle: 1,
            },

          ]
        }, // 商品数据
        scrollTops: [],
        scrollY: 0
      }
    },
    watch: {
      scrollY(newVal) {
        console.log(newVal)
        let scrolls = this.scrollTops
        if (newVal >= scrolls[scrolls.length - 1]) {
          this.activeIndex = scrolls.length - 1
          return
        }
        for (let i = 0; i < scrolls.length; i++) {
          if (newVal >= scrolls[i] - 50 && newVal <= scrolls[i + 1] - 50) {
            this.activeIndex = i
            return
          }
        }
      }
    },
    mounted() {
      let scrollH = 0
      // 保证视图渲染完成
      // 此处必须用this.$nextTick()，因为当时只用了setTimeout()，在电脑模拟器上可以使用，但是到了手机上之后就获取不到dom了
      this.$nextTick(() => {
        setTimeout(() => {
          // 获取wrapper2中所有滚动的li元素
          const lis = this.$refs.contents
          for (var i = 0; i < lis.length; i++) {
            this.scrollTops.push(scrollH)
            scrollH += lis[i].scrollHeight
          }
        }, 50)
      })
    },
    methods: {
      /**
       * 点击切换左侧导航的分类
       * 同时右侧滚动到相应位置
       */
      changeCate(index) {
        console.log(index)
        // this.curIndex = index
        this.scroll.scrollTo(0, -this.scrollTops[index], 400)
      },
      /**
       * 获取商品数据
       * @Author   tomorrow-here
       * @DateTime 2019-01-10
       */
      async getShopData() {
        await this.$axios.get('/static/shopData.json').then((res) => {
          this.shopData = res.data
        })
      },
      /**
       * 初始化scroll
       * @Author   tomorrow-here
       * @DateTime 2019-01-10
       */
      scrollInit() {
        this.scroll = new BScroll(this.$refs.wrapper, {
          click: true // 配置允许点击事件
        })
        this.scroll = new BScroll(this.$refs.wrapper2, {
          click: true, // 配置允许点击事件
          probeType: 3 // 开启滚动监听
        })
        this.scroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      }
    }
  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .mall {
    width: 100%;
    height: 100%;
    background: #f2f2f2;
    display: flex;
  }

  .wrapper {
    height: 100%;
    overflow: hidden;
    width: 80px;
    font-size: 14px;
    background: #fff;
    text-align: center;
    border-right: 1px solid #f2f2f2;
    li {
      line-height: 40px;
      border-bottom: 1px solid #f2f2f2;
      width: 100%;
      padding: 0 5px;
      box-sizing: border-box;
      background: #fff;
      &.active {
        background: #f2f2f2;
      }
    }
  }

  .wrapper2 {
    height: 100%;
    width: 100%;
    background: #f2f2f2;
    padding: 10px 10px 10px 0;
    box-sizing: border-box;
    overflow: hidden;
    li {
      position: relative;
      .title {
        line-height: 40px;
        padding-left: 10px;
        font-size: 14px;
        font-weight: bold;
        &.fixed {
          position: fixed;
          top: 0;
          left: 0;
        }
      }
    }
    .goods-box {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
    }
    .goods {
      width: 50%;
      padding: 10px;
      box-sizing: border-box;
      img {
        width: 100%;
        height: 100px;
        border-radius: 5px;
      }
      .footer {
        line-height: 40px;
        font-size: 12px;
        text-align: center;
      }
    }
  }
  ::-webkit-scrollbar{
    display: none;
  }
</style>
