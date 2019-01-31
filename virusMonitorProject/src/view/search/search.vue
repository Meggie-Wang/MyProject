<style scoped>
  .search {
    width: 80%;
    margin: 5% auto;
  }
  .search_img {
    width: 40%;
    margin: 0 auto;
  }
  img {
    width: 100%;
  }
  .search_input {
    display: flex;
    width: 65%;
    margin: 5% auto 0;
  }
  .search_input input {
    width: 85%;
    height: 16px;
    border: 1px solid #157150;
    color: #1C7C5A;
    border-right: none;
    border-radius: 25px 0 0 25px;
    padding: 2.1% 1%;
    outline: none;
    text-indent: 20px;
    font-size: 14px;
  }
  input::-webkit-input-placeholder {
    color: #1C7C5A;
  }
  input::-moz-placeholder {
    color: #1C7C5A;
    opacity: 1;
  }
  /*去除IE下输入框右侧图标*/
  input::-ms-clear, input::-ms-reveal {
    display: none;
  }
  .search_input button {
    width: 12%;
    padding: 2% 1%;
    background: #0E6A55;
    border: none;
    border-radius: 0 25px 25px 0;
    outline: none;
    user-select: none;
    cursor: pointer;
  }
  .search_input button i {
    display: block;
    width: 20px;
    height: 20px;
    margin: 0 auto;
    background: url('../../../static/img/icon.png') -208px -103px no-repeat;
  }
  .tip {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    color: red;
    font-size: 12px;
    margin-top: 1%;
  }
  .hsearch {
    margin-top: 3%;
    text-align: center;
  }
  .hsearch a {
    color: #1C7C5A;
    font-size: 14px;
    border-bottom: 1px solid #1C7C5A;
  }
</style>
<template>
  <div class="search">
    <div class="search_img">
      <img src="../../../static/img/search_bg.png">
    </div>
    <div class="search_input">
      <input :placeholder="$t('messages.search.input')" class="inp" @keyup.enter="doSearch()" @focus="tip = ''">
      <button @click="doSearch()">
        <i></i>
      </button>
    </div>
    <p class="tip">{{ tip }}</p>
    <div class="hsearch">
      <router-link to="/advSearch">{{ $t('messages.search.advSearch') }}</router-link>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import api from '../../api/ipApi'
export default {
  data() {
    return {
      tip: ''
    }
  },
  computed: {
    ...mapGetters(['language'])
  },
  watch: {
    language () {
      this.tip = ''
    }
  },
  methods: {
    doSearch: function() {
      var msg = $('.inp').val()
      if (msg !== '') {
        if (/^[0-9a-zA-Z.]+$/.test(msg)) {
          this.$router.push({
            name: 'iplist',
            query: {
              id: 1,
              search: msg,
              page: 1
            }
          })
        } else {
          this.tip = this.$t('messages.search.searchTypeTip')
        }
      } else {
        this.tip = this.$t('messages.search.searchTip')
      }
      setTimeout(() => {
        this.tip = ''
      }, 2000)
    }
  }
}
</script>