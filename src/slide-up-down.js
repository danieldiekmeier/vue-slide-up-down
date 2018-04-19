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
    maxHeight: 0,
    offsetHeight: 0,
    isMounted: false
  }),

  render (h) {
    return h(
      'div',
      {
        style: this.style,
        ref: 'container'
      },
      this.$slots.default
    )
  },

  mounted () {
    this.layout()

    window.addEventListener('resize', this.layout)

    setTimeout(() => {
      this.isMounted = true
    }, 0)
  },

  destroyed () {
    window.removeEventListener('resize', this.layout)
  },

  watch: {
    active () {
      this.layout()
    }
  },

  computed: {
    style () {
      return {
        overflow: 'hidden',
        'transition-property': 'height',
        height: this.isMounted ? this.maxHeight + 'px' : 'auto',
        'transition-duration': this.duration + 'ms'
      }
    }
  },

  methods: {
    layout () {
      const { container } = this.$refs

      if (this.active) {
        const style = container.getAttribute('style')
        container.removeAttribute('style')
        this.maxHeight = container.offsetHeight
        container.setAttribute('style', style)

        // call this explicitely to force a new layout
        this.offsetHeight = container.offsetHeight
      } else {
        this.maxHeight = 0
      }
    }
  }
}
