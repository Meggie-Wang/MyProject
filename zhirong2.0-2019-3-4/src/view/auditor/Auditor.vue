<template>
  <div class="auditor-user">
    <myHeader title="软件基因恶意代码检测审计系统" />
    <div class="auditor-con">
      <AdminSidebar />
    </div>
  </div>
</template>
<script>
export default {
  name: 'Auditor'
}
</script>
<style scoped="scoped">
  .auditor-user {
    height: 100%;
  }
  .auditor-con {
    display: flex;
    height: calc(100% - 80px);
  }
  .auditor-router {
    width: calc(100% - 200px);
    overflow-y: scroll;
  }
</style>
