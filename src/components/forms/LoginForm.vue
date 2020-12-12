<template>
  <div>
    <email-phone class="q-mt-md"/>
    <q-input class="q-mt-md" v-model="password" outlined :type="isPwd ? 'password' : 'text'" placeholder="Senha">
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
    </q-input>
    <div class="q-mt-xl form-actions">
      <q-btn no-caps class="q-mr-md" padding="10px 65px" size="lg" color="primary" label="Entrar" />
      <q-btn no-caps class="cancel-btn" color="primary" padding="10px 60px" size="lg" outline label="Cadastrar" />
    </div>
  </div>
</template>

<script>
import EmailPhoneInput from 'components/base/inputs/EmailPhoneInput'

export default {
  name: 'Logo',
  components: {
    'email-phone': EmailPhoneInput
  },
  props: {
  },
  data () {
    return {
      password: '',
      isPwd: true
    }
  }
}
</script>

<style lang="scss">
  .q-field--outlined .q-field__control:before {
    border: 1px solid $primary;
  }

  .form-actions button span{
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 1px;
  }
</style>
