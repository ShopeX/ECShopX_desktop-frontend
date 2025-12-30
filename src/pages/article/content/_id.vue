/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
.page-content {
  // padding-bottom: 100px;
  &__nav {
    text-align: left;
    padding: 48px 0 38px;
    .title {
      max-width: 1150px;
      margin: 0 auto;
      font-size: 22px;
      color: #212322;
      letter-spacing: 1px;
      border-bottom: 1px solid #adadad;
      padding-bottom: 10px;
    }
  }
  .story-wall {
    max-width: 1150px;
    margin: 0 auto;
    text-align: center;
    img {
      vertical-align: middle;
    }
  }
}
// 联系我们
.article-contanier {
  margin: 0 auto;
  display: inline-block;
  width: 1150px;
  .des-title {
    color: #525252;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0px;
    margin-bottom: 20px;
    text-align: left;
  }
  ul {
    width: 1150px;
    height: 294px;
    background-color: #f2f2f2;
    padding: 20px 0 20px;
  }
  li {
    float: left;
    border-right: 1px solid #adadad;
    height: 100%;
    text-align: center;
    list-style: none;
    &:nth-child(1) {
      width: 242px;
    }
    &:nth-child(2) {
      width: 212px;
    }
    &:nth-child(3) {
      width: 268px;
    }
    &:nth-child(4) {
      width: 425px;
      border-right: none;
    }
    .h4 {
      letter-spacing: 1px;
      color: #212322;
      font-size: 18px;
      line-height: 38px;
      margin-bottom: 0;
    }
    .img {
      height: 113px;
      line-height: 113px;
      vertical-align: middle;
    }
    .icon {
      // margin-bottom: 34px;
    }
    .text {
      font-size: 16px;
      color: #525252;
      letter-spacing: 0px;
      line-height: 25px;
    }
  }
  .addr {
    .addr-text {
      display: inline-block;
      text-align: left;
      letter-spacing: 1px;
    }
  }
}

// 购物须知
.article-contanier-gwxz {
  text-align: left;
  .side_l {
    float: left;
    width: 50%;
    padding-right: 15px;
  }
  .side_r {
    float: left;
    width: 50%;
    padding-left: 25px;
  }
  .title {
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0px;
    color: #212322;
    margin-bottom: 15px;
  }
  .title-sub {
  }
  .des {
    font-size: 14px;
    letter-spacing: 0px;
    color: #525252;
    line-height: 25px;
    margin-bottom: 45px;
  }
}

//衣物保养
.article-contanier-ywby,
.yszc {
  text-align: left;
  width: 1150px;
  .title {
    line-height: 24px;
    letter-spacing: 0px;
    color: #212322;
    font-size: 16px;
    margin-bottom: 15px;
  }
  .des {
    font-size: 14px;
    letter-spacing: 0px;
    color: #525252;
    line-height: 25px;
    margin-bottom: 45px;
  }
  .icons {
    width: 1150px;
    height: 100px;
    background-color: #f2f2f2;
    margin-bottom: 15px;
    .img-container {
      float: left;
      width: 20%;
      line-height: 100px;
      text-align: center;
    }
  }
}

// 加入我们
.joinus {
  overflow: hidden;
  width: 1150px;
  .side_l {
    float: left;
    text-align: left;
    width: 595px;
    padding-right: 40px;
  }
  .side_r {
    float: left;
  }
  .article-item {
    border-bottom: 1px solid #adadad;
    padding: 24px 0 24px;
  }
  .title {
    font-size: 16px;
    letter-spacing: 0px;
    color: #212322;
    line-height: 24px;
    font-weight: bold;
  }
  .txt {
    font-size: 16px;
    letter-spacing: 0px;
    color: #525252;
    line-height: 25px;
  }
  .last-txt {
    padding-top: 24px;
  }
}

