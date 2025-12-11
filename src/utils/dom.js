/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

if (process.server) {
  const { window } = require('ssr-window')
  global.window = global.window || window
  global.document = global.document || window.document
}

export const on = (() => {
  if (document.addEventListener) {
    return function (el, ev, fn) {
      if (el && ev && fn) {
        el.addEventListener(ev, fn, false)
      }
    }
  } else {
    return function (el, ev, fn) {
      if (el && ev && fn) {
        el.attachEvent(`on${ev}`, fn)
      }
    }
  }
})()

export const off = (() => {
  if (document.removeEventListener) {
    return function (el, ev, fn) {
      if (el && ev) {
        el.removeEventListener(ev, fn, false)
      }
    }
  } else {
    return function (el, ev, fn) {
      if (el && ev) {
        el.detachEvent(`on${ev}`, fn)
      }
    }
  }
})()

export const getStyle = function (el, prop) {
  const style = window.getComputedStyle ? getComputedStyle(el, null) : el.currentStyle
  return style[prop]
}

export const setStyle = function (el, ...args) {
  let styleText = ''
  let props = {}
  if (args.length === 1) {
    props = args[0]
  } else {
    const [prop, val] = args
    props = { [prop]: val }
  }
  Object.keys(props).forEach(name => styleText += `;${name}:${props[name]}`)

  el.style.cssText += styleText
}

export const selectionRange = function (el, val) {
  if (!val) return

  if (el.setSelectionRange) {
    el.focus()
    el.setSelectionRange(...val)
  }
  if (el.createTextRange) {
    const range = el.createTextRange()
    range.collapse(true)
    range.moveEnd('character', val[1])
    range.moveStart('character', val[0])
    range.select()
  }
  if (el.selectionStart) {
    el.selectionStart = val[0]
    el.selectionEnd = val[1]
  }
}

export const hasClass = function (el, cls) {
  if (el.classList) {
    return el.classList.contains(cls)
  } else {
    return !!el.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
  }
}

export const addClass = function (el, cls) {
  if (el.classList) {
    el.classList.add(cls)
  } else if (!hasClass(el, cls)) {
    el.className += ' ' + cls
  }
}

export const removeClass = function (el, cls) {
  if (el.classList) {
    el.classList.remove(cls)
  } else {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)', 'g')
    el.className = el.className.replace(reg, '')
  }
}

