<template>
  <el-dialog class="basic-form-dialog" :title="formOptions.title" v-model="show"
             :width="formOptions.width || '1420px'"
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
      <!--      <el-form :ref="formOptions.refName" :model="form" :rules="rules" label-width="100px">-->
      <!--        <el-row>-->
      <!--          <el-col :span="formItem.col || 12" v-for="formItem in modelFormArray" :key="formItem.key">-->
      <!--            <el-form-item :prop="formItem.key" label-width="130px">-->
      <!--              <template #label>-->
      <!--                <span :style="{lineHeight : formItem.labelLineHeight || '32px'}"-->
      <!--                      v-show="!formItem.tooltip">{{ formItem.label }}</span>-->
      <!--                <span v-show="formItem.tooltip" :style="{lineHeight : formItem.labelLineHeight || '32px'}">-->
      <!--                           <el-tooltip :content="formItem.tooltip" placement="top">-->
      <!--                              <el-icon><question-filled/></el-icon>-->
      <!--                           </el-tooltip>-->
      <!--                           {{ formItem.label }}-->
      <!--                        </span>-->
      <!--              </template>-->
      <!--              <template v-if="formItem.type === 'select'">-->
      <!--                <el-select v-model="formItem.value"-->
      <!--                           @change="changeValue($event, formItem.key)"-->
      <!--                           :placeholder="formItem.placeholder || '请选择'+ formItem.label"-->
      <!--                           clearable>-->
      <!--                  <el-option-->
      <!--                      v-for="dict in formItem.options || []"-->
      <!--                      :key="dict.value"-->
      <!--                      :label="dict.label"-->
      <!--                      :value="dict.value"-->
      <!--                  />-->
      <!--                </el-select>-->
      <!--              </template>-->
      <!--              <template v-else-if="formItem.type === 'treeSelect'">-->
      <!--                <el-tree-select-->
      <!--                    @change="changeValue($event, formItem.key)"-->
      <!--                    :style="{width : formItem.width }"-->
      <!--                    v-model="formItem.value"-->
      <!--                    :data="[]"-->
      <!--                    :render-after-expand="false"-->
      <!--                />-->
      <!--              </template>-->
      <!--              <template v-else-if="formItem.type === 'radio'">-->
      <!--                <el-radio-group v-model="formItem.value" @change="changeValue($event, formItem.key)">-->
      <!--                  <el-radio v-for="radioItem in formItem.options ||[]" :key="radioItem.value" :value="radioItem.value">-->
      <!--                    {{ radioItem.label }}-->
      <!--                  </el-radio>-->
      <!--                </el-radio-group>-->
      <!--              </template>-->
      <!--              <template v-else-if="formItem.type === 'textarea'">-->
      <!--                <el-input type="textarea"-->
      <!--                          v-model="formItem.value"-->
      <!--                          @change="changeValue($event, formItem.key)"-->
      <!--                          :placeholder="formItem.placeholder || '请输入'+ formItem.label"/>-->
      <!--              </template>-->
      <!--              <template v-else-if="formItem.type === 'buttonInput'">-->
      <!--                <el-input-->
      <!--                    v-model="formItem.value"-->
      <!--                    @change="changeValue($event, formItem.key)"-->
      <!--                    :placeholder="formItem.placeholder || '请输入'+ formItem.label">-->
      <!--                  <template #append>{{ formItem.buttonLabel }}</template>-->
      <!--                </el-input>-->
      <!--              </template>-->
      <!--              &lt;!&ndash;  不传类型默认输入框  &ndash;&gt;-->
      <!--              <template v-else>-->
      <!--                <el-input clearable-->
      <!--                          @change="changeValue($event, formItem.key)"-->
      <!--                          v-model="formItem.value"-->
      <!--                          :placeholder="formItem.placeholder || '请输入'+ formItem.label"/>-->
      <!--              </template>-->

      <!--              &lt;!&ndash; 插槽 &ndash;&gt;-->
      <!--              <slot :name="formItem.key"></slot>-->
      <!--            </el-form-item>-->
      <!--          </el-col>-->
      <!--        </el-row>-->
      <!--      </el-form>-->
    </el-card>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import BasicFormType from '../BasicTypeForm'
import {onMounted, watch} from "vue";

const {proxy} = getCurrentInstance();
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
</script>
<style scoped lang="scss">
.basic-form-dialog {
  .body-card {
    max-height: 650px;
    overflow-y: auto;
  }
}
</style>