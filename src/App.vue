<template>
  <div id="app" >
    <div v-show="showPage" id="nav" class="flex justify-between bg-grey-darker">
      <div>
        <router-link 
          class="no-underline hover:text-blue-dark ml-8" 
          to="/"
        >
          Home
        </router-link>
        <router-link 
          class="no-underline hover:text-blue-dark ml-8" 
          v-show="user" 
          to="/secure"
        >
          Secure
        </router-link>
        <router-link 
          class="no-underline hover:text-blue-dark ml-8" 
          to="/about"
        >
          About
        </router-link>
      </div>
      <div>
        <router-link 
          class="items-center px-3 py-2 border rounded  border-teal-light hover:border-white no-underline ml-8" 
          v-show="!user" 
          to="/register"
        >
          Register
        </router-link>
        <router-link 
          class="items-center px-3 py-2 border rounded  border-teal-light hover:border-white no-underline ml-8" 
          v-show="!user" 
          to="/login"
        >
          Login
        </router-link>
        <button 
          class="items-center px-3 py-2 border rounded  border-teal-light hover:border-white no-underline ml-8" 
          v-show="user" 
          @click="logoutUser"
        >
          Logout
        </button> 
      </div>
    </div>
    <div class="container max-w-md mx-auto p-4 m-2 bg-grey-lightest shadow-lg rounded">
      <router-view v-show="showPage"/>
    </div>
    <div>
      <h2 v-show="!showPage">Wait...</h2>
    </div>
  </div>
</template>

<script>
import './assets/css/main.css'
import firebase from 'firebase'
import Register from './components/Register'
import { mapGetters, mapActions } from 'vuex'
import { EventBus } from './events'

export default {
  name: 'app',
  data: () => {
    return {
      showPage: false,
    }
  },
  mounted(){
    var config = {
      apiKey: "input-your-api-key",
      authDomain: "input-your-daomain",
      databaseURL: "input-link-to-your-db",
      projectId: "input-your-project-id",
      storageBucket: "input-your-storage-bucket",
      messagingSenderId: "input-your-msg-sende-id"
    }

    firebase.initializeApp(config)

    const DB = firebase.database()
    DB.ref('messages').on('value', snapshot => {
      this.messages(snapshot.val())
    })

    EventBus.$on('push-msg', ({ messageText, author }) => {
      DB.ref('messages').push({text: messageText, author})
    })

    EventBus.$on('delete-msg', id => {
      DB.ref('messages').child(id).remove()
    })

    EventBus.$on('update-msg', ({ messageText, selectedId }) => {
      DB.ref('messages').child(selectedId).update({text: messageText})
    })

    this.showPage = true
  },
  components:{
    Register,
  },
  computed: {
    ...mapGetters('AuthModule', ['user']),
  },
  methods: {
    ...mapActions('AuthModule', ['logout']),
    ...mapActions('DbModule', ['messages']),
    logoutUser(){
      this.logout()
      this.$router.push('/')
    }
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
