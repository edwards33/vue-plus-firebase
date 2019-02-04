<template>
  <div id="chat">
    <h1>Chat Room</h1>
    <!-- Messages -->
    <div class="block group hover:bg-blue-lightest p-4 border-b"
      :key="index" 
      v-for="(message, key, index) in messagesArray"
    >
      <div class="card-body">
        <!-- author -->
        <p class="font-bold text-lg mb-1 text-black group-hover:text-white">{{ message.author }}:</p>
        <!-- content -->
        <p class="text-grey-darker mb-2 group-hover:text-white">{{ message.text }}</p>

        <div class="px-6 py-4">
          <a class="border p-3 m-2 rounded border-teal-light hover:border-orange no-underline"
            v-show="message.author == author" 
            @click.prevent="deleteMsg(key)" href="#"
          >
            delete
          </a>
          <a class="border p-3 m-2 rounded border-teal-light hover:border-orange no-underline"
            v-show="message.author == author" 
            @click.prevent="editMsg(key)" 
            href="#"
          >
            edit
          </a>
        </div>
        
      </div>
    </div>

    <hr>
    <!-- New Message -->
    <form @submit.prevent="storeMessage">
      <div class="form-group">
        <p class="font-bold text-lg mb-1 text-black">Message:</p>
        <textarea v-model="messageText" class="border p-3 m-2 rounded"></textarea>
      </div>
      <div class="form-group">
        <label>author:</label>
        <input v-model="author" class="border p-3 m-2 rounded"/>
        <button class="border p-3 m-2 rounded border-teal-light hover:border-orange"
        >
          {{btnText}}
        </button>
        <button class="border p-3 m-2 rounded border-teal-light hover:border-orange"
          v-if="isUpdating" 
          @click.prevent="clearFields" 
          
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { EventBus } from '../events'

export default {
  name: 'Chat',
  data: () => {
    return {
      messagesArray: [],
      messageText: '',
      author: 'unknown',
      isUpdating: false,
      selectedId: '',
      btnText: 'Save'
    }
  },
  
  mounted(){
    if(!this.user){
      this.$router.push('/login')
    }
    if(!this.user.user.emailVerified){
      this.$router.push('/')
    }
    this.author = this.user.user.email

    this.messagesArray = this.$store.getters['DbModule/messages']
  },
  computed: {
    ...mapGetters('AuthModule', ['user','verify']),
    ...mapGetters('DbModule', ['messages']),
    
  },
  methods: {
    storeMessage () {
      if(!this.isUpdating){
        EventBus.$emit('push-msg', this)
        this.messageText = ''
      } else {
        EventBus.$emit('update-msg', this)
        this.clearFields()
      }
      
      
    },
    deleteMsg(id){
      EventBus.$emit('delete-msg', id)
    },
    editMsg(id){
      this.isUpdating = true
      this.messageText = this.messages[id].text
      this.selectedId = id
    },
    clearFields(){
      this.isUpdating = false
      this.messageText = ''
      this.selectedId = ''
    }
  },
  watch: {
    messages(val){
      this.messagesArray = val
    },
  }
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
