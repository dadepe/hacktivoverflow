<template>
  <div>
    <div class="p-3 bg-white rounded shadow-sm">
        <div class="d-flex justify-content-between border-bottom border-gray pb-2 mb-0">
          <div class="d-flex align-items-start flex-column">
            <h5>My Questions</h5>
            <p>{{ questions.length }} Questions</p>
          </div>
          <button @click="toAskPage" class="btn btn-info h-75">Ask Question</button>
        </div>
      <div class="row">
        <div v-if="questions.length > 0" class="col-sm-12 col-md-8 p-2">
          <Questions
          class="px-3"
          v-for="question in questions" :key="question._id"
          :question="question"
          />
        </div>
        <div v-if="questions.length === 0" class="col-sm-12 col-md-8 p-2 bg-secondary">
            <div class="text-white text-center mt-5">
                <h3 class="font-weight-bold">No questions have been made</h3>
                <h4 class="font-weight-bold">Go make some !</h4>
            </div>
        </div>
        <div class="col-sm-12 col-md-4 p-2">
            <ul class="list-group mb-3">
              <li class="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                  <h6 class="my-0 font-weight-bold">Here is your list of Questions</h6>
                </div>
              </li>
              <li class="list-group-item d-flex justify-content-between lh-condensed">
                  <div style="font-size: 12px">
                      <p class="pt-2 text-muted text-justify">
                          Make sure to see all the response from others, you can see the upvote or downvote to know how well your questions is favorable to this community
                      </p>
                      <p class="pt-2 text-justify">
                          Don't forget, Be nice to others
                      </p>
                  </div>
              </li>
              <li class="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                  <h6 class="my-0 font-weight-bold">Here you can edit your questions</h6>
                </div>
              </li>
              <li class="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                  <h6 class="my-0 font-weight-bold">Also you can delete your questions if needeed</h6>
                </div>
              </li>
              <li class="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                  <h6 class="my-0 font-weight-bold">Beware, all answers in that questions will gone</h6>
                </div>
              </li>
            </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Questions from '@/components/Questions'
export default {
  components: {
    Questions
  },
  methods: {
    toAskPage () {
      this.$router.push('/ask')
    }
  },
  computed: {
    questions () {
      let arr = []
      this.$store.state.profile.QuestionsId.forEach(element => {
        arr.unshift(element)
      })
      return arr
    }
  },
  created () {
    // this.$store.dispatch('getProfile')
  }
}
</script>

<style>

</style>
