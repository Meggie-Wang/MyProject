# v-echart

- 参数
    + className
        * echarts创建实例所绑定的唯一标示
    + options
    + winResize 
        * 当在其他页面改变浏览器尺寸后，回到组件所在页面时候监听
        * beforeRouteEnter (to, from, next) {
            next(vm => {
              vm.winResize = window.innerHeight + '/' + window.innerWidth
            })
          }