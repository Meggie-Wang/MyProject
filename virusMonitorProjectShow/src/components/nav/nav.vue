<style scoped>
	._nav_container {
		position: relative;
		box-shadow: 2px 0px 5px #ccc;
	}
	._nav {
		display: flex;
    align-items: center;
		width: 80%;
		height: 80px;
    margin: 0 auto;
	}
	._nav > a, ._nav > div {
		flex: 1;
	}
	._nav > a > i {
		display: block;
    width: 172px;
    height: 32px;
    background: url('../../../static/img/logo.png') center center / cover no-repeat;
	}
	._nav > ul {
    display: flex;
		flex: 3;
	}
	._nav > ul > li {
    flex: 1;
		text-align: center;
		height: 60px;
    line-height: 60px;
    white-space: nowrap;
    margin: 0 2%;
    font-size: 1.1vw;
    cursor: pointer;
	}
	._nav > ul > li:hover,
	.activeDad {
		box-sizing: border-box;
		border-bottom: 3px solid #169275;
		color: #169275;
	}
  ._nav > div {
    text-align: end;
  }
  .el-dropdown-link i {
    display: block;
    width: 32px;
    height: 32px;
    background:url('../../../static/img/icon.png') -202px -47px no-repeat;
    cursor: pointer;
  }
  .el-dropdown-menu__item a,
  .el-dropdown-menu__item span {
    color: #169275;
  }
  .el-dropdown-menu__item:hover {
    background: #169275;
  }
  .el-dropdown-menu__item:hover a,
  .el-dropdown-menu__item:hover span {
    color: #fff;
  }
  .changeLanguage {
    display: inline-block;
    width: 30px;
    height: 30px;
    margin-left: 10px;
    background:url('../../../static/img/icon.png') -97px -149px no-repeat;
    cursor: pointer;
  }
  .changeLanguage.active {
    background:url('../../../static/img/icon.png') -48px -149px no-repeat;
  }
	.dropMenuContainer {
    position: absolute;
		width: 100%;
    color: #fff;
		background: #169275;
    text-align: center;
    z-index: 999;
	}
	.dropMenuContainer > ul > li{
		display: inline-block;
		padding: 15px 30px;
		font-size: 14px;
		color: #ccc;
    cursor: pointer;
	}
	.dropMenuContainer > ul > li:hover,
	.activeSon {
		color: #fff!important;
	}
</style>
<template>
	<div class="_nav_container">
		<div class="_nav">
			<router-link to="/dashboard">
				<i></i>
			</router-link>
			<ul>
				<li 
  				v-for="(i, j) in $t('messages.nav.dadLi')"
  				:key="j"
  				:class="{activeDad: isSelect === i.componentName}"
  				@click="jumpTo(i.componentName, i.indexNum)"
  				@mouseover="dadLiHover(i.indexNum)">{{i.title}}</li>
			</ul>
      <div>
        <el-dropdown>
          <span class="el-dropdown-link">
            <i></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <router-link to="/personal">{{ $t('messages.nav.personalCenter') }}</router-link>
            </el-dropdown-item>
            <el-dropdown-item @click.native="login_out">
              <span>{{ $t('messages.nav.exit') }}</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- 中英文切换 -->
        <i @click="changeLanguage" v-if="$route.path !== '/inforloopholeDetail'" class="changeLanguage"></i>
      </div>
		</div>
		<div
  		class="dropMenuContainer"
  		@mouseleave="dropMenuData=[]">
			<ul>
				<li
  				v-for="(i,j) in dropMenuData"
  				:key="j"
  				:class="{activeSon: i.active}"
  				@click="jumpTo(i.componentName, i.indexNum, i.componentName)">{{i.title}}</li>
			</ul>
		</div>
	</div>
</template>
<script>
import { mapMutations } from 'vuex'
import api from '../../api/ipApi'
export default {
  name: 'navComponent',
  data() {
    return {
      isSelect: '',
      dropMenuData: []
    }
  },
  mounted () {
    let componentName = location.href.split('#/')[1].split('?')[0]
    this.defaultComponentName(componentName)
    if (this.$i18n.locale === 'en') {
      $('.changeLanguage').addClass('active')
    } else {
      $('.changeLanguage').removeClass('active')
    }
  },
  methods: {
    ...mapMutations(['setLang']),
    login_out () {
      api.setCookie('token_virus', '', 0)
      this.$router.push({path: '/login'})
    },
    dropMenuAct(val) {
      let componentName = location.href.split('#/')[1].split('?')[0]
      if (val === 1) {
        if (componentName !== '/detection' &&
        componentName !== '/detQueue' &&
        componentName !== '/detHistory') {
          this.$router.push({path: '/detection'})
        }
      } else {
        if (componentName !== '/safeInfor' &&
        componentName !== '/safeWords' &&
        componentName !== '/inforloophole') {
          this.$router.push({path: '/safeInfor'})
        }
      }
    },
    jumpTo(val, indexNum, somName) {
      let componentName = location.href.split('#/')[1].split('?')[0]
      if (val !== 'about') {
        this.defaultComponentName(val)
        if (indexNum === 2) {
          this.dropMenuAct(1)
        } else if (indexNum === 3) {
          this.dropMenuAct(2)
        } else {
          if (somName !== componentName) {
            this.$router.push('/' + val)
          }
        }
      } else {
        window.location.href = "//www.roarpanda.com"
      }
    },
    dadLiHover(indexNum) {
      let dropMenuAct = res => {
        res.forEach((i, j) => {
          if (i.componentName === location.href.split('#/')[1].split('?')[0]) {
            i.active = true
          } else {
            i.active = false
          }
        })
        this.dropMenuData = res
      }
      if (indexNum !== 2 && indexNum !== 3) {
        this.dropMenuData = []
      } else {
        if (indexNum === 2) {
          dropMenuAct(this.$t('messages.nav.dropMenuDataOne'))
        } else {
          dropMenuAct(this.$t('messages.nav.dropMenuDataTwo'))
        }
      }
    },
    // 刷新默认高亮menu函数
    defaultComponentName(val) {
      if (val === 'detection' || val === 'detQueue' || val === 'detHistory') {
        this.isSelect = 'softGene'
      } else if (val === 'safeInfor' || val === 'safeWords' || val === 'inforloophole' || val === 'inforloopholeDetail' || val === 'safeInforDetail') {
        this.isSelect = 'threats'
      } else if (val === 'advSearch' || val === 'list' || val === 'detail') {
        this.isSelect = 'search'
      } else if (val === 'GeneDetail') {
        this.isSelect = 'help'
      } else {
        this.isSelect = val
      }
    },
    // 中英文切换事件
    changeLanguage() {
      $('.changeLanguage').toggleClass('active')
      let lang = this.$i18n.locale === 'zh' ? 'en' : 'zh'
      this.$i18n.locale = lang
      this.setLang()
    }
  }
}
</script>