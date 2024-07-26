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
<script setup name="registerRetention">
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
    label: '日期',
    width: 120,
    fixed: true,
    sortable: true
  },
  {
    prop: 'devCount',
    label: '注册数',
    width: 100,
    sortable: true
  },
  {
    prop: 'registerCount',
    label: '注册成本',
    width: 100,
    sortable: true
  },
  {
    prop: 'registerRate',
    label: '次日留存率',
    width: 120,
    sortable: true
  },
  {
    prop: 'registerRate',
    label: '3日留存率',
    width: 120,
    sortable: true
  },
  {
    prop: 'registerRate',
    label: '4日留存率',
    width: 120,
    sortable: true
  },
  {
    prop: 'registerRate',
    label: '5日留存率',
    width: 120,
    sortable: true
  },
  {
    prop: 'registerRate',
    label: '6日留存率',
    width: 120,
    sortable: true
  },
  {
    prop: 'registerRate',
    label: '7日留存率',
    width: 120,
    sortable: true
  },
  {
    prop: 'registerRate',
    label: '14日留存率',
    width: 120,
    sortable: true
  },
  {
    prop: 'registerRate',
    label: '21日留存率',
    width: 120,
    sortable: true
  },
  {
    prop: 'registerRate',
    label: '28日留存率',
    width: 120,
    sortable: true
  },
  {
    prop: 'registerRate',
    label: '1月留存率',
    width: 120,
    sortable: true
  },
  {
    prop: 'registerRate',
    label: '2月留存率',
    width: 120,
    sortable: true
  },
  {
    prop: 'registerRate',
    label: '3月留存率',
    width: 120,
    sortable: true
  },
  {
    prop: 'registerRate',
    label: '4月留存率',
    width: 120,
    sortable: true
  },
  {
    prop: 'registerRate',
    label: '5月留存率',
    width: 120,
    sortable: true
  },
  {
    prop: 'registerRate',
    label: '6月留存率',
    width: 120,
    sortable: true
  },
  {
    prop: 'registerRate',
    label: '7月留存率',
    width: 120,
    sortable: true
  },
  {
    prop: 'registerRate',
    label: '8月留存率',
    width: 120,
    sortable: true
  },
  {
    prop: 'registerRate',
    label: '9月留存率',
    width: 120,
    sortable: true
  },
  {
    prop: 'registerRate',
    label: '10月留存率',
    width: 120,
    sortable: true
  },
  {
    prop: 'registerRate',
    label: '11月留存率',
    width: 120,
    sortable: true
  },
  {
    prop: 'registerRate',
    label: '1年留存率',
    width: 120,
    sortable: true
  }
])
const searchFormList = ref([
  {
    key: ['startTime', 'endTime'],
    label: '注册日期',
    type: 'dateRange',
    value: [options.getDataParams.startTime, options.getDataParams.endTime],
    format: 'YYYY-MM-DD'
  },
  {
    key: 'channelTypes',
    label: '渠道类型',
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
    key: 'channelChildTypes',
    label: '渠道子类型',
    type: 'select',
    value: [],
    options: channelSelectList,
  },
  {
    key: 'channelChildTypes',
    label: '渠道',
    type: 'select',
    value: [],
    options: channelSelectList,
  },
  {
    key: 'channelChildTypes',
    label: '子渠道',
    type: 'select',
    value: [],
    options: channelSelectList,
  },
  {
    key: 'gameIds',
    label: '游戏',
    width: '240px',
    multiple: true,
    type: 'treeSelect',
    value: [],
    options: gameSelectList,
    nodeKey: 'id',
    props: {children: 'childSelect', label: 'name'}
  },
  {
    key: 'channelChildTypes',
    label: '分组类型',
    type: 'select',
    value: [],
    options: channelSelectList,
  },
  {
    key: 'channelChildTypes',
    label: '终端',
    type: 'select',
    value: [],
    options: channelSelectList,
  },
  {
    key: 'gameIds',
    label: '投放人',
    multiple: true,
    type: 'treeSelect',
    value: [],
    options: gameSelectList,
    nodeKey: 'id',
    props: {children: 'childSelect', label: 'name'}
  },
  {
    key: 'gameIds',
    label: '按设备排重',
    type: 'switch',
    value: false
  },
  {
    key: 'gameIds',
    label: '显示留存人数',
    type: 'switch',
    value: false
  }
])
const searchBtnList = ref([
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