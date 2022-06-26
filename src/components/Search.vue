<template lang="">
  <div class="container">
    <input
      v-model="title"
      type="text" 
      class="form-control"
      placeholder="Search for Movies, Series & more"
      @keyup.enter="apply" />
    <div class="selects">
      <select
        v-for="filter in filters"
        id=""
        :key="filter.name"
        v-model="$data[filter.name]"
        class="form-select"
        name="">
        <option
          v-if="filter.name === 'year'"
          value="">
          All Years
        </option>
        <option
          v-for="item in filter.items"
          :key="item">
          {{ item }}
        </option>
      </select>
      <button
        class="btn btn-primary"
        @click="apply">
        Apply
      </button>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      title: '',
      type: 'Movie',
      number: 10,
      year: '',
      filters: [
        {
          name: 'type',
          items: ['Movie', 'Series', 'Episode']
        },
        {
          name: 'number',
          items: [10, 20, 30]
        },
        {
          name: 'year',
          items: (() => {
            const years = []
            const thisYear = new Date().getFullYear()
            for (let i = thisYear; i >= 1985; i--) {
              years.push(i)
            }
            return years
          })()
        }
      ]
    }
  },
  methods: {
    async apply() {
      this.$store.dispatch('movie/searchMovies', {
        title: this.title,
        type: this.type,
        number: this.number,
        year: this.year
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../scss/main";
.container {
  display: flex;
  .form-control {
    height: auto;
  }
  > * {
    font-size: 15px;
    margin-right: 10px;
    &:last-child {
      margin-right: 0;
    } 
  }
  .selects {
    display: flex;
    select {
      width: 120px;
      margin-right: 10px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .btn {
    width: 120px;
    height: 50px;
    font-weight: 700;
    // 줄어들어도 width가 유지되도록 해줌
    flex-shrink: 0;
  }
  @include media-breakpoint-down(lg) {
    display: block;
    input {
      margin-right: 0;
      margin-bottom: 10px;
    }
    .selects {
      margin-right: 0;
      margin-bottom: 10px;
      select {
        width: 100%;
      }
    }
    .btn {
      /* width: 100%; */
    }
  }
}
</style>
