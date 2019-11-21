<template>
  <div class="text-center" >
    <button @click="back" class="btn btn-sm btn-info ml-3 mr-auto">Back</button>
    <form @submit.prevent="register" class="form-signin text-white">
      <h1> <strong>Overflow </strong> <span> <img class="mb-4" src="https://avatars0.githubusercontent.com/u/53108094?s=460&v=4" alt="" width="72" height="72"> </span></h1>
      <h1 class="h3 mb-3 font-weight-normal">Register</h1>
      <label for="inputUserName" class="sr-only">Username</label>
      <input v-model="registerUsername" type="userName" id="inputUserName" class="form-control my-2" placeholder="Username">
      <label for="inputEmail" class="sr-only">Email address</label>
      <input v-model="registerEmail" type="text" id="inputEmail" class="form-control my-2" placeholder="Email address">
      <label for="inputPassword" class="sr-only">Password</label>
      <input v-model="registerPassword" type="password" id="inputPassword" class="form-control my-2" placeholder="Password">
      <button class="btn btn-lg btn-primary btn-block" type="submit">Register!</button>
      <p class="mt-3 text-muted">&copy; Overflow 2019</p>
    </form>
  </div>
</template>

<script>

export default {
  data () {
    return {
      registerUsername: '',
      registerEmail: '',
      registerPassword: ''
    }
  },
  methods: {
    back () {
      this.$router.push('/login')
    },
    register () {
      let payload = {
        username: this.registerUsername,
        email: this.registerEmail,
        password: this.registerPassword
      }
      this.$store.dispatch('register', payload)
    }
  }
}
</script>

<style scoped>

div {
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 20px;
  background:linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
  url(http://www.habilelabs.io/wp-content/uploads/2017/09/it-background-5.jpg);
  background-size:cover;
  background-position: center;
}

.form-signin {
  width: 100%;
  max-width: 500px;
  padding: 10px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
