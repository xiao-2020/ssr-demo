<template>
  <div class="homepage-box">
    {{homepage}}
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  // 用于查询当前页面的函数
  asyncData({ route, store }) {
    // 在页面渲染前调用 vuex 里面的某一个方法来获取数据渲染页面
    return store.dispatch('common/fetchUserInfo', route, { root: true })
  },
  name: 'homepage',
  components: {},
  props: {},
  mixins: [],
  data() {
    return {
    }
  },
  computed: {
    homepage() {
      return this.$store.state.common.homepage || 'asdasdasdas'
    }
  },
  watch: {},
  methods: {
    ...mapMutations('common', ['setHomepage'])
  },
  mounted() {
    setTimeout(() => {
      this.setHomepage()
    }, 2000);
  },
  activated() {},
  deactivated() {},
}
</script>

<style lang='stylus' scoped>
</style>
