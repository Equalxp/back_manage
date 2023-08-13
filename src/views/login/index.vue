<template>
  <div class="login_container">
    <el-row>
      <!-- xs:屏幕小于768 -->
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <!-- 登录的表单 :model表单收集数据的对象 -->
        <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms">
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <!-- username -->
          <el-form-item prop="username">
            <el-input :prefix-icon="User" v-model='loginForm.username'></el-input>
          </el-form-item>
          <!-- password -->
          <el-form-item prop="password">
            <el-input type="password" :prefix-icon="Lock" v-model="loginForm.password" show-password></el-input>
          </el-form-item>
          <!-- button -->
          <el-form-item>
            <el-button :loading="isloading" class="login_btn" type="primary" size="default" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue';
import { reactive, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import useUserStore from '@/store/modules/user.ts'
import { ElNotification } from 'element-plus';
//引入获取当前时间的函数
import { getTime } from '@/utils/time';
let useStore = useUserStore()
// 路由器
let $router = useRouter()
// 路由对象
let $route = useRoute()
//获取el-form组件
let loginForms = ref();
// 收集数据
const loginForm = reactive({ username: 'admin', password: '111111' })
// 按钮加载
const isloading = ref(false)
// 登录函数
const login = async () => {
  // 表单全部验证成功之后才可以发请求
  await loginForms.value.validate();
  isloading.value = true
  // 让仓库发请求 
  try {
    // 也可以.then
    await useStore.userLogin(loginForm)
    // 编程式到导航
    $router.push('/')
    ElNotification({
      type: 'success',
      message: '欢迎回来',
      title: `HI,${getTime()}好`
    });
    isloading.value = false;
  } catch (error) {
    isloading.value = false
    // 失败
    ElNotification({
      type: 'error',
      message: (error as Error).message
    })
  }
  

}
const validatorUserName = (_rule: any, value: any, callback: any) => {
  // rule-规则对象 value-表单元素文本内容 符合条件就callback放行
  if(value.length >= 5) {
    callback()
  } else {
    callback(new Error('账号长度至少五位'));
  }
}
const validatorPassword = (_rule: any, value: any, callback: any) => {
  if (value.length >= 6) {
    callback();
  } else {
    callback(new Error('密码长度至少六位'));
  }
}
// rule
const rules = {
  username: [
    { trigger: 'change', validator: validatorUserName }
  ],
  password: [
    { trigger: 'change', validator: validatorPassword }
  ]
}
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;

  .login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url("@/assets/images/login_form.png") no-repeat;
    background-size: cover;
    padding: 40px;
    h1 {
      color: white;
      font-size: 40px;
    }

    h2 {
      font-size: 20px;
      color: white;
      margin: 20px 0px;
    }

    .login_btn {
      width: 100%;
    }
  }
}
</style>