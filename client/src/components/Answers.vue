<template>
  <div>
    <div class="row text-muted pt-3 border-bottom border-gray">
      <div class="col-1 d-flex flex-column text-center">
        <span @click="upvoteAnswer(answer._id)" style="cursor:pointer"><img src="https://image.flaticon.com/icons/svg/25/25678.svg" alt="" width="20"> </span>
        <p class="m-0">{{totalVote}}</p>
        <span @click="downvoteAnswer(answer._id)" style="cursor:pointer"><img src="https://image.flaticon.com/icons/svg/25/25224.svg" alt="" width="20"></span>

      </div>
      <div class="col-11">
          <div class="d-flex justify-content-end px-3">
            <span class="ml-3" v-if="profile.username === answer.ownedBy" @click="editAnswer" style="cursor:pointer"><img src="https://image.flaticon.com/icons/svg/2089/2089209.svg" alt="" width="20"></span>
            <span class="ml-3" v-if="profile.username === answer.ownedBy" @click="deleteAnswer(answer._id)" style="cursor:pointer"><img src="https://image.flaticon.com/icons/svg/64/64022.svg" alt="" width="20"></span>
          </div>
          <div>
            <p v-html="answer.description" class="pb-3 mb-0 small lh-125">
            </p>
          </div>
          <div class="p-3">
            <p class=" mb-0 small lh-125 d-flex justify-content-end">
                Answered by : {{answer.ownedBy}}
            </p>
            <p class=" mb-0 small lh-125 d-flex justify-content-end">
                Answered at : {{date}}
            </p>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['answer'],
  methods: {
    upvoteAnswer (id) {
      let payload = {
        answerId: id,
        questionId: this.$route.params.id
      }
      this.$store.dispatch('upvoteAnswer', payload)
    },
    downvoteAnswer (id) {
      let payload = {
        answerId: id,
        questionId: this.$route.params.id
      }
      this.$store.dispatch('downvoteAnswer', payload)
    },
    deleteAnswer (id) {
      let payload = {
        answerId: id,
        questionId: this.$route.params.id
      }
      this.$store.dispatch('deleteAnswer', payload)
    },
    editAnswer () {
      let payload = {
        id: this.answer._id,
        description: this.answer.description
      }
      this.$emit('scrollToPostAnswer')
      this.$emit('changeToEdit', payload)
      window.scrollTo(0, document.body.scrollHeight)
    }
  },
  computed: {
    totalVote () {
      return this.answer.upvotes.length - this.answer.downvotes.length
    },
    date () {
      Date.prototype.toISODate = function () {
        return this.getFullYear() + '-' +
                   ('0' + (this.getMonth() + 1)).slice(-2) + '-' +
                   ('0' + this.getDate()).slice(-2)
      }
      return new Date(this.answer.date).toISODate()
    },
    profile () {
      return this.$store.state.profile
    }
  }
}
</script>

<style>

</style>
