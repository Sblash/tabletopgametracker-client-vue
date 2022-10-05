<template>
  <div class="container">
    <h2>Welcome to</h2>
    <h1>Tabletop Game Tracker</h1>
    <div class="login">
      <h3>Sign in</h3>
      <ButtonLogin 
        mode="callback" 
        size="large"
        bot-username="tabletopgamestracker_bot" 
        @callback="onTelegramAuth"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ButtonLogin } from 'televue'
import axios from 'axios';

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Home',
  components: {
    ButtonLogin
  },
  methods: {
    onTelegramAuth(user: any) {
      alert('Logged in as ' + user.first_name + ' ' + user.last_name + ' (' + user.id + (user.username ? ', @' + user.username : '') + ')');
      const params = {
        telegram_id: user.id,
        username: user.username
      };

      axios
        .post("auth", params)
        .then((response) => {
          const data = response.data;
          console.log("user_tokens", data);
          this.setItemLocalStorage("user", data);
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.access_token;
        })
        .catch((error) => {
          console.log("ERROR_login", error);
        });
    },
    setItemLocalStorage(key: string, value: object) {
      localStorage.setItem(key, JSON.stringify(value));
    },
    
  }
});
</script>

<style>
.container {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.container .login {
  background-color: lightgoldenrodyellow;
  border-radius: 20px;
  margin: auto;
  width: 400px;
  padding: 16px;

}
</style>
