<template>
  <div>
      <ul class="list-group mb-3">
        <li class="list-group-item d-flex justify-content-between lh-condensed">
          <div>
            <h6 class="my-0 font-weight-bold">Watched Tags <span><img src="https://image.flaticon.com/icons/svg/77/77582.svg" alt="" width="20"></span></h6>
          </div>
        </li>
        <li class="list-group-item d-flex justify-content-between lh-condensed">
            <div style="font-size: 12px">
                <button @click="searchWatch(tag)" v-for="(tag, index) in profile.watchedTags" :key="index" class="btn btn-sm btn-dark m-2">{{tag}} <span @click="deleteWatch(tag)" class="ml-1"><img src="https://image.flaticon.com/icons/svg/148/148766.svg" alt="" width="15"></span></button>
            </div>
        </li>
        <li class="list-group-item d-flex justify-content-between lh-condensed">
            <form @submit.prevent="addWatch">
              <div class="form-group d-flex justify-content-center">
                <input v-model="watchTag" type="text" class="form-control" id="watchTag" placeholder="add watch tag here">
                <button type="submit" class="btn btn-sm btn-info">Add</button>
              </div>
            </form>
        </li>
      </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      watchTag: ''
    }
  },
  methods: {
    addWatch () {
      this.$store.dispatch('addWatch', this.watchTag)
      this.watchTag = ''
    },
    deleteWatch (tag) {
      this.$store.dispatch('deleteWatch', tag)
    },
    searchWatch (tag) {
      this.$store.dispatch('searchWatch', tag)
    }
  },
  computed: {
    profile () {
      return this.$store.state.profile
    }
  }
}
</script>

<style>

</style>
