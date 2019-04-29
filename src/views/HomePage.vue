<template>
  <div class="homepage-box">
    {{homepage}}
  </div>
</template>

<script>
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
      homepage: 'homepage'
    }
  },
  computed: {},
  watch: {},
  methods: {},
  mounted() {
    setTimeout(() => {
      this.homepage = 'hahaha'
    }, 2000);
  },
  activated() {},
  deactivated() {},
}
</script>

<style lang='stylus' scoped>
</style>