// vip
.vip-wall {
  width: 1150px;
  font-size: 0;
  margin: 0 auto;
  text-align: center;
  img {
    width: 100%;
  }
}
.content {
  margin-top: 20px;
  width: 1150px;
  ul {
    @include clearfix();
  }
  li {
    float: left;
    margin-right: 20px;
    width: 370px;
    height: 452px;
    color: #525252;
    padding: 0 56px;
    letter-spacing: 0px;
    line-height: 1;
    background: #f2f2f2 url('~assets/imgs/resource/201911/pc/vip/vip_4.png') no-repeat 123px 139px;
    &:nth-child(2) {
      background: #f2f2f2 url('~assets/imgs/resource/201911/pc/vip/vip_5.png') no-repeat 102px 40px;
      .subtitle {
        img {
          width: 134px;
        }
      }
    }
    &:nth-child(3) {
      background: #f2f2f2 url('~assets/imgs/resource/201911/pc/vip/vip_6.png') no-repeat 68px 41px;
      margin-right: 0;
      .subtitle {
        img {
          width: 130px;
        }
      }
    }
    .subtitle {
      font-size: 96px;
      font-weight: 200;
      line-height: 232px;
    }
    .h4 {
      font-size: 35px;
      margin-bottom: 29px;
      line-height: 1;
    }
    .des {
      text-align: left;
      font-size: 20px;
      line-height: 32px;
    }
  }
}
</style>

