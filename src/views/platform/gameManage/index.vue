<template>
  <div class="game-manage">
<!--    <el-card shadow="always" class="top-card">-->
<!--      <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch">-->
<!--        <el-form-item label="ID" prop="id">-->
<!--          <el-input-->
<!--              v-model="queryParams.id"-->
<!--              placeholder="请输入ID搜索"-->
<!--              clearable-->
<!--              style="width: 200px"-->
<!--              @keyup.enter="handleQuery"-->
<!--          />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="名称" prop="name">-->
<!--          <el-input-->
<!--              v-model="queryParams.name"-->
<!--              placeholder="请输入名称搜索"-->
<!--              clearable-->
<!--              style="width: 200px"-->
<!--              @keyup.enter="handleQuery"-->
<!--          />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="包名" prop="packageName">-->
<!--          <el-input-->
<!--              v-model="queryParams.packageName"-->
<!--              placeholder="请输入包名搜索"-->
<!--              clearable-->
<!--              style="width: 200px"-->
<!--              @keyup.enter="handleQuery"-->
<!--          />-->
<!--        </el-form-item>-->
<!--        <el-form-item>-->
<!--          <el-button type="primary" round icon="Search" @click="handleQuery">搜索</el-button>-->
<!--          <el-button type="warning" round icon="Refresh" @click="resetQuery">重置</el-button>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--      <el-row :gutter="10" class="mb8">-->
<!--        <el-col :span="1.5">-->
<!--          <el-button-->
<!--              type="primary"-->
<!--              plain-->
<!--              icon="Plus"-->
<!--              @click="handleAdd"-->
<!--          >新增-->
<!--          </el-button>-->
<!--        </el-col>-->
<!--        <el-col :span="1.5">-->
<!--          <el-button-->
<!--              type="primary"-->
<!--              plain-->
<!--              icon="Sort"-->
<!--              @click="toggleExpandAll"-->
<!--          >展开/折叠-->
<!--          </el-button>-->
<!--        </el-col>-->
<!--        <el-col :span="1.5">-->
<!--          <el-button-->
<!--              type="primary"-->
<!--              plain-->
<!--              icon="Sort"-->
<!--              @click="toggleExpandAll"-->
<!--          >更新缓存-->
<!--          </el-button>-->
<!--        </el-col>-->
<!--        <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>-->
<!--      </el-row>-->
<!--    </el-card>-->
<!--    <el-card shadow="always" class="bottom-card">-->
      <basic-table :options="options"
                   row-key="id"
                   :indent="32"
                   :tableColumn="tableColumn"
                   :searchBtnList="searchBtnList"
                   :tree-props="{ children: 'childGames'}"
                   :default-expand-all="isExpandAll"
                   @handleSearchBtn="handleSearchBtn"
                   v-model:searchFormList="searchFormList">
        <template #status="scope">
          <el-tag :type="getTagType(scope.row.status) || 'primary'" effect="dark">
            {{ getStatusName(scope.row.status) }}
          </el-tag>
        </template>
                  <template #payable="scope">
                    <el-tag :type="getTagType(scope.row.payable)" effect="dark">{{ getPayName(scope.row.payable) }}</el-tag>
                  </template>
      </basic-table>

