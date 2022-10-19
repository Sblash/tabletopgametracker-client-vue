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
          this.setItemLocalStorage("user_tokens", data);
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.access_token;

          window.location.reload();
        })
        .catch((error) => {
          console.log("ERROR_login", error);
        });
    },
    setItemLocalStorage(key: string, value: object) {
      localStorage.setItem(key, JSON.stringify(value));
    },
    fakeLogin() {
      let obj = {
        access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWxlZ3JhbV9pZCI6MTQ0MjY3NTM2LCJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE2NjYwMzYwOTMsImV4cCI6MTY2NjAzNjk5M30.Op6OY4HCm-enm66wFaIGl2LQNTPO9x5dnuJwlZzcDco",
        refresh_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWxlZ3JhbV9pZCI6MTQ0MjY3NTM2LCJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE2NjYwMzYwOTMsImV4cCI6MTY3NDY3NjA5M30.iJGyhwnsOcdeZFVPhIO-e_Wb6PCbFrPqx4heNuRWzS4"
      }
      this.setItemLocalStorage("user_tokens", obj)
    }
  },
  created() {
    this.fakeLogin()
  }
});
</script>

<style scoped>
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