export function lockScreen (isLock = true) {
  const body = document.querySelector('body')
  if (isLock) {
    let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
    localStorage.setItem('scrollTop', scrollTop)
    addClass(body, 'lock-screen')
    document.body.style.top = -scrollTop + 'px';
  } else {
    removeClass(body, 'lock-screen')
    let scrollTop = localStorage.getItem('scrollTop')
    document.body.scrollTop = document.documentElement.scrollTop = scrollTop
  }
}
export function exportIcon () {

  let icon = ['ec-icon-female',
    'ec-icon-round_transfer_fill',
    'ec-icon-keyboard',
    'ec-icon-subtitle_block_light',
    'ec-icon-male', 'ec-icon-warn_light',
    'ec-icon-newfill', 'ec-icon-round_transfer',
    'ec-icon-new', 'ec-icon-vip_code_light',
    'ec-icon-pullleft',
    "ec-icon-subtitle_unblock_light",
    "ec-icon-pullright",
    "ec-icon-round_shop_fill",
    "ec-icon-rankfill",
    "ec-icon-oppose_fill_light",
    "ec-icon-rank",
    "ec-icon-oppose_light",
    "ec-icon-bad",
    "ec-icon-living",
    "ec-icon-cameraadd",
    "ec-icon-goods_hot_fill",
    "ec-icon-focus",
    "ec-icon-ticket_money_fill",
    "ec-icon-friendfill",
    "ec-icon-arrow_left_fill",
    "ec-icon-cameraaddfill",
    "ec-icon-arrow_up_fill",
    "ec-icon-apps",
    "ec-icon-xiaoheiqun",
    "ec-icon-paintfill",
    "ec-icon-auction",
    "ec-icon-paint",
    "ec-icon-return",
    "ec-icon-picfill",
    "ec-icon-mall_light",
    "ec-icon-refresharrow",
    "ec-icon-mall_fill_light",
    "ec-icon-markfill",
    "ec-icon-broadcast_fill",
    "ec-icon-mark",
    "ec-icon-at",
    "ec-icon-presentfill",
    "ec-icon-card_fill",
    "ec-icon-repeal",
    "ec-icon-weixin1",
    "ec-icon-album",
    "ec-icon-pengyouquan",
    "ec-icon-peoplefill",
    "ec-icon-gongzhonghao",
    "ec-icon-people",
    "ec-icon-changyonglogo30",
    "ec-icon-servicefill",
    "ec-icon-yinfu",
    "ec-icon-repair",
    "ec-icon-file",
    "ec-icon-repairfill",
    "ec-icon-taoxiaopu",
    "ec-icon-attentionfill",
    "ec-icon-attention",
    "ec-icon-commandfill",
    "ec-icon-command",
    "ec-icon-communityfill",
    "ec-icon-community",
    "ec-icon-read",
    "ec-icon-suan",
    "ec-icon-hua",
    "ec-icon-ju",
    "ec-icon-tian",
    "ec-icon-calendar",
    "ec-icon-cut",
    "ec-icon-magic",
    "ec-icon-backwardfill",
    "ec-icon-playfill",
    "ec-icon-stop",
    "ec-icon-tagfill",
    "ec-icon-tag",
    "ec-icon-group",
    "ec-icon-all",
    "ec-icon-backdelete",
    "ec-icon-hotfill",
    "ec-icon-hot",
    "ec-icon-post",
    "ec-icon-radiobox",
    "ec-icon-rounddown",
    "ec-icon-upload",
    "ec-icon-writefill",
    "ec-icon-write",
    "ec-icon-radioboxfill",
    "ec-icon-punch",
    "ec-icon-shake",
    "ec-icon-add1",
    "ec-icon-move",
    "ec-icon-safe",
    "ec-icon-haodian",
    "ec-icon-mao",
    "ec-icon-qi",
    "ec-icon-ye",
    "ec-icon-juhuasuan",
    "ec-icon-taoqianggou",
    "ec-icon-tianmao",
    "ec-icon-activityfill",
    "ec-icon-crownfill",
    "ec-icon-crown",
    "ec-icon-goodsfill",
    "ec-icon-messagefill",
    "ec-icon-profilefill",
    "ec-icon-sound",
    "ec-icon-sponsorfill",

    "ec-icon-sponsor",

    "ec-icon-upblock",

    "ec-icon-weblock",

    "ec-icon-weunblock",

    "ec-icon-1111",

    "ec-icon-my",

    "ec-icon-myfill",

    "ec-icon-emojifill",

    "ec-icon-emojiflashfill",

    "ec-icon-flashbuyfill-copy",

    "ec-icon-text",

    "ec-icon-goodsfavor",

    "ec-icon-musicfill",

    "ec-icon-musicforbidfill",

    "ec-icon-xiamiforbid",

    "ec-icon-xiami",

    "ec-icon-roundleftfill",

    "ec-icon-triangledownfill",

    "ec-icon-appreciate",

    "ec-icon-triangleupfill",

    "ec-icon-check",

    "ec-icon-roundleftfill-copy",

    "ec-icon-close",

    "ec-icon-pulldown1",

    "ec-icon-edit",

    "ec-icon-emojilight",

    "ec-icon-emoji",

    "ec-icon-keyboardlight",

    "ec-icon-favorfill",

    "ec-icon-recordfill",

    "ec-icon-favor",

    "ec-icon-recordlight",

    "ec-icon-loading",

    "ec-icon-record",

    "ec-icon-locationfill",

    "ec-icon-roundaddlight",

    "ec-icon-location",

    "ec-icon-soundlight",

    "ec-icon-phone",

    "ec-icon-cardboardfill",

    "ec-icon-roundcheckfill",

    "ec-icon-cardboard",

    "ec-icon-roundcheck",

    "ec-icon-formfill",

    "ec-icon-roundclosefill",

    "ec-icon-coin",

    "ec-icon-roundclose",

    "ec-icon-sortlight",

    "ec-icon-roundrightfill",

    "ec-icon-cardboardforbid",

    "ec-icon-roundright",

    "ec-icon-circlefill",

    "ec-icon-search",

    "ec-icon-circle",

    "ec-icon-taxi",

    "ec-icon-attentionforbid",

    "ec-icon-timefill",

    "ec-icon-attentionforbidfill",

    "ec-icon-time",

    "ec-icon-attentionfavorfill",

    "ec-icon-unfold",

    "ec-icon-attentionfavor",

    "ec-icon-warnfill",

    "ec-icon-piclight",

    "ec-icon-warn",

    "ec-icon-shoplight",

    "ec-icon-camerafill",

    "ec-icon-voicelight",

    "ec-icon-camera",

    "ec-icon-attentionfavorfill-copy",

    "ec-icon-commentfill",

    "ec-icon-full",

    "ec-icon-comment",

    "ec-icon-mail",

    "ec-icon-likefill",

    "ec-icon-peoplelist",

    "ec-icon-like",

    "ec-icon-goodsnewfill",

    "ec-icon-notificationfill",

    "ec-icon-goodsnew",

    "ec-icon-notification",

    "ec-icon-medalfill",

    "ec-icon-order",

    "ec-icon-medal",

    "ec-icon-samefill",

    "ec-icon-newsfill",

    "ec-icon-same",

    "ec-icon-newshotfill",

    "ec-icon-deliver",

    "ec-icon-newshot",

    "ec-icon-evaluate",

    "ec-icon-news",

    "ec-icon-pay",

    "ec-icon-videofill",

    "ec-icon-send",

    "ec-icon-video",

    "ec-icon-shop",

    "ec-icon-askfill",

    "ec-icon-ticket",

    "ec-icon-ask",

    "ec-icon-wang",

    "ec-icon-exit",

    "ec-icon-back",

    "ec-icon-skinfill",

    "ec-icon-cascades",

    "ec-icon-skin",

    "ec-icon-discover",

    "ec-icon-moneybagfill",

    "ec-icon-list",

    "ec-icon-usefullfill",

    "ec-icon-more",

    "ec-icon-usefull",

    "ec-icon-scan",

    "ec-icon-moneybag",

    "ec-icon-settings",

    "ec-icon-redpacket_fill",

    "ec-icon-questionfill",

    "ec-icon-subscription",

    "ec-icon-question",

    "ec-icon-home_light",

    "ec-icon-shopfill",

    "ec-icon-my_light",

    "ec-icon-form",

    "ec-icon-community_light",

    "ec-icon-wangfill",

    "ec-icon-cart_light",

    "ec-icon-pic",

    "ec-icon-we_light",

    "ec-icon-filter",

    "ec-icon-home_fill_light",

    "ec-icon-footprint",

    "ec-icon-cart_fill_light",

    "ec-icon-top",

    "ec-icon-community_fill_light",

    "ec-icon-pulldown",

    "ec-icon-my_fill_light",

    "ec-icon-pullup",

    "ec-icon-we_fill_light",

    "ec-icon-right",

    "ec-icon-skin_light",

    "ec-icon-refresh",

    "ec-icon-search_light",

    "ec-icon-moreandroid",

    "ec-icon-scan_light",

    "ec-icon-deletefill",

    "ec-icon-people_list_light",

    "ec-icon-refund",

    "ec-icon-message_light",

    "ec-icon-cart",

    "ec-icon-close_light",

    "ec-icon-qrcode",

    "ec-icon-add_light",

    "ec-icon-remind",

    "ec-icon-profile_light",

    "ec-icon-delete",

    "ec-icon-service_light",

    "ec-icon-profile",

    "ec-icon-friend_add_light",

    "ec-icon-home",

    "ec-icon-edit_light",

    "ec-icon-cartfill",

    "ec-icon-camera_light",

    "ec-icon-discoverfill",

    "ec-icon-hot_light",

    "ec-icon-homefill",

    "ec-icon-refresh_light",

    "ec-icon-message",

    "ec-icon-back_light",

    "ec-icon-addressbook",

    "ec-icon-share_light",

    "ec-icon-link",

    "ec-icon-comment_light",

    "ec-icon-lock",

    "ec-icon-appreciate_light",

    "ec-icon-unlock",

    "ec-icon-favor_light",

    "ec-icon-vip",

    "ec-icon-appreciate_fill_light",

    "ec-icon-weibo",

    "ec-icon-comment_fill_light",

    "ec-icon-activity",

    "ec-icon-wang_light",

    "ec-icon-big",

    "ec-icon-more_android_light",

    "ec-icon-friendaddfill",

    "ec-icon-friend_light",

    "ec-icon-friendadd",

    "ec-icon-more_light",

    "ec-icon-friendfamous",

    "ec-icon-goods_favor_light",

    "ec-icon-friend",

    "ec-icon-goods_new_fill_light",

    "ec-icon-goods",

    "ec-icon-goods_new_light",

    "ec-icon-selection",

    "ec-icon-goods_light",

    "ec-icon-tmall",

    "ec-icon-medal_fill_light",

    "ec-icon-explore",

    "ec-icon-medal_light",

    "ec-icon-present",

    "ec-icon-news_fill_light",

    "ec-icon-squarecheckfill",

    "ec-icon-news_hot_fill_light",

    "ec-icon-square",

    "ec-icon-news_hot_light",

    "ec-icon-squarecheck",

    "ec-icon-news_light",

    "ec-icon-round",

    "ec-icon-video_fill_light",

    "ec-icon-roundaddfill",

    "ec-icon-message_fill_light",

    "ec-icon-roundadd",

    "ec-icon-form_light",

    "ec-icon-add",

    "ec-icon-video_light",

    "ec-icon-notificationforbidfill",

    "ec-icon-search_list_light",

    "ec-icon-explorefill",

    "ec-icon-form_fill_light",

    "ec-icon-fold",

    "ec-icon-global_light",

    "ec-icon-game",

    "ec-icon-global",

    "ec-icon-redpacket",

    "ec-icon-favor_fill_light",

    "ec-icon-selectionfill",

    "ec-icon-delete_light",

    "ec-icon-similar",

    "ec-icon-back_android",

    "ec-icon-appreciatefill",

    "ec-icon-back_android_light",

    "ec-icon-infofill",

    "ec-icon-down_light",

    "ec-icon-info",

    "ec-icon-round_close_light",

    "ec-icon-tao",

    "ec-icon-round_close_fill_light",

    "ec-icon-mobiletao",

    "ec-icon-expressman",

    "ec-icon-forwardfill",

    "ec-icon-punch_light",

    "ec-icon-forward",

    "ec-icon-evaluate_fill",

    "ec-icon-rechargefill",

    "ec-icon-furniture",

    "ec-icon-recharge",

    "ec-icon-dress",

    "ec-icon-vipcard",

    "ec-icon-coffee",

    "ec-icon-voice",

    "ec-icon-sports",

    "ec-icon-voicefill",

    "ec-icon-group_light",

    "ec-icon-friendfavor",

    "ec-icon-location_light",

    "ec-icon-wifi",

    "ec-icon-attention_light",

    "ec-icon-share",

    "ec-icon-group_fill_light",

    "ec-icon-wefill",

    "ec-icon-group_fill",

    "ec-icon-we",

    "ec-icon-play_forward_fill",

    "ec-icon-lightauto",

    "ec-icon-subscription_light",

    "ec-icon-lightforbid",

    "ec-icon-deliver_fill",

    "ec-icon-lightfill",

    "ec-icon-notice_forbid_fill",

    "ec-icon-camerarotate",

    "ec-icon-qr_code_light",

    "ec-icon-light",

    "ec-icon-settings_light",

    "ec-icon-barcode",

    "ec-icon-pick",

    "ec-icon-flashlightclose",

    "ec-icon-form_favor_light",

    "ec-icon-flashlightopen",

    "ec-icon-round_comment_light",

    "ec-icon-searchlist",

    "ec-icon-phone_light",

    "ec-icon-service",

    "ec-icon-round_down_light",

    "ec-icon-sort",

    "ec-icon-friend_settings_light",

    "ec-icon-1212",

    "ec-icon-change",

    "ec-icon-down",

    "ec-icon-round_list_light",

    "ec-icon-mobile",

    "ec-icon-ticket_fill",

    "ec-icon-mobilefill",

    "ec-icon-round_friend_fill",

    "ec-icon-copy",

    "ec-icon-round_crown_fill",

    "ec-icon-countdownfill",

    "ec-icon-round_link_fill",

    "ec-icon-countdown",

    "ec-icon-round_light_fill",

    "ec-icon-noticefill",

    "ec-icon-round_favor_fill",

    "ec-icon-notice",

    "ec-icon-round_menu_fill",

    "ec-icon-qiang",

    "ec-icon-round_location_fill",

    "ec-icon-upstagefill",

    "ec-icon-round_pay_fill",

    "ec-icon-upstage",

    "ec-icon-round_like_fill",

    "ec-icon-babyfill",

    "ec-icon-round_people_fill",

    "ec-icon-baby",

    "ec-icon-round_pay",

    "ec-icon-brandfill",

    "ec-icon-round_rank_fill",

    "ec-icon-brand",

    "ec-icon-round_redpacket_fill",

    "ec-icon-choicenessfill",

    "ec-icon-round_skin_fill",

    "ec-icon-choiceness",

    "ec-icon-round_record_fill",

    "ec-icon-clothesfill",

    "ec-icon-round_ticket_fill",

    "ec-icon-clothes",

    "ec-icon-round_redpacket",

    "ec-icon-creativefill",

    "ec-icon-round_text_fill",

    "ec-icon-creative",

    "ec-icon-round_ticket",]
  return icon
}
