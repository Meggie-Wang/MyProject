<template>
  <div class="js-doc">
    <h1>DOCX browser Word document generation</h1>

    <button type="button" @click="generate()">Click to generate document</button>
  </div>
</template>
<script>
// img
import headerpic from '@/assets/img/batchUploadBg.png'
import { Document, Paragraph, Packer, TextRun, PictureRun } from 'docx'
import { saveAs } from 'file-saver'
export default {
  name: 'JsDoc',
  data () {
    return {
      headerpic: headerpic
    }
  },
  methods: {
    generate () {
      const doc = new Document()
      const paragraph = new Paragraph('Hello World')
      const institutionText = new TextRun('Foo Bar').bold()
      const dateText = new TextRun('Github is the best').tab().bold()

      var image = new Image()
      image.src = this.headerpic
      image.onload = () => {
        var base64 = this.getBase64Image(image)
        console.log(base64)

        const imageData = doc.createImage(base64)
        const pic = new PictureRun(imageData, 100, 100)
        paragraph.addRun(pic)

        paragraph.addRun(institutionText)
        paragraph.addRun(dateText)

        doc.addParagraph(paragraph)

        const packer = new Packer()

        packer.toBlob(doc).then(blob => {
          saveAs(blob, 'example.docx')
        })
      }
    },
    getBase64Image (img) {
      var canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      var ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, img.width, img.height)
      var ext = img.src.substring(img.src.lastIndexOf('.') + 1).toLowerCase()
      var dataURL = canvas.toDataURL('image/' + ext)
      return dataURL
    }
  }
}
</script>
<style scoped="scoped"></style>
