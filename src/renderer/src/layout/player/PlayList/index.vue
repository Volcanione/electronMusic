<template>
  <Drawer
    :open="open"
    placement="bottom"
    :get-container="false"
    height="80%"
    :autofocus="false"
    :closable="false"
    :z-index="99999"
    force-render
    :body-style="{ padding: 0, backfaceVisibility: 'hidden', overflow: 'hidden' }"
    @close="close"
  >
    <List />
  </Drawer>
</template>

<script lang="ts" setup>
import { Drawer } from 'ant-design-vue'
import List from './components/list.vue'
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
