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
  </basic-table>
</template>
<script setup name="countByServer">
import dayjs from "dayjs";
import basicTable from '@/components/BasicTable'
import {getGameSelectList, getGameServerList} from '@/api/platform/gameManage.js'
import {getCountByServerList} from '@/api/recharge/countByServer.js'

const gameSelectList = ref([])
const serverSelectList = ref([])
const options = {
  getDataMethod: getCountByServerList,
  getDataParams: {
    startTime: dayjs(new Date - 8652369540).format('YYYY-MM-DD'),
    endTime: dayjs(new Date).format('YYYY-MM-DD'),
    serverStartTime: dayjs(new Date - 8652369540).format('YYYY-MM-DD'),
    serverEndTime: dayjs(new Date - 865236954).format('YYYY-MM-DD'),
    gameIds: [],
    gameServerIds: []
  }
}
const tableColumn = ref([
  {
    prop: 'gameSid',
    label: '区服id',
    width: 150,
    fixed: true,
    sortable: true
  },
  {
    prop: 'gameSid',
    label: '游戏区服',
    sortable: true,
    width: 100,
    fixed: true,
    children: [
      {
        prop: 'gameSid',
        label: '游戏区服',
        sortable: true,
        width: 100,
        fixed: true
      }
    ]
  },
  {
    prop: 'spanAmount',
    label: '时间段金额',
    sortable: true,
    width: 120
  },
  {
    prop: 'spanOrdersCount',
    label: '时间段订单数',
    sortable: true,
    width: 130
  },
  {
    prop: 'spanPayUsers',
    label: '时间段充值用户数',
    sortable: true,
    width: 160
  },
  {
    prop: 'newPayUsers',
    label: '新增充值用户数',
    sortable: true,
    width: 160,
    showTooltip: true
  },
  {
    prop: 'registerCountFifteen',
    label: '15日注册人数',
    sortable: true,
    width: 140
  },
  {
    prop: 'orderCount',
    label: '充值订单数',
    sortable: true,
    width: 120
  },
  {
    prop: 'amountOne',
    label: '首日充值金额',
    sortable: true,
    width: 130
  },
  {
    prop: 'amountSeven',
    label: '7日充值金额',
    sortable: true,
    width: 130
  },
  {
    prop: 'amountFifteen',
    label: '15日充值金额',
    sortable: true,
    width: 130
  },
  {
    prop: 'amountThirty',
    label: '30日充值金额',
    sortable: true,
    width: 130,
    showTooltip: true
  },
  {
    prop: 'registerCount',
    label: '总注册人数',
    sortable: true,
    width: 130,
    showTooltip: true
  },
  {
    prop: 'amount',
    label: '总充值金额',
    sortable: true,
    width: 120
  }
])
const searchFormList = ref([
  {
    key: ['startTime', 'endTime'],
    label: '日期',
    type: 'dateRange',
    value: [options.getDataParams.startTime, options.getDataParams.endTime],
    format: 'YYYY-MM-DD'
  },
  {
    key: ['startTime', 'endTime'],
    label: '开服日期',
    type: 'dateRange',
    value: [options.getDataParams.startTime, options.getDataParams.endTime],
    format: 'YYYY-MM-DD'
  },
  {
    key: 'gameIds',
    label: '游戏',
    multiple: true,
    type: 'treeSelect',
    value: [],
    options: gameSelectList,
    nodeKey: 'id',
    props: {children: 'childSelect', label: 'name'}
  },
  {
    key: 'channelTypes',
    label: '游戏服',
    type: 'treeSelect',
    value: [],
    nodeKey: 'id',
    options: serverSelectList,
    props: {children: 'childSelect', label: 'name'}
  },
])
const searchBtnList = ref([
  {
    label: '前一天',
    type: 'lastDay'
  },
  {
    label: '下一天',
    type: 'nextDay'
  }
])


onMounted(() => {
  getSelectList()
})


const gameIds = computed(()=> {
  const searchForm = searchFormList.value.filter(e=> e.key === 'gameIds')
  return searchForm.value
})

watch(()=>gameIds.value, (newValue)=> {
  console.log(newValue)
})

const getSelectList = () => {
  getGameSelectList().then(res => {
    gameSelectList.value = res.data
  })
  // getGameServerList({gameIds : [325]}).then(res=> {
  //   serverSelectList.value = res.data
  // })
}
/**
 * 重置需要将下拉重新赋值，避免重复请求
 */
const resetQuery = () => {
  searchFormList.value.forEach(e => {
    if (e.key === 'gameIds') e.options = gameSelectList.value
    if (e.key === 'channelTypes') e.options = serverSelectList.value
  })
}
const handleSearchBtn = (btn) => {
  let startTime = ''
  let endTime = ''
  switch (btn.type) {
    case 'lastDay':
      startTime = dayjs(searchFormList.value[0].value[0]).subtract(1, 'day').format('YYYY-MM-DD')
      endTime = dayjs(searchFormList.value[0].value[0]).subtract(1, 'day').format('YYYY-MM-DD')
      break
    case 'nextDay':
      startTime = dayjs(searchFormList.value[0].value[0]).add(1, 'day').format('YYYY-MM-DD')
      endTime = dayjs(searchFormList.value[0].value[0]).add(1, 'day').format('YYYY-MM-DD')
      break
  }
  searchFormList.value[0].value = [startTime, endTime]
  searchFormList.value[1].value = [startTime, endTime]
}

</script>
<style scoped lang="scss">

</style>