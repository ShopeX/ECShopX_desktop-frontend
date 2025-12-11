/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

const attrs = {
  isContainer: false,
  isUpload: false,
  hasGuide: true,
  isChild: true,
  dragable: true,
  resizable: true,
  left: 50,
  top: 0,
  z: 0,
  width: 375,
  height: 20,
  lineHeight: 20,
  fontSize: 12,
  fontWeight: 'normal',
  fontStyle: 'normal',
  textDecoration: 'none',
  color: '#000000ff',
  textAlign: 'left',

  marginTop: 0,
  marginRight: 'auto',
  marginBottom: 0,
  marginLeft: 'auto',
  paddingTop: 0,
  paddingRight: 0,
  paddingBottom: 0,
  paddingLeft: 0,
  borderTopWidth: 0,
  borderTopColor: '#ffffffff',
  borderRightWidth: 0,
  borderRightColor: '#ffffffff',
  borderBottomWidth: 0,
  borderBottomColor: '#ffffffff',
  borderLeftWidth: 0,
  borderLeftColor: '#ffffffff',
  foregroundColor: '#ffffffff',
  backgroundColor: '#ffffffff',

  backgroundImage: '',
  textShadow: '',
  textShadowColor: '#000000ff',
  textShadowH: 0,
  textShadowV: 0,
  textShadowBlur: 0,
  boxShadow: '',
  boxShadowColor: '#000000ff',
  boxShadowH: 0,
  boxShadowV: 1,
  boxShadowBlur: 1,
  borderStyle: 'normal',
  borderColor: '#000000ff',
  borderWidth: 1,
  borderRadius: 0,
  borderEffect: 'none',
  imgUrl: '',
  data: [],
  opacity: 1,
  proportion: false,
  proportionDisabled: true,
  proportionShow: false,
  heightDisabled: false,
  heightShow: true,
  widthDisabled: false,
  href: [],
  phoneNumber: '',
  clipboard: '',
  belong: 'page',
  // 自由面板中用到的属性
  resizableAxis: 'x',
  x: 0,
  y: 0,
  pageWidth: 1190,
  customerThemeEnabled: false
}

const linkProps = {
  id: '',
  name: '',
  imgUrl: '',
  linkPage: '',
  title: ''
}

const fontSizeList = [
  { value: 12, label: '12' },
  { value: 13, label: '13' },
  { value: 14, label: '14' },
  { value: 16, label: '16' },
  { value: 18, label: '18' },
  { value: 20, label: '20' },
  { value: 24, label: '24' },
  { value: 36, label: '36' },
  { value: 48, label: '48' },
  { value: 64, label: '64' }
]

const fontFamilyList = [
  { value: 'Arial', label: 'Arial' },
  { value: 'Arial Black', label: 'Arial Black' },
  { value: 'Arial Narrow', label: 'Arial Narrow' },
  { value: 'Verdana', label: 'Verdana' },
  { value: 'Georgia', label: 'Georgia' },
  { value: 'Times New Roman', label: 'Times New Roman' },
  { value: 'Trebuchet MS', label: 'Trebuchet MS' },
  { value: 'Courier New', label: 'Courier New' },
  { value: 'Impact', label: 'Impact' },
  { value: 'Comic Sans MS', label: 'Comic Sans MS' },
  { value: 'Tahoma', label: 'Tahoma' },
  { value: 'Courier', label: 'Courier' },
  { value: 'Lucida Sans Unicode', label: 'Lucida Sans Unicode' },
  { value: 'Lucida Console', label: 'Lucida Console' },
  { value: 'Garamond', label: 'Garamond' },
  { value: 'MS Sans Serif', label: 'MS Sans Serif' },
  { value: 'MS Serif', label: 'MS Serif' },
  { value: 'Palatino Linotype', label: 'Palatino Linotype' },
  { value: 'Symbol', label: 'Symbol' },
  { value: 'Bookman Old Style', label: 'Bookman Old Style' }
]

// 路由映射
const LinkMaps = (item) => {
  let linkPath = ''
  if (!item) {
    return linkPath
  }

  switch (item.linkPage) {
    case 'goods':
      linkPath = `/items/${item.itemId}`
      break
    case 'page':
      linkPath = item.url
      break
    case 'category':
      linkPath = `/items?cat_id=${item.category_id}`
      break
    case 'maincategory':
      linkPath = `/items?main_category=${item.category_id}`
      break
    case 'customer':
      linkPath = `/custompage?pageid=${item.theme_pc_template_id}`
      break
    case 'href':
      linkPath = item.href
      break
  }
  return linkPath

  // 'goods': (item) => {
  //   return `/items/${item.itemId}`
  // },
  // 'category': '',
  // 'tag': '',
  // 'management': '',
  // 'bring': '',
  // 'page': '',
  // 'marketing': '',
  // 'activity': '',
  // 'seckill': '',
  // 'customer': '',
  // 'live': ''
}

export { attrs, linkProps, fontSizeList, fontFamilyList, LinkMaps }
