<template>
    <q-page class="q-pa-lg">
      <main-logo class="main-logo responsive-image q-mb-xl" :width="'400'" :format="'horizontal'" />
      <div class="text-center">
        <h3>Complete seu perfil</h3>
        <p>Termine de preencher as informações do seu perfil</p>
        <q-avatar class="q-mt-xl" color="primary" text-color="white" size="200px">
          <q-icon v-if="!hasImage" size="180px" name="person" />
          <img v-if="hasImage" :src="userData.image_src">
          <q-badge @click="imageModal = true" floating class="q-pa-sm cursor-pointer" color="info">
            <q-icon name="edit" /> Editar
          </q-badge>
        </q-avatar>
        <h4 class="text-h4 text-weight-bold">{{firstName}} {{lastName}}</h4>
      </div>

      <q-dialog
        v-model="imageModal"
        persistent
        maximized
        transition-show="slide-up"
        transition-hide="slide-down"
      >
        <q-card>
          <q-card-section class="bg-white" align="right">
            <q-space />
            <q-btn dense flat icon="close" v-close-popup>
              <q-tooltip content-class="bg-white text-primary">Fechar</q-tooltip>
            </q-btn>
          </q-card-section>
          <q-card-section>
            <div class="text-h6">Editar foto de Perfil</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-uploader
              id="image-uploader"
              url="http://localhost:8080/upload-profile-picture"
              label="Clique ou arraste uma imagem"
              accept=".jpg, image/*"
              @rejected="onRejected"
              @uploaded="onUploaded"
            />
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancelar" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog v-model="uploadError">
      <q-card>
        <q-card-section>
          <div class="text-h6">Erro</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Houve um erro ao realizar o upload
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
      <div class="text-right">
        <a href="#" class="text-primary">Pular</a>
      </div>
    </q-page>
</template>

<script>

import Logo from 'components/base/Logo'
import UserService from '../services/user/UserService'

export default {
  name: 'CompleteProfile',
  components: {
    'main-logo': Logo
  },
  data () {
    return {
      hasImage: false,
      imageModal: false,
      firstName: '',
      lastName: '',
      file: null,
      uploadError: false,
      userData: {
        image_src: ''
      }
    }
  },
  methods: {
    onRejected (rejectedEntries) {
      this.uploadError = true
    },
    onUploaded () {
      this.$q.notify({
        message: 'Upload realizado!',
        color: 'positive'
      })
      this.imageModal = false
    },
    async getUserData () {
      const response = await UserService.getUser()
      this.firstName = response.data.first_name
      this.lastName = response.data.last_name
    }
  },
  created () {
    this.getUserData()
  }
}
</script>

<style>
#image-uploader {
  width: 100%;
  height: 100vh;
}
</style>
