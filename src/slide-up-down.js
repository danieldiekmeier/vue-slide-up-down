export default {
  name: 'SlideUpDown',

  props: {
    visible: {
      type: Boolean
    },

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
    scrollHeight: 0,
    isAnimating: false,
    isMounted: false
  }),

  watch: {
    visible() {
      this.layout()
      this.setAnimationState()
    }
  },

  render(h) {
    return h(
        this.tag,
        {
          style: this.style
        },
        this.$slots.default
    )
  },

  mounted() {
    window.addEventListener('resize', this.layout)

    this.layout()

    this.$nextTick(() => {
      this.isMounted = true
    })
  },

  destroyed() {
    window.removeEventListener('resize', this.layout)
  },

  computed: {
    heightUnit() {
      return this.isMounted ? 'px' : 'auto'
    },

    heightSize() {
      return this.visible ? this.scrollHeight : 0
    },

    overflowValue() {
      return (!this.isAnimating && this.visible) ? 'inherit' : 'hidden'
    },

    style() {
      return {
        overflow: this.overflowValue,
        'transition-property': 'height',
        height: `${this.heightSize}${this.heightUnit}`,
        'transition-duration': `${this.duration}ms`
      }
    }
  },

  methods: {
    layout() {
      this.scrollHeight = this.$el.scrollHeight
    },

    setAnimationState() {
      this.isAnimating = true

      setTimeout(() => {
        this.isAnimating = false
      }, this.duration)
    }
  }
}
