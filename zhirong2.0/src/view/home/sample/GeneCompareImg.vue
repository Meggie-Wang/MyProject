<template>
  <div class="GeneCompareImg">
    <div class="showImg">
      <div style="margin-right: .2rem">
        <img :src="Img[0]" alt="" :style="{width: ratio1 + '%'}">
        <div class="changeImgBtn1">
          <span @click="bigImg('ratio1')"><img :src="$img.bigImg" alt=""></span>
          <span @click="smallImg('ratio1')"><img :src="$img.smallImg" alt=""></span>
        </div>
      </div>
      <div style="margin-left: .2rem">
        <img :src="Img[1]" alt="" :style="{width: ratio2 + '%'}">
        <div class="changeImgBtn2">
          <span @click="bigImg('ratio2')"><img :src="$img.bigImg" alt=""></span>
          <span @click="smallImg('ratio2')"><img :src="$img.smallImg" alt=""></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  name: 'GeneCompareImg',
  data () {
    return {
      Img: [],
      Title: '',
      ratio1: 100,
      ratio2: 100
    }
  },
  methods: {
    bigImg (val) {
      if (val === 'ratio1') {
        if (this.ratio1 < 400) {
          this.ratio1 = this.ratio1 + 20
        } else {
          this.ratio1 = 400
        }
      } else if (val === 'ratio2') {
        if (this.ratio2 < 400) {
          this.ratio2 = this.ratio2 + 20
        } else {
          this.ratio2 = 400
        }
      }
    },
    smallImg (val) {
      if (val === 'ratio1') {
        if (this.ratio1 > 40) {
          this.ratio1 = this.ratio1 - 20
        } else {
          this.ratio1 = 40
        }
      } if (val === 'ratio2') {
        if (this.ratio2 > 40) {
          this.ratio2 = this.ratio2 - 20
        } else {
          this.ratio2 = 40
        }
      }
    },
    init () {
      this.$api.get('function_pic', {
        id: this.$route.query.id
      }).then(r => {
        if (r.status === 200) {
          this.Img = r.data.map(i => {
            return this.$api.apiPath + 'api/image_show/?image_path=' + i
          })
          this.$api.get('image_show', {
            image_path: r.data[0]
          })
        }
      })
    }
  },
  mounted () {
    // this.Img = this.$route.query.imgArr
    // this.Title = this.$route.query.func1 + '，' + this.$route.query.func2
    this.init()
  }
}
</script>
<style scoped lang="scss">
  .GeneCompareImg {
    box-sizing: border-box;
    position: relative;
  }
  .showImg {
    display: flex;
    // margin-top: .5rem;
    max-height: calc(100%);
    >div {
      position: relative;
      display: inline-block;
      width: 50%;
      height: auto;
      /*border: 1px solid white;*/
      overflow: auto;
      >div {
        button {
          font-size: 1rem;
          font-weight: bold;
          border: none;
          -webkit-box-shadow: 0px 1px 5px #001913;
          box-shadow: 0px 1px 5px #001913;
          margin-bottom: 2px;
        }
      }
    }
  }
  .changeImgBtn1 {
    position: absolute;
    top: calc(2.3rem + 26px);
    left: calc(10% + 5px);
  }
  .changeImgBtn2 {
    position: absolute;
    top: calc(2.3rem + 26px);
    left: calc(10% + 5px)
  }
</style>
