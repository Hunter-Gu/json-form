<template>
  <fieldset class="json-form">
    <legend>{{ jsonSchema.title }}</legend>
    <div v-for="(elmSchema, elmKey) in jsonSchema.properties" :key="elmKey">
      <JsonForm
        v-if="elmSchema.type === 'object'"
        v-model="value[elmKey]"
        :json-schema="elmSchema"
        :ui-schema="uiSchema[elmKey] || {}"
        @input="handleInput"
      />
      <el-form v-else>
        <JsonFormElm
          v-model="value[elmKey]"
          :json-schema="elmSchema"
          :props="uiSchema[elmKey]"
          @input="handleInput"
        />
      </el-form>
    </div>
  </fieldset>

</template>

<script>
import JsonFormElm from '@/components/json-form-elm.vue'

export default {
  name: 'JsonForm',
  components: { JsonFormElm },

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
  methods: {
    handleInput() {
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
