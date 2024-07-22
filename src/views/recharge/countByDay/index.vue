<template>
  <basic-table :indent="60"
               row-key="id"
               show-summary
               :options="options"
               :tableColumn="tableColumn"
               :searchBtnList="searchBtnList"
               @resetQuery="resetQuery"
               @handleSearchBtn="handleSearchBtn"
               @changeSearchValue="changeSearchValue"
               v-model:searchFormList="searchFormList">
  </basic-table>
</template>
<script setup name="countByDay">
import dayjs from "dayjs";
import basicTable from '@/components/BasicTable'
import { commonParams } from '@/constant/common.js'
import {getGameSelectList} from '@/api/platform/gameManage.js'
import {getCountByDayList} from '@/api/recharge/countByDay.js'
import {getChannelSelectList, getChildChannelList} from "@/api/recharge/comprehensive .js";

const gameSelectList = ref([])
const channelSelectList = ref([]) // 渠道类型
const options = {
  levelTable: true,
  getDataMethod: getCountByDayList,
  getDataParams: {
    startTime: commonParams.startTime,
    endTime: commonParams.endTime,
    channel: '',
    subChannel: '',
    gameIds: [],
    channelTypes: [],
  }
}
const tableColumn = ref([
  {
    prop: 'date',
    label: '日期',
    width: 130,
    sortable: true,
    align: 'center',
    fixed: true,
  },
  {
    label: '总用户',
    align: 'center',
    children: [
      {
        prop: 'userCountAll',
        label: '用户数',
        sortable: true,
        width: 100,
      },
      {
        prop: 'allRemain',
        label: '次日活跃率%',
        width: 130,
        sortable: true,
      },
      {
        prop: 'payAmountAll',
        label: '收入',
        sortable: true,
        width: 80
      },
      {
        prop: 'amountIncomeAll',
        label: '分成',
        sortable: true,
        width: 80
      },
      {
        prop: 'realAmountAll',
        label: '实际收入',
        sortable: true,
        width: 120
      },
      {
        prop: 'payNumAll',
        label: '付费人数',
        sortable: true,
        width: 120
      },
      {
        prop: 'arpuAll',
        label: 'ARPU',
        sortable: true,
        width: 100
      },
      {
        prop: 'arppuAll',
        label: 'ARPPU',
        sortable: true,
        width: 100
      },
      {
        prop: 'payRateAll',
        label: '付费率%',
        sortable: true,
        width: 100,
      }
    ]
  },
  {
    label: '新用户',
    width: 120,
    align: 'center',
    children: [
      {
        prop: 'userCountNew',
        label: '用户数',
        sortable: true,
        width: 100,
      },
      {
        prop: 'activeRate',
        label: '次日留存率%',
        width: 130,
        sortable: true,
      },
      {
        prop: 'payAmountNew',
        label: '收入',
        sortable: true,
        width: 80
      },
      {
        prop: 'amountIncomeNew',
        label: '分成',
        sortable: true,
        width: 80
      },
      {
        prop: 'realAmountNew',
        label: '实际收入',
        sortable: true,
        width: 120
      },
      {
        prop: 'payNumNew',
        label: '付费人数',
        sortable: true,
        width: 120
      },
      {
        prop: 'arppuNew',
        label: 'ARPPU',
        sortable: true,
        width: 100
      },
      {
        prop: 'payRateNew',
        label: '付费率%',
        sortable: true,
        width: 120
      },
      {
        prop: 'arpuNew',
        label: '注册ARPU',
        sortable: true,
        width: 120
      },
    ]
  },
  {
    label: '老用户',
    align: 'center',
    children: [
      {
        prop: 'userCountOld',
        label: '用户数',
        sortable: true,
        width: 100,
      },
      {
        prop: 'oldOffRate',
        label: '次日流失率%',
        width: 130,
        sortable: true,
      },
      {
        prop: 'payAmountOld',
        label: '收入',
        sortable: true,
        width: 80
      },
      {
        prop: 'amountIncomeOld',
        label: '分成',
        sortable: true,
        width: 80
      },
      {
        prop: 'realAmountOld',
        label: '实际收入',
        sortable: true,
        width: 120
      },
      {
        prop: 'payNumOld',
        label: '付费人数',
        sortable: true,
        width: 120
      },
      {
        prop: 'arpuOld',
        label: 'APPU',
        sortable: true,
        width: 100
      },
      {
        prop: 'arppuOld',
        label: 'ARPPU',
        sortable: true,
        width: 100
      },
      {
        prop: 'payRateOld',
        label: '付费率%',
        sortable: true,
        width: 100,
      }
    ]
  },
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
    key: 'channelTypes',
    label: '渠道类型',
    type: 'selectMultiple',
    value: [],
    options: channelSelectList,
    props: {children: 'childSelect', label: 'name'}
  },
  {
    key: 'channel',
    label: '渠道',
    type: 'select',
    value: '',
    options: [],
    optionProps: {
      key: 'id',
      value: 'id',
      label: 'name'
    }
  },
  {
    key: 'subChannel',
    label: '子渠道',
    value: '',
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
  }
])
const searchBtnList = ref([
  {
    label: '前一月',
    type: 'lastMonth'
  },
  {
    label: '下一月',
    type: 'nextMonth'
  }
])


onMounted(() => {
  getSelectList()
})


const gameIds = computed(() => {
  const searchForm = searchFormList.value.filter(e => e.key === 'gameIds')
  return searchForm.value
})

watch(() => gameIds.value, (newValue) => {
  // console.log(newValue)
})

const getSelectList = () => {
  getChannelSelectList().then(res => {
    res.data.forEach(e => {
      e.label = e.name
      e.value = e.id
    })
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
    case 'lastMonth':
      // 以现有日期的第一个值为准
      startTime = dayjs(searchFormList.value[0].value[0]).subtract(1, 'month').startOf('month').format('YYYY-MM-DD')
      endTime = dayjs(searchFormList.value[0].value[0]).subtract(1, 'month').endOf('month').format('YYYY-MM-DD')
      break
    case 'nextMonth':
      startTime = dayjs(searchFormList.value[0].value[0]).add(1, 'month').startOf('month').format('YYYY-MM-DD')
      endTime = dayjs(searchFormList.value[0].value[0]).add(1, 'month').endOf('month').format('YYYY-MM-DD')
      break
  }
  searchFormList.value[0].value = [startTime, endTime]
}

/**
 * 获取关联的下拉数据
 */
const changeSearchValue = (data) => {
  const {key, value} = data
  // 获取渠道
  if(key === 'channelTypes') {
    getChildChannelList(value).then(res => {
      const channelForm = searchFormList.value.find(e=> e.key === 'channel')
      channelForm.options = res.data || []
    })
  }
}

</script>
<style scoped lang="scss">

</style>