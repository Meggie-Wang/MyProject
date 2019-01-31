<template>
  <div class="gene-detail-con">
    <section class="basic-info">
      <header>基本信息</header>
      <p>MD5: {{MD5}}</p>
      <p>SIZE: {{sampleSize}}</p>
    </section>

    <section class="gene-detail">
      <header>基因信息</header>
      <table>
        <tr
          v-for="(i, j) in geneData"
          :key="j">
          <td>{{i}}</td>
        </tr>
        <tr v-if="!geneData.length">
          <td>该样本未提取基因</td>
        </tr>
      </table>
    </section>
  </div>
</template>
<script type="text/javascript">
import api from '../../api/ipApi'
import { Loading } from 'element-ui'
export default {
  name: 'gene-detail',
  data () {
    return {
      MD5: '',
      sampleSize: '',
      geneData: []
    }
  },
  mounted () {
    Loading.service()
    api.sampleGene(this.$route.query.id).then(res => {
      Loading.service().close()
      let d = res.data.data
      this.MD5 = d.sample_md5
      this.sampleSize = d.sample_size
      this.geneData = d.gene_info || []
    }).catch((err) => {
      Loading.service().close()
      alert(err)
    })
  }
}
</script>
<style type="text/css" scoped="scoped" lang="scss">
  .gene-detail-con {
    width: 80%;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 20px 0;
  }
  .gene-detail-con section {
    margin-bottom: 20px;
    header {
      font-weight: bold;
      font-size: 1.2rem;
      border-bottom: 1px solid rgb(20, 143, 115);
      padding-bottom: 3px;
      margin-bottom: 10px;
    }
    p {
      padding: 5px 0;
    }
  }
  .gene-detail table {
    width: 100%;
    background: transparent;
    box-sizing: border-box;
    color: rgb(20, 143, 115);
    table-layout: fixed;
    border: 1px solid rgb(20, 143, 115);
  }
  table tr td {
    box-sizing: border-box;
    padding: 5px 10px;
  }
</style>
