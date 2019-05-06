<template>
  <div class="hackerList">
    <swiper
      v-if="swiperData.length !== 0"
      :options="swiperOption"
      ref="mySwiper">
      <swiper-slide
        class="swiper-no-swiping"
        v-for="(item, index) in swiperData"
        :key="index">
        <p style="width: 100%">{{ item.sample_md5}}</p>
        <p style="width: 100%">
          国家：{{item.country || '未知'}}
          <img
            style="height: 1rem;"
            v-if="item.country"
            :src="'../../../static/missile/images/flag/' + item.country + '.png'" />
        </p>
        <p style="width: 100%">
          <span>{{ $common.dateChange(item.detect_finished_time) }}</span>
          <span :style="{
            backgroundColor: item.is_malicious === 'no' ? 'rgba(211, 76, 92, .8)' : '',
            display: 'inline',
            padding: '2px 5px',
            fontSize: '0.8em'
          }">{{ $detectionResult(item.is_malicious) }}</span>
        </p>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  data () {
    let that = this
    return {
      swiperData: [],
      swiperOption: {
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        loop: true,
        speed: 1000,
        observer: true,
        observeParents: true,
        slidesPerView: 6,
        spaceBetween: 10,
        setWrapperSize: true,
        mousewheel: false,
        on: {
          slideChange: function () {
            let aa = this.activeIndex - 6
            // 第一个silde是4，5
            // 最后一个是10，但是10 - 4 = 6 并没有6的索引，需要归零
            let bb = (aa === 0) || (aa === 1) ? 0 : (aa === that.swiperData.length ? 0 : aa)
            // console.log(bb, that.swiperData[bb].country, this.activeIndex)
            that.$store.commit('getActiveCountry', that.swiperData[bb].country)
          }
        }
      },
      example: [
        {
          sample_md5: 'FA7BA11196B48E467A12BFFC297286BD',
          country: 'Russia',
          detect_finished_time: '2019-01-14T17:14:18.895885',
          is_malicious: 'no'
        },
        {
          sample_md5: 'akdjh11196Bnhf48E467AFC297286BD',
          country: 'Albania',
          detect_finished_time: '2019-01-14T17:16:34.895885',
          is_malicious: 'yes'
        },
        {
          sample_md5: 'JDlBA11196B4hdjsA12BFFC297286BD',
          country: 'Belarus',
          detect_finished_time: '2019-01-14T17:17:50.895885',
          is_malicious: 'unknown'
        },
        {
          sample_md5: 'UDMFH11196B48E467AYUSFFC297286BD',
          country: 'Russia',
          detect_finished_time: '2019-01-14T17:18:18.895885',
          is_malicious: 'no'
        },
        {
          sample_md5: 'LSNH11196E467SJCA12BFFC297286BD',
          country: 'Albania',
          detect_finished_time: '2019-01-14T17:22:23.895885',
          is_malicious: 'yes'
        },
        {
          sample_md5: 'BGYKS11196B48EGSYDHNBFFC297286BD',
          country: 'Belarus',
          detect_finished_time: '2019-01-14T17:25:43.895885',
          is_malicious: 'unknown'
        }
      ]
    }
  },
  props: ['winResize'],
  components: {
    swiper,
    swiperSlide
  },
  computed: {
    ...mapGetters(['detectionResult']),
    swiper () {
      return this.$refs.mySwiper.swiper
    }
  },
  watch: {
    winResize () {
      if (this.swiperData.length) {
        this.swiper.autoplay.stop()
        this.swiper.autoplay.start()
      }
    },
    detectionResult (val) {
      // 国安项目有data，其他项目是results
      // 这里做判断是为了调试swiper
      // data中监听事件on中，获取国家的bb必须小于等于 this.swiperData.length
      if (val.data) {
        if (val.data.length === 0) {
          this.swiperData = this.example
        } else {
          this.swiperData = val.data
        }
        this.$store.commit('getActiveCountry', this.swiperData[0].country)
      } else {
        if (!val.results) {
          this.swiperData = this.example
        } else {
          val.results.forEach((i, j) => {
            i.country = 'Russia'
          })
          this.swiperData = val.results
        }
      }
    }
  },
  mounted () {
    // this.$store.dispatch('getDetectionResult', 1)
  },
  methods: {
    // change (val) {
    //   this.$store.dispatch('getDetectionResult', val + 1)
    // }
  }
}
</script>
<style lang="scss" scoped>
  .swiper-slide {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    background: rgba(58, 83, 126, .8);
    color: #fff;
    padding: 2vh;
    cursor: pointer;
    font-size: 1vh;
    p {
      // font-weight: bold;
      font-size: 1.8em;
    }
    span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    span:first-child {
      width: 60%;
    }
    span:last-child {
      width: 30%;
      text-align: center;
      border-radius: 3px;
    }
  }
</style>
<style>
  .hackerList .swiper-wrapper {
    position: relative;
    z-index: 1;
    display: flex;
    transition-property: transform;
    box-sizing: content-box;
  }
</style>
