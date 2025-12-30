/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

import Message from "./index.vue";
import Vue from "vue";

// const prefixCls = 'sp-message'

Message.newInstance = properties => {
  const _props = properties || {};
  const Instance = new Vue({
    data: Object.assign({}, _props, {
      visible: false,
      width: 416
    }),
    render(h) {
      return h(Message, {
        props: Object.assign({}, _props, {
          message: this.message
        })
      });
    },
    computed: {},
    methods: {
      remove() {
        this.destroy();
      },
      destroy() {
        this.$destroy();
        setTimeout( () => {
          document.body.removeChild(this.$el);
        }, 5)
        
        this.onRemove();
      },
      onOk() {},
      onCancel() {},
      onRemove() {}
    }
  });

  const component = Instance.$mount();
  document.body.appendChild(component.$el);
  const message = Instance.$children[0];

  return {
    show(props) {
      message.$parent.onRemove = props.onRemove;
      message.visible = true;
    },
    remove() {
      // message.visible = false
      message.$parent.remove();
    },
    component: message
  };
};

export default Message;
