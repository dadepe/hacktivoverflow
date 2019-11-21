<template>
  <div class="p-3 bg-white rounded shadow-sm">
      <div class="d-flex justify-content-between border-bottom border-gray pb-2 mb-0">
        <div v-if="notSearch" class="d-flex align-items-start flex-column">
          <h5>All Questions</h5>
          <p>{{questions.length}} Questions</p>
        </div>
        <div v-else-if="!notSearch && typeSearch ==='tag'" class="d-flex align-items-start flex-column">
          <h5>Tag : {{tagNow}}</h5>
          <p>{{questionsNow.length}} Questions</p>
        </div>
        <div v-else class="d-flex align-items-start flex-column">
          <h5>Search : {{searchNow}}</h5>
          <p>{{questionsNow.length}} Questions</p>
        </div>
        <button @click="toAskPage" class="btn btn-info h-75">Ask Question</button>
      </div>

      <nav v-if="notSearch" aria-label="Page navigation example">
        <ul class="pagination my-3">
          <li v-if="page>1"  @click="fetchBack(); changeBack()" class="page-item"><a class="page-link" style="cursor:pointer">Previous</a></li>
          <li  v-for="(num, index) in maxPage" :key="index"
          @click="fetchPagination(index+1); changePageNow(index)"
          :class="{'page-item':true, active:changePage == index}">
          <a class="page-link" style="cursor:pointer">{{index + 1}}</a></li>
          <li v-if="page !== maxPage" @click="fetchNext(); changeNext()" class="page-item"><a class="page-link" style="cursor:pointer">Next</a></li>
        </ul>
      </nav>
      <div v-if="!notSearch" class="p-2">
        <button @click="revert" class="btn btn-sm btn-info">Back</button>
      </div>

    <div class="row">
      <div class="col-sm-12 col-md-8">
        <div>
          <form @submit.prevent="searchQuestions" id="searchQuestions">
            <div class="form-group">
              <div class="input-group">
                  <input v-model="search" type="text" class="form-control form-control-lg" id="searchBox" aria-describedby="searchBox" placeholder="Search Questions">
                  <span class="input-group-text"><img src="https://image.flaticon.com/icons/svg/149/149852.svg" alt="searchIcon" height="20" width="30"></span>
              </div>
            </div>
          </form>
        </div>
        <Questions
        v-for="question in questionsNow" :key="question._id"
        :question="question"
        />
      </div>
      <div class="col-sm-12 col-md-4">
        <WatchedTag
        v-if="isLogin"
        />
        <RandomTag
        v-if="isLogin"
        class="mt-5"
        />
      </div>
    </div>
  </div>
</template>

<script>
import RandomTag from '@/components/RandomTag'
import WatchedTag from '@/components/WatchedTag'
import Questions from '@/components/Questions'
export default {
  data () {
    return {
      search: ''
    }
  },
  components: {
    Questions,
    WatchedTag,
    RandomTag
  },
  methods: {
    toAskPage () {
      if (this.isLogin) {
        this.$router.push('/ask')
      } else {
        this.$router.push('/login')
      }
    },
    fetchPagination (page) {
      this.$store.dispatch('fetchPagination', page)
    },
    fetchBack () {
      let min = this.page - 1
      this.$store.dispatch('fetchBack', min)
    },
    fetchNext () {
      let add = this.page + 1
      this.$store.dispatch('fetchNext', add)
    },
    changePageNow (index) {
      this.$store.commit('CHANGE_NOW', index)
    },
    changeBack () {
      this.$store.commit('CHANGE_BACK')
    },
    changeNext () {
      this.$store.commit('CHANGE_NEXT')
    },
    revert () {
      this.$store.commit('STATUS_SEARCH', true)
      this.$store.dispatch('fetchPagination', 1)
    },
    searchQuestions () {
      this.$store.dispatch('searchQuestions', this.search)
      this.search = ''
    }
  },
  computed: {
    questions () {
      return this.$store.state.listQuestions
    },
    questionsNow () {
      return this.$store.state.listQuestionsNow
    },
    page () {
      return this.$store.state.page
    },
    maxPage () {
      return this.$store.state.maxPage
    },
    changePage () {
      return this.$store.state.changePage
    },
    notSearch () {
      return this.$store.state.notSearch
    },
    typeSearch () {
      return this.$store.state.typeSearch
    },
    isLogin () {
      return this.$store.state.isLogin
    },
    tagNow () {
      return this.$store.state.tagNow
    },
    searchNow () {
      return this.$store.state.searchNow
    }
  },
  created () {
    this.$store.dispatch('fetchQuestions')
    this.$store.dispatch('fetchPagination', this.page)
    this.$store.commit('STATUS_SEARCH', true)
  }
}
</script>

<style>

</style>
