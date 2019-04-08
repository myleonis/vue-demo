<template>
  <div class="top-dynamic-ranking" >
    <div style="height: 100%;width: 100%">
      <div class="mt-card mt-radius top-main">
        <div class="top-show" ref="svgMain"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import * as d3 from "d3";
  const colorClass = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  export default {
    name: "top-dynamic-ranking",
    data() {
      return {
        dateArr: [], // 所有日期
        dataG: [], // 数据组
        intervalTime: 0.433, // 时间间隔
        maxNumber: 10, // 展示数组长度
        isFirst: 1, // 是否第一次展示svg
        isRun: false, // 是否正在执行
        isRunAsResult: false, // 接口是否返回数据
        stopDate: "", // 暂停
        runDate: "", // 运行
        runTip: true, // 运行按钮是否可以点击
        chartData: {
          dataList: [],
          type: {}
        },
        screenWidth: "", // 监听屏幕宽度变化
        isDown: false // 记录是否执行完毕
      };
    },
    watch: {
    },
    mounted() {
    },
    methods: {
      // svg画布
      createSvg() {
        const padding = {
          left: 220,
          right: 100,
          top: 50,
          bottom: 40
        };
        const svgWidth = this.$refs.svgMain.clientWidth;
        const svgHeight = this.$refs.svgMain.clientHeight;
        this.innerWidth = svgWidth - padding.left - padding.right;
        this.innerHeight = svgHeight - padding.top - padding.bottom - 50;
        const innerWidth = this.innerWidth;
        const innerHeight = this.innerHeight;
        // 在svgMain 里添加一个 SVG 画布
        const svg = d3.select(this.$refs.svgMain) // 从文档中选取一个元素
          .append("svg") // 创建、添加并返回一个新的元素.
          .attr("class", "svgMain") // 设置或获取属性.
          .attr("width", svgWidth)
          .attr("height", svgHeight);
        // .attr("preserveAspectRatio", "xMidYMid meet") // 自适应指定 SVG图形在屏幕的最左上角开始显示，并且保持等比缩放。
        // .attr("viewBox", `0,0,${svgWidth},${svgHeight}`); // 有SVG的元素都在${svgWidth}*${svgHeight}所分割成的画布上摆放
        // 添加组g 位置像素x：this.padding.left y：this.padding.top
        this.g = svg.append("g")
          .attr("transform", `translate(${padding.left},${padding.top})`);
        const g = this.g;
        // x轴组
        this.xAxisG = g.append("g")
          .attr("transform", `translate(0, ${innerHeight})`);
        // y轴组
        this.yAxisG = g.append("g");
        // 标题轴timer
        this.timer = g.append("text")
          .attr("class", "timer")
          .attr("fill-opacity", 0) // 填充透明度
          .attr("font-size", "0.7rem")
          .attr("transform", `translate(${innerWidth - 250}, ${innerHeight})`);
        // 构建比例尺
        this.xScale = d3.scaleLinear(); // 线性比例尺
        this.yScale = d3.scaleBand() // 序数比例尺
          .paddingInner(0.3)
          .paddingOuter(0);
        // x轴生成
        this.xAxis = d3.axisBottom(this.xScale) // 设置坐标轴的比例尺为线性比例尺
          .ticks(10) // 控制轴刻度的显示方式以及格式化刻度
          .tickPadding(20) // 指定刻度和刻度文本之间的间距.
          .tickFormat(d => d) // 重载标签的刻度格式化。
          .tickSize(-innerHeight); // 刻度大小.，默认是6。
        // y轴生成
        this.yAxis = d3.axisLeft()
          .scale(this.yScale) // 设置坐标轴的比例尺
          .tickPadding(100)
          .tickSize(0);
      },
      // 数据更新
      refresh(dataG) {
        // 颜色类名分配
        const getColorClass = (d) => {
          let tmp = 0;
          for (let index = 0; index < d.name.length; index++) {
            tmp = tmp + d.name.charCodeAt(index);
          }
          return colorClass[tmp % colorClass.length];
        };
        const innerWidth = this.innerWidth;
        const innerHeight = this.innerHeight;
        const g = this.g;
        const xScale = this.xScale;
        const yScale = this.yScale;
        const xAxisG = this.xAxisG;
        const yAxisG = this.yAxisG;
        const timer = this.timer;
        const xAxis = this.xAxis;
        const yAxis = this.yAxis;

        // x轴的value
        const xValue = d => Number(d.value);
        // y轴的name
        const yValue = d => d.name;
        // 设置域domain()是输入域，range()是输出域
        xScale.domain([0, d3.max(dataG, xValue)]).range([0, innerWidth]);
        yScale.domain(dataG.map(yValue).reverse()).range([innerHeight, 0]);
        // 设置过渡
        xAxisG
          .transition(g) // 使用d3.selection.transition函数来定义一个过渡
          .duration(3000 * this.intervalTime) // 过渡效果的持续时间
          .ease(d3.easeLinear) // 使用线性缓动函数。
          .call(xAxis); // 为当前过渡指定一次指定的函数.
        yAxisG
          .transition(g)
          .duration(3000 * this.intervalTime)
          .ease(d3.easeLinear)
          .call(yAxis);
        yAxisG
          .selectAll(".tick").remove(); // 从文档中选取多个元素移除
        timer
          .transition(g)
          .duration(3000 * this.intervalTime)
          .delay(this.intervalTime * 1000 * this.isFirst) // 指定每个元素的过渡延时时间(毫秒).
          .ease(d3.easeLinear)
          .attr("fill-opacity", 1)
          .text(dataG[0].date);

        // 从文档中选取多个元素将元素与数据绑定.
        const bar = g.selectAll(".bar").data(dataG, function(d) {
          return d.name;
        });
        const barEnter = bar.enter() // 获取需要插入的选择集的占位符.
          .insert("g", ".axis") // 创建、插入并返回一个新的元素.
          .attr("class", "bar")
          .attr("transform", function(d) {
            return "translate(0," + yScale(yValue(d)) + ")";
          });
        barEnter.append("g")
          .attr("class", function(d) {
            return getColorClass(d);
          });
        barEnter.append("rect") // 绘制矩形
          .attr("width", d => xScale(xValue(d))) // 过渡前矩形长度
          .attr("cursor", "pointer")
          .attr("fill-opacity", 0) // 过渡前填充透明度
          .attr("height", 40) // 矩形宽度
          .attr("y", 50) // 过渡前y轴为 50
          .transition() // 开启过渡
          .attr("class", d => getColorClass(d))
          .delay(500 * this.intervalTime) // 过渡延时时间(毫秒).
          .duration(2490 * this.intervalTime) // 过渡时间
          .attr("y", 0) // 过渡后y轴为0
          .attr("width", d => xScale(xValue(d))) // 过渡后矩形长度
          .attr("fill-opacity", 1); // 过渡后填充透明度
        // rect 鼠标移入移出事件
        barEnter.selectAll("rect")
          .on("mouseover", function(d, i) {
            d3.select(this)
              .attr("opacity", "0.8");
          })
          .on("mouseout", function(d, i) {
            d3.select(this)
              .attr("opacity", "1");
          })
          .on("click", function(d) {
            this.stopSvg();
          }.bind(this));

        // y轴名称1 name
        barEnter.append("text")
          .attr("y", 50) // 过渡前
          .attr("fill-opacity", 0)
          .transition()
          .delay(500 * this.intervalTime) // 过渡延时时间(毫秒).
          .duration(2490 * this.intervalTime) // 过渡时间
          .attr("fill-opacity", 1)
          .attr("class", function(d) {
            return "label " + getColorClass(d);
          })
          .attr("x", -5)
          .attr("y", 28) // 字体y轴位置 // 文字bar上下位置
          // 文本锚点 描述该文本与所给点的对齐方式 (开头、中间、末尾对齐)
          .attr("text-anchor", "end") // start | middle | end | inherit
          .text(d => d.name);

        // // y轴名称2 name bar上文字
        // barEnter.append("text")
        //   // .attr("x", d => xScale(xValue(d)))
        //   .attr("class", "barInfo")
        //   .attr("y", 50)
        //   .attr("stroke-width", "0")
        //   .attr("fill-opacity", 0)
        //   .transition()
        //   .delay(500 * this.intervalTime)
        //   .duration(2490 * this.intervalTime)
        //   // .text(d => d.name)
        //   // .attr("x", d => xScale(xValue(d)) - 10)
        //   .attr("fill-opacity", 1)
        //   .attr("y", 3)
        // // 值表示的是相对于前一个字符的长度，而不是相对于整个视窗的绝对定位。
        //   .attr("dy", ".9em") // 字体y轴位置
        //   .attr("text-anchor", "end")
        //   .attr("stroke-width", "0.1rem");

        // y轴 值 bar上文字
        barEnter.append("text")
          .attr("x", d => xScale(xValue(d)))
          .attr("y", 50)
          .attr("fill-opacity", 0)
          .text(0)
          .transition()
          .delay(500 * this.intervalTime)
          .duration(2490 * this.intervalTime)
          .attr("fill-opacity", 1)
          .attr("y", 0)
          .attr("class", function(d) {
            return "value " + getColorClass(d);
          })
          // 过渡过程中执行指定的函数.
          .tween("text", function(d) { // 若使用d => {} 无法正常返回
            const self = this; // 获取当前text
            // 插值器，赋予当前text文本内容
            const i = d3.interpolate(self.textContent, Number(d.value));
            return function(t) {
              self.textContent = Math.round(i(t));
            };
          })
          .attr("x", d => xScale(xValue(d)) + 10)
          .attr("y", 28); // 文字bar上下位置

        // 数据更新
        // Update
        const barUpdate = bar.transition().duration(2990 * this.intervalTime).ease(d3.easeLinear);
        // bar
        barUpdate.select("rect")
          .attr("width", d => xScale(xValue(d)));
        barUpdate.select(".label")
          .attr("fill-opacity", 1)
          .text(d => d.name);
        // // barName
        // barUpdate.select(".barInfo")
        //   // .attr("x", d => xScale(xValue(d)) - 10)
        //   .attr("fill-opacity", 1);
        // .text(d => d.name);
        // bar value
        barUpdate.select(".value")
          .tween("text", function(d) {
            const self = this;
            const i = d3.interpolate(self.textContent, Number(d.value));
            return function(t) {
              self.textContent = Math.round(i(t));
            };
          })
          .duration(2990 * this.intervalTime)
          .attr("x", d => xScale(xValue(d)) + 10);

        const barExit = bar.exit()
          .attr("fill-opacity", 1)
          .transition().duration(2500 * this.intervalTime);

        barExit
          .attr("transform", "translate(0," + 780 + ")")
          .remove()
          .attr("fill-opacity", 0);

        barExit.select("rect")
          .attr("fill-opacity", 0);
        barExit.select(".value")
          .attr("fill-opacity", 0);
        // barExit.select(".barInfo")
        //   .attr("fill-opacity", 0)

        bar.data(dataG, d => d.name)
          .transition()
          .delay(500 * this.intervalTime)
          .duration(2490 * this.intervalTime)
          .attr("transform", function(d) {
            return "translate(0," + yScale(yValue(d)) + ")";
          });
      },
      // 定时调用
      initInterval(dateArr) {
        let index = 0;
        // setInterval里的next()函数中this执向的是window,可以bind绑定当前this
        this._Interval = setInterval(function next() {
          if (index >= dateArr.length) {
            clearInterval(this._Interval);
            this.isRun = false;
            d3.selectAll("rect")
              .on("click", function(d) {
                this.popBox(d);
              }.bind(this));
            this.isDown = true;
            return;
          }
          const timeCurrent = dateArr[index];
          this.dataG = this.dataGroup[timeCurrent];
          this.stopDate = this.dataG[0].date;
          // 刷新
          this.refresh(this.dataG.slice(0, this.maxNumber));
          this.isRunAsResult = true;
          index++;
        }.bind(this), 3000 * this.intervalTime);
      },
      // 获取数据
      getDataList: function(date, type) {
        this.isRunAsResult = false;
        getList({ date: date, type: type }).then(res => {
          if (res.code === 200) {
            // 初始化
            this.dataG = [];
            // 获取所有数据
            this.groupData = {};
            // 获取所有日期
            this.dateArr = [];
            this.chartData.dataList = [];
            if (!res.data.length) {
              this.isRun = false;
              this.$refs.tips.style.display = "block";
              this.tip = "该周期暂无数据";
              return;
            }
            this.$refs.tips.style.display = "none";
            // bar所有的数据
            this.chartData.dataList = res.data;
            res.data.forEach(val => {
              const v = {
                name: val.name,
                value: val.value,
                date: val.date.slice(0, 10)
              };
              if (typeof this.groupData[v.date] === "undefined") {
                this.groupData[v.date] = [];
                this.dateArr.push(v.date);
              }
              this.groupData[v.date].push(v);
            });
            this.dateArr.sort((x, y) => new Date(x) - new Date(y));
            // 累加
            const getDataG = (data, dataG) => {
              if (!dataG.length) return data;
              const dataList = dataG.map(v => {
                return {
                  name: v.name,
                  value: v.value,
                  date: data[0].date
                };
              });
              const oldArr = dataList.concat(data); // 合并数组
              const isEqual = (a, b) => a.name === b.name;
              const create = e => { return e; };
              // 合并name一致的value
              const getNew = old => old.reduce((acc, cur) => {
                const hasItem = acc.some(e => {
                  const temp = isEqual(e, cur);
                  if (temp) e.value += cur.value;
                  return temp;
                });
                if (!hasItem) acc.push(create(cur));
                return acc;
              }, []);
              const newData = getNew(oldArr);
              return newData.sort((x, y) => {
                const val1 = x.value;
                const val2 = y.value;
                if (val1 > val2) {
                  return -1;
                } else if (val1 < val2) {
                  return 1;
                } else {
                  return 0;
                }
              });
            };
            this.dataGroup = {};
            this.datags = [];
            const lenDateArr = this.dateArr.length;
            for (let i = 0; i < lenDateArr; i++) {
              const data = this.groupData[this.dateArr[i]];
              this.datags = getDataG(data, this.datags);
              this.dataGroup[this.dateArr[i]] = this.datags;
            }
            d3.select(".svgMain").remove(); // 删除整个SVG
            d3.select(".svgMain")
              .selectAll("*")
              .remove();
            if (this._Interval) {
              clearInterval(this._Interval);
            }
            // 创建svg画布
            this.createSvg();
            this.initInterval(this.dateArr);
          }
        });
      },
    },
    beforeDestroy() {
    }
  };
