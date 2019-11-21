<template>
  <div>
      <ul class="list-group mb-3">
        <li class="list-group-item d-flex justify-content-between lh-condensed">
          <div>
            <h6 class="my-0 font-weight-bold">Random Tags <span><img src="https://image.flaticon.com/icons/svg/36/36601.svg" alt="" width="20"></span></h6>
          </div>
        </li>
        <li class="list-group-item d-flex justify-content-between lh-condensed">
            <div style="font-size: 12px">
                <button @click="searchWatch(tag)" v-for="(tag, index) in randomTags" :key="index" class="btn btn-sm btn-dark m-2">{{tag}} <span @click="deleteWatch(tag)" class="ml-1"><img src="https://image.flaticon.com/icons/svg/148/148766.svg" alt="" width="15"></span></button>
            </div>
        </li>
      </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    deleteWatch (tag) {
      console.log(tag)
      console.log(typeof tag)
      this.$store.dispatch('deleteWatch', tag)
    },
    searchWatch (tag) {
      this.$store.dispatch('searchWatch', tag)
    }
  },
  computed: {
    profile () {
      return this.$store.state.profile
    },
    randomTags(){
      return this.$store.state.randomTag
    }
  },
  created(){
    this.$store.commit('RESET_RANDOM')
  }
}
</script>

<style>

</style>
