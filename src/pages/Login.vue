<template>
  <q-page padding>
    <div class="page-wrapper row">
      <div class="col-md-6 col-sm-12">
        <div class="first-col">
          <main-logo class="main-logo responsive-image" :width="'500'" />
          <h5 class="text-h5">Encontre pessoas que assistem os mesmos canais no Youtube que você!</h5>
          <img class="desktop-only" src="~assets/people-world.png" width="500">
        </div>
      </div>
      <div class="col-md-6 col-sm-12 second-col">
        <h2 class="text-h2 text-primary">Bem-vindo(a)</h2>
        <login-form class="login-form" />
        <div class="login-footer q-mt-lg">
          <footer-links class="footer-links" />
          <div class="copyright text-primary">Todos os direitos reservados @ 2020</div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import Logo from 'components/base/Logo'
import LoginForm from 'components/forms/LoginForm'
import FooterLinksPolicy from 'components/navigation/FooterLinksPolicy'

export default {
  name: 'Login',
  components: {
    'main-logo': Logo,
    'login-form': LoginForm,
    'footer-links': FooterLinksPolicy
  },
  data () {
    return {
    }
  }
}
</script>

<style>
  .page-wrapper {
    max-width: 1366px;
    margin: 0 auto;
  }

  .first-col {
    max-width: 500px;
    float: right;
    margin-right: 15%;
  }

  .second-col {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: stretch;
  }

  .second-col h2 {
    margin: 0;
    margin-top: 22%;
    margin-bottom: 10px;
    font-weight: bold;
  }

  .login-form {
    max-width: 500px;
    flex: 1;
  }

  .login-footer {
    max-width: 500px;
    display: flex;
    align-items: end;
    justify-content: space-between;
    flex: 1;
    margin-bottom: 5%;
  }

  .login-footer .footer-links {
    max-width: 50%;
  }

  .login-footer .copyright {
    font-size: 12px;
  }

  @media (max-width: 768px) {
    .page-wrapper {
      padding: 15px;
    }

    .main-logo {
      margin: 0 auto;
      display: block;
    }

    .responsive-image {
      width: 100%;
      max-width: 80vw;
    }

    .first-col {
      margin: 0;
    }

    .first-col h5 {
      font-size: 18px;
      text-align: center;
      line-height: 22px;
      font-weight: normal;
    }

    .second-col h2 {
      margin: 0;
      font-size: 28px;
      text-align: center;
    }

    .login-form button {
      width: 100%;
    }

    .login-form button.cancel-btn {
      margin-top: 20px;
    }

    .login-footer {
      flex-direction: column;
      margin-top: 80px;
    }

    .login-footer .footer-links {
      max-width: 100%;
      width: 100%;
    }

    .login-footer .copyright {
      width: 100%;
      text-align: center;
      margin-top: 30px;
    }
  }

</style>
