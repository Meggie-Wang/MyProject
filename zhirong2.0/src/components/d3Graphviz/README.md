# d3-graphviz

## 资源引用
> index.html
```html
<script src="https://d3js.org/d3.v4.min.js"></script>
<script src="https://unpkg.com/viz.js@1.8.0/viz.js" type="javascript/worker"></script>
<script src="https://unpkg.com/d3-graphviz@1.3.1/build/d3-graphviz.min.js"></script>
```

## 禁用eslint
```javascript
/* eslint-disable*/
export default {}
```

## props
```javascript
export default {
  props: ['className', 'dots', 'label'],
  mounted () {
    // dots 格式
    // [
    // 'digraph  {',
    // '    node [style="filled"]',
    // '    a [fillcolor="#d62728", label = "123123123"]',
    // '    b [fillcolor="#1f77b4"]',
    // '    a -> b',
    // '    b -> c',
    // '}'
    // ]

    // label解释
    // node上不能增加自定义的标签存储隐藏的信息
    // 但是node是按照顺序排列的，鼠标事件能获取到节点上的id=‘node数字’
    // 处理的label数组，通过上面获取的数字就能得到响应的label显示tooltip
  }
}
```