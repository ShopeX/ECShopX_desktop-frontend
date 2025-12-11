/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
.sp-datepicker {
  font-size: 0;
  .y-s {
    display: inline-block;
    width: 33.33%;
    padding-left: 2px;
  }
}
</style>

<template>
  <div class="sp-datepicker">
    <div class="y-s">
      <SpSelect
        v-model="year"
        :disabled="disabled"
        :data="yearDs"
        :placeholder="$t('comps.datepicker.669527-0')"
        @change="onChangeYear"
      ></SpSelect>
    </div>
    <div class="y-s">
      <SpSelect
        v-model="month"
        :disabled="disabled"
        :data="monthDs"
        :value="1"
        :placeholder="$t('comps.datepicker.669527-1')"
        @change="onChangeMonth"
      ></SpSelect>
    </div>
    <div class="y-s">
      <SpSelect
        v-model="day"
        :disabled="disabled"
        :data="dayDs"
        :value="1"
        :placeholder="$t('comps.datepicker.669527-2')"
        @change="onChangeDay"
      ></SpSelect>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    value: String,
    disabled: Boolean
  },
  data() {
    return {
      yearDs: [],
      monthDs: [],
      dayDs: [],
      year: '',
      month: '',
      day: ''
    }
  },
  created() {
    const year = new Date().getFullYear()
    for (let i = year; i > year - 100; i--) {
      this.yearDs.push({ label: i.toString(), value: i })
    }
    for (let i = 1; i <= 12; i++) {
      this.monthDs.push({ label: i < 10 ? `0${i}` : `${i}`, value: i })
    }
    let v = this.value.split('-')
    this.year = v[0] ? parseInt(v[0]) : ''
    this.month = v[1] ? parseInt(v[1]) : ''
    this.day = v[2] ? parseInt(v[2]) : ''
    this.setDays()
  },
  watch: {
    value(v, ov) {
      if (v !== ov) {
        let v = this.value.split('-')
        this.year = v[0] ? parseInt(v[0]) : ''
        this.month = v[1] ? parseInt(v[1]) : ''
        this.day = v[2] ? parseInt(v[2]) : ''
        this.setDays()
      }
    }
  },
  methods: {
    onChangeYear(e) {
      this.setDays()
    },
    onChangeMonth(e) {
      this.setDays()
    },
    onChangeDay(e) {
      this.onChange()
    },
    setDays() {
      if (this.year && this.month) {
        let days = moment(`${this.year}-${this.month}`, 'YYYY-M').daysInMonth()
        if (this.day > days) {
          this.day = ''
        }
        this.dayDs = []
        for (let i = 1; i <= days; i++) {
          this.dayDs.push({ label: i < 10 ? `0${i}` : `${i}`, value: i })
        }
      }
      this.onChange()
    },
    onChange() {
      let date
      if (this.year && this.month && this.day) {
        date = moment([this.year, this.month - 1, this.day]).format('YYYY-MM-DD')
      } else {
        date = ''
      }
      this.$emit('input', date)
    }
  }
}
</script>
