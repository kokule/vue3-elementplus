<template>
  <el-drawer class="basic-form-drawer"
             :title="formOptions.title"
             v-model="show"
             direction="rtl"
             :size="formOptions.szie || '90%'"
             append-to-body>
    <el-card shadow="always" class="body-card">
      <basic-form-type
          ref="basicFormType"
          :rules="rules"
          :show="show"
          :form-options="formOptions"
          v-model:modelFormArray="modelFormArray">
        <template #default="data">
          <slot :name="data.key"></slot>
        </template>
      </basic-form-type>
    </el-card>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </template>
  </el-drawer>
</template>
<script setup>

import {onMounted, watch} from "vue";
import BasicFormType from "@/components/BasicTypeForm/index.vue";

const {proxy} = getCurrentInstance();

const form = ref({})

// 双向绑定值
const show = defineModel('show', {default: false})
/**
 * key - 要绑定的值
 * type-表单类型（不传默认为input,select、treeSelect, textarea、buttonInput）
 * label 表单名称
 * tooltip 提示
 * col 数字 占行宽  0-24 之间  12为一半
 * buttonLabel 类型buttonInput时，按钮的名称
 * labelLineHeight label的lineHeight, 表单名称太长可设置小一点
 * @type {ModelRef<any[] | undefined, string>}
 */
const modelFormArray = defineModel('modelFormArray', {type: Array})

const emit = defineEmits(['submitForm'])

const props = defineProps({
  formOptions: {
    type: Object,
    default: {
      open: true,
      title: '窗口'
    }
  },
  rules: {
    type: Object,
    default: {}
  },
})

const submitForm = () => {
  proxy.$refs.basicFormType.$refs[props.formOptions.refName].validate(valid => {
    if (valid) {
      emit('submitForm')
    }
  })
}

const cancel = () => {
  show.value = false
}

const changeValue = (value, key) => {
  form.value[key] = value
}
</script>
<style lang="scss">
.basic-form-drawer {
  .el-drawer__header {
    margin-bottom: 0 !important;
  }
}
</style>