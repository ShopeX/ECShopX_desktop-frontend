<style lang="scss" scoped>
$sp-loading-size: 42px !default;

@keyframes sp-loading-circular {
  0% {
    stroke-dasharray: 1, 160;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 160;
    stroke-dashoffset: -32px;
  }
  100% {
    stroke-dasharray: 89, 160;
    stroke-dashoffset: -89px;
  }
}

@keyframes sp-loading-rotate {
  100% {
    transform: rotate(360deg);
  }
}

.sp-loading {
  &__parent {
    position: relative;
  }

  &__mask {
    position: absolute;
    z-index: $z-index-toast;
    background: rgba(#fff, .8);
    margin: 0;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: opacity .3s;
    .sp-loading__spinner {
      display: block;
      position: absolute;
      top: 50%;
      margin-top: -$sp-loading-size / 2;
      width: 100%;
    }
  }

  &__spinner {
    display: inline-block;
    vertical-align: middle;
    text-align: center;
    transition: opacity .3s;
  }
  &__svg {
    animation: sp-loading-rotate 2s infinite;
  }
  &__circular {
    stroke: $color-brand-primary;
    stroke-linecap: round;
    animation: sp-loading-circular 1.5s ease-in-out infinite;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    transform-origin: center center;
  }
  &__cont {
    text-align: center;
    color: $color-hint-text;
  }

  &__transition-fade {
    &-enter, &-leave-active {
      opacity: 0;
    }
  }
}

body > {
  .sp-loading__mask {
    position: fixed;
    z-index: $z-index-modal;
  }
}
</style>

<script>
export default {
  name: 'SpLoading',

  props: {
    color: String,
    background: String,
    stroke: {
      type: [Number, String],
      default: 2
    },
    text: String,
    mask: Boolean,
    size: {
      type: [Number, String],
      default: 32
    },
    onOpen: {
      type: Function,
      default: () => {}
    },
    onClose: {
      type: Function,
      default: () => {}
    }
  },

  data () {
    return {
      isShow: true
    }
  },

  computed: {
    radius () {
      return (this.size - this.stroke) / 2
    },

    circleStyles () {
      return [
        { 'stroke-width': this.stroke },
        { 'stroke': this.color }
      ]
    }
  },

  methods: {
    close () {
      this.isShow = false
    },

    open () {
      this.isShow = true
    },

    renderSpinner (h) {
      const { size, radius, circleStyles, text } = this
      return (
        <div class="sp-loading__spinner">
          <svg
            class="sp-loading__svg"
            width={ size }
            height={ size }
          >
            <circle
              class="sp-loading__circular"
              fill="transparent"
              cx={ size / 2 }
              cy={ size / 2 }
              r={ radius }
              style={ circleStyles }
            ></circle>
          </svg>
          {
            (this.$slots.default || text)
              ? <div class="sp-loading__cont">{ this.$slots.default || this.text }</div>
              : ''
          }
        </div>
      )
    }
  },

  render (h) {
    const spinner = this.renderSpinner(h)

    return (
      <transition
        name="sp-loading__transition-fade"
        on-after-enter={ () => { this.onOpen() } }
        on-after-leave={ () => { this.onClose() } }
        appear
      >
        {
          this.isShow
            ? this.mask
              ? <div class="sp-loading__mask" style={{ background: this.background, text: '正在加载...' }}>{ spinner }</div>
              : spinner
            : ''
        }
      </transition>
    )
  }
}
</script>