<template>
  <div class="page-content page-body">
    <div class="page-content__nav">
      <div class="title"><p>{{ $t('content._id.824364-0') }}</p></div>
    </div>
    <!-- <div class="story-wall pc">
      <img src="~/assets/imgs/resource/20190712/pc/story_01.jpg" alt />
      <img src="~/assets/imgs/resource/20190712/pc/story_02.jpg" alt />
      <img src="~/assets/imgs/resource/20190712/pc/story_03.jpg" alt />
      <img src="~/assets/imgs/resource/20190712/pc/story_04.jpg" alt />
      <img src="~/assets/imgs/resource/20190712/pc/story_05.jpg" alt />
      <img src="~/assets/imgs/resource/20190712/pc/story_06.jpg" alt />
      <img src="~/assets/imgs/resource/20190712/pc/story_07.jpg" alt />
    </div> -->
    <div class="story-wall pc">
      <!-- {{ $t('content._id.824364-0') }} -->
      <!-- <div class="article-contanier">
      <div class="des-title">您可以通过以下方式联系我们</div>
      <ul>
        <li>
          <h4 class="h4">在线客服</h4>
          <div class="img">
            <img class="icon" src="~/assets/imgs/resource/201911/pc/lxwm/icon-1.png" alt="">
          </div>
          <div class="text">
              <p>我们全天候为您解答疑惑</p>
          </div>
        </li>
        <li>
          <h4 class="h4">顾客热线</h4>
          <div class="img">
          <img class="icon" src="~/assets/imgs/resource/201911/pc/lxwm/icon-2.png" alt="">
          </div>
          <div class="text">
              <p>+86 10-80801123</p>
          </div>
        </li>
        <li>
          <h4 class="h4">发送邮件</h4>
          <div class="img">
          <img class="icon" src="~/assets/imgs/resource/201911/pc/lxwm/icon-3.png" alt="">
          </div>
          <div class="text">
              <p>service1853@aigle.com.cn</p>
          </div>
        </li>
        <li class="addr">
          <h4 class="h4">邮寄地址</h4>
          <div class="img">
          <img class="icon" src="~/assets/imgs/resource/201911/pc/lxwm/icon-4.png" alt="">
          </div>
          <div class="text">
            <div class="addr-text">
              <p>艾高（中国）户外体育用品有限公司<br/>
                地址：北京市通州区中关村科技园<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;通州园光机电一体化产业基地兴光五街八号<br/>
                邮编：101111
              </p>
            </div>
          </div>
        </li>
      </ul>
      </div> -->

      <!-- 加入我们 -->
      <!-- <div class="joinus">
        <div class="side_l">
          <div class="article-item">
            <p>
                <span class="title">
                长期招聘：
              </span>
              <span class="txt">
                店长/导购
              </span>
            </p>
            <p>
                <span class="title">
                招聘城市：
              </span>
              <span class="txt">
                上海/北京/沈阳/大连/长春/济南/杭州/重庆
              </span>
            </p>
          </div>
          <div class="article-item">
            <p class="title">
                工作内容：
            </p>
            <p class="txt">
              日常店铺事务管理；<br/>
              积极配合其他店员工作；<br/>
              有团队精神，服从公司安排规章制度
            </p>
          </div>
          <div class="article-item">
            <p class="title">
                招聘要求：
            </p>
            <p class="txt">
              限女生，年龄25-35岁，162cm以上，五官端正、形象好、气质佳。
              未婚或已婚已育。<br/>
              从事2年以上零售经营工作，有大品牌和相关品牌工作经验者优先。<br/>
              有本地户口，相关品牌工作经验者优先。
            </p>
          </div>
          <div class="article-item">
            <p class="title">
                福利待遇：
            </p>
            <p class="txt">
              店长：底薪+岗位补贴+提成<br/>
              店员：底薪+提成
            </p>
          </div>
          <p>
            <div class="last-txt">
              <span class="title">
                请将您的简历发至：
              </span>
              <span class="txt">
                retailhr@aigle.com.cn
              </span>
            </div>
          </p>
        </div>
        <div class="side_r">
          <img src="~/assets/imgs/resource/201911/pc/jrwm/jrwm.png" alt="">
        </div>
      </div> -->

      <!-- 购物须知 -->
      <!-- <div class="article-contanier-gwxz">
        <div class="side_l">
          <p class="title">
            品质保证
          </p>
          <p class="des">本网站为AIGLE官方网站，是中国大陆上线的唯一一家官网网站，保证100%原装正品</p>

          <p class="title">
            关于订单
          </p>
          <p class="des">本店的商品是确认付款后减库存，为避免您无货，请您下单后及时付款；已付款订单如您需要取消，请与本店客服联系，未发货状态下我们会及时为您办理退款；已付款状态则需等待商品退回仓库验收后才能办理。</p>

          <p class="title">
            物流配送
          </p>
          <p class="des">本店<b>周六日均正常发货</b>，每日14点前的付款订单会在48小时内发出，如遇特殊情况
          （仓库盘点、节假日）会导致延时发货的，本店会提前出公告告知。</p>
          <p class="title-sub">
          <b>但本店不提供以下服务，敬请悉知：</b>
          </p>
          <p class="des">• 提供指定时间、快递公司的配送；<br/>
          • 订单确认后，订单配送信息无法更改；<br/>
          • 不提供收货地址为中国港澳台及其他海外地区的配送。（默认快递为顺丰）</p>
        </div>
        <div class="side_r">
          <p class="title">
          签收及验货
          </p>
          <p class="des">
            请您在收件时与快递人员当面确认商品外包装是否完整，如发现外包装箱有破损，请当面核对商品信息与购物信息是否匹配、损坏等<br/>
            如确认无误请收货。<br/><br/>

            如发现数量、商品不符、损坏等，请拒收货物并及时与在线客服联系，售后客服将根据实际情况进行处理。
          </p>
          <p class="title">
              关于色差
          </p>
          <p class="des">本店所有商品展示的图片均为专业摄影公司拍摄、制作及色彩调整，以尽力保证照片与实际商品保持一致，但由于灯光、显示器色彩偏差、个人对颜色理解 不同等，导致实物可能会与照片存在一些色差，该类问题不属于质量问题，最终颜色以实际商品为准。<br/><br/>

            如买家对于色差提出退换，本店均按7日内无理由退换货处理（退货运费由买家承担）。产品照片可能与实际到货商品不符，以实际到货商品为准，如有疑问可与售后客服联系。</p>

             <p class="title">
               关于尺码
             </p>
             <p class="des">
              由于个人体型及穿衣风格不同，不同款式尺码大小会有一定出入（手工测量误差在国标1-3cm），我们会尽可能的为你提供更为详细的商品参数，客服只针对您提供的大致体型给出购买建议，最终选择由您决定，因尺码问题退换货由买家承担退回邮费。
             </p>
        </div>
      </div> -->

      <!-- 衣物保养 -->
      <!-- <div class="article-contanier-ywby">
        <p class="title">
          毛衣起球的机理说明
        </p>
        <p class="des">
          在毛纱的加工过程和毛衫的穿着过程中，受到摩擦力、拉力等各种外力的作用，毛纱中毛纤维易勾出形成环状或单头脱离状、经反复摩擦后毛纤维纠结在一起，形成球状。从某种角度讲，起毛起球是全毛制品的“孪生子“
        </p>
        <p class="title">
          洗涤方式与穿着
        </p>
        <p class="des">
          毛衫的洗涤方式有时是起球起毛的重要原因，非注明的“可机洗”的产品必须采用“小心手洗”方式进行洗涤，切不可为省事而投入洗衣机中一洗了事，因为在洗衣机的强力作用下，摩擦加
