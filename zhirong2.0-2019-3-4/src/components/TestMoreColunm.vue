<template>
  <div class="test-con">
    <el-table
      :data="data7"
      border
      class="test-more-column"
      style="width: 100%; margin-top: 20px">
      <el-table-column
        prop="id"
        label="ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="amount1"
        label="数值 1（元）">
        <template slot-scope="scope">
          <el-table :data="scope.row.amount1"></el-table>
          <p
          v-for="(i, j) in scope.row.amount1"
          :key="j">
            <span>{{i.name}}</span>:
            <span>{{i.value}}</span>
          </p>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'test-con',
  data () {
    return {
      data7: [{
        'amount1': [{
          'name': 'WindowName',
          'value': 'OleMainThreadWndName'
        }, {
          'name': 'ClassName',
          'value': '(null)'
        }, {
          'name': 'WindowName',
          'value': '(null)'
        }, {
          'name': 'ClassName',
          'value': 'RunDLL'
        }, {
          'name': 'WindowName',
          'value': 'SYSTEM AGENT COM WINDOW'
        }, {
          'name': 'ClassName',
          'value': 'SAGEWINDOWCLASS'
        }],
        'id': 1,
        'name': '创建特定窗体'
      }]
    }
  }
}
</script>