<template>
  <div class="fixed-grid">
    <div>
      <section class="statusTab-show">
        <StatusTab />
      </section>
      <section class="num-show">
        <ul>
          <li
          class="common-back"
          v-for="(_i, _j) in statusData.attackType"
          :key="_j">
            <AttackType
            :resData="_i"/>
            <footer class="common-footer">
              <img :src="safetyMarking">
              <span v-if="$i18n.locale === 'zh'">{{_i.nameC}}</span>
              <span v-else>{{_i.name2 || _i.name}}</span>
            </footer>
          </li>
        </ul>
      </section>
      <section class="line1-show common-back">
        <Line1 :winResize="winResize" />
        <footer class="common-footer">
          <img :src="stutasEvent">
          <span>{{ $t('messages.status.attackTypeTime') }}</span>
        </footer>
      </section>
      <section class="bar-show common-back">
        <Bar :winResize="winResize" />
        <footer class="common-footer">
          <img :src="statusBar">
          <span>{{ $t('messages.status.targetPortTime') }}</span>
        </footer>
      </section>
      <section class="pie-show">
        <div class="common-back">
          <Pie2
          :pieNames="pie2" :winResize="winResize" />
          <footer class="common-footer">
            <img :src="statusPie">
            <span>{{ $t('messages.status.attackTypeTime') }}</span>
          </footer>
        </div>
        <div class="common-back">
          <Pie
            :pieNames="pie" :winResize="winResize" />
          <footer class="common-footer">
            <img :src="statusPie">
            <span>{{ $t('messages.status.attackSourceCountry') }}</span>
          </footer>
        </div>
      </section>
      <section class="words-show">
        <div class="common-back">
          <Word1 :winResize="winResize" />
          <footer class="common-footer">
            <img :src="statusCloud">
            <span>{{ $t('messages.status.attackUsers') }}</span>
          </footer>
        </div>
        <div class="common-back">
          <Word2 :winResize="winResize" />
          <footer class="common-footer">
            <img :src="statusCloud">
            <span>{{ $t('messages.status.attackPwd') }}</span>
          </footer>
        </div>
        <div class="common-back">
          <Word3 :winResize="winResize" />
          <footer class="common-footer">
            <img :src="statusCloud">
            <span>{{ $t('messages.status.maliciousCodeUser') }}</span>
          </footer>
        </div>
        <div class="common-back">
          <Word4 :winResize="winResize" />
          <footer class="common-footer">
            <img :src="statusCloud">
            <span>{{ $t('messages.status.maliciousCodePwd') }}</span>
          </footer>
        </div>
      </section>
      <section class="line2-show common-back">
        <Line2 :winResize="winResize" />
        <footer class="common-footer">
          <img :src="stutasEvent">
          <span>{{ $t('messages.status.attackSourceTime') }}</span>
        </footer>
      </section>
    </div>
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import StatusTab from '@/components/charts/StatusTab'
import AttackType from '@/components/charts/AttackType'
import Line1 from '@/components/charts/Line1'
import Bar from '@/components/charts/Bar'
import Pie from '@/components/charts/Pie'
import Pie2 from '@/components/charts/Pie2'
import Word1 from '@/components/charts/Word1'
import Word2 from '@/components/charts/Word2'
import Word3 from '@/components/charts/Word3'
import Word4 from '@/components/charts/Word4'
import Line2 from '@/components/charts/Line2'
// img
import safetyMarking from '@/assets/img/safetyMarking.png'
import stutasEvent from '@/assets/img/stutasEvent.png'
import statusBar from '@/assets/img/statusBar.png'
import statusPie from '@/assets/img/statusPie.png'
import statusCloud from '@/assets/img/statusCloud.png'
export default{
  name: 'fixed-grid',
  data () {
    return {
      pie: 'pie',
      pie2: 'pie2',
      // img
      safetyMarking: safetyMarking,
      stutasEvent: stutasEvent,
      statusBar: statusBar,
      statusPie: statusPie,
      statusCloud: statusCloud
    }
  },
  props: ['winResize'],
  computed: {
    ...mapGetters(['statusData'])
  },
  components: {
    StatusTab,
    AttackType,
    Line1,
    Bar,
    Pie,
    Pie2,
    Word1,
    Word2,
    Word3,
    Word4,
    Line2
  },
  methods: {
    ...mapActions(['statusDataAct'])
  },
  mounted () {
    this.statusDataAct({search: 'HP_USA_Western_47.254.45.254', section: 0})
  }
}
</script>
<style scoped="scoped">
  .fixed-grid {
    color: #fff;
    padding: 0 1rem;
  }
  .fixed-grid > div section {
    margin-top: .5rem;
  }
  .common-back {
    box-sizing: border-box;
    border: 1px solid #018c6f;
    background-color: rgba(1, 68, 54, .5);
  }
  .common-footer {
    background-color: #015241;
    line-height: calc(2rem - 1px);
    box-sizing: border-box;
    padding-left: .5rem;
    white-space: nowrap;
  }
  .common-footer > img {
    height: 1.5rem;
  }
  .num-show > ul {
    display: flex;
  }
  .num-show > ul > li{
    flex: 1;
    margin-right: .5rem;
    padding: 0;
  }
  .num-show > ul > li > div {
    padding: 1.5rem 0;
  }
  .num-show > ul > li:last-child {
    margin-right: 0;
  }
  .line1-show,
  .line2-show,
  .bar-show {
    height: 20rem;
  }
  .line1-show > div,
  .line2-show > div,
  .bar-show > div,
  .pie-show > div > div,
  .words-show > div > div{
    height: 18rem;
  }
  .pie-show,
  .words-show{
    display: flex;
    height: 20rem;
  }
  .pie-show > div,
  .words-show > div {
    flex: 1;
    margin-right: .5rem;
  }
  .pie-show > div:last-child,
  .words-show > div:last-child {
    margin-right: 0;
  }
  .side-bar-con{
    position: fixed;
    top: 5.5rem;
    left: 0;
    color: #fff;
  }
</style>
