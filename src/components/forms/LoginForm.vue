<template>
    <q-form
      @submit="onSubmit"
      class="q-gutter-md"
    >
    <q-input outlined color="primary" v-model="email" placeholder="Email" />
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
      <q-btn no-caps type="submit" class="q-mr-md" padding="10px 65px" size="lg" color="primary" label="Entrar" />
      <q-btn no-caps :to="{ name: 'signup' }" class="cancel-btn" color="primary" padding="10px 60px" size="lg" outline label="Cadastrar" />
    </div>
    </q-form>
</template>

<script>
import LoginService from '../../services/account/LoginService'

export default {
  name: 'Logo',
  props: {
  },
  data () {
    return {
      email: '',
      password: '',
      isPwd: true
    }
  },
  methods: {
    onSubmit () {
      this.login().then((res) => {
        if (res.status === 401) {
          alert(res.message)
        } else if (res.status === 200 || res.status === 201) {
          alert('Login ok!')
        }
      })
    },
    async login () {
      return await LoginService.login(this.email, this.password)
    }
  }
}
</script>

<style>
  .form-actions button span{
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 1px;
  }
</style>
