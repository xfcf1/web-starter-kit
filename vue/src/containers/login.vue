<template>
  <div>
    <el-form>
      <el-form-item label="用户名">
        <el-input v-model="username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="click">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import fetch from '../tools/fetch'
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    click: async function () {
      const obj = { username: this.username, password: this.password }
      const isAuth = await fetch('/login', obj)
      if (isAuth.code === 0) {
        this.$store.dispatch('login')
      }
      this.$message({
        type: isAuth.code === 0 ? 'success' : 'error',
        message: isAuth.data,
        showClose: true
      })
    }
  },
  computed: mapState(['isAuth']),
  watch: {
    'isAuth': function(val) {
      val && this.$router.push('/')
    }
  }
}
</script>

