export default {
  name: 'SlideUpDown',

  props: {
    active: Boolean,
    duration: {
      type: Number,
      default: 300
    },
    easing: {
      type: String,
      default: 'cubic-bezier(0.23, 1, 0.32, 1)' // ease out quint
    },
    tag: {
      type: String,
      default: 'div'
    }
  },

  data: () => ({
    scrollHeight: 0,
    isMounted: false,
    timeoutId: null
  }),

  watch: {
    active() {
      // allow vue update for async events to take effect
      this.timeoutId = setTimeout(() => {
        this.layout()
      }, 20)
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
    window.addEventListener('resize', this.layout)

    this.layout()

    this.$nextTick(() => {
      this.isMounted = true
    })
  },

  destroyed () {
    clearTimeout(this.timeoutId)
    window.removeEventListener('resize', this.layout)
  },

  computed: {
    style () {
      const heightSize = this.active ? this.scrollHeight : 0

      return {
        overflow: 'hidden',
        'transition-property': 'height',
        height: this.isMounted ? heightSize + 'px' : 'auto',
        'transition-duration': this.duration + 'ms',
        'transition-timing-function': this.easing
      }
    }
  },

  methods: {
    layout () {
      const { container } = this.$refs
      this.scrollHeight = container.scrollHeight
    }
  }
}
