<template>
  <div class="pdf-wrap">
    <canvas ref="theCanvass"></canvas>
    <div class="foot" v-if="pdfDoc">
      <button class="left" @click="onPrevPage" v-if="pageNum>1">上一页</button>
      <button class="right" @click="onNextPage" v-if="pageNum<pdfDoc.numPages">下一页</button>
    </div>
  </div>
</template>

<script>

import PDFJS from 'pdfjs-dist'

export default {
  props: ['pdfurl'],
  data () {
    return {
      pdfDoc: null,
      pageNum: 1,
      pageRendering: false,
      pageNumPending: null
    }
  },
  mounted () {
    this.showPDF(this.pdfurl)
   
  },
  methods: {
    showPDF (url) {
      let _this = this
      PDFJS.getDocument(url).then(function (pdf) {
        _this.pdfDoc = pdf
        _this.renderPage(1)
      })
    },
    renderPage (num) {
      this.pageRendering = true
      let _this = this
      this.pdfDoc.getPage(num).then(function (page) {
        let canvas = _this.$refs.theCanvass
        let ctx = canvas.getContext('2d')
        let dpr = window.devicePixelRatio || 1
        let bsr = ctx.webkitBackingStorePixelRatio ||
                  ctx.mozBackingStorePixelRatio ||
                  ctx.msBackingStorePixelRatio ||
                  ctx.oBackingStorePixelRatio ||
                  ctx.backingStorePixelRatio || 1
        let ratio = dpr / bsr
        var viewport = page.getViewport(screen.availWidth / page.getViewport(1).width)
        canvas.width = viewport.width * ratio
        canvas.height = viewport.height * ratio
        canvas.style.width = viewport.width + 'px'
        canvas.style.height = viewport.height + 'px'
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
      
        // Render PDF page into canvas context
        var renderContext = {
        canvasContext: ctx,
        viewport: viewport
        }
        var renderTask = page.render(renderContext)
      
        // Wait for rendering to finish
        renderTask.promise.then(function () {
        _this.pageRendering = false
        if (_this.pageNumPending !== null) {
          // New page rendering is pending
          _this.renderPage(_this.pageNumPending)
          _this.pageNumPending = null
        }
        })
      })
    },
    queueRenderPage (num) {
      if (this.pageRendering) {
        this.pageNumPending = num
      } else {
        this.renderPage(num)
      }
    },
    onPrevPage () {
      if (this.pageNum <= 1) {
        return
      }
      this.pageNum--
      this.queueRenderPage(this.pageNum)
    },
    onNextPage () {
      if (this.pageNum >= this.pdfDoc.numPages) {
        return
      }
      this.pageNum++
      this.queueRenderPage(this.pageNum)
    }
  }
}
</script>

<style scoped>
.pdf-wrap{
  width: 100%;
}
.foot {
 position: fixed;
 transform: translate(-50%,0);
 left: 50%;
 bottom: 1rem;
}
.foot button{
  padding: .1rem .2rem;
  background: rgba(0, 0, 0, .5);
  font-size: .24rem;
  color: #ffffff;
  border-radius: .04rem;
}
</style>