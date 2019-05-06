# 课题三

## 项目安装启动
    安装node_modules npm install
    启动 npm run dev
    打包 npm run build
**安装组件命令** npm install 组件名 --save-dev

## 目录介绍
> [学习](https://www.cnblogs.com/huangfeihong/p/9141273.html)
> src为开发文件夹
```
assets 静态文件
components 组件
config 项目配置
view 路由页面
vuex 共用接口请求
```

## Element-Ui自定义主题：
    1.安装主题生成工具
    npm install element-theme
    
    2.安装白垩主题
    	npm install element-theme-chalk
    
    3.初始化变量文件
    	项目中安装：node_modules/.bin/et -i
    	全局安装：et -i
    
    4.生成element-variables.scss文件，在文件中修改变量
    
    5.编译主题
    	项目中安装：node_modules/.bin/et
    	全局安装：et
    	
    6.生成theme文件夹，在项目中引用
    	import '../theme/index.css'
