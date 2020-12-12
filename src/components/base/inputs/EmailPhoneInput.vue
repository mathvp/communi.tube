<template>
  <q-input outlined color="primary" v-model="fieldValue" placeholder="Email ou Telefone" />
</template>

<script>
export default {
  name: 'EmailPhoneInput',
  props: {
  },
  data () {
    return {
      fieldValue: ''
    }
  }
}
</script>
