# json-form

`JsonForm` 组件是一个根据 JSON 格式， 渲染最终视图的组件， 多用于表单的渲染， 当然也是支持渲染自定义组件的。

将视图的渲染， 属性的设置， 值的同步三者分离的方式， 提供三个属性：

- `json-schema`: 用于描述视图
- `ui-schema`: 用于为视图中的组件添加样式
- `value`: 视图中的组件对应的值， 也可以是 `v-model`

## 启动工程

通过如下命令：

```shell
$ npm run doc:dev
```

可以启动文档工程， 依赖 [vuepress](https://vuepress.vuejs.org/)， 可以调用 src/ 下的组件。

除此以外， 该工程本身只带有 `webpack` 编译的功能。
