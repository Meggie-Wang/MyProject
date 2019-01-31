<template>
  <div class="attack-type">
    <div>
      <h1>{{ numberFunc(resData.value) }}</h1>
    </div>
  </div>
</template>
<script>
export default {
  name: 'attack-type',
  props: ['resData'],
  methods: {
    numberFunc (val) {
      let nn = isNaN(val) ? 0 : String(val)
      let showNum = 0
      let func = (ll, kmgt) => {
        return nn.slice(0, nn.length - ll) + '.' + nn.slice(nn.length - ll, nn.length - ll + 2) + kmgt
      }
      if (nn.length <= 3) {
        showNum = nn
      } else if (nn.length > 3 && nn.length <= 6) {
        showNum = func(3, 'K')
      } else if (nn.length > 6 && nn.length <= 9) {
        showNum = func(6, 'M')
      } else if (nn.length > 9 && nn.length <= 12) {
        showNum = func(9, 'G')
      } else if (nn.length > 12) {
        showNum = func(12, 'T')
      }
      return showNum
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
    font-size: 2.5vw;
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
