<template>
  <div class="z-max">
    <div class="left-block flex column justify-center items-center">
      <a class="logo" href="/" >
        <img alt="Scratch-em logo" src="~assets/Logo.svg"   />
      </a>
      <div class="flex column justify-center">
        <q-btn @click="goto('https://twitter.com/scratch_em')" outline rounded no-caps no-wrap color="white"
          class="sm-btn bg-dark" ><img class="smicon" src="~assets/sm-twitter.svg" />
          <q-tooltip  anchor="center right" self="center left" :offset="[10, 10]">
            Follow us on Twitter
          </q-tooltip>
        </q-btn>
        <q-btn @click="goto('https://discord.gg/snPcfzMbnJ')" outline rounded no-caps no-wrap color="white" class="sm-btn bg-dark"><img
            class="smicon" src="~assets/sm-discord.svg" />
          <q-tooltip  anchor="center right" self="center left" :offset="[10, 10]">
            Join our Discord
          </q-tooltip>
        </q-btn>
        <q-btn @click="goto('http://docs.scratchem.io/')" outline rounded no-caps no-wrap color="white" class="sm-btn bg-dark" ><img
            class="smicon" src="~assets/sm-gitbook.svg" />
            <q-tooltip  anchor="center right" self="center left" :offset="[10, 10]">
            <!-- {{ $t('soon_text') }} -->
            Everything you need to know!
          </q-tooltip>
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script>

</script>

<style>

.left-block {position: fixed; top: 3vw; left: 1vw;}

.logo{width:150px; cursor: pointer; transition: all .5s ease;}
.logo:hover{width:160px; cursor: pointer;}

</style>
