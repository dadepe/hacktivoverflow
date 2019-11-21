<template>
    <div>
        <div class="row text-muted pt-3 border-bottom border-gray">
          <div class="col-1 d-flex flex-column">
              <div class="text-center">
                  <p class="m-0">{{totalVote}}</p>
                  <small>Votes</small>
              </div>
              <div class="text-center">
                  <p class="m-0">{{question.answers.length}}</p>
                  <small>Answers</small>
              </div>
          </div>
          <div class="col-11">
              <div>
                <div class="d-flex">
                  <strong
                  style="cursor:pointer"
                  @click="toDetail(question._id)"
                  class="d-block btn-link">
                  {{question.title}}
                  </strong>
                  <div v-if="this.$route.name === 'myQuestions'" class="ml-auto">
                    <span class="ml-3" v-if="profile.username === question.ownedBy" @click="toEdit(question._id)" style="cursor:pointer"><img src="https://image.flaticon.com/icons/svg/2089/2089209.svg" alt="" width="20"></span>
                    <span class="ml-3" v-if="profile.username === question.ownedBy" @click="deleteQuest(question._id)" style="cursor:pointer"><img src="https://image.flaticon.com/icons/svg/64/64022.svg" alt="" width="20"></span>
                  </div>
                </div>
              <p class="pb-3 mb-0 small lh-125">
                {{question.description | truncate(300, '...')}}
              </p>
              </div>
          <div>
              <div class="p-3 mb-0 small lh-125 d-flex justify-content-end">
                <button @click="searchTag(tag)" class="mx-3 btn btn-sm btn-dark" v-for="(tag, index) in question.tags" :key="index">
                    {{tag}}
                </button>
              </div>
          </div>
          </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['question'],
  methods: {
    toDetail (id) {
      this.$store.dispatch('detailQuestion', id)
      this.$router.push('/questions/' + id)
    },
    searchTag (tag) {
      this.$store.dispatch('searchWatch', tag)
    },
    toEdit (id) {
      this.$router.push('/editQuestion/' + id)
    },
    deleteQuest (id) {
      this.$store.dispatch('deleteQuest', id)
    }
  },
  computed: {
    totalVote () {
      return this.question.upvotes.length - this.question.downvotes.length
    },
    profile () {
      return this.$store.state.profile
    }
  }
}
</script>

<style>

</style>
