<template>
  <div class="top-right-btn" :style="style">
    <el-row>
      <el-tooltip class="item" effect="dark" :content="showSearch ? '隐藏搜索' : '显示搜索'" placement="top" v-if="search">
        <el-button circle icon="Search" @click="toggleSearch()" />
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="刷新" placement="top">
        <el-button circle icon="Refresh" @click="refresh()" />
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="显隐列" placement="top" v-if="columns">
        <el-button circle icon="Menu" @click="showColumn()" v-if="showColumnsType === 'transfer'"/>
        <el-dropdown trigger="click"
                     teleported
                     placement="bottom-start"
                     :hide-on-click="false"
                     style="padding-left: 12px"
                     v-if="showColumnsType === 'checkbox'">
          <el-button circle icon="Menu" />
          <template #dropdown>
            <el-dropdown-menu>
              <el-checkbox class="check-all" :indeterminate="allIndeterminate" :checked="!allIndeterminate" @change="checkboxChange($event, {prop: 'all'})" label="全选" />
             <div class="column-check">
               <template v-for="item in columns" :key="item.prop">
                 <el-dropdown-item>
                   <el-checkbox v-model="item.visible" @change="checkboxChange($event, item)" :label="item.label" />
                 </el-dropdown-item>
               </template>
             </div>

            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-tooltip>
    </el-row>
    <el-dialog :title="title" v-model="open" append-to-body>
      <el-transfer
        :titles="['显示', '隐藏']"
        v-model="value"
        :data="columns"
        @change="dataChange"
      ></el-transfer>
    </el-dialog>
  </div>
</template>

<script setup>
const columns = defineModel('columns');

const props = defineProps({
  /* 是否显示检索条件 */
  showSearch: {
    type: Boolean,
    default: true,
  },
  // /* 显隐列信息 */
  // columns: {
  //   type: Array,
  // },
  /* 是否显示检索图标 */
  search: {
    type: Boolean,
    default: true,
  },
  /* 显隐列类型（transfer穿梭框、checkbox复选框） */
  showColumnsType: {
    type: String,
    default: "checkbox",
  },
  /* 右外边距 */
  gutter: {
    type: Number,
    default: 10,
  },
})

const emits = defineEmits(['update:showSearch', 'queryTable', 'setColumnVisible']);

// 显隐数据
const value = ref([]);
// 弹出层标题
const title = ref("显示/隐藏");
// 是否显示弹出层
const open = ref(false);
const allCheck = ref(true);

const style = computed(() => {
  const ret = {};
  if (props.gutter) {
    ret.marginRight = `${props.gutter / 2}px`;
  }
  return ret;
});

const allIndeterminate = computed(()=> {
  return columns.value.some(e=> !e.visible)
})

// 搜索
function toggleSearch() {
  emits("update:showSearch", !props.showSearch);
}

// 刷新
function refresh() {
  emits("queryTable");
}

// 右侧列表元素变化
function dataChange(data) {
  for (let item in props.columns) {
    const key = props.columns[item].key;
    props.columns[item].visible = !data.includes(key);
  }
}

// 打开显隐列dialog
function showColumn() {
  open.value = true;
}

if (props.showColumnsType === 'transfer') {
  // 显隐列初始默认隐藏列
  for (let item in props.columns) {
    if (props.columns[item].visible === false) {
      value.value.push(parseInt(item));
    }
  }
}

// 勾选
function checkboxChange(visible, item) {
  item.visible = visible
  if(item.prop === 'all') {
    console.log(visible)
    columns.value.forEach(e=> e.visible = visible)
    console.log(columns.value)
  }
  emits('setColumnVisible')
  // props.columns.filter(item => item.label === label)[0].visible = event;
}

</script>

<style lang='scss' scoped>
:deep(.el-transfer__button) {
  border-radius: 50%;
  display: block;
  margin-left: 0;
}
:deep(.el-transfer__button:first-child) {
  margin-bottom: 10px;
}
:deep(.el-dropdown-menu__item) {
  line-height: 30px;
  padding: 0 17px;
}
.check-all {
  padding-left: 17px;
  position: absolute;
  top: 0;
}
.el-dropdown-menu {
  position: relative;
  padding-top: 30px;
  overflow: hidden;
  .column-check {
    overflow-y: auto;
    max-height: 600px;

  }
}
</style>
