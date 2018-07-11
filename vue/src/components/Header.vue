<template>
  <header>
    {{title}}
  </header>
</template>
<script>
export default {
  props: ['titles'],
  data () {
    console.log(this)
    return {
      title: this.titles
    }
  }
}
</script>
<style lang="scss">
header {
  background: rgb(0, 136, 255);
  padding: 20px 0;
  color: #fff;
  text-align: center;
}
</style>

