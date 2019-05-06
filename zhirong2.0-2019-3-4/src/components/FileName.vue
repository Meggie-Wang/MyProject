<template>
  <div
  class="file-name">
    <el-tooltip class="item" effect="light" :content="name" placement="top">
      <p>{{nameFilter()}}</p>
    </el-tooltip>
  </div>
</template>
<script>
export default {
  name: 'file-name',
  props: ['name', 'length', 'noEllipse'],
  methods: {
    nameFilter () {
      let nameVal = this.name
      let nameLen = this.length
      if (nameVal.length > nameLen) {
        return nameVal.slice(0, nameLen) + (this.noEllipse ? '' : '...')
      } else {
        return nameVal
      }
    }
  }
}
</script>
<style scoped="scoped">
  .file-name{
    display: inline-block;
  }
</style>
