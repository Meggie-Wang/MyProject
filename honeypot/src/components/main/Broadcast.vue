<template>
  <div class="broadcast_view">
    <swiper
      :options="swiperOption"
      ref="mySwiper">
      <swiper-slide v-for="(broadcast, index) in swiperData" :key="index" class="swiper-no-swiping">
        <p>{{broadcast.ip}}</p>
        <span>{{broadcast.country}}</span>
        <span>{{broadcast.city}}</span>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  data () {
    return {
      swiperData: [],
      swiperOption: {
        autoplay: {
          delay: 4500,
          disableOnInteraction: false
        },
        observer: true,
        observeParents: true,
        setWrapperSize: true,
        slidesPerView: 5,
        spaceBetween: 10,
        loop: true,
        speed: 1500,
        noSwiping: true
      }
    }
  },
  props: ['wakeSwiper'],
  computed: {
    ...mapGetters(['broadcastData']),
    swiper () {
      return this.$refs.mySwiper.swiper
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  watch: {
    broadcastData (val, old) {
      let swiperData = this.swiperData.concat(val)
      if (swiperData.length > val.length) {
        swiperData = swiperData.slice(10, val.length + 1)
      }
      this.swiperData = swiperData
      this.swiper.slideTo(1, 10, true)
    },
    wakeSwiper () {
      this.swiper.slideTo(1, 10, true)
    }
  },
  mounted () {
    window.addEventListener('resize', () => {
      this.swiper.autoplay.stop()
      this.swiper.autoplay.start()
    })
  }
}
</script>
<style scoped>
  .broadcast_view {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%);
    width: 85%;
    padding: 1rem 0;
    z-index: 10;
  }
  @media (max-width: 1000px) {
    .broadcast_view {
      width: 100%;
    }
  }
  .swiper-slide {
    height: 7rem;
    border-left: 10px solid #017455;
    background: rgba(0, 115, 87, .3);
    color: #B4D2D0;
    padding: 1rem;
    box-sizing: border-box;
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
