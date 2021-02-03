import {h, ref, computed, watch, nextTick, onMounted} from 'vue';

export default {
  name: 'OmegaSlideUpDown',
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
    useHidden: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, {emit, slots}) {
    // State
    const initial = ref(false);
    const hidden = ref(!props.active);
    const style = ref({});
    const forceUpdate = ref(null);
    const rootComponent = ref(null);

    // Computed
    const attrs = computed(() => {
      const attrs = {
        'aria-hidden': !props.active,
        'aria-expanded': props.active,
      }

      if (props.useHidden) {
        attrs.hidden = hidden;
      }

      return attrs;
    });

    // Methods
    const onTransitionEnd = (event) => {
      if (event.target !== rootComponent.value) return;

      if (props.active) {
        style.value = {};
        emit('open-end');
      } else {
        style.value = {
          height: '0',
          overflow: 'hidden',
        };
        hidden.value = true;
        emit('close-end');
      }
    };

    const asap = (callback) => {
      if (!initial.value) {
        callback();
      } else {
        nextTick(callback);
      }
    };

    const setHeight = (temp, afterRelayout) => {
      style.value = {height: temp}

      asap(() => {
        forceUpdate.value = rootComponent.value.scrollHeight;

        style.value = {
          height: afterRelayout(),
          overflow: 'hidden',
          'transition-property': 'height',
          'transition-duration': props.duration + 'ms',
        }
      });
    };

    const layout = () => {
      if (props.active) {
        hidden.value = false;
        emit('open-start');
        if (initial.value) {
          setHeight('0px', () => rootComponent.value.scrollHeight + 'px');
        }
      } else {
        emit('close-start');
        setHeight(rootComponent.value.scrollHeight + 'px', () => '0px');
      }
    };

    // Watches
    watch(
      () => props.active,
      () => layout(),
    );

    // Hooks
    onMounted(() => {
      layout();
      initial.value = true;
    });

    // Render
    return () => h(
      props.tag,
      {
        ...attrs.value,
        style: style.value,
        ref: rootComponent,
        onTransitionEnd,
      },
      {
        default: slots.default,
      },
    );
  },
}
