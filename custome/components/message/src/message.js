import Message from './index.vue'
import Vue from 'vue'

// const prefixCls = 'sp-message'

Message.newInstance = properties => {
  const _props = properties || {}
  const Instance = new Vue({
    data: Object.assign({}, _props, {
      visible: false,
      width: 416
    }),
    render (h) {
      return h(
        Message,
        {
          props: Object.assign({}, _props, {
            message: this.message
          })
        }
      )
    },
    computed: {},
    methods: {
      remove () {
        setTimeout(() => {
          this.destroy()
        }, 300)
      },
      destroy () {
        this.$destroy()
        document.body.removeChild(this.$el)
        this.onRemove()
      },
      onOk () {},
      onCancel () {},
      onRemove () {}
    }
  })

  const component = Instance.$mount()
  document.body.appendChild(component.$el)
  const message = Instance.$children[0]

  return {
    show (props) {
    //   if ('title' in props) {
    //     message.$parent.title = props.title
    //   }
    //   if ('content' in props) {
    //     message.$parent.body = props.content
    //   }
    //   if ('onCancel' in props) {
    //     message.$parent.onCancel = props.onCancel
    //   }
    //   if ('onOk' in props) {
    //     message.$parent.onOk = props.onOk
    //   }

      message.$parent.onRemove = props.onRemove
      message.visible = true
    },
    remove () {
      message.visible = false
      message.$parent.remove()
    },
    component: message
  }
}

export default Message
