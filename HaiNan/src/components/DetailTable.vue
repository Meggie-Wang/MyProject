<template>
  <div
    class="DetailTable"
    v-if="(this.$router.history.current.path.split('/')[1] === 'LoopholeGeneAnalysisDetail' &&
      title === '关联软件') || (tableData && tableData.length !== 0)">
    <h1 v-if="this.$router.history.current.path.split('/')[1] === 'LoopholeGeneAnalysisDetail' &&
      title === '关联软件'"
      style="display: flex;align-items: center;justify-content: space-between;">
      <div>{{ title }}</div>
      <div style="margin-right: .5rem">
        <slot name="header"></slot>
      </div>
    </h1>
    <h1 v-else>{{ title }}</h1>

    <el-table :data="tableData">

      <el-table-column
        v-for="(i, j) in tableTitle" :key="j"
        :prop="i.prop"
        :label="i.label"
        align="center"
        :show-overflow-tooltip="true"
        :width="i.width">

        <template slot-scope="scope">
          <span v-if="i.prop !== 'hasBugCode' && i.prop !== 'id'">
            {{ scope.row[i.prop]}}
          </span>

          <slot
            v-if="i.prop === 'hasBugCode'"
            name="hasBugCode"
            :id="scope.row.id"
            :hasBugCode="scope.row.hasBugCode"/>

          <slot
            v-if="i.prop === 'id'"
            name="checkSoftDetail"
            :id="scope.row.id"/>

          <slot
            v-if="i.prop === 'id'"
            name="jump"
            :id="scope.row.id"/>

        </template>

      </el-table-column>

      <el-table-column v-if="operation" align="center" width="120">
        <template slot-scope="scope">
          <el-button size="mini" @click="operations(scope.row)">{{ operation }}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'DetailTable',
  data () {
    return {
      currentPath: this.$router.history.current.path.split('/')[1]
    }
  },
  props: ['title', 'tableTitle', 'tableData', 'operation'],
  methods: {
    operations (val) {
      if (this.currentPath === 'SoftwareDetectResult') {
        this.$router.push({
          path: 'LoopholeGeneDetail',
          query: {id: val.file_id}
        })
      }
      this.$emit('operat', val.id)
    }
  }
}
</script>
<style lang="scss">
  .DetailTable {
    margin-top: 5px;
    h1 {
      color: $tableTitleText;
      background: $tableTitleBg;
      text-indent: 1rem;
      font-size: 0.9rem;
      font-weight: normal;
      border-radius: 2px;
      margin-bottom: 2px;
      padding: 8px 0;
    }
    .el-table {
      background: transparent;
      tr, th, td {
        border-radius: 3px
      }
      tr {
        background: $bgColor-opacity;
      }
      th {
        color: $textColor;
        background: transparent;
      }
      th, td {
        border-bottom: 2px solid #0a2a25;
        border-right: 2px solid #0a2a25;
        padding: 8px 0;
        font-size: 0.8rem;
      }
      th:nth-last-child(2) {
        border-right: none;
      }
      td {
        padding: 0;
        height: 3rem;
        .cell {
          height: 3rem;
          line-height: 3rem;
        }
      }
      button {
        border: none;
        box-shadow: 0px 1px 5px #001913;
      }
      button:hover {
        color: $greenLight;
      }
      td:last-of-type {
        border-right: none;
      }
    }
  }
</style>