<!--      <el-table-->
<!--          v-if="refreshTable"-->
<!--          v-loading="loading"-->
<!--          :data="menuList"-->
<!--          row-key="id"-->
<!--          :indent="32"-->
<!--          max-height="500px"-->
<!--          :default-expand-all="isExpandAll"-->
<!--          :tree-props="{ children: 'childGames'}">-->
<!--        <el-table-column prop="id" label="ID" width="150"></el-table-column>-->
<!--        <el-table-column prop="name" label="名称"></el-table-column>-->
<!--        <el-table-column prop="alias" label="别名"></el-table-column>-->
<!--        <el-table-column prop="appPack" label="包名" :show-overflow-tooltip="true"></el-table-column>-->
<!--        <el-table-column prop="status" label="状态" align="=center" width="100">-->
<!--        </el-table-column>-->
<!--        <el-table-column prop="status" label="充值" align="center" width="150">-->
<!--        </el-table-column>-->
<!--        <el-table-column label="排序" align="center" prop="views" width="120"></el-table-column>-->
<!--        <el-table-column label="操作" align="center" width="360" class-name="small-padding fixed-width">-->
<!--          <template #default="scope">-->
<!--            <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)">编辑</el-button>-->
<!--            <el-button link type="primary" icon="Monitor" @click="handleAdd(scope.row)">服务器</el-button>-->
<!--            <el-button link type="primary" icon="Briefcase" @click="handleConfig(scope.row)">SDK配置</el-button>-->
<!--            <el-button link type="primary" icon="Plus" @click="addServer(scope.row)">添加服务器</el-button>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--      </el-table>-->
<!--    </el-card>-->
<!--    <pagination-->
<!--        v-show="total > 0"-->
<!--        :total="total"-->
<!--        v-model:page="queryParams.currentPage"-->
<!--        v-model:limit="queryParams.pageSize"-->
<!--        @pagination="getList"-->
<!--    />-->
    <basic-form-dialog
        ref="basicFormDialog"
        :rules="rules"
        :formOptions="formOptions"
        @submit-form="submitForm"
        v-model:show="showDialog"
        v-model:modelFormArray="modelFormArray">
      <template #parent>
        <el-checkbox
            :value="slotForm.extendServer"
            name="type"
            true-value="1"
            false-value="0"
            style="margin-left: 12px;">
          继承父游戏
        </el-checkbox>
      </template>
    </basic-form-dialog>
    <basic-form-drawer
        :formOptions="sdkOptions"
        v-model:show="showDrawer"
        v-model:modelFormArray="sdkFormArray">
      <template #version>
        <el-input
            :value="slotForm.version"
            name="type"
            placeholder="例：1.0.1，不填则为默认版本"
            style="margin: 0 12px;width: 240px">
          继承父游戏
        </el-input>
        <el-button> 添加新版本 </el-button>
      </template>
    </basic-form-drawer>
  </div>
</template>

<script setup name="gameManage">
import _cloneDeep from 'lodash.clonedeep'
import {formArray, basicForm, sdkFormArr} from './data.js'
import {getGameList, getGameDetail, updateGame, addGame} from "@/api/platform/gameManage.js";
import SvgIcon from "@/components/SvgIcon/index.vue";
import IconSelect from "@/components/IconSelect/index.vue";
import BasicTable from '@/components/BasicTable'
import BasicFormDialog from '@/components/BasicFormDialog/index.vue'
import BasicFormDrawer from '@/components/BasicFormDrawer/index.vue'
import {getComprehensiveList} from "@/api/recharge/comprehensive .js";
import dayjs from "dayjs";
import {terminal} from "@/constant/select.js";

const {proxy} = getCurrentInstance();

const total = ref(0);
const menuList = ref([]);
const loading = ref(false);
const showSearch = ref(true);
const showDialog = ref(false);
const showDrawer = ref(false);
const title = ref("编辑游戏");
const formOptions = ref({
  refName: 'gameRef',
  title: '新增游戏'
});
const sdkOptions = ref({
  title: 'SDK配置',
  labelWidth: '180px',
  labelPosition: 'left'
});
const isExpandAll = ref(false);
const modelFormArray = ref(_cloneDeep(formArray));
const sdkFormArray = ref(_cloneDeep(sdkFormArr));

const options = {
  showPagination: true,
  getDataMethod: getGameList,
  getDataParams: {
    id: null,
    currentPage: 0,
    domain: "chituhuyu.com",
    pageSize: 10,
    packageName: "",
    name: ""
  }
}
const tableColumn = ref([
  {
    prop: 'id',
    label: 'ID',
    width: 150
  },
  {
    prop: 'name',
    label: '名称',
  },
  {
    prop: 'alias',
    label: '别名',
  },
  {
    prop: 'appPack',
    label: '包名',
  },
  {
    prop: 'status',
    label: '状态',
    width: 100,
    useSlot: true
  },
  {
    prop: 'payable',
    label: '充值',
    width: 150,
    useSlot: true
  },
  {
    prop: 'tableHandle',
    label: '操作',
    useSlot: true,
    width: 360,
    handleBtnList: []
  }
])
const searchFormList = ref([
  {
    key: 'id',
    label: 'ID',
    value: ''
  },
  {
    key: 'name',
    label: '名称',
    value: ''
  },
  {
    key: 'packageName',
    label: '包名',
    value: ''
  }
  ])
const searchBtnList = ref([
  {
    label: '新增',
    type: 'add',
    noSearch: true // 点击不需要搜索
  },
  {
    label: '展开/折叠',
    type: 'openOrRetract',
    noSearch: true
  }
])

