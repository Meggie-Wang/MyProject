<template>
  <div class="router-intro">
    <header>{{$route.meta.title}}</header>
    <section class="content" v-if="content.length">{{content}}</section>
    <section>
      <slot name="upload" />
    </section>
  </div>
</template>

<script>
export default {
  name: 'router-intro',
  props: ['content']
}
</script>

<style scoped="scoped" lang="scss">
  .router-intro {
    margin-bottom: .5rem;
    header {
      color: $textColor;
      background: $bgColor-opacity;
      font-size: .9rem;
      font-weight: bold;
      border-radius: 2px 2px 0 0;
      padding: 8px 1rem;
    }
    .content {
      margin-top: 1px;
      color: $tableTitleText;
      background: $tableTitleBg;
      font-size: .8rem;
      font-weight: normal;
      padding: 8px 1rem;
    }
    .upload {
      color: $textColor;
      background: $bgColor-opacity;
      font-size: .8rem;
      font-weight: normal;
      border-radius: 0 0 2px 2px;
      padding: 8px 1rem;
      display: flex;
      justify-content: space-between;
      margin-bottom: .5rem;
      .upload_left {
        width: 40%;
        vertical-align: center;
        img {
          width: 30%;
        }
      }
      .upload_right {
        width: 60%;
      }
    }
  }
</style>
