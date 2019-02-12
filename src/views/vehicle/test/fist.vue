<template>
  <div class="top-dynamic-ranking" ref="text">
    <button>Pause</button>
  </div>
</template>

<script>
import * as d3 from 'd3'
const points = [
  [480, 200],
  [580, 400],
  [680, 100],
  [780, 300],
  [180, 300],
  [280, 100],
  [380, 400]
]
export default {
  name: 'fist',
  data () {
    return {
      pauseValues: {
        lastT: 0,
        currentT: 0
      }
    }
  },
  mounted () {
    this.creatSvg()
  },
  methods: {
    creatSvg () {
      const duration = 10000
      const svg = d3.select(this.$refs.text).append('svg')
        .attr('width', 960)
        .attr('height', 500)

      const path = svg.append('path')
        .data([points])
        .attr('d', d3.svg.line()
          .tension(0) // Catmull–Rom
          .interpolate('cardinal-closed'))

      svg.selectAll('.point')
        .data(points)
        .enter().append('circle')
        .attr('r', 4)
        .attr('transform', function (d) { return 'translate(' + d + ')' })

      const circle = svg.append('circle')
        .attr('r', 13)
        .attr('transform', 'translate(' + points[0] + ')')

      const transition = () => {
        circle.transition()
          .duration(duration - (duration * this.pauseValues.lastT))
          .attrTween('transform', translateAlong(path.node()))
          .each('end', function () {
            this.pauseValues = {
              lastT: 0,
              currentT: 0
            }
            transition()
          })
      }
      transition()
      const translateAlong = (path) => {
        const l = path.getTotalLength()
        return function (d, i, a) {
          return function (t) {
            t += this.pauseValues.lastT
            const p = path.getPointAtLength(t * l)
            this.pauseValues.currentT = t
            return 'translate(' + p.x + ',' + p.y + ')'
          }
        }
      }
      d3.select('button').on('click', function (d, i) {
        const self = d3.select(this)
        if (self.text() === 'Pause') {
          self.text('Play')
          circle.transition()
            .duration(0)
          setTimeout(function () {
            this.pauseValues.lastT = this.pauseValues.currentT
          }, 100)
        } else {
          self.text('Pause')
          transition()
        }
      })
      transition()
    }
  }
}
</script>

<style lang='scss' scoped>
  .top-dynamic-ranking {
    height: 100%;
    width: 100%;
    margin: 5px;
    overflow: hidden;
  }
</style>
<style>
  path {
    fill: none;
    stroke: #000;
    stroke-width: 3px;
  }

  circle {
    fill: steelblue;
    stroke: #fff;
    stroke-width: 3px;
  }
</style>
