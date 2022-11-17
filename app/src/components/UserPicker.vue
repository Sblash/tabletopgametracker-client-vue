<template>
  <div class="row">
    <div class="col-md-12">
      <div class="input-group mb-3">
        <span class="input-group-text" id="inputGroup-sizing-default">Username</span>
        <input v-model="username" @keypress="debounceSearch" type="text" class="form-control" aria-describedby="inputGroup-sizing-default">
      </div>
      <div class="row">
        <div class="col-md-12" v-show="username.trim() == ''">
            <p>Utenti scelti</p>
            <div class="user" v-for="user in users" :key="user" @click="removeUser(user)">
                {{ user.username }}
            </div>
        </div>
        <div class="col-md-12" v-show="username.trim() != ''">
            <p>Utenti trovati</p>
            <div class="user" :class="getPicked(user)" v-for="user in users_searched" :key="user" @click="pickUser(user)">
                {{ user.username }}
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { User } from '../interfaces/User';
import axios from 'axios';

export default defineComponent({
  name: 'UserPicker',
  props: {
    existing_users: Object as PropType<Array<User>>
  },
  data() {
    let users: Array<User> = [];
    let users_searched: Array<User> = [];
    let timer: any;

    if (this.existing_users) {
      users = this.existing_users;
    }

    return {
      users: users,
      users_searched: users_searched,
      username: "",
      timer: timer
    }
  },
  methods: {
    searchUser() {
        let username = this.username;

        if (username && username.trim() !== "") {
            axios
            .get("users/search-by-username?username=" + username)
            .then((response) => {
                if (response.data.success) {
                    let users = response.data.users;
                    for (let i = 0; i < users.length; i++) {
                        users[i].picked = this.isPicked(users[i].username);
                    }
                    this.users_searched = users;
                } else {
                    alert(response.data.message);
                }
            })
            .catch((error) => {
                console.log("ERROR_pages", error);
            });
        }
    },
    pickUser(user: User) {
        user.picked = !user.picked;
        
        if (user.picked) {
            this.users.push(user);
            this.$emit('usersPicked', this.users);
        } else {
            this.removeUser(user);
        }
    },
    getPicked(user: User) {
        if (user.picked) {
            return "user_picked";
        }

        return "";
    },
    removeUser(user: User) {
        for (let i = 0; i<this.users.length; i++) {
            if (this.users[i].username === user.username) {
                this.users.splice(i, 1);
            }
        }

        this.$emit('usersPicked', this.users);
    },
    isPicked(username: string) {
        for (let i = 0; i<this.users.length; i++) {
            if (this.users[i].username === username) {
                return true;
            }
        }
        return false;
    },
    debounceSearch() {
        const timeout = 1000;
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.searchUser();
        }, timeout);
    }
  }
})
</script>

<style scoped>
.user {
  border-radius: 10px;
  border: 1px solid grey;
  background-color: lightgray;
  padding: 8px;
  /* max-height: 90px; */
  cursor: pointer;
  text-align: center;
  margin-bottom: 16px;
}

.user_picked {
    background-color: grey;
    border: 1px solid black;
}
</style>