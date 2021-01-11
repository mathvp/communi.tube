<template>
  <q-page class="q-pa-lg">
    <main-logo class="main-logo responsive-image q-mb-xl" :width="'400'" :format="'horizontal'" />
    <h1 class="text-h4 text-center text-weight-bolder text-secondary q-mt-xl">Quais canais você mais gosta de assistir?</h1>
    <div class="channel-selection-wrapper">
      <q-input bottom-slots id="channel-search" v-model="searchTerm" placeholder="Digite o nome do canal" outlined>
        <template v-slot:append>
          <q-icon v-if="searchTerm !== ''" name="close" @click="searchTerm = ''" class="cursor-pointer" />
          <q-icon name="search" />
        </template>
        <template v-slot:hint>
          <div class="row justify-between text-primary hint">
            <div>Ex.: Manual do Mundo, Coisa de Nerd, Via Infinda</div>
            <a href="#">Problemas para encontrar?</a>
          </div>
        </template>
      </q-input>

      <h2 class="text-h5 text-weight-bolder text-secondary q-pt-lg q-pb-md q-mt-xl">Canais selecionados</h2>

      <q-list class="channel-list q-gutter-md">
        <q-item class="channel-list-item" clickable v-ripple>
          <q-item-section class="avatar-wrapper" avatar top>
            <q-avatar class="q-mr-sm avatar-img" size="52px">
              <img src="https://yt3.ggpht.com/ytc/AAUvwnh3qcXoKDGfaEE_tqvBu-VCHcUg0lEPXjBNFT4rgA=s176-c-k-c0x00ffffff-no-rj-mo">
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <div class="row justify-start q-gutter-lg channel-info">
              <div class="text-weight-bold text-subtitle1">Flow Podcast</div>
              <div class="row justify-start channel-stats">
                <div class="q-pr-sm text-weight-regular internal-followers">33.768</div>
                <div class="internal-followers-icon"><q-icon name="group" /></div>
              </div>
            </div>
          </q-item-section>
          <q-item-section top side>
            <div class="text-grey-8 q-gutter-xs">
              <q-btn size="16px" flat round icon="close" />
            </div>
          </q-item-section>
        </q-item>
        <q-item class="channel-list-item" clickable v-ripple>
          <q-item-section class="avatar-wrapper" avatar top>
            <q-avatar class="q-mr-sm avatar-img" size="52px">
              <img src="https://yt3.ggpht.com/ytc/AAUvwniEl2J4ywDc8D41byMawOduXc3mXZCu9PPVzo0wpA=s176-c-k-c0x00ffffff-no-rj-mo">
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <div class="row justify-start q-gutter-lg channel-info">
              <div class="text-weight-bold text-subtitle1">MW Informática</div>
              <div class="row justify-start channel-stats">
                <div class="q-pr-sm text-weight-regular internal-followers">12.056</div>
                <div class="internal-followers-icon"><q-icon name="group" /></div>
              </div>
            </div>
          </q-item-section>
          <q-item-section top side>
            <div class="text-grey-8 q-gutter-xs">
              <q-btn size="16px" flat round icon="close" />
            </div>
          </q-item-section>
        </q-item>
      </q-list>

      <div class="text-primary q-py-xl q-pl-md" style="font-size: 18px">
        Não lembra de todos? Sem problemas, você pode adicionar mais canais depois
      </div>

      <div class="channel-selection-actions row q-gutter-sm justify-between q-mb-xl">
        <q-btn flat no-caps color="primary" class="col-3 q-py-sm" label="Pular"/>
        <q-btn no-caps size="lg" color="primary" class="text-weight-bold btn-send q-py-sm col-8" label="Ok, já selecionei meus canais favoritos"/>
      </div>
    </div>
  </q-page>
</template>

<script>
import Logo from 'components/base/Logo'

export default {
  name: 'Login',
  components: {
    'main-logo': Logo
  },
  data () {
    return {
      searchTerm: ''
    }
  }
}
</script>

<style>
  .channel-selection-wrapper {
    max-width: 640px;
    width: 100%;
    margin: 0 auto;
  }

  .channel-list .channel-list-item {
    border: 1px solid #ccc;
    border-radius: 50px;
  }

  .channel-list-item .avatar-wrapper {
    align-self: center;
  }

  .channel-list-item .avatar-wrapper .avatar-img {
    margin-left: -7px;
  }

  .channel-stats .internal-followers {
    font-size:14px;
    line-height: 30px;
    color: #666;
  }

  .channel-stats .internal-followers-icon {
    font-size:14px;
    line-height: 27px;
    color: #666;
  }

  .hint, .hint a {
    font-size: 14px;
    text-decoration: none;
  }

  .channel-selection-actions .btn-send {
    font-size: 16px !important;
    font-weight: 900;
    letter-spacing: .2px;
  }

  @media (max-width: 539px) {
    .hint {
      justify-content: flex-end;
      padding-left: 0;
    }

    .hint a {
      padding-top: 5px;
    }

    .q-field__bottom {
      padding-left: 0;
    }

    .channel-list .channel-list-item .channel-info .text-subtitle1 {
      width: 100%;
    }

    .channel-list-item .channel-info .channel-stats {
      margin-top: 0;
    }
  }
</style>
