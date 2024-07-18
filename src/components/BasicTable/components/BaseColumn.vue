<!-- 没有用递归组件是因为 element表格组件 多级表头识别不出 目前支持3级 应该满足大部分需求 -->
<template>
  <el-table-column
      v-for="column in tableColumn"
      :key="column.prop"
      :prop="column.prop"
      :sortable="column.sortable"
      :align="column.align"
      :fixed="column.fixed"
      :label="column.label"
      :show-overflow-tooltip="column.showTooltip"
      :width="column.width">
    <el-table-column
        v-if="column.children"
        v-for="level1 in column.children || []"
        :key="level1.prop"
        :prop="level1.prop"
        :sortable="level1.sortable"
        :align="level1.align"
        :fixed="level1.fixed"
        :label="level1.label"
        :show-overflow-tooltip="level1.showTooltip"
        :width="level1.width">
      <el-table-column
          v-if="level1.children"
          v-for="level2 in level1.children || []"
          :key="level2.prop"
          :prop="level2.prop"
          :sortable="level2.sortable"
          :align="level2.align"
          :fixed="level2.fixed"
          :label="level2.label"
          :show-overflow-tooltip="level2.showTooltip"
          :width="level2.width">
        <el-table-column
            v-if="level2.children"
            v-for="level3 in level2.children || []"
            :key="level3.prop"
            :prop="level3.prop"
            :sortable="level3.sortable"
            :align="level3.align"
            :fixed="level3.fixed"
            :label="level3.label"
            :show-overflow-tooltip="level3.showTooltip"
            :width="level3.width">
        </el-table-column>
      </el-table-column>
    </el-table-column>
  </el-table-column>
</template>
<script setup name="basicColumn">
const props = defineProps({
  tableColumn: Array
})
</script>