<template>
  <div class="swiper-view">
    <ul class="swiper-warp">
      <li
      v-for="(i, j) in swiperData"
      :key="j">
        <div class="swiper-slide">
          <p>{{i.ip}}</p>
          <span>{{i.country}}</span>
          <span>{{i.city}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'swiper-view',
  data () {
    return {
      ulAnimateInt: {},
      swiperData: [],
      countSwiper: 0,
      curMove: 0,
      oldMove: 0
    }
  },
  computed: {
    ...mapGetters(['broadcastData'])
  },
  watch: {
    broadcastData (val, old) {
      let swiperData = this.swiperData.concat(val)
      if (swiperData.length > val.length) {
        swiperData = swiperData.slice(10, val.length + 1)
      }
      this.swiperData = swiperData
      // 归位
      let theUl = document.querySelector('.swiper-warp')
      theUl.style.transform = 'translate3d(0, 0, 0)'
      this.countSwiper = 0
      this.curMove = 0
      this.oldMove = 0
      // 为了解决main中数据加载定时，与本组件的定时时间差别
      /*
      * 每次接受数据时候需要清楚上一次的定时器
      */
      clearInterval(this.ulAnimateInt)
      /**
      * 6s间隔
      * 设置2s为移动时间
      */
      let dealy = 5300
      let speed = 700
      let mini = 50 // 越大越慢，
      this.ulAnimateInt = setInterval(() => {
        console.log('ssr')
        let theLiW = document.querySelector('.swiper-view').offsetWidth / 5
        this.countSwiper++
        this.curMove = theLiW * this.countSwiper // 现在应该移动的距离
        this.oldMove = theLiW * this.countSwiper - theLiW // 上一次移动的距离
        let miniMove = theLiW / mini // 此次微动的距离
        let innerInt = setInterval(() => {
          this.oldMove += miniMove
          this.oldMove = Number(this.oldMove.toFixed(1))
          if (this.oldMove < this.curMove) {
            theUl.style.transform = 'translate3d(-' + this.oldMove + 'px, 0, 0)'
          } else {
            theUl.style.transform = 'translate3d(-' + this.curMove + 'px, 0, 0)'
            clearInterval(innerInt)
          }
        }, speed / mini)
      }, dealy + speed)
    }
  }
}
</script>
<style scoped="scoped">
  .swiper-view{
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%);
    width: 85%;
    overflow-x: hidden;
    z-index: 10;
  }
  @media (max-width: 1000px) {
    .swiper-view {
      width: 100%;
    }
  }
  .swiper-view > ul{
    white-space: nowrap;
  }
  .swiper-view > ul > li{
    display: inline-block;
    width: 20%;
  }
  .swiper-slide {
    width: calc(100% - .5rem);
    height: 7rem;
    border-left: 10px solid #017455;
    background: rgba(0, 115, 87, .3);
    color: #B4D2D0;
    box-sizing: border-box;
    padding: 1rem;
  }
  .swiper-slide p {
    font-weight: bold;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .swiper-slide span:first-child {
    display: block;
    font-size: 0.8rem;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .swiper-slide span:last-child {
    display: block;
    font-size: 0.8rem;
    line-height: 1rem;
    display: -webkit-box;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
</style>
