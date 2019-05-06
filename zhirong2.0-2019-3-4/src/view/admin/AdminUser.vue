<template>
  <div class="admin-user">
    <myHeader title="软件基因恶意代码检测管理系统" />
    <div class="admin-con">
      <AdminSidebar />
    </div>
  </div>
</template>
<script>
export default {
  name: 'AdminUser'
}
</script>
<style scoped="scoped">
  .admin-user {
    height: 100%;
  }
  .admin-con {
    display: flex;
    height: calc(100% - 80px);
  }
</style>
