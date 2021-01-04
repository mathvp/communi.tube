<template>
  <div>
    <div class="row">
      <div class="col-md-6 col-xs-12 q-pr-sm">
        <q-input outlined v-model="firstName" label="Nome" />
      </div>
      <div class="col-md-6 col-xs-12 q-pl-sm last-name-wrapper">
        <q-input outlined v-model="lastName" label="Sobrenome" />
      </div>
    </div>

    <q-input outlined color="primary" v-model="email" placeholder="Email" />

    <div class="row">
      <div class="col-md-6 col-xs-12 q-pr-sm">
        <q-input class="q-mt-md" v-model="password" outlined :type="isPwd ? 'password' : 'text'" placeholder="Senha">
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
        <q-input class="q-mt-md" v-model="passwordCopy" outlined :type="isPwd ? 'password' : 'text'" placeholder="Repita a Senha">
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
        <q-select outlined v-model="birthDay" :options="dayOptions()" label="Dia" />
      </div>
      <div class="col-4 q-pr-sm q-pl-sm">
        <q-select outlined v-model="birthMonth" :options="monthOptions" label="Mês" />
      </div>
      <div class="col-4 q-pl-sm">
        <q-select outlined v-model="birthYear" :options="yearOptions()" label="Ano" />
      </div>
    </div>

    <div class="row q-mt-md">
      <div class="col-4 q-pr-sm">
        <q-item tag="label" class="outline-label" v-ripple>
          <q-item-section>
            <q-item-label class="text-primary">Feminino</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-radio v-model="gender" val="femmale"/>
          </q-item-section>
        </q-item>
      </div>
      <div class="col-4 q-pr-sm q-pl-sm">
        <q-item tag="label" class="outline-label" v-ripple>
          <q-item-section>
            <q-item-label class="text-primary">Masculino</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-radio v-model="gender" val="male"/>
          </q-item-section>
        </q-item>
      </div>
      <div class="col-4 q-pl-sm">
        <q-item tag="label" class="outline-label" v-ripple>
          <q-item-section>
            <q-item-label class="text-primary">Personalizado</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-radio v-model="gender" val="custom"/>
          </q-item-section>
        </q-item>
      </div>
      <div class="row q-mt-lg">
        <p class="text-primary">Ao clicar em Cadastrar, você concorda com nossos <strong>Termos</strong>, <strong>Política de Dados</strong> e <strong>Política de Cookies</strong></p></div>
      </div>
      <div class="row q-mt-md">
        <q-btn color="primary" icon-right="send" no-caps label="Cadastrar" size="lg" class="col-12" />
      </div>
      <div class="row q-mt-lg">
        <q-btn icon="arrow_back" :to="{ name: 'login' }" color="secondary" no-caps label="Voltar" size="md" outline />
      </div>
    </div>
</template>

<script>

export default {
  name: 'SignUpForm',
  data () {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordCopy: '',
      isPwd: true,
      birthDay: null,
      birthMonth: null,
      birthYear: null,
      monthOptions: [
        'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
      ],
      gender: null
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
