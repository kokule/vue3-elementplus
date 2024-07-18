<template>
  <basic-table :indent="60"
               row-key="id"
               show-summary
               :options="options"
               :tableColumn="tableColumn"
               :searchBtnList="searchBtnList"
               @resetQuery="resetQuery"
               @handleSearchBtn="handleSearchBtn"
               v-model:searchFormList="searchFormList">
    <template #gameName="{row}">
      <span>{{ row.gameName }}</span>
    </template>
  </basic-table>
</template>
<script setup name="comprehensiveRecharge">
import dayjs from "dayjs";
import {terminal} from '@/constant/select.js'
import basicTable from '@/components/BasicTable'
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
    label: '游戏名称',
    useSlot: true,
    width: 150,
    fixed: true,
  },
  {
    prop: 'devCount',
    label: '激活数',
    sortable: true,
    width: 100
  },
  {
    prop: 'registerCount',
    label: '注册数',
    sortable: true,
    width: 100
  },
  {
    prop: 'registerRate',
    label: '注册率',
    sortable: true,
    width: 100
  },
  {
    prop: 'roleRate',
    label: '创角率',
    sortable: true,
    width: 100
  },
  {
    prop: 'adMoney',
    label: '广告费用',
    sortable: true,
    width: 100,
    showTooltip: true
  },
  {
    prop: 'payCount',
    label: '充值人数',
    sortable: true,
    width: 100
  },
  {
    prop: 'paySum',
    label: '充值次数',
    sortable: true,
    width: 100
  },
  {
    prop: 'newPayCount',
    label: '新增充值人数',
    sortable: true,
    width: 130
  },
  {
    prop: 'newAmount',
    label: '新增充值金额',
    sortable: true,
    width: 130
  },
  {
    prop: 'amount',
    label: '充值金额',
    sortable: true,
    width: 100
  },
  {
    prop: 'amountIncome',
    label: '游戏分成金额',
    sortable: true,
    width: 130,
    showTooltip: true
  },
  {
    prop: 'amountReal',
    label: '银行实收金额',
    sortable: true,
    width: 130,
    showTooltip: true
  },
  {
    prop: 'arppu',
    label: 'ARPPU值',
    sortable: true,
    width: 110
  },
  {
    prop: 'registerCost',
    label: '注册成本',
    sortable: true,
    width: 100
  },
  {
    prop: 'newPayRate',
    label: '新增付费率',
    sortable: true,
    width: 120
  },
  {
    prop: 'inputRatio',
    label: '投产比(%)',
    sortable: true,
    width: 120
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
    key: 'platforms',
    label: '终端',
    type: 'selectMultiple',
    value: [],
    options: terminal
  },
  {
    key: 'channelTypes',
    label: '渠道',
    type: 'selectMultiple',
    value: [],
    options: channelSelectList,
    optionProps: {
      key: 'id',
      value: 'id',
      label: 'name'
    }
  },
  {
    key: 'gameIds',
    label: '游戏',
    width: '300px',
    multiple: true,
    type: 'treeSelect',
    value: [],
    options: gameSelectList,
    nodeKey: 'id',
    props: {children: 'childSelect', label: 'name'}
  }])
const searchBtnList = ref([
  {
    label: '昨天',
    type: 'yesterday'
  },
  {
    label: '前天',
    type: 'beforeYesterday'
  },
  {
    label: '本周',
    type: 'thisWeek'
  },
  {
    label: '上周',
    type: 'lastWeek'
  },
  {
    label: '本月',
    type: 'thisMonth'
  },
  {
    label: '上月',
    type: 'lastMonth'
  }
])


onMounted(() => {
  getSelectList()
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