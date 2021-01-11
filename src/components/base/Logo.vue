<template>
  <img
    :src="url(format)"
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
    },
    format: {
      type: String,
      default: 'vertical'
    }
  },
  data () {
    return {
    }
  },
  methods: {
    url (format) {
      const formatUrl = {
        vertical: '/images/temp-logo.png',
        horizontal: '/images/temp-logo-horizontal.png'
      }

      return formatUrl[format]
    }
  }
}
</script>
