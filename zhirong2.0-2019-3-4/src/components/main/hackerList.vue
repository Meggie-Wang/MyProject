<template>
  <div
    class="hackerList"
    :style="{backgroundImage:'url(' + smallBg + ')'}">
    <div class="main" v-if="total">
      <div class="title" v-if="$tokenName === 'zhirong'">最新告警信息</div>
      <div class="title" v-else>最新检测结果</div>
      <el-carousel
        indicator-position="none"
        :interval="5000"
        arrow="never"
        @change="change">
        <el-carousel-item v-for="i in total" :key="i">
          <ul>
            <li v-for="(item, index) in example2" :key="index">
              <span>{{ item.sample_md5 }}</span>
              <span>{{ $common.dateChange(item.detect_finished_time) }}</span>
              <span :style="{backgroundColor: item.is_malicious === 'no' ? 'rgba(211, 76, 92, .8)' : ''}">{{ $detectionResult(item.is_malicious) }}</span>
            </li>
          </ul>
        </el-carousel-item>
      </el-carousel>

    </div>
    <!-- 无数据 -->
    <NoData v-else />
  </div>
</template>
<script>
import smallBg from '@/assets/img/smallBg.png'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      smallBg: smallBg,
      hackerList: [],
      total: 0,
      example: [{sample_md5: 'md5', detect_finished_time: '完成时间', is_malicious: 'no'}, {sample_md5: 'md5', detect_finished_time: '完成时间', is_malicious: 'yes'}, {sample_md5: 'md5', detect_finished_time: '完成时间', is_malicious: 'unknown'}],
      example2: []
    }
  },
  computed: {
    ...mapGetters(['detectionResult'])
  },
  watch: {
    detectionResult (val) {
      this.hackerList = val
      if (val[0].results) {
        this.total = Math.ceil(val[0].count / 3)
        if (val[0].results.length === 0) {
          this.example2 = this.example
        } else {
          this.example2 = val[0].results
        }
      }
    }
  },
  mounted () {
    this.$store.dispatch('getDetectionResult', 1)
  },
  methods: {
    change (val) {
      this.$store.dispatch('getDetectionResult', val + 1)
      this.example2 = this.hackerList.length
        ? this.hackerList[1].results
        : []
    }
  }
}
</script>
<style lang="scss" scoped>
  .hackerList {
    height: calc(100% / 3);
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    .main {
      width: 80%;
      height: 80%;
      .title {
        height: 30px;
        line-height: 25px;
        color: #fff;
        text-align: center;
        font-size: 15px;
        text-shadow: 1px 1px 10px #000;
        border-bottom: 2px solid #4c75d3;
      }
      .el-carousel {
        height: calc(100% - 32px);
        .el-carousel__item ul {
          height: 100%;
          li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            height: calc(100% / 3 - 10px);
            border-bottom: 2px solid #4c75d3;
            cursor: pointer;
            padding: 3px 10px 3px;
            span {
              color: rgba(255, 255, 255, .8);
              font-size: 14px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            span:first-of-type {
              width: 100%;
              font-size: 15px;
              line-height: 1;
            }
            span:nth-of-type(2) {
              width: 60%;
            }
            span:last-of-type {
              width: 30%;
              text-align: center;
              border-radius: 3px;
            }
          }
        }
      }
    }
  }
</style>
