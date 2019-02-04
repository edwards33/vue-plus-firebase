<template>
  <div>
    <div v-if="user">
      <h2>Signed in User: {{user.user.email}}</h2>
      <button @click="logoutUser">Logout</button>
    </div>
    <div v-else>
      <form @submit.prevent="userLogin">
        <h2>Login</h2>
        <input class="border p-3 m-2 rounded" type="email" v-model="email" placeholder="Input Email">
        <input class="border p-3 m-2 rounded" type="password" v-model="password" placeholder="Input Password">
        <button class="border p-3 m-2 rounded border-teal-light hover:border-orange"
          v-show="email.length > 0 && password.length > 0"
        >
          Login
        </button>
      </form>
    </div>
    <div v-if="errorMessage.length > 0">
      <h2>Error: {{errorMessage}}</h2>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Login',
  data: () => {
    return {
      email: '',
      password: '',
    }
  },
  computed: {
    ...mapGetters('AuthModule', ['loading', 'userCreated', 'errorMessage', 'user']),
  },
  methods: {
    ...mapActions('AuthModule', ['logIn', 'logout']),
    userLogin(){
      this.logIn(this)
    },
    logoutUser(){
      this.logout()
    }
  },
  watch: {
    user(val){
      if(val){
        this.email = ''
        this.password = ''
        this.$router.push('/')
      }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
