<template>
  <div>
    <div @click="$routerBack()">backHome</div>
    <div @click="$router.replace('/search/test2')">jumpothersearch</div>
    <div @click="$routerBack('/search')">backSearch</div>
  </div>
</template>

<script lang="ts" setup></script>
