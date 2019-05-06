<template>
  <div class="SystemBasic">
    <div v-if="is_unFinished">
      <template>
        <Loading></Loading>
      </template>
    </div>
    <div>
      <div class="SystemIntroduce">
        <h3>系统介绍</h3>
        <p>系统支持按规模并行化恶意代码检测分析，是一个实现了对多款沙箱引擎的资源管理和自动化并行调度，融合对恶意代码样本的动、静态结合及恶意代码基因分析结果，并提供检测结果的多维度可视化集中分析与视图展示的平台。</p>
      </div>
      <div class="support">
        <h3>沙箱介绍</h3>
        <div>
          <div class="support-img">
            <img
              :src="$img.logo"
              v-if="$tokenName === 'cncert'"
              style="max-width: 150px; height: auto;">
            <img :src="$img.zhirongLogo" alt="" v-else>
          </div>
          <p v-if="$tokenName === 'cncert'">{{$projectCnName}}是{{$projectName}}运用“软件基因”独有核心技术研发的一款用于恶意代码深度分析的特色引擎。采用机器学习算法，利用恶意代码高频基因与正常软件高频基因正反对比分析原理，灵活运用静态、动态及动静结合模式。判定软件样本的恶意性，分析样本基因图谱，为恶意软件识别、聚类、分析、溯源等提供有效支撑。</p>

          <p v-else>智戎-{{$projectCnName}}是上海戎磐网络科技有限公司运用“软件基因”独有核心技术研发的一款用于恶意代码深度分析的特色引擎。采用机器学习算法，利用恶意代码高频基因与正常软件高频基因正反对比分析原理，灵活运用静态、动态及动静结合模式。判定软件样本的恶意性，分析样本基因图谱，为恶意软件识别、聚类、分析、溯源等提供有效支撑。</p>
        </div>
      </div>
      <div class="state">
        <h3>运行状态</h3>
        <div>
          <table>
            <tr>
              <td><div>检测样本总数：</div>{{RunState.test_times}}</td>
              <td><div>运行天数：</div>{{RunState.run_days}}</td>
            </tr>
            <tr>
              <td><div>生成报告数量：</div>{{RunState.report_times}}</td>
              <td><div>生成报表数量：</div>{{RunState.statement_times}}</td>
            </tr>
            <tr>
              <td><div>今日分析总量：</div>{{RunState.today_analysis}}</td>
              <td><div>待分析样本总量：</div>{{RunState.waite_analysis}}</td>
            </tr>
          </table>
          <div class="echarts myline">
            <myLine
            :winResize="winResize"
            :myChartData="LineData"
            :topBarData="sampleDetection"
            echartTitleColor="#315697"
            echartTitledate='当天'
            topSize1="14"
            topSize2="16"
            fontColor="#fff"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SystemBasic',
  data () {
    return {
      RunState: '',
      winResize: 0,
      LineData: [],
      is_unFinished: true,
      creatTime: []
    }
  },
  computed: {
    ...mapGetters(['sampleDetection'])
  },
  methods: {
    init () {
      this.$api.get('system_basic_status').then(webkitDep => {
        this.RunState = webkitDep.data
        let timeArr = webkitDep.data['create_time']
        for (var i = 0; i < timeArr.length; i++) {
          this.creatTime.push(this.$common.dateChange(timeArr[i]))
        }
        this.LineData = {
          create_time: this.creatTime,
          maliciously_amount: webkitDep.data.maliciously_amount,
          nonmaliciously_amount: webkitDep.data.nonmaliciously_amount,
          unknow_amount: webkitDep.data.unknow_amount,
          today_detection_total_amount: webkitDep.data.today_detection_total_amount,
          today_into_storage_amount: webkitDep.data.today_into_storage_amount
        }
        this.is_unFinished = false
      })
    }
  },
  mounted () {
    this.init()
    this.$store.dispatch('getSampleDetection')
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.winResize = window.innerHeight + '/' + window.innerWidth
    })
  }
}

</script>
<style scoped='scoped'>
  .SystemBasic {
    color: rgb(52,82,126);
  }
  .SystemBasic > div {
    width: 80%;
    margin: 0 auto;
  }
  .SystemBasic h3 {
    font-size: 1.5rem;
    border-bottom: 2px solid rgb(52,82,126);
  }
  .SystemIntroduce {
    margin-top: 1rem;
  }
  .SystemIntroduce p {
    text-indent: 2em;
    margin: .5rem auto;
  }
  .support,
  .state {
    margin-top: 0.8rem;
  }
  .support > div {
    margin: 1rem auto;
    display: flex;
  }
  .support-img {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .support-img img {
    height: 4rem;
  }
  .support > div > p {
    flex: 6;
    padding-left: 15px;
    text-indent: 2em;
  }
  .lingdun-img img {
    max-width: 35%;
  }
  .support > div > div {
    flex: 1;
    margin-right: 6%;
  }
  .support > div > div:last-of-type {
    margin-right: 0;
  }
  .support > div > div p:first-of-type {
    display: block;
    width: 100%;
    text-align: center;
  }
  .state table {
    width: 100%;
    margin-top: 1rem;
    font-size: 1rem;
    font-weight: bolder;
  }
  .state table tr {
    width: 100%;
    height: 2rem;
    display: flex;
  }
  .state table tr td {
    width: 50%;
    display: flex;
  }
  .state table tr td:last-of-type div {
    width: 8.5rem;
    text-align: right;
  }
  .echarts {
    width: 100%;
    margin: 2rem 0;
    height: 30vw;
    border: 1px solid rgb(52,82,126)
  }
  .myline .line {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 30vw;
    background: none !important;
    margin: auto;
  }
  .myline /deep/ .line .lineTop ul li {
    background: none;
  }
</style>
