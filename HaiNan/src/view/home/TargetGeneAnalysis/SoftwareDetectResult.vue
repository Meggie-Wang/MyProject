<template>
  <div class="SoftwareDetectResult">
    <DetailTitle :title="$route.query.name"/>
    <BasicInfor />
    <DetailTable title='命中漏洞' :tableTitle=tableTitle :tableData=tableData operation="查看详情" />
  </div>
</template>

<script>
export default{
  name: 'SoftwareDetectResult',
  data () {
    return {
      tableTitle: [
        {
          prop: 'id',
          label: '漏洞名称'
        },
        {
          prop: 'version',
          label: '漏洞号'
        },
        {
          prop: 'inStoreTime',
          label: '公布时间',
          width: 140
        },
        {
          prop: 'hasSoftConfirm',
          label: '漏洞级别',
          width: 120
        },
        {
          prop: 'hasBugGeneConfirm',
          label: '相关程序数量',
          width: 150
        }
      ],
      tableData: [
        {
          id: '王小虎',
          version: '低',
          inStoreTime: '2019-2-27',
          hasSoftConfirm: '20',
          hasBugGeneConfirm: '50'
        }
      ]
    }
  }
}
</script>
