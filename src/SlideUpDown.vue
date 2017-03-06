<style lang="stylus" scoped>
  .Container {
    overflow hidden

    transition-property all
  }
</style>

<template>
  <div>
    <div class="Container" ref="container" :style="style">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default {
    name: 'SlideUpDown',

    props: {
      active: Boolean,
      duration: {
        type: Number,
        default: 500
      }
    },

    data: () => ({
      maxHeight: 0
    }),

    watch: {
      active (active) {
        const { container } = this.$refs

        if (active) {
          const style = container.getAttribute('style')
          container.removeAttribute('style')
          this.maxHeight = container.offsetHeight
          container.setAttribute('style', style)

          // call this explicitely to force a new layout
          container.offsetHeight
        } else {
          this.maxHeight = 0
        }
      }
    },

    computed: {
      style () {
        return {
          height: this.maxHeight + 'px',
          'transition-duration': this.duration + 'ms'
        }
      }
    }
  }
</script>
