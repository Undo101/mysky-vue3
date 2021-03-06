<template>
  <div class="sky">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
export default {
  props: {
    point: {
      type: Number,
      default: 25 // 生成的星星（点）的个数, 默认25个
    },
    star: {
      type: Number,
      default: 15
    },
    lineColor: {
      type: String,
      default: 'rgba(45,140,210,0.2)' // 线的颜色
    },
    starColor: {
      type: String,
      default: 'rgba(213, 203, 118, .7)' // 星星的颜色
    },
    roundColor: {
      type: String,
      default: 'rgba(45, 140, 210, 0.2)' // 圈圈的颜色
    },
  },
  data() {
    return {
      docWidth: 0, // 画布宽
      docHeight: 0, // 画布高
      context: null, // canvasDom的执行上下文
      circleArr: [], // 圆点数组
      starArr: [],
      timer: null, // 定时器对象
    }
  },
  mounted() {
    const canvasDom = this.$refs.canvas

    // 取画布的高宽来设置显示分辨率
    this.docWidth = canvasDom.offsetWidth
    this.docHeight = canvasDom.offsetHeight

    // 设置画布分辨率
    canvasDom.width = canvasDom.offsetWidth
    canvasDom.height = canvasDom.offsetHeight

    // 初始化canvas上下文
    this.context = canvasDom.getContext('2d')

    // 初始化
    this.createCircleArr()       // 设置星星数组
    this.draw() // 首屏绘制
    this.cycleDraw() // 循环绘制
  },
  methods: {
    /**
     * 生成min和max之间随机数
     */
    rangeRadom(max, min) {
      return Math.floor(Math.random() * (max - min + 1) + min)
    },
    /**
     * 绘制原点
     */
    drawCircle(context, x, y, r, moveX, moveY) {
      let circle = {
        x,
        y,
        r,
        moveX,
        moveY,
      }
      context.beginPath()
      context.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI)
      context.lineWidth = 1
      context.fillStyle = this.roundColor // 设置圈圈颜色
      context.closePath()
      context.fill()
      return circle
    },
    /**
     * 绘制星星
     */
    drawLine(context, x, y, r, R, rot, opacity) {
      let star = {
        x,
        y,
        r,
        R,
        rot,
        opacity
      } 
      context.beginPath()
      for(var i = 0; i < 4; i ++){
          context.lineTo( Math.cos( (i*90 - rot)/180 * Math.PI) * R + x,
                      -Math.sin( (i*90 - rot)/180 * Math.PI) * R + y)
          context.lineTo( Math.cos( (45 + i*90 - rot)/180 * Math.PI) * r + x,
                      -Math.sin( (45 + i*90 - rot)/180 * Math.PI) * r + y)
      }
      context.closePath()
      context.lineWidth = 1
      context.fillStyle = "#fff"
      context.strokeStyle = this.lineColor
      context.lineJoin = "round"
      context.globalAlpha  = opacity

      context.fill()
      context.stroke()
      return star
    },
    /**
     * 生成圆点数组
     */
    createCircleArr() {
      for (let i = 0; i < this.point; i++) {
        this.circleArr.push(this.drawCircle(
          this.context,
          this.rangeRadom(this.docWidth, 0),
          this.rangeRadom(this.docHeight, 0),
          this.rangeRadom(15, 2),
          this.rangeRadom(10, -10)/40,
          this.rangeRadom(10, -10)/40
        ))
      }
      for (let i = 0; i < this.star; i++) {
        let r = this.rangeRadom(10, 0) / 4
        this.starArr.push(this.drawLine(
          this.context,
          this.rangeRadom(this.docWidth, 0),
          this.rangeRadom(this.docHeight / 4, 0),
          r,
          r * 3,
          this.rangeRadom(10, -10) * 40,
          this.rangeRadom(10, 0) / 10
        ))
      }
    },
    /**
     * 每一帧绘制
     */
    draw() {
      const circleArr = this.circleArr
      const starArr = this.starArr
      this.context.clearRect(0, 0, this.docWidth, this.docHeight)
      // 循环绘制点
      for (let i = 0; i < this.point; i++) {
        this.drawCircle(this.context, circleArr[i].x, circleArr[i].y, circleArr[i].r)
      }
      for (let i = 0; i < this.star; i++) {
        this.drawLine(this.context, starArr[i].x, starArr[i].y, starArr[i].r, starArr[i].R, starArr[i].rot,  starArr[i].opacity)
      }
      // 循环绘制线
      // for (let i = 0; i < this.point; i++) {
      //   for (let j = 0; j < this.point; j++) {
      //     if (i + j < this.point) {
      //       let A = Math.abs(circleArr[i + j].x - circleArr[i].x)
      //       let B = Math.abs(circleArr[i + j].y - circleArr[i].y)
      //       let lineLength = Math.sqrt(A * A + B * B)
      //       let C = 1 / lineLength * 7 - 0.009
      //       let lineOpacity = C > 0.03 ? 0.03 : C;
      //       if (lineOpacity > 0) {
      //         this.drawLine(
      //           this.context,
      //           circleArr[i].x,
      //           circleArr[i].y,
      //           circleArr[i + j].x,
      //           circleArr[i + j].y,
      //           lineOpacity,
      //         )
      //       }
      //     }
      //   }
      // }
    },
    /**
     * 循环绘制
     */
    cycleDraw() {
      this.timer = setInterval(() => {
        for(let i = 0; i < this.point; i++) {
          let cir = this.circleArr[i]
          cir.x += cir.moveX
          cir.y += cir.moveY
          if (cir.x > this.docWidth) {
            cir.x = 0
          } else if (cir.x < 0) {
            cir.x = this.docWidth
          }
          if (cir.y > this.docHeight) {
            cir.y = 0
          } else if (cir.y < 0) {
            cir.y = this.docHeight
          }
        }
        this.draw()
      }, 10)
    },
  },
  beforeDestory() {
    // 记得摧毁定时器
    clearInterval(this.timer)
  }
}
</script>
<style lang="scss" scoped>
.sky {
  width: 100%;
  height: 100%;
  background: linear-gradient(210deg, black, #030356);
  canvas {
    width: 100%;
    height: 100%;
  }
}
</style>