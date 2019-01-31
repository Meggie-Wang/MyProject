<template>
  <div class="MaliciousInvasion_view">
    <div>
      <div class="MaliciousInvasion_title">
        <i></i>
        <span>{{ $t('messages.main.maliciousInvasion') }}</span>
      </div>
      <ul>
        <li>{{ sum }}</li>
        <li v-for="(MaliciousInvasionData, index) in MaliciousInvasion" :key="index">
          <div>
            <span>
              <i></i>
              <span v-if="$i18n.locale === 'zh'">{{ MaliciousInvasionData.name }}</span>
              <span v-else>{{ MaliciousInvasionData.key2 }}</span>
            </span>
            <p>{{ MaliciousInvasionData.doc_count }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      sum: ''
    }
  },
  computed: {
    ...mapGetters(['MaliciousInvasion'])
  },
  watch: {
    MaliciousInvasion (val) {
      this.sum = 0
      val.forEach(res => {
        this.sum += res.doc_count
      })
    }
  }
}
</script>
<style scoped>
  .MaliciousInvasion_view {
    position: absolute;
    bottom: 3%;
    width: 100%;
    z-index: 10;
  }
  .MaliciousInvasion_view > div{
    width: 85%;
    margin: 0 auto;
  }
  @media (max-width: 1000px) {
    .MaliciousInvasion_view > div {
      width: 100%;
    }
  }
  .MaliciousInvasion_title i {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    background: url('../../assets/img/time.png') center center / cover no-repeat;
    vertical-align: middle;
  }
  .MaliciousInvasion_title span {
    color: #128b71;
    font-size: 1.2rem;
  }
  .MaliciousInvasion_view ul {
    width: 100%;
    display: flex;
    justify-content: space-around;
    background: rgba(0, 115, 87, .7);
    border-top: 10px solid #017455;
    margin-top: 0.5rem;
    font-size: .8rem;
  }
  .MaliciousInvasion_view ul li {
    flex: 1;
    border: 5px solid transparent;
    border-image-source: url('../../assets/img/line.png');
    border-image-slice: 0 0 0 100%;
    border-image-repeat: stretch;
    white-space: nowrap;
  }
  .MaliciousInvasion_view ul li:first-of-type {
    align-self: center;
    text-align: center;
    border: none;
    color: #fff;
    font-size: 4em;
    font-weight: bold;
    text-shadow: 2px 2px 10px #000;
  }
  .MaliciousInvasion_view ul li > div {
    position: relative;
    width: 100%;
    color: #fff;
    box-sizing: border-box;
    padding: 1em .2em;
  }
  .MaliciousInvasion_view ul li > div p {
    font-size: 3em;
    font-weight: bold;
    text-shadow: 2px 2px 10px #000;
    text-align: center;
  }
  .MaliciousInvasion_view ul li > div > span {
    font-size: 1rem;
  }
  .MaliciousInvasion_view ul li > div > span span {
    font-size: 0.8em;
  }
  /*.MaliciousInvasion_view ul li > div span:last-of-type {
    position: absolute;
    bottom: 10%;
    right: 5%;
    text-align: end;
  }*/
  .MaliciousInvasion_view ul li > div span i {
    display: inline-block;
    width: 1em;
    height: 1em;
    background: url(../../assets/img/safetyMarking.png) center center / cover no-repeat;
    vertical-align: middle;
  }
</style>
