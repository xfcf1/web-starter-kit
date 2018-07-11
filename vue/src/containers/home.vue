<template>
  <div>
    <Header :titles="titles"/>
    I'M {{isAuth ? 'Admin' : 'Visitor'}}
    <router-link to="/"><p @click="clickHanldle">{{name}}</p></router-link>
    <hr>
    <router-link to="/list">List</router-link>
    <router-view></router-view>
    <hr>
    <a @click="logout">Logout</a>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Header from '../components/Header'
export default {
  components: {
    Header
  },
  methods: {
    clickHanldle () {
      console.log(this)
    },
    logout () {
      this.$store.dispatch('logout')
    }
  },
  data () {
    return {
      titles: 'Header',
      name: 'Home'
    }
  },
  computed: mapState(['isAuth']),
  watch: {
    'isAuth': function (val) {
      !val && this.$router.push('/login')
    }
  }
}
</script>

