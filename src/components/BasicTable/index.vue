<template>
  <div class="basic-table">
    <el-card shadow="always" class="top-card">
      <!-- 顶部搜索 -->
      <el-form ref="queryRef" :inline="true" v-show="showSearch">
        <el-form-item
            v-for="formItem in searchFormList"
            :key="formItem.key"
            :label="formItem.label"
            :prop="formItem.key">
          <template v-if="['select', 'selectMultiple'].includes(formItem.type)">
            <el-select v-model="formItem.value"
                       style="width: 200px"
                       collapse-tags
                       filterable
                       collapse-tags-tooltip
                       :multiple="formItem.type === 'selectMultiple'"
                       @change="changeValue($event, formItem.key)"
                       :placeholder="formItem.placeholder || '请选择'+ formItem.label"
                       clearable>
              <el-option
                  v-for="dict in formItem.options || []"
                  :key="dict[formItem?.optionProps?.key || 'value']"
                  :label="dict[formItem?.optionProps?.label || 'label']"
                  :value="dict[formItem?.optionProps?.value || 'value']"
              />
            </el-select>
          </template>
          <template v-else-if="formItem.type === 'treeSelect'">
            <el-tree-select
                clearable
                filterable
                collapse-tags
                collapse-tags-tooltip
                @check="(nodes,keys,halfNodes,halfKeys) => (changeTreeValue(nodes,keys,halfNodes,halfKeys ,formItem.key))"
                :style="{width : formItem.width || '200px'}"
                v-model="formItem.value"
                :multiple="formItem.multiple"
                :props="formItem.props"
                :node-key="formItem.nodeKey || 'id'"
                :show-checkbox="formItem.multiple || true"
                :data="formItem.options || []"
                :render-after-expand="false"
            />
          </template>
          <template v-else-if="formItem.type === 'radio'">
            <el-radio-group style="width: 200px" v-model="formItem.value" @change="changeValue($event, formItem.key)">
              <el-radio v-for="radioItem in []" :key="radioItem.value" :value="radioItem.value">
                {{ radioItem.label }}
              </el-radio>
            </el-radio-group>
          </template>
          <template v-else-if="formItem.type === 'textarea'">
            <el-input type="textarea"
                      style="width: 200px"
                      v-model="formItem.value"
                      @change="changeValue($event, formItem.key)"
                      :placeholder="formItem.placeholder || '请输入'+ formItem.label"/>
          </template>
          <template v-else-if="formItem.type === 'buttonInput'">
            <el-input
                style="width: 200px"
                clearable
                v-model="formItem.value"
                @change="changeValue($event, formItem.key)"
                @keyup.enter="handleQuery"
                :placeholder="formItem.placeholder || '请输入'+ formItem.label">
              <template #append>{{ formItem.buttonLabel }}</template>
            </el-input>
          </template>
          <template v-else-if="formItem.type === 'dateRange'">
            <el-date-picker
                style="width: 240px"
                v-model="formItem.value"
                type="daterange"
                :format="formItem.format"
                :value-format="formItem.format"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
            />
          </template>
          <!--  不传类型默认输入框  -->
          <template v-else>
            <el-input clearable
                      style="width: 200px"
                      @change="changeValue($event, formItem.key)"
                      v-model="formItem.value"
                      @keyup.enter="handleQuery"
                      :placeholder="formItem.placeholder || '请输入'+ formItem.label"/>
          </template>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
          <el-button type="warning" icon="Refresh" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
      <el-row :gutter="10" class="mb8" v-if="searchBtnList">
        <el-col :span="1.5" v-for="btn in searchBtnList" :key="btn.type">
          <el-button
              type="primary"
              plain
              :icon="btn.icon || 'search'"
              @click="handleSearchBtn(btn)"
          >{{ btn.label }}
          </el-button>
        </el-col>
        <right-toolbar v-model:showSearch="showSearch"
                       @queryTable="getTableData"
                       @setColumnVisible="setTableColumn"
                       v-model:columns="selectColumns">
        </right-toolbar>
      </el-row>
    </el-card>
    <el-card shadow="always" class="bottom-card">
      <el-table
          v-bind="$attrs"
          v-if="refreshTable && !options.levelTable"
          :height="tableMaxHeight"
          :max-height="tableMaxHeight"
          v-loading="loading"
          :data="tableData">
        <template #default>
          <el-table-column
              v-for="column in columns"
              :key="column.prop"
              :sortable="column.sortable"
              :prop="column.prop"
              :align="column.align"
              :fixed="column.fixed"
              :label="column.label"
              :show-overflow-tooltip="column.showTooltip"
              :width="column.width">
            <template v-if="column.useSlot" #default="scope">
              <!-- 当前插槽名就是当前的prop, 内容可以自定义， 用于一些复杂的显示-->
              <slot :name="column.prop" :row="scope.row"></slot>
            </template>
            <template v-else #default="scope">
              <span>{{ scope.row[column.prop] }}</span>
            </template>
          </el-table-column>
        </template>

        <!--        <el-table-column label="操作" align="center" width="360" class-name="small-padding fixed-width">-->
        <!--          <template #default="scope">-->
        <!--            <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)">编辑</el-button>-->
        <!--            <el-button link type="primary" icon="Plus" @click="handleAdd(scope.row)">服务器</el-button>-->
        <!--            <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)">SDK配置</el-button>-->
        <!--            <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)">添加服务器</el-button>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
      </el-table>
      <el-table
          v-bind="$attrs"
          border
          v-if="refreshTable && options.levelTable"
          :height="tableMaxHeight"
          :max-height="tableMaxHeight"
          v-loading="loading"
          :data="tableData">
        <base-column :table-column="tableColumn"></base-column>
      </el-table>
    </el-card>
    <pagination
        v-show="options.showPagination"
        :total="total"
        v-model:page="queryParams.currentPage"
        v-model:limit="queryParams.pageSize"
        @pagination="getTableData"
    />
  </div>
