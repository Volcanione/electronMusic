<template>
  <Drawer
    :open="open"
    placement="bottom"
    :get-container="false"
    height="100%"
    :autofocus="false"
    :closable="false"
    force-render
    :body-style="{ padding: 0, backfaceVisibility: 'hidden' }"
    :mask-style="{ background: 'transparent', backfaceVisibility: 'hidden' }"
    @close="close"
  >
    <!-- <div style="background: red" @click="close">1</div> -->
    <PlayerController @close="close" />
  </Drawer>
</template>

<script lang="ts" setup>
import { Drawer } from 'ant-design-vue'
import PlayerController from './PlayerController/index.vue'
// import { ref } from 'vue'

defineProps<{
  open: boolean
}>()

const openValue = defineModel<boolean>('open', { required: true })

const emit = defineEmits(['close'])

const close = () => {
  openValue.value = false
  emit('close')
}
</script>
