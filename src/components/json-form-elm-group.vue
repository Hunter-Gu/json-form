<template>
  <div class="json-form-elm-group">
    <el-radio-group v-if="type === 'radio'" v-model="data" @input="handleInput" @blur="handleBlur" v-bind="props">
      <el-radio v-for="option in graftOptions" :key="option.value" :label="option.value" border="border" v-bind="option.props">{{ option.label }}</el-radio>
    </el-radio-group>
    <el-radio-group v-else-if="type === 'radio-button'" v-model="data" @input="handleInput" @blur="handleBlur" v-bind="props">
      <el-radio-button v-for="option in graftOptions" :key="option.value" :label="option.label" v-bind="option.props"></el-radio-button>
    </el-radio-group>
    <el-checkbox-group v-else-if="type === 'checkbox'" v-model="data" @input="handleInput" @blur="handleBlur" v-bind="props">
      <el-checkbox v-for="option in graftOptions" :key="option.value" :label="option.label" border="border" v-bind="option.props">{{ option.label }}</el-checkbox>
    </el-checkbox-group>
    <el-checkbox-group v-else-if="type === 'checkbox-button'" v-model="data" @input="handleInput" @blur="handleBlur" v-bind="props">
      <el-checkbox-button v-for="option in graftOptions" :key="option.value" :label="option.label" v-bind="option.props">{{ option.label }}</el-checkbox-button>
    </el-checkbox-group>
    <el-select v-else-if="type === 'select'" v-model="data" @change="handleInput" @blur="handleBlur" v-bind="props">
      <el-option v-for="option in graftOptions" :key="option.value" :label="option.label" :value="option.value" v-bind="option.props"></el-option>
    </el-select>
  </div>
</template>

<script>
import { isPlainObj } from '@/utils/util.js'

export default {
  name: 'JsonFormElmGroup',
  props: {
    options: {
      type: Array,
      required: true
    },
    props: {
      type: Object,
      default: () => ({})
    },
    type: {
      type: String,
      required: true,
      validator (value) {
        return ['select', 'checkbox', 'checkbox-button', 'radio', 'radio-button'].indexOf(value) > -1
      }
    },
    value: {}
  },
  data () {
    return {
      data: null
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (value) {
        if (this.filter) {
          this.data = this._handleValue(value)
        } else {
          this.data = value
        }
      }
    },
  },
  computed: {
    filter () {
      const list = ['radio-button', 'checkbox', 'checkbox-button']

      return list.indexOf(this.type) > -1
    },
    filterArray () {
      const list = ['checkbox', 'checkbox-button']

      return list.indexOf(this.type) > -1
    },
    graftOptions() {
      const exceptions = ['label', 'value']

      return this.options.map(option => {
        const graft = { props: {} }
        for (const key in option) {
          const value = option[key]
          if (exceptions.indexOf(key) === -1) {
            graft.props[key] = value
          } else {
            graft[key] = value
          }
        }
        return graft
      })
    }
  },
  methods: {
    _handleValue (value) {
      if (this.filterArray) {
        if (!Array.isArray(value)) {
          throw new Error('[ERROR]: the value of type checkbox or checkbox-button must be array')
        }
        return this._pickFromArray(this.options, value, 'value', 'label')
      } else {
        return this._findFromArray(this.options, value, 'value', 'label')
      }
    },
    handleInput (value) {
      if (this.filter) {
        this._handleFilterInput(value)
      } else {
        this.$emit('input', value)
      }
    },
    _handleFilterInput (label) {
      let value = null

      if (this.filterArray) {
        value = this._pickFromArray(this.options, label, 'label', 'value')
      } else {
        value = this._findFromArray(this.options, label, 'label', 'value')
      }

      this.$emit('input', value)
    },
    _findFromArray (options, target, key, targetKey) {
      let find = null
      options.some(option => {
        const result = option[key] === target
        if (result) {
          find = option[targetKey || key]
        }
        return result
      })

      return find
    },
    _pickFromArray (options, target, key, targetKey) {
      const picks = []
      options.forEach(option => {
        if (target.indexOf(option[key]) > -1) {
          picks.push(option[targetKey || key])
        }
      })

      return picks
    },
    handleBlur () {
      this.$emit('blur', ...arguments)
    },
    needFilter (type = this.type) {
      const list = ['radio-button', 'checkbox']

      return list.indexOf(type) > -1
    }
  }
}
</script>
