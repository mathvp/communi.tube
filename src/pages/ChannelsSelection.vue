<template>
  <q-page class="q-pa-lg">
    <main-logo class="main-logo responsive-image q-mb-xl" :width="'400'" :format="'horizontal'" />
    <h1 class="text-h4 text-center text-weight-bolder text-secondary q-mt-xl">Quais canais você mais gosta de assistir?</h1>
    <div class="channel-selection-wrapper">
      <q-select
        outlined
        v-model="searchTerm"
        use-input
        hide-selected
        fill-input
        input-debounce="0"
        :options="options"
        option-value="name"
        option-label="name"
        @filter="filterFn"
        @input="selectChannel"
        bottom-slots
        placeholder="Digite o nome do canal"
        class="q-mb-lg"
        id="channel-search"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              Nada encontrado...
            </q-item-section>
          </q-item>
        </template>
        <template v-slot:option="scope">
          <q-item
            clickable
            v-ripple
            v-bind="scope.itemProps"
            v-on="scope.itemEvents"
          >
            <q-item-section side>
              <q-avatar rounded size="48px">
                <img :src="scope.opt.image_src" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>
                {{ scope.opt.name }} <q-icon v-if="scope.opt.verified" size="xs" color="info" name="verified" />
              </q-item-label>
              <q-item-label caption>{{ scope.opt.description }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              Clique para adicionar
            </q-item-section>
          </q-item>
        </template>
        <template v-slot:hint>
          <div class="row justify-between text-primary hint">
            <div>Ex.: Manual do Mundo, Coisa de Nerd, Via Infinda</div>
            <a href="#">Problemas para encontrar?</a>
          </div>
        </template>
      </q-select>

      <h2 v-if="selectedChannelsList.length" class="text-h5 text-weight-bolder text-secondary q-pt-lg q-pb-md q-mt-xl">Canais selecionados</h2>

      <channel-list v-if="selectedChannelsList.length" :channelList="selectedChannelsList" @removeItem="removeItem"/>
      <div v-if="selectedChannelsList.length" class="text-primary q-py-xl q-pl-md" style="font-size: 18px">
        Não lembra de todos? Sem problemas, você pode adicionar mais canais depois
      </div>

      <div class="channel-selection-actions row q-gutter-sm q-mb-xl" :class="[ selectedChannelsList.length ? 'justify-between' : 'justify-end' ]">
        <q-btn flat no-caps color="primary" class="col-3 q-py-sm" label="Pular"/>
        <q-btn @click="saveChannelList" v-if="selectedChannelsList.length" no-caps size="lg" color="primary" class="text-weight-bold btn-send q-py-sm col-8" label="Ok, já selecionei meus canais favoritos"/>
      </div>
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

  </q-page>
</template>

<script>
import Logo from 'components/base/Logo'
import SelectedChannelsList from 'components/channel/SelectedChannelsList'
import UserChannelsService from '../services/user/UserChannelsService'
import YoutubeService from '../services/channel/YoutubeService'

export default {
  name: 'Login',
  components: {
    'main-logo': Logo,
    'channel-list': SelectedChannelsList
  },
  data () {
    return {
      searchTerm: null,
      responseTitle: '',
      responseMessage: '',
      responseErrors: [],
      counter: 5,
      formSent: false,
      listItem: {
        image: {
          src: ''
        },
        name: '',
        description: '',
        subscribers: 0
      },
      channelList: [
        {
          image_src: 'https://yt3.ggpht.com/ytc/AAUvwniEl2J4ywDc8D41byMawOduXc3mXZCu9PPVzo0wpA=s176-c-k-c0x00ffffff-no-rj-mo',
          name: 'MW Informática',
          description: 'MW',
          subscribers: '3000000',
          verified: true
        }
      ],
      selectedChannelsList: [],
      options: []
    }
  },
  methods: {
    removeItem (itemId) {
      this.selectedChannelsList = this.selectedChannelsList.filter((item) => { return item.id !== itemId })
    },
    saveChannelList () {
      this.callChannelListService().then().catch((error) => {
        console.log('ERRO:', error)
      })
    },
    async callChannelListService () {
      const response = await UserChannelsService.saveChannels(this.selectedChannelsList).then((res) => {
        if (res.status === 200) {
          this.responseTitle = 'Tudo certo!'
          this.responseMessage = 'Seus canais preferidos foram salvos'
          return true
        }

        this.responseTitle = 'Erro'
        this.responseMessage = 'Houve um erro ao tentar salvar os canais...'
        return false
      }).catch((error) => {
        this.responseTitle = 'Erro'
        this.responseMessage = 'Houve um erro ao tentar salvar os canais...'

        console.log(error)

        return false
      }).finally(() => {
        this.formSent = true
      })

      if (response) {
        this.redirect(5)
      }
    },
    filterFn (val, update, abort) {
      if (val.length < 5) {
        abort()
        return
      }

      update(async () => {
        const search = val.toLowerCase()
        const searchResponse = await YoutubeService.getChannels(search)

        if (searchResponse.status === 200) {
          this.channelList = searchResponse.data
        }
        this.options = this.channelList
      })
    },
    async selectChannel (channel) {
      await this.selectedChannelsList.unshift(channel)
      this.searchTerm = null
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
