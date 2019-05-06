<template>
  <div class="tableDataLoading">
    <div
    class="_text-center scope-loading"
    v-if="show && batchUploadDatas.length === 0">
      <i class="el-icon-loading"></i>加载中
    </div>
    <div
    class="_text-center scope-loading"
    v-if="!show && (batchUploadDatas === 1 || batchUploadDatas.length === 0)">无</div>
  </div>
</template>
<script>
export default {
  name: 'tableDataLoading',
  props: ['batchUploadDatas', 'show']
}
</script>
