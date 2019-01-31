<template>
  <div class="del-custom-tags">
    <i
      @click="showCustomTagsDialog = true"
      class="el-icon-edit"></i>
    <el-dialog
      @close="closeCustomTagsDialog()"
      title="删除自定义标签"
      :visible.sync="showCustomTagsDialog"
      width="30%">
      <el-tag
        class="tags-style"
        v-for="(i, j) in thisTags"
        :key="j"
        :class="{'del-tag': i.show}">
          <span @click="i.show = !i.show">{{i.cn_name}}</span>
        </el-tag>

      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="closeCustomTagsDialog()">取 消</el-button>
        <el-button size="mini" type="primary" @click="delAct()">确 定</el-button>
      </span>

    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'delCuntomTags',
  data () {
    return {
      showCustomTagsDialog: false,
      thisTags: []
    }
  },
  props: ['tags'],
  watch: {
    tags (res) {
      this.thisTags = this.$common.inheritObj(res)
    }
  },
  methods: {
    closeCustomTagsDialog () {
      // 清空本组件内tags
      this.thisTags.forEach((i, j) => {
        i.show = false
      })
      // dialog 消失
      this.showCustomTagsDialog = false
    },
    delAct () {
      let delArr = []
      this.thisTags.forEach((i, j) => {
        if (i.show) {
          delArr.push(i.cn_name)
        }
      })
      if (delArr.length) {
        this.$api.get('delete_label', {
          user_id: localStorage.session_id || '3',
          name_list: JSON.stringify(delArr)
        }).then(res => {
          if (res.status === 200) {
            this.$message({
              message: res.message,
              type: 'success'
            })

            // 刷新数据
            this.$store.dispatch('getAllLable')
            this.$emit('initList')

            // 关闭dislog
            this.closeCustomTagsDialog()
          } else {
            this.$message({
              message: res.message,
              type: 'warning'
            })
          }
        })
      }
    }
  },
  mounted () {
    this.thisTags = this.$common.inheritObj(this.tags)
  }
}
</script>
<style scoped="scoped">
  .del-custom-tags {
    display: inline;
  }
  .tags-style {
    color: #fff!important;
    background-color: #999;
  }
  .del-tag {
    background-color: #d34c5c;
  }
</style>
