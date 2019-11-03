<template>
  <div class="simple-demo">
    <JsonForm :json-schema="jsonSchema" v-model="value"/>
  </div>
</template>

<script>
export default {
  name: 'SimpleDemo',
  data() {
    return {
      jsonSchema: {
        title: '基本用法',
        type: 'object',
        properties: {
          name: {
            label: '姓名',
            type: 'string'
          },
          grade: {
            label: '班级',
            type: 'string'
          },
          age: {
            label: '年龄',
            type: 'number'
          }
        }
      },
      value: {}
    }
  },
}
</script>
