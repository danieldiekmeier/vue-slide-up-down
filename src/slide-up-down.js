export default {
  name: 'SlideUpDown',

  props: {
    active: Boolean,
    duration: {
      type: Number,
      default: 500
    },
    tag: {
      type: String,
      default: 'div'
    }
  },

  data: () => ({
    style: {}
  }),

  watch: {
    active () {
      if (this.active) {
        this.setHeight('0px', () => this.el.scrollHeight + 'px')
      } else {
        this.setHeight(this.el.scrollHeight + 'px', () => '0px')
      }
    }
  },

  render (h) {
    return h(
      this.tag,
      {
        style: this.style,
        ref: 'container'
      },
      this.$slots.default
    )
  },

  mounted () {
    this.el.addEventListener('transitionend', () => {
      if (this.active) {
        this.style = {}
      } else {
        this.style = { display: 'none' }
      }
    })
  },

  computed: {
    el () {
      return this.$refs.container
    }
  },

  methods: {
    setHeight (temp, afterRelayout) {
      this.style = { height: temp }

      this.$nextTick(() => {
        // force relayout so the animation will run
        this.__ = this.el.scrollHeight

        this.style = {
          height: afterRelayout(),
          overflow: 'hidden',
          'transition-property': 'height',
          'transition-duration': this.duration + 'ms'
        }
      })
    }
  }
}
