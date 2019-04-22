<template>
  <el-form-item
    :label="json.label"
    :class="{'json-form-elm': true, 'is-required': json.required }">
    <component
      :is="json.name"
      v-bind="ui"
      v-model="data"
      @input="handleInput"
      @blur="handleBlur"></component>
    <div class="json-form-elm_error-msg" v-if="bluredErrMsg || inputErrMsg">{{ bluredErrMsg || inputErrMsg }}</div>
  </el-form-item>
</template>

<script>
import JsonFormElmGroup from '@/components/json-form-elm-group.vue'
import { isPlainObj, isRegExp } from '@/utils/util.js'

export default {
  name: 'JsonFormElm',
  props: {
    jsonSchema: {
      type: Object,
      required: true
    },
    props: {
      type: Object,
      default: () => ({})
    },
    value: {

    },
    accept: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      json: {},
      ui: {},
      data: null,
      blured: false,
      inputed: false
    }
  },
  computed: {
    bluredErrMsg () {
      if (!this.blured) return ''

      const  { json, json: { label }, data } = this
      if (json.required && ((data === null) || data === undefined || data === '')) {
        return '请输入' + label
      }
    },
    inputErrMsg () {
      if (!this.inputed) return ''

      const  { json: { label, validator, errMsg }, data } = this

      if ((typeof validator === 'function' && !validator(data)) ||
        isRegExp(validator) && !validator.test(data)) {
        return errMsg || '请输入正确的' + label
      }
    }
  },
  watch: {
    jsonSchema: {
      immediate: true,
      handler (val) {
        this.normalize(val)
      }
    },
    uiSchema: {
      immediate: true,
      handler (val) {

      }
    },
    value: {
      immediate: true,
      handler (value) {
        this.data = value
      }
    }
  },
  components: { JsonFormElmGroup },
  methods: {
    handleBlur () {
      this.blured = true
      this.inputed = false
    },
    handleInput (value) {
      this.blured = false
      this.inputed = true
      this.$emit('input', value)
    },
    normalize () {
      const schema = this.json = { ...this.jsonSchema }
      const props = this.ui = { ...this.props }
      const { type, name } = schema
      const info = this.infer(type, name)

      schema.name = info.name

      this._padProps(props, info)
    },
    _padProps (props, info) {
      if ('type' in info) {
        props.type = info.type
      }

      if (('maxSize' in info) && !('maxSize' in props)) {
        props.maxSize = info.maxSize
      }
    },
    infer (type, name) {
      const strategy = {
        radio: () => ({ name: 'JsonFormElmGroup', type: 'radio' }),
        checkbox: () => ({ name: 'JsonFormElmGroup', type: 'checkbox' }),
        'radio-button': () => ({ name: 'JsonFormElmGroup', type: 'radio-button' }),
        'checkbox-button': () => ({ name: 'JsonFormElmGroup', type: 'checkbox-button' }),
        select: () => ({ name: 'JsonFormElmGroup', type: 'select' }),

        string: () => ({ name: 'ElInput' }),
        number: () => ({ name: 'ElInputNumber' }),
        switch: () => ({ name: 'ElSwitch', type: 'switch' }),
      }

      if (type in strategy) {
        return strategy[type]()
      } else if (name) {
        return { name }
      } else {
        throw new Error(`[ERROR]: type [${type}] is not supported, please provide name option to declare component`)
      }
    },
  }
}
</script>

<style lang="stylus" scoped>
.json-form-elm
  position relative
.json-form-elm_error-msg
  position absolute
  top 100%
  left 0
  padding-top 4px
  color #f56c6c
  line-height 1
  font-size 12px
</style>