剧，造成起毛起球。一般情况下，肘部、两肋处摩擦起球较为显著。
        </p>
        <div class="icons">
          <div class="img-container">
            <img src="~/assets/imgs/resource/201911/pc/ywby/icon-1.png" alt="">
          </div>
          <div class="img-container">
            <img src="~/assets/imgs/resource/201911/pc/ywby/icon-2.png" alt="">
          </div>
          <div class="img-container">
            <img src="~/assets/imgs/resource/201911/pc/ywby/icon-3.png" alt="">
          </div>
          <div class="img-container">
            <img src="~/assets/imgs/resource/201911/pc/ywby/icon-4.png" alt="">
          </div>
          <div class="img-container">
            <img src="~/assets/imgs/resource/201911/pc/ywby/icon-5.png" alt="">
          </div>
        </div>
        <p class="des">
          1．务必参照服装内水洗标进行洗涤</br>
          2．洗涤时把毛衣里朝外，减少毛衣表面的摩擦度</br>
          3．用专业毛纺清洗剂清洗毛衣，可使毛衣柔顺自然</br>
          4．冷水洗涤，避免长时间浸泡，防止缩水</br>
          5．如出现轻微毛球可是用毛衣除球器清楚</br>
        </p>
      </div> -->

      <!-- 隐私政策 -->
      <!-- <div class="yszc">
      <p class="title">
        版权声明
      </p>
      <p class="des">
        欢迎访问WWW.AIGLE.COM.CN网站（"本网站"）。本网站将根据下列各项使用条款（"本条款"）为您提供服务，敬请仔细阅读。您访问或使用本网站，或接受本网站提供的服务，说明您已阅读、理解本条款，并同意遵守本条款。本条款可由艾高中国户外体育用品有限公司（"我们"）随时更新，并且将会通过适当方式提示。本网站将会及时公布更新后的使用条款，一旦公布即取代原来的使用条款。如果您不同意本条款及/或对本条款的更新，请不要申请、使用或继续使用、接受或继续接受本网站提供的服务。
      </p>
      <p class="des">
        本网站的所有内容（包括但不限于文字、图表、商标、标识、按钮图标、图像、声音片段、数据及软件等，但网站注册用户在论坛、博客、微博以及其他应用下粘贴、转载、上传、发表或以任何其他方式提供的内容除外）之知识产权，均由我们及/或相关权利方单独或共同所有，并受著作权法和其它相关法律、法规的保护。未经我们及/或相关权利方事先书面同意，请勿自行使用、转载、修改、复制、发行、出售、发表或以其它方式利用本网站之内容，您若需此方面的服务，请和本网站相关部门人员接洽。
      </p>
      <p class="des">
        以上版权声明并不包含由本网站链接到的属于其他方的网站之内容。本网站不对该等其他链接网站的内容负责，任何对其他网站的链接仅为本网站用户的方便而设。
      </p>
      <p class="title">
        服务使用
      </p>
      <p class="des">
        您在本网站上获得的服务使用权利仅限于个人使用，您不可将该等服务权利转给他人使用，否则您将为该行为导致的后果承担全部责任。 本网站向您所提供的服务或商品附有知识产权权利，并仅限于您个人使用，您不得将该等服务或商品转用于其它用途，或用于任何营利的行为或活动。
      </p>
      <p class="title">
        隐私保护
      </p>
      <p class="des">
        1. 当您在艾高（AIGLE）进行个人用户注册、参加网上等各种活动时，在您的同意及确认下，本网站将通过注册表格等形式要求您提供一些个人资料。您有权在任何时候拒绝提供这些信息，您在本站点上所提供的所有信息都是基于自愿的原则。<br/>
        2.会员所提供的资料将会被本网站统计、汇总，本网站会不定期地通过会员留下的信息资料同该会员保持联系。<br/>
        3. 在未经访问者授权同意的情况下，本网站不会将访问者的个人资料、企业资料泄露给第三方。以下情况除外：<br/>
        （1）根据执法单位之要求或为公共之目的向相关单位提供个人资料；<br/>
        （2）由于访问者将用户密码告知他人或与他人共享注册帐户，由此导致的任何个人资料泄露；<br/>
        （3）由于黑客攻击、计算机病毒侵入或发作、因政府管制而造成的暂时性关闭等影响网络正常经营之不可抗力而造成的个人资料泄露、丢失、被盗用或被窜改等；<br/>
        （4）由于与本网站链接的其他网站所造成之个人资料泄露及由此而导致的任何法律争议和后果；<br/>
        （5）为免除访问者在生命、身体或财产方面之急迫危险。<br/>
        4. 本站点所提供的服务会自动收集有关访问者的信息，这些信息包括访问者人数、访问时间、访问页面、来访地址等，本站点使用这些信息来对我们的服务器进行分析和对网站进行管理。
      </p>
    </div> -->

      <!-- vip -->

      <div class="vip-wall pc">
        <img src="~/assets/imgs/resource/201911/pc/vip/vip_1.jpg" alt />
        <div class="content">
          <ul>
            <li>
              <div class="subtitle">{{ $t('content._id.824364-1') }}</div>
              <h4 class="h4">{{ $t('content._id.824364-2') }}</h4>
              <div class="des">
                <b>{{ $t('content._id.824364-3') }}</b>{{ $t('content._id.824364-4') }}<b>{{ $t('content._id.824364-5') }}</b>
              </div>
            </li>
            <li>
              <div class="subtitle">
                <img src="~/assets/imgs/resource/201911/pc/vip/vip_2.png" alt="" />
              </div>
              <h4 class="h4">{{ $t('content._id.824364-6') }}</h4>
              <div class="des">
                {{ $t('content._id.824364-7') }}<b>{{ $t('content._id.824364-8') }}</b><br />
                ({{ $t('content._id.824364-9') }})
              </div>
            </li>
            <li>
              <div class="subtitle">
                <img src="~/assets/imgs/resource/201911/pc/vip/vip_3.png" alt="" />
              </div>
              <h4 class="h4">{{ $t('content._id.824364-10') }}</h4>
              <div class="des">
                {{ $t('content._id.824364-11') }}<b>{{ $t('content._id.824364-12') }}</b>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { analytics } from '@/plugins/analytics'

export default {
  data() {
    return {
      list: [],
      total: 100,
      page_no: 1,
      page_size: 12
    }
  },
  components: {},
  mounted() {
    analytics.pageReady({
      page: {
        pageName: this.$t('content._id.824364-0'),
        pageType: 'content',
        breadcrumb: this.$t('content._id.824364-0')
      }
    })
  },
  methods: {
    // 分页查询
    handleChangePage(page) {
      this.page_no = page
      this.list = []
      this.getData()
    },
    async getNews() {}
  }
}
</script>
