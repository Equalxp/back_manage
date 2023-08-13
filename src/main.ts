import { createApp } from 'vue'
import App from './App.vue'

// element-plus插件和样式
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
//@ts-ignore 忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
//svg插件需要配置代码
import 'virtual:svg-icons-register'
//全局组件注册
import globalComponent from '@/components'
//引入模板的全局的样式
import '@/styles/index.scss'
//引入路由
import router from './router'
//引入仓库
import pinia from './store'

const app = createApp(App)
//注册模板路由
app.use(router)
app.use(pinia)
app.use(globalComponent)
app.use(ElementPlus, {
  locale: zhCn
})
app.mount('#app')
