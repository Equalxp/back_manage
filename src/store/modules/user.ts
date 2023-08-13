//user的小仓库
import { defineStore } from "pinia";
//引入数据类型
import type { loginFormData,loginResponseData } from "@/api/user/type";
import type { UserState } from "./type/type.ts";
//引入接口
import { reqLogin } from "@/api/user";
//引入操作本地存储的工具方法
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
// 创建小仓库
let useUserStore = defineStore('User', {
  // 小仓库存储数据
  state: ():UserState => {
    return {
      // 用户唯一标示
      token: GET_TOKEN()
    }
  },
  // 异步｜逻辑
  actions: {
    // 用户登录的方法
    async userLogin(data:loginFormData) {
      const res:loginResponseData = await reqLogin(data)
      // console.log('333',res);
      if(res.code === 200) {
        this.token = res.data.token
        // 本地存储持久化
        SET_TOKEN(res.data.token)
        return 'ok' // 返回一个成功的promise
      } else {
        return Promise.reject(new Error(res.data.message))
      }
    }
  },
  getters: {

  }
})

// 对外暴露
export default useUserStore;
