<template>
  <div>
    NO Find!!!
    <hr>
    <a @click="back">back</a>
    </div>
</template>
<script>
export default {
  methods: {
    back: function () {
      this.$router.back()
    }
  }
}
</script>

