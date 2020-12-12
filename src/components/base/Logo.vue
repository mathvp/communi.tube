<template>
  <img
    :src="url"
    :width="width"
    :height="height"
  />
</template>

<script>
export default {
  name: 'Logo',
  props: {
    width: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      url: '/images/temp-logo.png'
    }
  }
}
</script>
