<template>
  <div>
    <Nav></Nav>
    <div class="page">
      <router-view />
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav'

export default {
  name: 'Admin',
  components:{ Nav }
}
</script>

<style>
  .page {
    margin-left: 220px;
    padding: 20px 25px;
  }
</style>
