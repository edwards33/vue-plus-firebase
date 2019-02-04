<template>
  <div>
    <button class="border p-3 m-2 rounded border-teal-light hover:border-orange"
      @click="verification"
    >
      Verify your email address
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Login',
  mounted(){
    if(!this.user){
      this.$router.push('/login')
    }
    if(this.user.user.emailVerified){
      this.$router.push('/')
    }
  },
  computed: {
    ...mapGetters('AuthModule', ['user','verify']),
  },
  methods: {
    ...mapActions('AuthModule', ['verification']),
  },
  watch: {
    verify(val){
      if(val.length > 0){
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
