export default {
  name: 'SlideUpDown',

  props: {
    active: Boolean,
    timingFunction: {
      type: String,
      default: 'ease',
    },
    appear: {
      type: Boolean,
      default: true,
    },
    duration: {
      type: Number,
      default: 500
    }
  },

  data: () => ({
    appeared: false,
    maxHeight: 0,
    offsetHeight: 0
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
    this.render()

    window.addEventListener('resize', this.render)
    
    // wait (next-tick) till view has been rendered.
    setTimeout(() => {
      this.appeared = true;
    }, 0);
  },
  destroyed () {
    window.removeEventListener('resize', this.render)
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
        'transition-property': (this.appear || this.appeared) ? 'all' : 'none',
        height: this.maxHeight + 'px',
        'transition-duration': this.duration + 'ms',
        'transition-timing-function': this.timingFunction
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