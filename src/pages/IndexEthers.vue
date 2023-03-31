<template>
  <q-page class="flex flex-center bg-brown-sun text-white">
    <!-- <state-info /> -->

    
    <page-fold />
    <show-case />
    <!-- <tester /> -->
    <main-boxes />
    <partners />

  </q-page>
</template>

<script>
// import StateInfo from 'src/components/StateInfo.vue';
import PageFold from 'src/components/PageFold.vue';
import ShowCase from 'src/components/ShowCase.vue';
import MainBoxes from 'src/components/MainBoxes.vue';
import Partners from 'src/components/Partners.vue';
// import Tester from 'src/components/Tester.vue';

export default {
  components: { 
    // StateInfo, 
    PageFold, 
    ShowCase, 
    MainBoxes, 
    Partners,
    // Tester 
  },
  name: 'PageIndexEthers',
};
</script>
