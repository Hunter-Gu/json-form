<template>
  <el-form-item
    :label="json.label"
    :class="{'json-form-elm': true, 'is-required': json.required }"
  >
    <component
      :is="json.name"
      v-model="data"
      v-bind="ui"
      @input="handleInput"
      @blur="handleBlur"
    />
    <div v-if="bluredErrMsg || inputErrMsg" class="json-form-elm_error-msg">{{ bluredErrMsg || inputErrMsg }}</div>
  </el-form-item>
</template>

<script>
import JsonFormElmGroup from '@/components/json-form-elm-group.vue'
import { isRegExp } from '@/utils/util.js'

const strategy = {
  radio: () => ({ name: 'JsonFormElmGroup', type: 'radio' }),
  checkbox: () => ({ name: 'JsonFormElmGroup', type: 'checkbox' }),
  'radio-button': () => ({ name: 'JsonFormElmGroup', type: 'radio-button' }),
  'checkbox-button': () => ({ name: 'JsonFormElmGroup', type: 'checkbox-button' }),
  select: () => ({ name: 'JsonFormElmGroup', type: 'select' }),

  string: () => ({ name: 'ElInput' }),
  number: () => ({ name: 'ElInputNumber' }),
  switch: () => ({ name: 'ElSwitch', type: 'switch' })
}

export default {
  name: 'JsonFormElm',
  components: { JsonFormElmGroup },
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
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      json: {},
      ui: {},
      data: null,
      blured: false,
      inputed: false
    }
  },
  computed: {
    bluredErrMsg() {
      if (!this.blured) return ''

      const { json, json: { label }, data } = this
      if (json.required && ((data === null) || data === undefined || data === '')) {
        return '请输入' + label
      } else {
        return ''
      }
    },
    inputErrMsg() {
      if (!this.inputed) return ''

      const { json: { label, validator, errMsg }, data } = this

      if ((typeof validator === 'function' && !validator(data)) ||
        isRegExp(validator) && !validator.test(data)) {
        return errMsg || '请输入正确的' + label
      } else {
        return ''
      }
    }
  },
  watch: {
    jsonSchema: {
      immediate: true,
      handler(val) {
        this.normalize(val)
      }
    },
    uiSchema: {
      immediate: true,
      handler(val) {

      }
    },
    value: {
      immediate: true,
      handler(value) {
        this.data = value
      }
    }
  },
  methods: {
    handleBlur() {
      this.blured = true
      this.inputed = false
    },
    handleInput(value) {
      this.blured = false
      this.inputed = true
      this.$emit('input', value)
    },
    normalize() {
      const schema = this.json = { ...this.jsonSchema }
      const props = this.ui = { ...this.props }
      const { type, name } = schema
      const info = this.infer(type, name)

      schema.name = info.name
      this._padProps(props, info)
    },
    _padProps(props, info) {
      if ('type' in info) {
        props.type = info.type
        this._graftProps(props)
      }
    },
    _graftProps(props) {
      const exceptions = ['options', 'type']
      const graft = {}
      for (const key in props) {
        if (exceptions.indexOf(key) !== -1) continue

        graft[key] = props[key]
        delete props[key]
      }

      props.props = graft
    },
    infer(type, name) {
      if (type in strategy) {
        return strategy[type]()
      } else if (name) {
        return { name }
      } else {
        throw new Error(`[ERROR]: type [${type}] is not supported, please provide name option to declare component`)
      }
    }
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
