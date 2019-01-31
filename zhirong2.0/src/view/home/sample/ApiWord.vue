<template>
  <div class="api-word">
    <iframe
      src='./static/api/index.html'
      frameborder='0'
      scrolling="yes"
      style="position: relative; top: 0px; display: block; width: 100%; height: 100%;"></iframe>

  </div>
</template>
<script type="text/javascript">
export default {
  name: 'api-word',
  data () {
    return {
      entries: ['home', 'h2', 'h3'],
      r: []
    }
  },
  mounted () {
    for (let i = 0; i < 100; i++) {
      this.r.push(i)
    }
  }
}
</script>
