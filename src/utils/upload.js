/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

/*
 * @Author: Arvin
 * @GitHub: https://github.com/973749104
 * @Blog: https://liuhgxu.com
 * @Description: 说明
 * @FilePath: /unite-vshop/src/utils/upload.js
 * @Date: 2020-03-06 16:32:07
 * @LastEditors: Arvin
 * @LastEditTime: 2020-11-16 17:42:43
 */
// import Taro from '@tarojs/taro'
import req from '@/api/req'
// import * as qiniu from 'qiniu-js'
import axios from "axios";

const getToken = (params) => {
  return req.get('api/h5app/wxapp/espier/image_upload_token', params)
}

// const uploadURLFromRegionCode = (code) => {
//   switch(code) {
//       case 'z0': return'https://up.qiniup.com'
//       case 'z1': return 'https://up-z1.qiniup.com'
//       case 'z2': return 'https://up-z2.qiniup.com'
//       case 'na0': return 'https://up-na0.qiniup.com'
//       case 'as0': return 'https://up-as0.qiniup.com'
//       default: console.error('please make the region is with one of [z0, z1, z2, na0, as0]')
//   }
// }

const upload = {
  aliUpload: async (file, tokenRes) => {
    const {accessid, dir, host, policy, signature} = tokenRes
    // console.log(file,"file");
    try {
      const formData = new FormData()
      formData.append('key', tokenRes.dir)
      formData.append('policy', tokenRes.policy)
      formData.append('OSSAccessKeyId', tokenRes.accessid)
      formData.append('success_action_status', '200')
      // formData.append('callback', tokenRes.callback)
      formData.append('signature', tokenRes.signature)
      formData.append('name', file.name)
      formData.append('file', file)
      const res = await axios({
        method: 'POST',
        url: tokenRes.host,
        headers: { 'Content-Type': 'multipart/form-data;charset=UTF-8' },
        data: formData
      })
      
      if (!res) {
        return false
      }
      return {
        url: `${host}${dir}`
      }
    } catch (e) {
      throw new Error (e)
    }
  },
  qiNiuUpload: async (item, tokenRes) => {
    const { token, key, domain, host } = tokenRes  
    let param = new FormData(); 
    param.append('file',item,item.name);
    param.append('token', token);
    param.append('key', key);
    let config = {
      headers:{'Content-Type':'multipart/form-data'}
    };  //添加请求头
    const { data } = await axios.post(host,param,config)
    if (!data.key) {
      return false
    }
    return {
      url: `${domain}/${data.key}`
    }
  },
  localUpload: async (item, tokenRes) => {
    const { filetype, domain } = tokenRes
    let param = new FormData(); //创建form对象
    param.append('file',item,item.name);
    param.append('filetype', filetype);
    let config = {
      headers:{'Content-Type':'multipart/form-data'}
    };  //添加请求头
    const { data } = await axios.post(`${req.baseURL}espier/uploadlocal`, param, config)
    const { image_url } = data
    if (!image_url) {
      return false
    }
    return {
      url: `${domain}/${image_url}`
    }
    
  },
  awsUpload: async (item, tokenRes) => {
    const { 
      formInputs = {
        XAmzCredential: '',
        XAmzAlgorithm: '',
        XAmzDate: '',
        Policy: '',
        XAmzSignature: '',
        key: ''
      },
      formAttributes = {
        action: ''
      }
    } = tokenRes
    let param = new FormData(); 
    param.append('file',item,item.name);
    param.append('key', formInputs.key);
    param.append('X-Amz-Credential', formInputs.XAmzCredential,);
    param.append('X-Amz-Algorithm', `AES256`,);
    param.append('Policy',formInputs.Policy,);
    param.append('X-Amz-Algorithm', formInputs.XAmzAlgorithm,);
    param.append('X-Amz-Date', formInputs.XAmzDate,);
    param.append('X-Amz-Signature', formInputs.XAmzSignature);
    let config = {
      headers:{'Content-Type':'multipart/form-data'}
    };  //添加请求头
    const res = await axios.post(formAttributes.action, param, config)
    const { Location } = res.header
    if (!Location) {
      return false
    }
    return {
      url: Location
    }
  
  },
}

const getUploadFun = (dirver) => {
  switch (dirver) {
    case 'oss':
      return 'aliUpload'
    case 'local':
      return 'localUpload'
    case 'aws':
      return 'awsUpload'
    default:
      return 'qiNiuUpload'
  }
}

// 返回对应上传方式
const uploadImageFn = async (imgFiles, filetype = 'image') => {
  const imgs = []
  for (const item of imgFiles) {
    try {
      const filename = item.name
      const { driver, token } = await getToken({ filetype, filename })
      const uploadType = getUploadFun(driver)
      const img = await upload[uploadType](item, { ...token, filetype})
      
      if (!img || !img.url) {
        continue
      }
      imgs.push(img)
    } catch (e) {
      console.log(e)
    }
  }
  return imgs
}

export default uploadImageFn
