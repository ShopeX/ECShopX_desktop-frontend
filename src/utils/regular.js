/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

//公司正则
const companyRegular = /^[\u4e00-\u9fa5]{1,19}$/
//税号正则
const taxnumberRegular = /[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}/

export { companyRegular, taxnumberRegular }