</script>
<style lang='scss' scoped>
  .top-dynamic-ranking {
    height: 100%;
    width: 100%;
    overflow: hidden;
    .top-main {
      width: 100%;
      height: 100%;
      float: left;
    }
    .top-choice {
      height: 0.4rem;
      line-height: 0.4rem;
      .choice1,.choice2,.implSvg,.runSvg,.stopSvg,.resetSvg,.tip {
        float: left;
        font-family: 微软雅黑;
        font-size: 0.16rem;
      }
      .tip{
        margin-left: 0.15rem;
        color: red;
      }
    }
    .top-show {
      height: 100%;
      width: 100%;
      margin-top: -0.4rem;
      padding-top: 0.4rem;
    }
  }
  /*背景层*/
  #popLayer {
    display: none;
    background-color: #808080;
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
    padding: 0.2rem;
    border-radius: 0.1rem;
    background-color: #FFFFFF;
    z-index: 11;
    width: 9rem;
    height: 6rem;
    position:fixed;
    top:0;
    right:0;
    left:0;
    bottom:0;
    margin:auto;
  }

  #popBox .close{
    text-align: right;
    margin-right: 0.1rem;
    background-color: #FFFFFF;
  }
  #popBox .close .mt-icon-close:hover {
    border-radius: 0.1rem;
    background-color: #E7EAED;
  }
  /*关闭按钮*/
  #popBox .close a {
    text-decoration: none;
    color: #2D2C3B;
  }
