<template>
  <q-list class="channel-list q-gutter-md">
    <q-item v-for="item in channelList" :key="item.id" class="channel-list-item" clickable v-ripple>
      <q-item-section class="avatar-wrapper" avatar top>
        <q-avatar class="q-mr-sm avatar-img" size="52px">
          <img :src="item.image_src">
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <div class="row justify-start q-gutter-lg channel-info">
          <div class="text-weight-bold text-subtitle1">{{item.name}}</div>
          <div class="row justify-start channel-stats">
            <div class="q-pr-sm text-weight-regular internal-followers">{{item.subscribers}}</div>
            <div class="internal-followers-icon"><q-icon name="group" /></div>
          </div>
        </div>
      </q-item-section>
      <q-item-section top side>
        <div class="text-grey-8 q-gutter-xs">
          <q-btn @click="removeItem(item.id)" size="16px" flat round icon="close" />
        </div>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
export default {
  name: 'SelectedChannelsList',
  props: {
    channelList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    removeItem (itemId) {
      this.$emit('removeItem', itemId)
    }
  }
}
</script>
