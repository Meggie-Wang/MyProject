<template>
	<div id="Home">
		<NavBar />
    <keep-alive>
      <router-view v-if="$route.meta.keeplive"></router-view>
    </keep-alive>
    
    <router-view v-if="!$route.meta.keeplive" class="router-view" :language="this.$i18n.locale"></router-view>
	</div>
</template>

<script>
  import NavBar from 'components/nav/nav'
  export default{
    name: 'Home',
    data () {
      return {}
    },
    components: {
      NavBar
    }
  }
</script>