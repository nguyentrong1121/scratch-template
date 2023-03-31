<template>
  <q-page class="flex column flex-center text-white">
    <!-- <state-info /> -->

    <page-fold />
    <games-case />
    <main-boxes />

  </q-page>
</template>

<script>
// import StateInfo from 'src/components/StateInfo.vue';
import GamesCase from 'src/components/GamesCase.vue';
import PageFold from 'src/components/PageFold.vue';
import MainBoxes from 'src/components/MainBoxes.vue';

export default {
  components: { 
    // StateInfo, 
    PageFold, 
    GamesCase, 
    MainBoxes, 
  },
  name: 'PageIndexEthers',
};
</script>
