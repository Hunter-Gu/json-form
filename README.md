# json-form

A Vue component what can describe forms by json schema.

> 注： 使用该组件时， 需要全局使用 ElementUI。

```vue
<template>
  <json-form
    :json-schema="json"
    :ui-schema="ui"
    v-model="value"
  ></json-form>
</template>
<script>
export default {
  data () {
    return {
      json: { ... },
      ui: { ... },
      value: { ... }
    }
  }
}
</script>
```

## Attributes

| 参数        | 说明                           | 类型   | 可选值 | 默认值 |
| ----------- | ------------------------------ | ------ | ------ | ------ |
| json-schema | 用于生成视图 view 的 json 结构 | Object | -      | {}     |
| ui-schema   | 视图的属性                     | Object | -      | {}     |
| value       | 视图对应的值                   | Object | -      | {}     |

### json-schema

`JsonForm` 组件会根据 `json-schema` 渲染最终的视图， `json-schema` 的最基本格式如下：

```js
{
  title: 'form 的标题',
  type: 'object',
  properties: {
    upload: {

    }
  }
}
```

type 属性表示最终渲染的组件， 其映射关系如下：

| `type` 的值               | 对应的组件      |
| ------------------------- | --------------- |
| string                    | ElInput         |
| number                    | ElInputNumber   |
| radio                     | ElRadio         |
| radio-button              | ElRadio         |
| select                    | ElSelect        |
| checkbox                  | ElCheckbox      |
| checkbox-button           | ElCheckbox      |
| switch                    | ElSwitch        |

如果 `type` 的值不在上面的范围， 那么需要指定 `name` 字段来声明渲染的组件， 详见 [自定义组件类型](#custom-components)。

其中， 表示上传的组件 image, video, audio, file 还支持 clip, maxSize 和 accept 属性：

| 参数    | 说明             | 类型    | 可选值    | 默认值 |
| ------- | ---------------- | ------- | --------- | ------ |
| clip    | 是否可以复制链接 | Boolean | -         | true   |
| maxSize | 可上传的最大文件 | Number  | -         | 2M     |
| accept  | 可接受的文件类型 | String  | MIME TYPE | \*     |

#### required

通过 `required` 字段标识必填项， 在触发 `blur` 事件时会验证， 如果值为空就会展示错误信息。

```js
{
  title: 'form 的标题',
  type: 'object',
  properties: {
    upload: {
      'name': 'ElInput',
      label: '输入信息',
      required: true
    }
  }
}
```

#### validator

可以通过 validator 对最终的值进行验证， 并显示提示信息：

```js
{
  title: 'form 的标题',
  type: 'object',
  properties: {
    upload: {
      name: 'ElInput',
      label: '姓名'
      required: true
    },
    number: {
      name: 'ElInput',
      label: '年龄',
      validator (val) {
        if (val < 20) {
          return true
        } else {
          return false
        }
      },
      errMsg: '年龄必须小于 20 岁'
    },
    phone: {
      name: 'ElInput',
      label: '手机号',
      validator: /^1\d{10}$/,
      errMsg: '手机号必须以 1 开头的 11 位数字'
    }
  }
}
```

如上所示， 支持 `RegExp` 和 `Function` 类型， 如果是 `Function` 类型， 则会将当前的值作为参数。

通过 `errMsg` 字段声明错误提示， 否则使用默认的错误信息。

#### Nested

支持多层嵌套， 只需要将 `type` 声明为 'object' 即可：

```js
{
  title: 'form 的标题',
  type: 'object',
  properties: {
    persnalInfo: {
      type: 'object',
      title: '个人信息',
      properties: {
        name: {
          type: 'string',
          label: '姓名',
        },
        record: {
          type: 'object',
          title: '履历',
          properties: {
            primary: {
              label: '小学',
              type: 'string'
            },
            middle: {
              label: '中学',
              type: 'string'
            }
          }
        }
      }
    }
  }
}
```

### ui-schema

对应于视图中组件的 `props`， 需要和 `json-schema` 中的 `properties` 的 key 值对应。

**在使用 `type` 为 `radio`, `radio-button`, `select`, `checkbox`, `checkbox-button` 其中之一的值时， 一定要通过该属性声明 options 选项**：

```js
// json-schema
{
  type: 'object',
  title: '下拉选项',
  properties: {
    select: {
      type: 'select',
      label: '选择'
    }
  }
}
```

```js
// ui-schema
{
  select: {
    options: [
      {
        label: '选项 1',
        value: 1
      },
      {
        label: '选项 2',
        value: 2
      }
    ];
  }
}
```

甚至可以利用该属性来声明 `style`：

```js
{
  select: {
    style: {
      background: 'red';
    }
  }
}
```

### value

对应视图中组件的 value， 同样需要和 json-schema 中的 key 值对应。

**在 `type` 为 `checkbox`, `checkbox-button` 的情况时， 一定要注意其值必须声明， 并且为数组**， 否则无法通过 `v-model` 实现绑定：

```js
// json-schema
{
  type: 'object',
  title: '下拉选项',
  properties: {
    select: {
      type: 'select',
      label: '选择'
    }
  }
}
```

```js
// value
{
  select: [];
}
```

### custom components

在通过 `type` 内置的组件无法满足所有需求时， 可以通过 `name` 字段声明使用自定义组件， 但是**目标组件必须注册为全局组件**。

在编写自动以组件时， 必须满足一下规则：

- 自定义组件必须提供 `value` props， 以表示组件的值；
- 必须 emit `input` 事件， 因为最终的值会通过 `v-model` + `input` 一层层向上派发， 并且在对值进行验证时， 也需要用到这一事件；
- 通过 emit `blur` 事件， 在触发时对值的必填进行验证。

在使用自定义组件时， 很可能需要额外的 `props`， 这时候可以通过 `ui-schema` 进行 props 的声明：

```js
// json-schema
{
  title: '使用自定义组件',
  type: 'object',
  properties: {
    custom: {
      name: '{自定义组件的名字}',
      label: '自定义组件'
    }
  }
}
```

```js
// ui-schema
{
  custom: {
    props1: ...,
    props2: ...
  }
}
```