</style>
<style>
  .top-show .domain {
    display: none;
  }

  .top-show .tick line {
    stroke: #C0C0BB;
  }

  .top-show .tick text {
    fill: #8E8883;
    font-size: 0.14rem;
  }

  .top-show .timer {
    fill: #686868;
  }

  .top-show .value {
    fill: rgb(138, 46, 46);
    font-size: 20pt;
    font-weight: 400;
  }

  .top-show .barInfo {
    fill: rgb(255, 255, 255);
    font-size: 0.20rem;
    font-weight: bold;
  }
  .top-show .bar{ /* 竖轴字体大小*/
    font-size: 0.14rem;
    font-family: 微软雅黑;
  }
  .top-show .J {
    fill: #EE9201;
  }
  .top-show .I {
    fill: #64BD3D;
  }
  .top-show .H {
    fill: #1A918D
  }
  .top-show .G {
    fill: #C33531;
  }
  .top-show .F {
    fill: darkgreen;
  }

  .top-show .E {
    fill: tan;
  }

  .top-show .D {
    fill: darkorange;
  }

  .top-show .C {
    fill: darkblue;
  }

  .top-show .B {
    fill: darkred;
  }

  .top-show .A {
    fill: steelblue;
  }
  .choice1 .el-input{
    width: 0.8rem;
  }
  .choice2 .el-input{
    margin-left: 0.15rem;
    width: 1.5rem;
  }
  .top-choice .el-button {
    border: none;
    margin-left: 0.15rem;
  }
  .implSvg .el-button {
    color: white;
    background-color: #409eff;
  }

  .implSvg .el-button:hover {
    background-color: #40c6ff;
  }

  .implSvg .el-button:active {
    background-color: #4083ff;
  }

  .stopSvg .el-button{
    width: 0.5rem;
    color: white;
    background-color: #F56C6C;
  }

  .stopSvg .el-button:hover {
    background-color: #F89696;
  }

  .stopSvg .el-button:active {
    background-color: #F56C6C;
  }

  .runSvg .el-button{
    width: 0.5rem;
    color: white;
    background-color: #67c23a;
  }

  .runSvg .el-button:hover {
    background-color: #96d777;
  }

  .runSvg .el-button:active {
    background-color: #5bae33;
  }

</style>
