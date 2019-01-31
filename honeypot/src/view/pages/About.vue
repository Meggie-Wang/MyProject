<template>
  <div class="about-view">
    <div class="about_container">
      <div class="about_status">
        <div class="stateTitle">
          <img src="../../assets/img/cloudHost.png">
          {{ $t('messages.about.status') }}：
          <span>
            {{ aboutData.status }}
            <i></i>
          </span>
        </div>
        <div class="stateValue">
          <div v-for="(stateValue, index) in aboutData.stateValues" :key="index">
            <p>{{ $t('messages.about.stateNames')[index] }}</p>
            <p>
              {{ stateValue.value }}
              <span v-if="index === 3">{{ $t('messages.about.days') }}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="about_content">
        <img :src="logoChange === 'zh' ? zhLogo : enLogo">
        <span class="ver">version:1.{{ ver }}</span>
        <p>{{ $t('messages.about.introduceOne') }}</p>
        <p>{{ $t('messages.about.introduceOne') + $t('messages.about.introduceTwo') }}</p>
      </div>
      <div class="service">
        <ul>
          <li v-for="(websiteIntroduction, index) in $t('messages.about.websiteIntroductions')" :key="index">
            <img :src="websiteImgUrl[index]">
            <p>{{ websiteIntroduction }}</p>
          </li>
        </ul>
      </div>
      <div class="footer">
        <img src="../../assets/img/logos.png">
        <p>{{ $t('messages.about.introduceThree') }}</p>
        <p>{{ $t('messages.about.company') }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import zhLogo from '@/assets/img/logo.png'
import enLogo from '@/assets/img/enLogo.png'
import computer from '@/assets/img/computer.png'
import cloudLine from '@/assets/img/cloudLine.png'
import monitoring from '@/assets/img/monitoring.png'
import setup from '@/assets/img/setup.png'
import cloudBar from '@/assets/img/cloudBar.png'
import customized from '@/assets/img/customized.png'
import ver from '@/assets/js/ver.js'
export default {
  name: 'aboutView',
  data () {
    return {
      websiteImgUrl: [computer, cloudLine, monitoring, setup, cloudBar, customized],
      logoChange: localStorage.locale,
      zhLogo: zhLogo,
      enLogo: enLogo,
      ver: ver
    }
  },
  computed: {
    ...mapGetters(['aboutData', 'language'])
  },
  watch: {
    language (val) {
      this.logoChange = val
    }
  },
  methods: {
    ...mapActions(['aboutDataAct'])
  },
  mounted () {
    this.aboutDataAct()
  }
}
</script>
<style scoped>
  .about-view {
    height: calc(100% - 5.5rem);
    color: #24a585;
    overflow-y: scroll;
  }
  .about_container {
    width: 70%;
    max-width: 1000px;
    margin: 0 auto;
  }
  @media (max-width: 1000px) {
    .about_container {
      width: 85%;
      max-width: auto;
    }
  }
  .about_container > div {
    padding-top: 1.5rem;
  }
  .stateTitle {
    padding: 0.2rem;
    font-size: 1.1rem;
    color: #9ffbea;
  }
  .stateTitle img {
    width: 2rem;
    vertical-align: top;
  }
  .stateTitle span {
    font-size: 1.2rem;
    color: #00B694;
    font-weight: bold;
  }
  .stateTitle span i {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    background: url('../../assets/img/successStatus.png') center center / cover no-repeat;
  }
  .stateValue {
    display: flex;
    justify-content: space-between;
  }
  .stateValue > div {
    flex: 1;
    height: 4rem;
    border-left: 10px solid rgba(0, 182, 148, .9);
    background: rgba(0, 182, 148, .5);
    color: #9ffbea;
    padding: 0.2rem 0.5rem;
    margin-right: 1em;
  }
  .stateValue > div:last-of-type {
    margin-right: 0;
  }
  .stateValue > div p:last-of-type {
    color: #01ecb7;
    font-size: 1.5rem;
  }
  .about_content {
    position: relative;
    text-align: center;
  }
  .about_content img {
    height: 3rem;
    margin-bottom: 1rem;
  }
  .about_content .ver {
    font-size: 1.3rem;
    position: absolute;
    top: 20%;
    left: 60%;
   }
  .about_content p {
    font-size: 0.8rem;
    line-height: 1.8rem;
  }
  .about_content p:first-of-type {
    font-size: 1.1rem;
    line-height: 3rem;
  }
  .about_content p:last-of-type {
    text-align: left;
    text-indent: 2em;
  }
  .service ul {
    display: flex;
    justify-content: space-between;
    flex-flow: wrap;
  }
  .service ul li {
    width: calc(100% / 3);
    text-align: center;
    padding: 1rem 5rem;
    box-sizing: border-box;
  }
  .service ul li img {
    width: 5rem;
  }
  .service ul li p {
    text-align: left;
    font-size: 0.8rem;
    line-height: 1.8rem;
  }
  .footer {
    text-align: center;
  }
  .footer img {
    width: 13rem;
  }
  .footer p:first-of-type {
    text-align: left;
    font-size: 0.8rem;
    margin-top: 3%;
    text-indent: 2em;
  }
  .footer p:last-of-type {
    margin-top: 1rem;
    font-size: 1.1rem;
  }
</style>
