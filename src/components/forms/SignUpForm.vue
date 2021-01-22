<template>
  <q-form
    @submit="onSubmit"
    class="q-gutter-md"
    ref="signup-form"
  >
    <div class="row">
      <div class="col-md-6 col-xs-12 q-pr-sm">
        <q-input :rules="[val => !!val || requiredField('Nome') ]" outlined v-model="userData.firstName" label="Nome" />
      </div>
      <div class="col-md-6 col-xs-12 q-pl-sm last-name-wrapper">
        <q-input :rules="[val => !!val || requiredField('Sobrenome') ]" outlined v-model="userData.lastName" label="Sobrenome" />
      </div>
    </div>

    <q-input :rules="[val => !!val || requiredField('Email') ]" outlined color="primary" v-model="userData.email" placeholder="Email" />

    <div class="row">
      <div class="col-md-6 col-xs-12 q-pr-sm">
        <q-input :rules="[val => !!val || requiredField('Senha') ]" class="q-mt-md" v-model="userData.password" outlined :type="isPwd ? 'password' : 'text'" placeholder="Senha">
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
        </q-input>
      </div>

      <div class="col-md-6 col-xs-12 q-pl-sm">
        <q-input :rules="[ val => validatePass(val) || 'As senhas não conferem' ]" class="q-mt-md" v-model="passwordCopy" outlined :type="isPwd ? 'password' : 'text'" placeholder="Repita a Senha">
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
        </q-input>
      </div>
    </div>

    <div class="row q-mt-md">
      <div class="col-4 q-pr-sm">
        <q-select outlined v-model="userData.birthDay" :options="dayOptions()" label="Dia" :rules="[val => !!val || requiredField('Dia de Nascimento') ]" />
      </div>
      <div class="col-4 q-pr-sm q-pl-sm">
        <q-select outlined v-model="userData.birthMonth" :options="monthOptions" label="Mês" :rules="[val => !!val || requiredField('Mês de Nascimento') ]" />
      </div>
      <div class="col-4 q-pl-sm">
        <q-select outlined v-model="userData.birthYear" :options="yearOptions()" label="Ano" :rules="[val => !!val || requiredField('Ano de Nascimento') ]" />
      </div>
    </div>

    <div class="row q-mt-md">
      <div class="col-4 q-pr-sm">
        <q-item tag="label" class="outline-label" v-ripple>
          <q-item-section>
            <q-item-label class="text-primary">Feminino</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-radio v-model="userData.gender" val="femmale"/>
          </q-item-section>
        </q-item>
      </div>
      <div class="col-4 q-pr-sm q-pl-sm">
        <q-item tag="label" class="outline-label" v-ripple>
          <q-item-section>
            <q-item-label class="text-primary">Masculino</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-radio v-model="userData.gender" val="male"/>
          </q-item-section>
        </q-item>
      </div>
      <div class="col-4 q-pl-sm">
        <q-item tag="label" class="outline-label" v-ripple>
          <q-item-section>
            <q-item-label class="text-primary">Personalizado</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-radio v-model="userData.gender" val="custom"/>
          </q-item-section>
        </q-item>
      </div>
      <div class="row q-mt-lg">
        <p class="text-primary">Ao clicar em Cadastrar, você concorda com nossos <strong>Termos</strong>, <strong>Política de Dados</strong> e <strong>Política de Cookies</strong></p></div>
      </div>
      <div class="row q-mt-md">
        <q-btn color="primary" type="submit" icon-right="send" no-caps label="Cadastrar" size="lg" class="col-12" />
      </div>
      <div class="row q-mt-lg">
        <q-btn icon="arrow_back" :to="{ name: 'login' }" color="secondary" no-caps label="Voltar" size="md" outline />
      </div>

      <q-dialog v-model="formSent">
        <q-card>
          <q-card-section>
            <div class="text-h6">{{responseTitle}}</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            {{responseMessage}}
          </q-card-section>

          <q-card-section v-if="responseErrors.length" class="q-pt-none">
            <div v-for="(error, index) in responseErrors" :key="index">{{error}}</div>
          </q-card-section>

          <q-card-section v-if="!responseErrors.length" class="q-pt-none">
            Aguarde {{counter}}...
          </q-card-section>

          <q-card-actions align="right">
            <q-btn v-if="responseErrors.length" label="OK" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
  </q-form>
</template>

<script>
import RegisterService from '../../services/account/RegisterService'

export default {
  name: 'SignUpForm',
  data () {
    return {
      isPwd: true,
      passwordCopy: '',
      responseTitle: '',
      responseMessage: '',
      responseErrors: [],
      counter: 5,
      formSent: false,
      userData: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        birthDay: null,
        birthMonth: null,
        birthYear: null,
        gender: null
      },
      monthOptions: [
        { label: 'Jan', value: 1 },
        { label: 'Fev', value: 2 },
        { label: 'Mar', value: 3 },
        { label: 'Abr', value: 4 },
        { label: 'Maio', value: 5 },
        { label: 'Jun', value: 6 },
        { label: 'Jul', value: 7 },
        { label: 'Ago', value: 8 },
        { label: 'Set', value: 9 },
        { label: 'Out', value: 10 },
        { label: 'Nov', value: 11 },
        { label: 'Dez', value: 12 }
      ]
    }
  },
  methods: {
    dayOptions () {
      return this.range(1, 31, 1)
    },
    yearOptions () {
      const currentYear = new Date().getFullYear()
      const limitYear = currentYear - 12
      const startYear = currentYear - 117

      return this.range(startYear, limitYear, 1).reverse()
    },
    range (start, stop, step) {
      return Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step))
    },
    requiredField (fieldName) {
      return `O campo ${fieldName} deve ser preenchido`
    },
    validatePass (password) {
      if (password !== this.userData.password) {
        return false
      }
      return true
    },
    async onSubmit (event) {
      event.preventDefault()
      const valid = await this.$refs['signup-form'].validate()

      if (valid) {
        this.responseTitle = ''
        this.responseMessage = ''
        this.responseErrors = []
        this.sendForm()
      }
    },
    async sendForm () {
      const response = await RegisterService.register(this.userData).then((res) => {
        if (res.status === 200) {
          this.responseTitle = 'Tudo certo!'
          this.responseMessage = 'Sua conta foi criada com sucesso! Iremos te redirecionar para o Login'
          return true
        }

        this.responseTitle = 'Erro'
        this.responseMessage = (this.responseErrors.length === 1) ? 'Houve um erro ao tentar criar a conta:' : 'Houveram erros ao tentar criar a conta:'
        this.responseErrors = res.message

        return false
      }).catch((err) => {
        this.responseTitle = 'Erro'
        this.responseMessage = 'Houve um erro ao criar a conta'
        console.log(err)

        return false
      }).finally(() => {
        this.formSent = true
      })

      if (response) {
        this.redirect(5)
      }
    },
    redirect (time) {
      this.counter = time
      const timer = setInterval(() => {
        if (this.counter === 1) {
          clearInterval(timer)
          this.$router.push({ name: 'login' })
        }
        this.counter -= 1
      }, 1000)
    }
  }
}
</script>

<style>
  .outline-label {
    border: 1px solid rgba(0, 0, 0, 0.24);
    transition: border-color 0.36s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 4px;
  }

  @media (max-width: 768px) {
    .col-xs-12.q-pr-sm,
    .col-xs-12.q-pl-sm {
      padding-right: 0;
      padding-left: 0;
    }

    .last-name-wrapper {
      margin-top: 15px;
      margin-bottom: 10px;
    }
  }
</style>
