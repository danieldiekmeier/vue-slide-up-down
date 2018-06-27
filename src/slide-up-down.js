export default {
  name: 'SlideUpDown',

  props: {
    active: Boolean,
    duration: {
      type: Number,
      default: 500,
    },
    tag: {
      type: String,
      default: 'div',
    },
  },

  data: () => ({
    scrollHeight: 0,
  }),

  render(h) {
    return h(
      this.tag,
      {
        style: this.style,
        ref: 'container',
      },
      this.$slots.default,
    );
  },

  async mounted() {
    window.addEventListener('resize', this.getHeight); // recalc height on resize window
    await this.$nextTick();
    this.getHeight();
  },

  destroyed() {
    window.removeEventListener('resize', this.getHeight);
  },

  computed: {
    style() {
      const heightSize = this.active ? this.scrollHeight : 0;

      return {
        overflow: 'hidden',
        'transition-property': 'height',
        height: `${heightSize}px`,
        'transition-duration': `${this.duration}ms`,
      };
    },
  },

  methods: {
    getHeight() {
      const { container } = this.$refs;
      this.scrollHeight = container.scrollHeight;
    },
  },
};
