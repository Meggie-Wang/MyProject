<template>
  <div class="statusTab">
    <el-select v-model="probeSelectionValue" :placeholder="sideBar.sideBarActive" class="probeSelectionData" @change="probeSelectionChange">
      <el-option
        v-for="(i, j) in sideBar.sideBarData"
        :key="j"
        :label="i"
        :value="j">
      </el-option>
    </el-select>
    <el-select v-model="timeSelectionValue" :placeholder="selectTimeActive()" class="timeSelectionData" @change="timeSelectionChange">
      <el-option
        v-for="(item, index) in sideBar.sideBarTime"
        :key="index"
        :label="$i18n.locale === 'en' ? item.split('|')[1] : item.split('|')[0]"
        :value="index">
      </el-option>
    </el-select>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { Select, Option } from 'element-ui'
export default {
  data () {
    return {
      probeSelectionValue: '',
      timeSelectionValue: '',
      probeSelect: 'HP_USA_Western_47.254.45.254',
      timeSelect: 0,
      timeSelectActive: ''
    }
  },
  components: {
    elSelect: Select,
    elOption: Option
  },
  computed: {
    ...mapGetters(['sideBar', 'language'])
  },
  watch: {
    language () {
      this.timeSelectActive = JSON.parse(JSON.stringify(this.sideBar.sideBarTimeActive))
      if (localStorage.locale === 'zh') {
        this.timeSelectActive = this.sideBar.sideBarTimeActive.split('|')[0]
      } else if (localStorage.locale === 'en') {
        this.timeSelectActive = this.sideBar.sideBarTimeActive.split('|')[1]
      }
    }
  },
  methods: {
    ...mapActions(['statusDataAct']),
    probeSelectionChange (val) {
      this.probeSelect = val
      this.statusDataAct({search: val, section: this.timeSelect})
    },
    timeSelectionChange (val) {
      this.timeSelect = val
      this.statusDataAct({search: this.probeSelect, section: val})
    },
    selectTimeActive () {
      if (this.sideBar.sideBarTimeActive) {
        if (localStorage.locale === 'zh') {
          this.timeSelectActive = this.sideBar.sideBarTimeActive.split('|')[0]
        } else if (localStorage.locale === 'en') {
          this.timeSelectActive = this.sideBar.sideBarTimeActive.split('|')[1]
        }
        return this.timeSelectActive
      }
    }
  }
}
</script>
