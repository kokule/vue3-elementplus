<template>
  <basic-table show-summary
               :options="options"
               :tableColumn="tableColumn"
               :searchBtnList="searchBtnList"
               @resetQuery="resetQuery"
               @handleSearchBtn="handleSearchBtn"
               v-model:searchFormList="searchFormList">
  </basic-table>
</template>
<script setup name="deviceNumber">
import dayjs from "dayjs";
import basicTable from '@/components/BasicTable/index.vue'
import {getGameSelectList} from '@/api/platform/gameManage.js'
import {getComprehensiveList, getChannelSelectList} from '@/api/recharge/comprehensive .js'

const gameSelectList = ref([])
const channelSelectList = ref([])
const options = {
  getDataMethod: getComprehensiveList,
  getDataParams: {
    startTime: dayjs(new Date - 865236954).format('YYYY-MM-DD'),
    endTime: dayjs(new Date).format('YYYY-MM-DD'),
    channelTypes: [],
    gameIds: [],
    platforms: []
  }
}
const tableColumn = ref([
  {
    prop: 'gameName',
    label: '时间',
    width: 150,
    sortable: true,
  },
  {
    prop: 'devCount',
    label: '类型',
    width: 100
  },
  {
    prop: 'registerCount',
    label: '渠道类型',
    width: 100
  },
  {
    prop: 'registerRate',
    label: '子渠道',
    width: 100
  },
  {
    prop: 'roleRate',
    label: '广告素材',
  },
  {
    prop: 'adMoney',
    label: '游戏',
  },
  {
    prop: 'payCount',
    label: '平台类别',
    width: 100
  },
  {
    prop: 'paySum',
    label: '登录设备号',
    sortable: true,
  },
  {
    prop: 'newPayCount',
    label: '注册设备号',
    sortable: true,
  },
  {
    prop: 'newAmount',
    label: '注册设备型号',
    sortable: true,
  },
  {
    prop: 'amount',
    label: 'IP',
    sortable: true,
    width: 100
  },
  {
    prop: 'amountIncome',
    label: '其他数据',
    width: 130,
  }
])
const searchFormList = ref([
  {
    key: ['startTime', 'endTime'],
    label: '充值日期',
    type: 'dateRange',
    value: [options.getDataParams.startTime, options.getDataParams.endTime],
    format: 'YYYY-MM-DD'
  },
  {
    key: 'channelTypes',
    label: '类别',
    type: 'select',
    value: [],
    options: channelSelectList,
    optionProps: {
      key: 'id',
      value: 'id',
      label: 'name'
    }
  },
  {
    key: 'platforms',
    label: '设备号',
    value: []
  }
])
const searchBtnList = ref([
  {
    icon: 'ArrowLeftBold',
    label: '前一天',
    type: 'yesterday'
  },
  {
    icon: 'ArrowRightBold',
    label: '后一天',
    type: 'beforeYesterday'
  },
  {
    icon: 'clock',
    label: '本周',
    type: 'thisWeek'
  },
  {
    icon: 'clock',
    label: '上周',
    type: 'lastWeek'
  },
  {
    icon: 'clock',
    label: '本月',
    type: 'thisMonth'
  },
  {
    icon: 'clock',
    label: '上月',
    type: 'lastMonth'
  }
])


onMounted(() => {
  // getSelectList()
})

const getSelectList = () => {
  getChannelSelectList().then(res => {
    channelSelectList.value = res.data || []
  })
  getGameSelectList().then(res => {
    gameSelectList.value = res.data
  })
}
/**
 * 重置需要将下拉重新赋值，避免重复请求
 */
const resetQuery = () => {
  searchFormList.value.forEach(e => {
    if (e.key === 'gameIds') e.options = gameSelectList.value
    if (e.key === 'channelTypes') e.options = channelSelectList.value
  })
}
const handleSearchBtn = (btn) => {
  let startTime = ''
  let endTime = ''
  switch (btn.type) {
    case 'yesterday':
      startTime = dayjs().subtract(1, 'day').format('YYYY-MM-DD')
      endTime = startTime
      break
    case 'beforeYesterday':
      startTime = dayjs().subtract(2, 'day').format('YYYY-MM-DD')
      endTime = startTime
      break
    case 'thisWeek':
      startTime = dayjs().startOf('week').format('YYYY-MM-DD')
      endTime = dayjs().endOf('week').format('YYYY-MM-DD')
      break
    case 'lastWeek':
      startTime = dayjs().subtract(1, 'week').startOf('week').format('YYYY-MM-DD')
      endTime = dayjs().subtract(1, 'week').endOf('week').format('YYYY-MM-DD')
      break
    case 'lastMonth':
      startTime = dayjs().subtract(1, 'month').startOf('month').format('YYYY-MM-DD')
      endTime = dayjs().subtract(1, 'month').endOf('month').format('YYYY-MM-DD')
      break
    case 'thisMonth':
      startTime = dayjs().startOf('month').format('YYYY-MM-DD')
      endTime = dayjs().endOf('month').format('YYYY-MM-DD')
      break
  }
  searchFormList.value[0].value = [startTime, endTime]
}

</script>
<style scoped lang="scss">

</style>