</template>

<script setup name="BasicTable">
import _cloneDeep from 'lodash.clonedeep'
import _ from 'lodash'
import BaseColumn from './components/BaseColumn.vue'

const {proxy} = getCurrentInstance();
const searchFormList = defineModel('searchFormList');
const emit = defineEmits(['resetQuery', 'handleSearchBtn', 'changeSearchValue']);
const total = ref(0);
const title = ref("");
const columns = ref([]) // 实际使用的列表
const selectColumns = ref([]) // 下拉选择的列表， 用来做显隐
const tableData = ref([]);
const loading = ref(false);
const searchParams = ref({});
const showSearch = ref(true);
const isExpandAll = ref(false);
const refreshTable = ref(true);
const tableMaxHeight = ref('500');
const originSearchFormList = ref({}) // 保留一份初始的数据 用于重置

/**
 * options 包括
 * getDataMethod 表格的数据请求方法
 * getDataParams 表格的数据请求参数
 * tableData 直接传入table数据，有则不需要请求
 */
const props = defineProps({
  options: {
    type: Object,
    default: {
      getDataMethod: () => {
      }
    }
  },
  tableColumn: Array,
  tableData: Array,
  searchBtnList: Array
})


onMounted(() => {
  searchParams.value = _cloneDeep(props.options.getDataParams || {})
  originSearchFormList.value = _cloneDeep(searchFormList.value || [])
  setTableMaxHeight()

  setTableColumn('mounted')
  // getTableData();
  window.addEventListener('resize', setTableMaxHeight);
});

/**
 * 根据屏幕高度动态计算table的高度
 */
const setTableMaxHeight = () => {
  tableMaxHeight.value = (window.innerHeight / 1.7) + (!props.options.showPagination ? window.innerHeight / 10 : 0) + 'px'
}

