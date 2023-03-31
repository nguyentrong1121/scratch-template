<template>
  <q-layout view="lHh lpr fff">
    <q-header class="bg-transparent">
      <q-toolbar class="text-primary align-center">
        <q-toolbar-title class="q-px-xl">
          <!-- <p v-if="TR"> TR <strong>BOLD</strong> TEST</p>
          <p v-if="EN"> EN <strong>BOLD</strong> TEST</p> -->
        </q-toolbar-title>
        <div class="btncase flex">
          <q-btn rounded no-caps size="lg" class="q-mr-md" color="primary" to="/">Home</q-btn>
          <q-btn rounded no-caps size="lg" class="q-mr-md" color="primary" to="/myScratchcards">My Scratch Cards</q-btn>
          <q-btn rounded no-caps size="lg" class="q-mr-md" color="teal-12" text-color="black" to="/Games">Buy a Scratch Card</q-btn>
          <!-- <q-btn class="border-radius q-mr-md" >My Scratchcards</q-btn> -->
          
          <div class="flex q-mr-md">
            <div class="lang-selected bg-primary text-white q-px-sm border-radius flex justify-center items-center text-bold" v-if="TR">CH</div>
            <q-btn class="border-radius q-mx-sm" @click="LANG_SWITCH">{{ TR ? 'EN' : 'CH' }}</q-btn>
            
            <div class="lang-selected bg-primary text-white q-px-sm border-radius flex justify-center items-center text-bold" v-if="EN">EN</div>
          </div>
          <connect class="q-mr-md"/>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer reveal elevated class="footer">
      <q-toolbar class="full-width bg-blue-grey-10 text-white text-subtitle2 flex items-between q-py-sm q-px-xl row ">
        <div class="col-4 flex items-center justify-start no-wrap">
          <div class="flex items-center justify-start text-primary no-wrap q-mr-xl">
            Powered by <a href="https://arbitrum.io/" target="_blank" class="flink"><img src="~assets/arbitrium-logo.png" alt="" class="footerlogo non-selectable" /></a>
          </div>
          <!-- <div class="flex items-center justify-start text-primary no-wrap">
            Provably fair by <a href="https://supraoracles.com/" target="_blank" class="flink"><img src="~assets/supra-logo.svg" alt="" class="footerlogo non-selectable" /></a>
          </div> -->
        </div>
        <div class="col-4 flex items-center justify-center no-wrap">Copyright © 2023 Scratch'em. All rights reserved.</div>
        <div class="col-4 flex items-center justify-end no-wrap">
          <!-- <div class="flex items-center justify-start text-primary no-wrap q-mr-md">
            Partnered with <a href="https://www.alien.fi/" target="_blank" class="flink"><img src="~assets/alien-logo.png" alt="" class="footerlogo non-selectable" /></a>
          </div> -->
          <!-- <div class="flex items-center justify-start text-primary no-wrap">
            &amp; <a href="https://arbiroul.xyz/" target="_blank" class="flink"><img src="~assets/arbiroul-logo.png" alt="" class="footerlogo non-selectable" /></a>
          </div> -->
          <div class="flex items-center justify-start text-primary no-wrap">
            Provably fair by <a href="https://supraoracles.com/" target="_blank" class="flink"><img src="~assets/supra-logo.svg" alt="" class="footerlogo non-selectable" /></a>
          </div>
        </div>
      </q-toolbar >
    </q-footer>
  </q-layout>
</template>

<style>
.btncase { padding: 20px; backdrop-filter: blur(30px); border-radius: 0 0 0 20px; border: 1px solid #68f3e0;
    box-shadow: 0 0 20px 20px #00000057; margin: -2px -15px;}

    .flink {border-radius: 10px; display: flex; padding: 5px; align-items: center; margin-left: 10px; transition: all .5s ease;}
    .flink:hover {background: #ffffff1e;}
    .footer * {font-size: 1.1rem;}
.footerlogo {width: 170px; padding: 0; max-height: 45px;  object-position: 0; }  


</style>

<script>
import Connect from 'components/Connect.vue';

export default {
  name: 'MainLayout',

  components: {
    Connect,
  },

  data() {
    return {};
  },

  methods: {
    LANG_SWITCH() {
      if (this.TR) {
        this.$i18n.locale = 'en-us';
        this.$q.localStorage.set('locale', 'en-us');
      } else {
        this.$i18n.locale = 'tr';
        this.$q.localStorage.set('locale', 'tr');
      }
    },
  },

};
</script>
