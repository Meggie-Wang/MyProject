<style lang="scss" scoped>
  .hackerList {
    background: url('../../../static/img/dashboard/frame2.png') no-repeat;
    background-size: 100% 100%;
    padding: 0 5%;
    line-height: 5vh;
    color: white;
    .title {
      position: relative;
      height: 5em;
    }
    h1 {
      font-size: 1.5em;
      font-weight: bold;
      color: #BFFDE4;
      margin: 0 auto;
      line-height: 2.5em;
      white-space: nowrap;
    }
    ul {
      position: absolute;
      top: 0;
      left: 50%;
      display: flex;
      justify-content: space-between;
      width: 60%;
      margin-left: -29%;
    }
    .legend-item {
      width: 25%;
      color: #B8D9D0;
      font-size: 1em;
      line-height: 8em;
    }
    .table-users {
      width: 80%;
      border: 1px solid darken(rgba(15, 88, 77, 0.1), 5%);
      border-radius: 30px;
      box-shadow: 3px 3px 0 rgba(0,0,0,0.1);
      margin: 12% auto;
      overflow: hidden;
      table {
        border-collapse: separate;
        width: 100%;
        td, th {
          color: #C1FBE2;
        }
        td {
          background-color: lighten(rgba(15, 88, 77, 0.1), 50%);
          height: 10vh;
          border-top: 0.2em solid rgba(52, 52, 52, 0.6);
          text-align: center;
          &:first-child { width:10%;}
          &:nth-child(2) { width:15%;padding: 0 1%; }
          &:nth-child(4) { width:12%;color: #FF7490;}
          &:nth-child(3) { width:14%;line-height: 1.4rem;}
          &:last-child {
            width: 49%;
            padding: 0 1%;
            font-size: 1em;
            text-align: left;
          }
          img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            vertical-align: middle;
          }
        }
        th {
          background-color: lighten(rgba(15, 88, 77, 0.1), 50%);
          padding: 0.8%;
          font-weight: 300;
          white-space: nowrap;
          &:nth-child(2) { width:20%;}
        }
        tr {
          background-color:rgba(14,88,75,0.5);
          box-sizing: border-box;
        }
      }
    }
  }
  .active .hackerList h1 {
    line-height: 1.7em;
  }
  .active .hackerList .legend-item {
    line-height: 6em;
    cursor: pointer;
    user-select: none;
  }
  .active .hackerList .table-users {
    margin: 1% auto;
  }
  .active .hackerList table tr {
    height: 100%;
  }
</style>

<template>
  <div class="hackerList">
    <div class="title">
      <h1>{{ $t('messages.dashboard.threatInfo') }}</h1>
       <div class="legend-wrapper">
        <ul class="legend-list">
          <li class="legend-item" @click="beforePageloc()">
            {{ $t('messages.dashboard.prePage') }}
          </li>
          <li class="legend-item" @click="nextPageloc()">
            {{ $t('messages.dashboard.nextPage') }}
          </li>
        </ul>
      </div>
    </div>
    <div class="table-users">
       <table cellspacing="0">
        <tr>
           <th></th>
           <th>{{ $t('messages.dashboard.title') }}</th>
           <th>{{ $t('messages.dashboard.obtainTime') }}</th>
           <th>{{ $t('messages.geneReport.type') }}</th>
           <th width="350">{{ $t('messages.dashboard.explain') }}</th>
        </tr>
        <template >
          <tr v-for="item in secureInfoArr">
            <td>
              <img :src="item.img_src" alt="" />
            </td>
            <td>
              <p
                style="overflow: hidden;
                text-overflow: ellipsis;
                white-space: normal;
                display: -webkit-box;
                line-clamp: 2;
                box-orient: vertical;">{{ item.article_name }}</p>
            </td>
            <td>{{ item.article_time.slice(0, 10) }}</td>
            <td>{{ $t('messages.dashboard.securityHole') }}</td>
            <td>
              <p
              style="overflow: hidden;
              text-overflow: ellipsis;
              white-space: normal;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              width: 90%;">{{ item.summary }}</p>
            </td>
          </tr>
        </template>
       </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import api from '../../api/ipApi'
import replaceImg from '../../../static/img/safe_pt.png'
export default {
  data() {
    return {
      secureInfoArr: [],
      nextUrl: '',
      preUrl: '',
      headPic: api.securityHeadPic,
      replaceImg: replaceImg
    }
  },
  computed: {
    ...mapGetters(['language'])
  },
  watch: {
    language (val) {
      if (val === 'zh') {
        this.getDataloc()
      } else if (val === 'en') {
        this.getDatalocEn()
        $('.active h1').css('font-size', '1.6vw')
      }
    }
  },
  mounted() {
    if (this.$i18n.locale === 'zh') {
      this.getDataloc()
    } else if (this.$i18n.locale === 'en') {
      this.getDatalocEn()
      $('.active h1').css('font-size', '1.6vw')
    }
  },
  methods: {
    getDataloc(url) {
      api.secureInfoList(url).then((res) => {
        this.secureInfoArr = res.data.results
        for (var i = 0; i < this.secureInfoArr.length; i++) {
          if (this.secureInfoArr[i].img_src.split('.')[1]) {
            this.secureInfoArr[i].img_src = this.headPic + this.secureInfoArr[i].article_id + '/' + this.secureInfoArr[i].img_src
          } else {
            this.secureInfoArr[i].img_src = this.replaceImg // '../../../static/img/safe_pt.png'
          }
        }
        this.nextUrl = res.data.next
        this.preUrl = res.data.previous
      })
    },
    getDatalocEn(url) {
      api.secureInfoListEn(url).then((res) => {
        this.secureInfoArr = res.data.results
        for (var i = 0; i < this.secureInfoArr.length; i++) {
          this.secureInfoArr[i].article_name = res.data.results[i].title
          this.secureInfoArr[i].article_time = res.data.results[i].published
          if (this.secureInfoArr[i].img_src) {
            this.secureInfoArr[i].img_src = this.headPic + this.secureInfoArr[i].article_id + '/' + this.secureInfoArr[i].img_src
          } else {
            this.secureInfoArr[i].img_src = this.replaceImg // '../../../static/img/safe_pt.png'
          }
        }
        this.nextUrl = res.data.next
        this.preUrl = res.data.previous
      })
    },
    nextPageloc() {
      if (this.$i18n.locale === 'zh') {
        this.getDataloc(this.nextUrl)
      } else if (this.$i18n.locale === 'en') {
        this.getDatalocEn(this.nextUrl)
      }
    },
    beforePageloc() {
      if (this.$i18n.locale === 'zh') {
        this.getDataloc(this.preUrl)
      } else if (this.$i18n.locale === 'en') {
        this.getDatalocEn(this.preUrl)
      }
    }
  }
}
</script>