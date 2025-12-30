/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

import Modal from './index.vue'
import Vue from 'vue'
import SpButton from './../../sp-button'

const prefixCls = 'sp-modal-confirm'

Modal.newInstance = (properties) => {
  const _props = properties || {}
  const Instance = new Vue({
    data: Object.assign({}, _props, {
      visible: false,
      width: 416,
      title: '',
      body: '',
      iconType: '',
      iconName: '',
      okText: undefined,
      cancelText: undefined,
      showCancel: true,
      loading: false,
      buttonLoading: false,
      scrollable: false,
      closable: false,
      confirm: true
    }),
    render(h) {
      let footerVNodes = []
      if (this.showCancel) {
        footerVNodes.push(
          h(
            SpButton,
            {
              on: {
                click: this.cancel
              }
            },
            '取消'
          )
        )
      }
      footerVNodes.push(
        h(
          SpButton,
          {
            props: {
              type: 'primary'
            },
            on: {
              click: this.ok
            }
          },
          '确定'
        )
      )

      let body_render
      body_render = h(
        'div',
        {
          attrs: {
            class: `${prefixCls}-body`
          }
        },
        [
          h('div', {
            domProps: {
              innerHTML: this.body
            }
          })
        ]
      )

      let head_render
      if (this.title) {
        head_render = h(
          'div',
          {
            attrs: {
              class: `${prefixCls}-head`
            }
          },
          [
            h('div', {
              attrs: {
                class: `${prefixCls}-head-title`
              },
              domProps: {
                innerHTML: this.title
              }
            })
          ]
        )
      }

      return h(
        Modal,
        {
          props: Object.assign({}, _props, {
            width: this.size === 'sm' ? Math.floor(this.width * 0.7) : this.width,
            scrollable: this.scrollable,
            closable: this.closable
          })
        },
        [
          h(
            'div',
            {
              attrs: {
                class: prefixCls
              }
            },
            [
              head_render,
              body_render,
              h(
                'div',
                {
                  attrs: {
                    class: `${prefixCls}-footer`
                  }
                },
                footerVNodes
              )
            ]
          )
        ]
      )
    },
    computed: {},
    methods: {
      cancel() {
        this.$children[0].visible = false
        this.buttonLoading = false
        this.onCancel()
        this.remove()
      },
      ok() {
        this.$children[0].visible = false
        this.remove()
        this.onOk()
      },
      remove() {
        setTimeout(() => {
          this.destroy()
        }, 300)
      },
      destroy() {
        this.$destroy()
        document.body.removeChild(this.$el)
        this.onRemove()
      },
      onOk() {},
      onCancel() {},
      onRemove() {}
    }
  })

  const component = Instance.$mount()
  document.body.appendChild(component.$el)
  const modal = Instance.$children[0]

  return {
    show(props) {
      if ('size' in props) {
        modal.$parent.size = props.size
      }
      if ('title' in props) {
        modal.$parent.title = props.title
      }
      if ('content' in props) {
        modal.$parent.body = props.content
      }
      if ('onCancel' in props) {
        modal.$parent.onCancel = props.onCancel
      }
      if ('onOk' in props) {
        modal.$parent.onOk = props.onOk
      }

      modal.$parent.onRemove = props.onRemove
      modal.visible = true
    },
    remove() {
      modal.visible = false
      // modal.$parent.buttonLoading = false
      modal.$parent.remove()
    },
    component: modal
  }
}

export default Modal
