<template>
      <b-navbar toggleable="lg" type="dark" variant="secondary" class="bg-secendary">
        <b-navbar-brand href="#">Overflow</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" class="bg-secondary" is-nav>
          <b-navbar-nav>
            <b-nav-item @click="toHome" class="d-flex justify-content-center" href="#">HOME</b-nav-item>
          </b-navbar-nav>
          <!-- Right aligned nav items -->
          <div v-if="!isLogin" class="ml-auto d-flex justify-content-center">
            <button @click="toLogin" class="btn btn-primary">Login</button>
          </div>
          <b-navbar-nav v-else class="ml-auto">
            <b-nav-item-dropdown class="d-flex justify-content-center" right>
              <!-- Using 'button-content' slot -->
              <template v-slot:button-content>
                <img src="https://image.flaticon.com/icons/svg/149/149449.svg" alt="userIcon" width="30">
              </template>
              <b-dropdown-item z href="#">
              </b-dropdown-item>
               <b-dropdown-item @click="myQuestions" >My Questions</b-dropdown-item>
              <b-dropdown-item @click="signOut" >Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  methods: {
    toLogin () {
      this.$router.push('/login')
    },
    myQuestions () {
      this.$router.push('/myQuestions')
    },
    toHome () {
      this.$router.push('/')
      this.$store.commit('STATUS_SEARCH', true)
      this.$store.dispatch('fetchPagination', 1)
    },
    signOut () {
      Swal.fire({
        title: 'Are you sure want to log out?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, log out'
      }).then((result) => {
        if (result.value) {
          localStorage.removeItem('token')
          this.$store.commit('STATUS_LOGIN', false)
          this.$store.commit('SET_PROFILE', '')
          this.$router.push('/')
          Swal.fire(
            'See you soon'
          )
        }
      })
    }
  }
}
</script>

<style>

</style>
