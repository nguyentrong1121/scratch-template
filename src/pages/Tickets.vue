<template>
  <q-page class="flex column flex-center text-white">
    <!-- <state-info /> -->

    <page-fold />
    <ticket-case />
    <main-boxes />

  </q-page>
</template>

<script>
// import StateInfo from 'src/components/StateInfo.vue';
import TicketCase from 'src/components/TicketCase.vue';
import PageFold from 'src/components/PageFold.vue';
import MainBoxes from 'src/components/MainBoxes.vue';

export default {
  components: {
    // StateInfo,
    PageFold,
    TicketCase,
    MainBoxes,
  },
  name: 'PageIndexEthers',
};
</script>
