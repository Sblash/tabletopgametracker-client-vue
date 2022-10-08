<template>
  <div class="container">

    <div class="row">
      <div class="col-md-12">
        <h2>Welcome to</h2>
        <h1>Tabletop Game Tracker</h1>
      </div>
    </div>
    
    <div class="row">
      <div class="col-md-4"></div>
      <div class="col-md-4">
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
      <div class="col-md-4"></div>
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
      const params = {
        telegram_id: user.id,
        username: user.username
      };

      axios
        .post("auth", params)
        .then((response) => {
          const data = response.data;
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
  text-align: center;
}

.login {
  background-color: lightgoldenrodyellow;
  border-radius: 20px;
  padding: 16px;
  margin-top: 32px;
}
</style>