const getStatusName = computed(() => {
  return function (status) {
    return status === 0 ? '关' : status === 1 ? '开' : '测试'
  }
})

const getTagType = computed(() => {
  return function (status) {
    return status === 0 ? 'danger' : status === 1 ? 'success' : 'primary'
  }
})

const getPayName = computed(() => {
  return function (status) {
    return status === 0 ? '不可充值' : status === 1 ? '可充值' : '测试'
  }
})

const data = reactive({
  form: _cloneDeep(basicForm),
  slotForm: {
    version: '',
    extendServer: false
  },
  queryParams: {
    id: null,
    currentPage: 0,
    domain: "chituhuyu.com",
    pageSize: 10,
    packageName: "",
    name: ""
  },
  rules: {
    platform: [{required: true, message: "游戏平台不能为空", trigger: "blur"}],
    name: [{required: true, message: "游戏名称不能为空", trigger: ['blur', 'select']}],
  },
});

const {queryParams, form, rules, slotForm} = toRefs(data);

/** 查询菜单列表 */
function getList() {
  loading.value = true;
  menuList.value = []
  getGameList(queryParams.value).then(response => {
    total.value = response.page.total;
    menuList.value = response.data
    loading.value = false;
  });
}

/** 取消按钮 */
function cancel() {
  showDialog.value = false;
  reset();
}

/** 表单重置 */
function reset() {
  modelFormArray.value = _cloneDeep(formArray)
  form.value = _cloneDeep(basicForm);
}

/** 搜索按钮操作 */
function handleQuery() {
  getList();
}

/** 新增按钮操作 */
function handleAdd() {
  reset();
  showDialog.value = true;
  title.value = "添加游戏";
}

const handleConfig = () => {
  showDrawer.value = true
}

const addServer = () => {

}

/** 修改按钮操作 */
async function handleUpdate(row) {
  reset();
  getGameDetail(row.id).then(res => {
    form.value = res.data || {};
    const objKeys = Object.keys(res?.data)
    const objConfigKeys = Object.keys(res?.data?.gameConfig)
    modelFormArray.value.forEach(e => {
      if (objKeys.includes(e.key)) e.value = res.data[e.key]
      // 同样的值就覆盖 gameConfig里面有与外层一样的字段
      if (objConfigKeys.includes(e.key)) e.value = res.data?.gameConfig[e.key]
    })
    formOptions.value.title = "编辑游戏";
    showDialog.value = true;
  });
}

/** 提交按钮 */
function submitForm() {
  if (formOptions.value.title === '编辑游戏') {
    handleParams()
    updateGame(form.value).then(res => {
      if (res.status === 200) {
        proxy.$modal.msgSuccess("修改成功");
        showDialog.value = false;
        getList();
      }
    });
  } else {
    handleParams()
    const data = _cloneDeep(form.value)
    console.log(form.value)
    // addGame(data).then(res => {
    //   if (res.status === 200) {
    //     proxy.$modal.msgSuccess("新增成功");
    //     showDialog.value = false;
    //     getList();
    //   }
    // });
  }
}

/**
 * 处理参数，接口参数有点特殊
 */
const handleParams = () => {
  const objKeys = Object.keys(form.value)
  const objConfigKeys = Object.keys(form.value?.gameConfig)
  modelFormArray.value.forEach(e => {
    if (objKeys.includes(e.key)) form.value[e.key] = e.value
    // 同样的值就覆盖 gameConfig里面有与外层一样的字段
    if (objConfigKeys.includes(e.key)) form.value.gameConfig[e.key] = e.value
  })
  console.log(form.value)
}

const handleSearchBtn = (btn) => {
  if(btn.type === 'add') {
    handleAdd()
  }
}

</script>
<style lang="scss" scoped>

.app-container {
  height: 100%;

  .top-card {

  }

  .bottom-card {
    margin-top: 20px;
    overflow-y: auto;
  }
}

.pagination-container {
  //position: absolute;
  //right: 30px;
  //bottom: 60px;
}
</style>
<style lang="scss">
.el-table__expand-icon > .el-icon {
  display: none !important;
}

.el-table__expand-icon {
  transform: scale(1.4);
  float: left;
  margin-top: 6px;
  content: url('../../../assets/images/expand.png') !important
}

.el-table__expand-icon--expanded {
  transform: scale(1.4);
  float: left;
  margin-top: 5px;
  content: url('../../../assets/images/retract.png') !important
}
</style>