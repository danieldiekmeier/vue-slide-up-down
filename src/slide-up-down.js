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
    offsetHeight: 0
  }),

  render (h) {
    return h(
      'div',
      {
        style: this.style,
        ref: 'container',
      },
      this.$slots.default
    )
  },

  mounted () {
    this.render()
  },

  watch: {
    active () {
      this.render()
    }
  },

  computed: {
    style () {
      return {
        overflow: 'hidden',
        'transition-property': 'all',
        height: this.maxHeight + 'px',
        'transition-duration': this.duration + 'ms'
      }
    }
  },

  methods: {
    render () {
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
