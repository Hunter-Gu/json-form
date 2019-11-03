<template>
  <div class="radio-checbox-select-demo">
    <JsonForm :json-schema="jsonSchema" :ui-schema="ui" v-model="value"/>
  </div>
</template>

<script>
export default {
  name: 'RadioChecboxSelectDemo',
  data() {
    return {
      jsonSchema: {
        title: 'Radio && Checkbox && Select',
        type: 'object',
        properties: {
          edu: {
            label: '学历',
            type: 'select'
          },
          sex: {
            label: '性别',
            type: 'radio'
          },
          hobbies: {
            label: '爱好',
            type: 'checkbox'
          }
        }
      },
      ui: {
        edu: {
          options: [{
            label: '小学',
            value: 'primary'
          }, {
            label: '初中',
            value: 'junior'
          }, {
            label: '高中',
            value: 'senior'
          }, {
            label: '大学',
            value: 'university'
          }, {
            label: '更高学历',
            value: 'higher'
          }],
          multiple: true
        },
        sex: {
          options: [{
            label: '男',
            value: 'man'
          }, {
            label: '女',
            value: 'woman'
          }, {
            label: '保密',
            value: 'secret'
          }]
        },
        hobbies: {
          options: [{
            label: '购物',
            value: 'shopping',
            disabled: true
          }, {
            label: '运动',
            value: 'sports'
          }, {
            label: '上网',
            value: 'surfing Internet'
          }, {
            label: '烹饪',
            value: 'cooking'
          }, {
            label: '更多',
            value: 'more'
          }]
        }
      },
      value: {
        hobbies: []
      }
    }
  }
}
</script>

<style scoped>
.radio-checbox-select-demo > .json-form {
  width: 100%;
}
</style>
