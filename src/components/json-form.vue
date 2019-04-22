<template>
  <fieldset class="json-form">
    <legend>{{ jsonSchema.title }}</legend>
    <div v-for="(elmSchema, elmKey) in jsonSchema.properties" :key="elmKey">
      <JsonForm
        v-if="elmSchema.type === 'object'"
        :json-schema="elmSchema"
        :ui-schema="uiSchema[elmKey] || {}"
        @input="handleInput" v-model="value[elmKey]"></JsonForm>
      <el-form v-else>
        <JsonFormElm
          :json-schema="elmSchema"
          :props="uiSchema[elmKey]"
          @input="handleInput"
          v-model="value[elmKey]"></JsonFormElm>
      </el-form>
    </div>
  </fieldset>

</template>

<script>
import JsonFormElm from '@/components/json-form-elm.vue'

export default {
  name: 'JsonForm',

  props: {
    jsonSchema: {
      type: Object,
      required: true
    },
    uiSchema: {
      type: Object,
      default: () => ({})
    },
    value: {
      type: Object,
      default: () => ({})
    }
  },
  components: { JsonFormElm },
  methods: {
    handleInput () {
      this.$emit('input', this.value)
    }
  }
}
</script>

<style scoped lang="stylus">
.json-form
  width 33.333%
  border none
  box-sizing border-box
  padding 0 20px
  .json-form
    width 100%
    padding 0

legend
  display block
  width 100%
  padding 0
  margin-bottom 20px
  font-size 21px
  color #606266
  border 0
  border-bottom 1px solid #e5e5e5
</style>
