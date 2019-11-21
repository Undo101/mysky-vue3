<template>
  <div class="about">
    <div class="space">
      <svg width="100%" height="100%"  preserveAspectRatio="xMinYMin slice">
          <defs>
              <polygon ref="buling" id="buling" points="0, -10 2, -2 10, 0 2, 2 0, 10 -2, 2 -10, 0 -2, -2" fill="white"  />
          </defs>
          <defs>
              <circle ref="star" id="star" cx="15" cy="15" r="5" fill="white" />
          </defs>
          <g id="star-group" ref="starGroup"></g> 
          
          <g id="ligth-tower" transform="translate(300 200)">
              <defs >
                  <linearGradient id="gradient_1" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stop-color="rgba(255,255,255,0.2)"/>
                    <stop offset="1" stop-color="rgba(255,255,255,0.9)"/>
                    </linearGradient>
                    <linearGradient id="gradient_2" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stop-color="rgba(255,255,255,0.01)"/>
                    <stop offset="1" stop-color="rgba(255,255,255,1)"/>
                    </linearGradient>
                    <clipPath id="clipPath-1">
                        <polygon points="0 -120 800 0 0 120" transform="translate(-800 -120)" />
                    </clipPath>
              </defs>
              <!-- 灯塔和灯柱 -->
              <g>
                  <polygon points="-10 0 10 0 0 -120" fill="url(#gradient_1)" />
                  <circle r="3" cx="0" cy="-120" fill="white" />
                  <!-- 旋转的灯光 -->
                  <g>
                      <ellipse rx="300" ry="150" cx="0" cy="-120" fill="url(#gradient_2)" clip-path="url(#clipPath-1)" />
                      <animateTransform from="0 0 -120" to="360 0 -120" type="rotate" dur="10s" repeatCount="indefinite"  attributeName ="transform" begin="0s"  >
                        </animateTransform>
                        <!-- from="0,x,y" to="360,x,y"  X,Y就是你的坐标 -->
                  </g>
              </g>
          </g>
          <!-- 绘制月亮 -->
          <g id="moon">
              <defs>
                  <mask id="mask-moon">
                      <circle r="100" cx="-600" cy="-250" fill="white" />
                      <circle r="100" cx="-550" cy="-290" fill="black" />
                  </mask>
              </defs>
              <circle r="100" cx="-600" cy="-250" fill="yellow" mask="url(#mask-moon)"  />
          </g>
      </svg>
    </div>
  </div>
</template>
<script>
var SVG_NS = 'http://www.w3.org/2000/svg';
var XLINK_NS = 'http://www.w3.org/1999/xlink';
var width = document.body.clientWidth;
var height = document.body.clientHeight;
export default {
  data() {
    return {
      starCount: 100,
      bulingCount: 50,
      star: '',
      buling: ''
    }
  },
  methods: {
    //绘制星星
    renderStar() {
      var starRef = this.$refs.star
      console.log(starRef)
      var bulingRef = this.$refs.buling
      console.log(bulingRef)
      var starGroup = this.$refs.starGroup
      while (this.starCount--) {
        this.star = this.use(starRef);
        console.log(width, 222)
        this.star.setAttribute('transform','translate('+this.random(-width/2,width/2)+','+this.random(-height/2,height/2)+')'+'scale('+this.random(0.1,0.8)+')');
        this.star.setAttribute('opacity',this.random(0.1,0.7))
        starGroup.appendChild(this.star)
      }
      while (this.bulingCount--) {
        this.buling = this.use(bulingRef)
        this.buling.setAttribute('transform','translate('+this.random(-width/2,width/2)+','+this.random(-height/2,height/2)+')'+'scale('+this.random(0.1,0.8)+')');
        this.buling.setAttribute('opacity',this.random(0.1,0.7))
        starGroup.appendChild(this.buling)
      }
    },
    //JS加载use方法 <use> 使用URI引用具有一个唯一的ID属性和重复的图形元素
    use(origon) {
        var _use = document.createElementNS(SVG_NS,'use')
        _use.setAttributeNS(XLINK_NS,'xlink:href','#' + origon.id)
        return _use
    },
    random(min, max) {
      return min + (max - min) * Math.random();
    },
    setSVGViewBox() {
      var paper = document.querySelector('svg');
      console.log(width, height)
      paper.setAttribute('viewBox',-width/2+' '+(-height/2)+' '+width+' '+height )
      console.log(paper.getAttribute('viewBox'));
    }
  },
  mounted () {
    this.renderStar()
    this.setSVGViewBox()
  }
}
</script>

<style>
.about {
  height: 100%;
  width: 100%;
}
.space {
  height: 500px;
  width: 100%;
  background: linear-gradient(219deg,black, #030356);
}
#star-group {
  animation: slide 30s linear infinite;
  height: 400%;
  height: 400%;
  left: 0;
  position: absolute;
  top: 0;
  width: 400%;
  z-index: 1;
}
@keyframes slide {
  0% {
    transform: translate3d(0,0,0);
  }
  30% {
      transform: translate3d(90px,-90px,0);
  }
  60% {
    transform: translate3d(-90px,-50px,0);
  }
  100% {
    transform: translate3d(0,0,0);
  }
}
</style>
