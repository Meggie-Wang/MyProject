## 打包 & 启动
- 修改文件列表
    + main.js 项目名字

## 配置 config目录
- 配置全局颜色变量 utils.js, 设置完成后需要重启vue项目
    +   cssLoaders = () {
            ...
            return {
                ...,
                scss: generateLoaders('sass').concat({
                  loader: 'sass-resources-loader',
                  options: {
                    resources: path.resolve(__dirname, '../src/assets/css/color.scss')
                  }
                }),
                ...
            }
    +   }
- static.js 配置静态文件事项
    +  随项目更换static.js文件
- components 自研组件列表全局注册
    + 根据不同客户的需求开发出不同的组件列表 Cncert-components
    + **组件和页面之间微妙差别处理**
        * tokenName
- router.js
- api.js

- common 公用组件，资源
- third-components 第三方组件

## 公用方法
- 存储在 assets/js/common.js
- config/static.js 中注册到Vue实例的原型下
- 调用：this.$common.foo()

### 方法列表
- 检测结果校验
    + 接口返回yes, no, unkonw
    + 对应 有恶意性，无恶意性，未知

## element-ui
- menu
    + 当使用this.$router.push跳转时，menu高亮不更新情况
        * 建立／assets/js/bus.js,创建Vue新实例，将跳转时的路由传递到实例
        * 在menu处获取bus实例存储的路由并更新到menu
    + menu的default-index.  
        * activeIndex 是path
        * $route.path ($route 是全局的data属性) // 初步测试可行
    + @select="func"  此func不能带括号
