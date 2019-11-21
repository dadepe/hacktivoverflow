<template>
  <div id="app">
    <Navbar
    style="height:7vh"/>
    <router-view
    style="height:88vh"
    class="overflow-auto"
    />
    <Footer
    style="height:5vh"
    />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
export default {
  components: {
    Navbar,
    Footer
  },
  created () {
    if (localStorage.getItem('token')) {
      this.$store.commit('STATUS_LOGIN', true)
      this.$store.dispatch('getProfile')
      this.$store.dispatch('autoTag')
    }

  }
}
</script>

<style>

</style>
