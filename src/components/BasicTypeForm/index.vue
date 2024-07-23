
<template>
  <el-form :ref="formOptions.refName" :model="form" :rules="rules" :label-position="formOptions.labelPosition || 'right'">
    <el-row>
      <el-col :span="formItem.col || 12" v-for="formItem in modelFormArray" :key="formItem.key">
        <el-form-item :prop="formItem.key" :label-width="formOptions.labelWidth || '130px'" >
          <template #label>
                <span :style="{lineHeight : formItem.labelLineHeight || '32px'}"
                      v-show="!formItem.tooltip">{{ formItem.label }}</span>
            <span v-show="formItem.tooltip" :style="{lineHeight : formItem.labelLineHeight || '32px'}">
                           <el-tooltip :content="formItem.tooltip" placement="top">
                              <el-icon><question-filled/></el-icon>
                           </el-tooltip>
                           {{ formItem.label }}
                        </span>
          </template>
          <template v-if="formItem.type === 'select'">
            <el-select v-model="formItem.value"
                       :style="{width : formItem.width }"
                       @change="changeValue($event, formItem.key)"
                       :placeholder="formItem.placeholder || '请选择'+ formItem.label"
                       clearable>
              <el-option
                  v-for="dict in formItem.options || []"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
              />
            </el-select>
          </template>
          <template v-else-if="formItem.type === 'treeSelect'">
            <el-tree-select
                @check="(nodes,keys,halfNodes,halfKeys) => (changeTreeValue(nodes,keys,halfNodes,halfKeys ,formItem.key))"
                :style="{width : formItem.width }"
                v-model="formItem.value"
                :data="[]"
                :render-after-expand="false"
            />
          </template>
          <template v-else-if="formItem.type === 'radio'">
            <el-radio-group v-model="formItem.value" @change="changeValue($event, formItem.key)">
              <el-radio v-for="radioItem in formItem.options ||[]" :key="radioItem.value" :value="radioItem.value">
                {{ radioItem.label }}
              </el-radio>
            </el-radio-group>
          </template>
          <template v-else-if="formItem.type === 'textarea'">
            <el-input type="textarea"
                      v-model="formItem.value"
                      @change="changeValue($event, formItem.key)"
                      :placeholder="formItem.placeholder || '请输入'+ formItem.label"/>
          </template>
          <template v-else-if="formItem.type === 'buttonInput'">
            <el-input
                v-model="formItem.value"
                @change="changeValue($event, formItem.key)"
                :placeholder="formItem.placeholder || '请输入'+ formItem.label">
              <template #append>{{ formItem.buttonLabel }}</template>
            </el-input>
          </template>
          <!--  不传类型默认输入框  -->
          <template v-else>
            <el-input clearable
                      @change="changeValue($event, formItem.key)"
                      v-model="formItem.value"
                      :placeholder="formItem.placeholder || '请输入'+ formItem.label"/>
          </template>

          <!-- 插槽 -->
          <slot v-bind="formItem"></slot>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script setup name="basicFormType">
import {watch} from "vue";
import _ from "lodash";
const {proxy} = getCurrentInstance();

const form = ref({})
const modelFormArray = defineModel('modelFormArray', {type: Array})
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
  show: {
    type: Boolean,
    default: false
  }
})

watch(() => props.show, (status) => {
  if (status) {
    // 重置表单
    form.value = {}
    proxy.resetForm(props.formOptions.refName);
    // 设置form的key 用于校验
    nextTick(() => {
      modelFormArray.value.forEach(e => {
        form.value[e.key] = e.value
      })
    })
  }
}, {immediate: true})

const changeValue = (value, key) => {
  form.value[key] = value
}

const changeTreeValue = (nodes, keys, halfNodes, halfKeys, key) => {
  form.value[key] = keys.checkedKeys
}

</script>
<style scoped lang="scss">

</style>