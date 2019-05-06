<template>
  <div class="article">
    <Loading v-if="loading"/>

    <header
      @click="checkRelate"
      class="__handCursor"
      style="display: flex; align-items: center; line-height: 40px;">
      <span>关联信息：{{$route.query.relate_md5}}</span>
      <img v-lazy="$img.view" alt="" style="height: 13px;margin-left: 5px;">查看
    </header>

    <el-collapse v-model="activeNames">
      <el-collapse-item
        title="相关文章"
        name="1"
        v-if="content.length">
        <section class="content">
          <h1>
            <span>{{contentTitle}}</span>
            <span
              class="__handCursor"
              style="vertical-align: super; font-size: 10px; border: 1px solid #315697;">
              <a
                :href="source_url"
                style="color: #333;">来源</a>
            </span>
          </h1>
          <p class="__text-center">
            <span>{{$common.dateChange(text_date)}}</span>
          </p>
          <figure
            v-for="(i, j) in content"
            :key="j">
              <div v-if="i.type === 'img'">
                <img :src="$api.contentImg + i.value" alt="" width="100%">
              </div>

              <div v-if="i.type === 'text'">
                <p>{{i.value}}</p>
              </div>
            </figure>
        </section>
      </el-collapse-item>

      <el-collapse-item
        title="IOC"
        name="2"
        v-if="relate_info.length">
        <br>
        <section class="relate-info">
          <table>
            <tr>
              <td width="150">APT组织</td>
              <td width="100">加密类型</td>
              <td>加密信息</td>
            </tr>
            <tr
              v-for="(i, j) in relate_info"
              :key="j"
              :id="$route.query.relate_md5.toLowerCase() === i.info.toLowerCase()
                ? 'checkRelate'
                : ''"
              :style="{
                background: $route.query.relate_md5.toLowerCase() === i.info.toLowerCase()
                  ? 'red' : 'none',
                color: $route.query.relate_md5.toLowerCase() === i.info.toLowerCase()
                  ? '#fff' : '#3a537e'
              }">
                <td>{{i.apt_name}}</td>
                <td>{{i.type.toUpperCase()}}</td>
                <td>{{i.info}}</td>
              </tr>
          </table>
        </section>
      </el-collapse-item>

    </el-collapse>

  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: true,
      activeNames: ['1', '2'],
      contentTitle: '',
      source_url: '',
      text_date: '',
      content: [],
      relate_info: []
    }
  },
  methods: {
    init () {
      this.$api.get('relate_article', {
        relate_md5: this.$route.query.relate_md5
      }).then(r => {
        this.loading = false
        if (r.status === 200) {
          this.source_url = r.data.source_url
          this.text_date = r.data.text_date

          this.contentTitle = r.data.title
          this.content = r.data.content
          this.relate_info = r.data.relate_info
        } else {
          this.$notify.warning({
            title: '警告',
            message: r.message,
            duration: 2000,
            onClose: function () {
              window.close()
            }
          })
        }
      })
    },
    checkRelate () {
      let article = document.querySelector('.article')
      let cr = document.querySelector('#checkRelate')
      let topVal = Math.abs(cr.getBoundingClientRect().top)
      article.scrollTop = topVal - 160
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped="scoped" lang="scss">
  .article {
    box-sizing: border-box;
    padding: 20px 10%;
    figure {
      p {
        margin: 15px 0;
        text-indent: 2em;
      }
    }
    h1 {
      font-size: 24px;
      margin: 20px auto 0px;
      text-align: center;
    }
    table {
      width: 100%;
      background: transparent;
      box-sizing: border-box;
      color: #3a537e;
      table-layout: fixed;
    }
    table tr td {
      box-sizing: border-box;
      padding: 0 10px;
      border: 1px solid #3a537e;
    }
    table tr td table tr td {
      padding: 0;
      box-sizing: border-box;
      border: 1px solid #3a537e;
    }
    table tr td table tr:first-child td {
      border-top-width: 0;
    }
    table tr td table tr:last-child td {
      border-bottom-width: 0;
    }
    table tr td table tr td:first-child {
      border-left-width: 0;
      border-right-width: 0;
    }
    table tr td table tr td:last-child {
      border-right-width: 0;
    }
  }
</style>
