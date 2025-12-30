/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
  <div class="logistics clearfix" :style="{'height':`${height}px`}">
    <!-- 32423423 -->
    <ul class>
      <template v-for="item in activities">
        <li class="timeline-item">
          <div class="timeline-item__tail"></div>
          <div class="timeline-item__node">
            <!---->
          </div>
          <!---->
          <div class="timeline-item__wrapper">
            <!---->
            <div class="el-timeline-item__content">{{item.AcceptStation}}</div>
            <div class="el-timeline-item__timestamp is-bottom">{{item.AcceptTime|parseTime}}</div>
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>
<script>
import { getTrackerpull } from '@/api/member'
export default {
  props: {
    height: {
      type: Number,
      default: 450,
    },
    id: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      reverse: true,
      activities: [],
    }
  },
  created() {
    this._getTrackerpull()
  },
  methods: {
    async _getTrackerpull() {
      this.loading = true
      let data = await getTrackerpull({ order_id: this.id })
      this.activities = data
      this.loading = false
    },
  },
}
</script>
<style lang="scss" scoped>
.logistics {
	padding-left: 20px;
  overflow-y: auto;
	text-align: left;
	font-size: 14px;
  .timeline-item {
    position: relative;
		padding-bottom: 20px;
		&:nth-last-child(1){
			.timeline-item__tail {
				display: none;
			}
		}
    .timeline-item__tail {
      position: absolute;
      left: 4px;
      height: 100%;
      border-left: 2px solid #e4e7ed;
    }
    .timeline-item__node {
      position: absolute;
      background-color: #e4e7ed;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      left: -1px;
      width: 12px;
      height: 12px;
    }
    .timeline-item__wrapper {
			position: relative;
      padding-left: 28px;
      top: -3px;
    }
  }
}
</style>
