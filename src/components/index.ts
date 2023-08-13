// 引入全部的全局组件
import SvgIcon from './SvgIcon/index.vue'


import type { App, Component } from 'vue';
// 全部的组件放到一个对象里
const components: { [name: string]: Component } = { 
  SvgIcon
};
const globalComponent = {
  install(app:App) {
    Object.keys(components).forEach((key: string) => {
      // (组件的名字,组件)
      app.component(key, components[key]);
  })
  }
}

export default globalComponent