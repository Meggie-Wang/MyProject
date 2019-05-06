<template>
  <div class="attack-type">
    <div>
      <h1>{{numberFunc(resData.value)}}</h1>
    </div>
  </div>
</template>
<script>
export default {
  name: 'attack-type',
  props: ['resData'],
  methods: {
    numberFunc (val) {
      if (String(val).length > 3) {
        return (val / 1000).toFixed(2) + 'k'
      } else {
        return val
      }
    }
  }
}
</script>
<style scoped="scoped">
  .attack-type{
    text-align: center;
    display: flex;
    align-items: center;
  }
  .attack-type > div {
    width: 100%;
  }
  .attack-type > div > h1{
    color: #ffffffcc;
    font-size: 4rem;
    line-height: 6rem;
    font-weight: bold;
  }
  .attack-type > div > p {
    color: #02ddb6;
  }
  .attack-type > div > h1,
  .attack-type > div > p{
    white-space: nowrap;
  }
</style>