const setTableColumn = (type) => {
  if(type === 'mounted') { // 初始化的时候设置
    selectColumns.value = _cloneDeep(props.tableColumn)
    selectColumns.value.forEach(e => {
      // 默认没有visible字段的情况下,给一个默认值 true
      if (!e.hasOwnProperty('visible')) {
        e.visible = true
      }
    })
  }
  const showProps = selectColumns.value.reduce((pre, cur)=> {
    if(cur.visible) pre.push(cur.prop)
    return pre
  }, [])
  columns.value = selectColumns.value.filter(e=> showProps.includes(e.prop))
  toggleExpandAll()
}


const data = reactive({
  form: {},
  queryParams: {
    id: null,
    currentPage: 0,
    domain: "chituhuyu.com",
    pageSize: 12,
    packageName: "",
    name: ""
  }
});

const {queryParams, form} = toRefs(data);

/** 查询菜单列表 */
function getTableData() {
  loading.value = true;
  // tableData 如果有传表格数据过来 则直接用表格数据即可
  if (props.options.tableData) {
    tableData.value = props.options.tableData
  } else if (props.options.getDataMethod) {
    const {getDataMethod} = props.options
    getDataMethod(searchParams.value).then(res => {
      tableData.value = res.data
      loading.value = false;
    })
  }
}

/**
 * 一些值变化需要出发请求 获取数据
 * 业务组件根据具体的key值 判断 具体对应业务
 * @param value
 * @param key
 */
const changeValue = (value, key) => {
  changeValueFn(value, key)
}

const changeTreeValue = (nodes, keys, halfNodes, halfKeys, key) => {
  changeTreeValueFn(nodes, keys, halfNodes, halfKeys, key)
}

const changeValueFn = _.debounce((value, key) => {
  emit('changeSearchValue', {value, key})
}, 1000)

const changeTreeValueFn = _.debounce((nodes, keys, halfNodes, halfKeys, key) => {
  emit('changeSearchValue', {value: keys.checkedKeys, key})
}, 1000)

/** 搜索按钮操作 */
const handleQuery = () => {
  handleParams() // 处理参数
  getTableData();
}

const handleParams = () => {
  const {getDataParams} = props.options
  searchFormList.value.forEach(e => {
    // 如果参数是数组， 像时间区间等参数 按照数组下标对应赋值, 没有值的话就用默认传入的参数的格式
    if (Array.isArray(e.key)) {
      e.key.forEach((k, index) => {
        searchParams.value[k] = e.value[index] || getDataParams[k]
      })
    } else {
      // 其他情况默认为单个key， 没有值的话就用默认传入的参数的格式
      // 需要判断传入的参数是否是数组类型,如果不一致则需要处理一下 如 下拉单个值是数组， 但select 绑定的是单个字符或数字，不是数组，所以需要处理一下
      searchParams.value[e.key] = Array.isArray(getDataParams[e.key]) && !Array.isArray(e.value)
      && (e.value || e.value === 0) ? [e.value] : e.value || getDataParams[e.key]
    }
  })
  console.log(searchFormList.value)
  console.log(searchParams.value)
}

/**
 * 搜索栏按钮操作，返回父级操作
 * @param btn
 */
const handleSearchBtn = (btn) => {
  // 树表格展开刷新直接执行 ，不需要返回
  if (btn.type === 'openOrRetract') return toggleExpandAll()
  emit('handleSearchBtn', btn)
  if (!btn.noSearch) handleQuery()
}


/** 重置按钮操作 */
function resetQuery() {
  searchParams.value = _cloneDeep(props.options.getDataParams || {})
  searchFormList.value = _cloneDeep(originSearchFormList.value || {})
  emit('resetQuery')
  getTableData();
}

/** 展开/折叠操作 */
const toggleExpandAll = () => {
  refreshTable.value = false;
  isExpandAll.value = !isExpandAll.value;
  nextTick(() => {
    refreshTable.value = true;
  });
}

</script>
<style lang="scss" scoped>
.basic-table {
  padding: 12px;

  .top-card {
    margin-bottom: 10px;
  }
}
</style>