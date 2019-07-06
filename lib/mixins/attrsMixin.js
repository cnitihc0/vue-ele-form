// 专门为了获取 attrs
export default {
  computed: {
    // 获取组件名, 将组件转为 kebab-case
    componentName () {
      let name = this.$options.name
      name = name
        .replace('EleForm', '')
        .replace(/[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g, function (match) {
          match = '-' + match.toLowerCase()
          return match
        })
      return name.slice(1)
    },
    // 判断是否为上传组件
    isUploadComponent () {
      const arr = ['image', 'video', 'rich-text']
      return arr.includes(this.componentName)
    },
    // 全局属性
    globalAttrs () {
      return this.$EleFormParams || {}
    },
    // 全局上传组件属性
    globalUploadAttrs () {
      return this.globalAttrs.upload || {}
    },
    // 全局组件属性
    globalComponentAttrs () {
      if (this.isUploadComponent) {
        return Object.assign(
          {},
          this.globalUploadAttrs,
          this.globalAttrs[this.componentName]
        )
      } else {
        return this.globalAttrs[this.componentName]
      }
    },
    // 属性
    attrs () {
      return Object.assign({}, this.globalComponentAttrs, this.desc.attrs)
    }
  }
}