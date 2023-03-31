<template>
    <div class="ticket-gal-container column animate">
        <h1 class="text-center text-white">MY SCRATCH CARDS</h1>
        <p class="full-width text-center bg-black text-red">Our system is not yet live, we are only testing it. (v0.0.46)</p>
        <div class="tickets-container">


            <div class="titleholder flex justify-between">
                <div class="title">Unscratched cards <span>469</span></div>
                <q-btn rounded no-caps no-wrap size="lg" color="primary" class="z-max">SCRATCH'EM ALL</q-btn>
            </div>

            <div class="flex q-mb-lg">
                <div class="ticket-item q-pa-lg column" v-for="(item, index) in ticketItems" :key="index">

                    <q-dialog v-model="item.numb" >
                      <q-card class="game-dialog text-white" >
                        <q-card-section class="row items-center q-pb-md">
                          <div class="text-h4 text-white"><b>SCRATCH <span class="text-primary">{{ item.number }}</span ></b></div>
                          <q-space />

                          <q-btn size="xl" icon="close" color="white" flat round dense v-close-popup />
                        </q-card-section>
                        <q-card-section class="row items-center">
                          <div class="col-5 column non-selectable">
                            <img :src="item.imglogo" alt="" class="game-dialog-logo  q-mx-xl" />
                            <div class="text-center">Scratch Test Page</div>
                          </div>

                          <div class="game relative-position non-selectable">
                            <scratch-card :key="renderCount"
                                          :cardWidth="cardWidth"
                                          :cardHeight="cardHeight"
                                          :finishPercent="finishPercent"
                                          imageUrl="games/test-scratch.png"
                                          :brushUrl="brushUrl"
                                          :forceReveal="forceReveal">
                                <div class="card-content"><img src="games/test-nft.png" alt="" class="game-dialog-card non-selectable" /></div>
                            </scratch-card>
                            <!-- <img src="games/test-scratch.png" alt="" class="game-dialog-card non-selectable absolute" /> -->

                          </div >
                        </q-card-section>
                      </q-card>
                    </q-dialog>

                    <img :src="item.imgcard" alt="" class="game-card non-selectable" />
                    <div class="cardnumber">{{ item.number }}</div>
                    <div class="full-width">
                        <q-btn rounded no-caps no-wrap size="xl" @click="item.numb = true" color="primary" class="full-width">SCRATCH</q-btn>
                    </div>
                </div>
            </div>


            <div class="titleholder flex justify-between">
                <div class="title">Unclaimed cards <span>14</span></div>
                <q-btn rounded no-caps no-wrap size="lg" color="primary" class="z-max">CLAIM'EM ALL</q-btn>
            </div>
            <div class="flex q-mb-lg">
                <div class="ticket-item q-pa-lg items-center justify-center text-center" v-for="(item, index) in ticketItems" :key="index">

                    <img :src="item.imgcard" alt="" class="game-card non-selectable" />
                    <div class="cardnumber">{{ item.number }}</div>
                    <div class="prize">{{ item.prize }}</div>
                    <div class="full-width">
                        <q-btn rounded no-caps no-wrap size="xl" color="primary" class="full-width">CLAIM</q-btn>
                    </div>
                </div>
            </div>


            <div class="titleholder flex justify-between">
                <div class="title">Claimed or Rewardless cards <span>14</span></div>
                <q-btn rounded no-caps no-wrap size="lg" color="primary" class="z-max">BURN'EM ALL</q-btn>
            </div>
            <div class="flex rewardless">
                <div class="ticket-item q-pa-lg items-center justify-center text-center" v-for="(item, index) in ticketItems" :key="index">

                    <img :src="item.imgcard" alt="" class="game-card non-selectable" />
                    <div class="cardnumber">{{ item.number }}</div>
                </div>
            </div>


        </div>
    </div>
</template>

<script>
import ScratchCard from 'vue-scratchcard';
import BRUSH from '../assets/brush.png';

export default {
  name: 'TicketCase',
  components: {
      ScratchCard,
    },
  data() {
    return {
      renderCount: 0,
        cardWidth: 522,
        cardHeight: 1000,
        finishPercent: 95,
        brushUrl: BRUSH,
        forceReveal: false,
      playgame: false,
        ticketItems: [
        {
          name: 'Win $50, $100 or $200',
          imgcard: 'games/game-card-win.png',
          imglogo: 'games/game-logo-win.png',
          prize: '$1200',
          number: '#001-234234',
          numb: 'num01',
        },
        {
          name: 'EASY! $75 or $150',
          imgcard: 'games/game-card-easy.png',
          imglogo: 'games/game-logo-win.png',
          prize: '$200',
          number: '#001-785357',
          numb: 'num02',
        },
        {
          name: 'EASY! $75 or $150',
          imgcard: 'games/game-card-easy.png',
          imglogo: 'games/game-logo-easy.png',
          prize: '$200',
          number: '#001-001283',
          numb: 'num02',
        },
        {
          name: 'BLASTOUT! $500',
          imgcard: 'games/game-card-blastout.png',
          imglogo: 'games/game-logo-blastout.png',
          prize: '$5000',
          number: '#001-000325',
          numb: 'num03',
        },
        {
          name: 'X200',
          imgcard: 'games/game-card-x200.png',
          imglogo: 'games/game-logo-x200.png',
          prize: '$200',
          number: '#001-00001899',
          numb: 'num04',
        },
        {
          name: 'Booooom $1000',
          imgcard: 'games/game-card-booooom.png',
          imglogo: 'games/game-logo-booooom.png',
          prize: '$200',
          number: '#001-03335',
          numb: 'num05',
        },
        {
          name: 'WIN 6.250, 12.500 or 62.500 $ROUL ',
          imgcard: 'games/game-card-roul.png',
          imglogo: 'games/game-logo-roul.png',
          prize: '$ROUL 12.500',
          number: '#001-0555443',
          numb: 'num06',
        },
        {
          name: 'REAL GAIN',
          imgcard: 'games/game-card-rg-roul.png',
          imglogo: 'games/game-logo-rg-roul.png',
          prize: '$ROUL 200',
          number: '#001-2299283',
          numb: 'num07',
        },
      ],
    };
  },
};
</script>

<style scoped>

.game-dialog {width: 1200px; max-width: 80vw; border-radius: 20px !important; backdrop-filter: blur(20px); background: #2a364d91; box-shadow: 0 0 40px 20px black; padding: 50px;}
.game-dialog-logo {max-width: 250px; margin: 0 auto;}
.game-dialog-card { margin: 0 auto; padding: 0; }
.titleholder {background: black; padding: 20px 20px 20px 40px; border-radius: 40px;}
.title {font-size: 3.5rem; font-weight: 900; position: relative; color: white}
.title span {background: #da0a48; color: black; border-radius: 100px; line-height: 1; padding: 10px; position: absolute; top: -5px; font-size: 1.5rem; font-weight: 900; }
.rewardless {filter: saturate(0.4);}


.ticket-gal-container {
  max-width: 90vw;
  width: 1500px;
  display: block;
}
.tickets-container {
  backdrop-filter: blur(5px);
  padding: 50px 50px;
  border-radius: 80px;
  border: 1px solid #68f3e0;
  box-shadow: 0 0 20px 20px #00000057;
}
.ticket-item {
  align-items: center;
  justify-items: center;
  border-radius: 40px;
  background: #24334e28;
  margin: 10px;
  position: relative;
  transition: all 0.6s ease;
  perspective: 1200px;
  perspective-origin: 50% 50%;
  transition: all 0.5s ease;
  z-index: 9;
  box-shadow: 0 5px 10px -5px black;
  transform: translateY(10px);
}
.ticket-item:hover{box-shadow:0 10px 30px -10px black;background:#060e1eb5;z-index:999;transform:translateY(0px);}

.ticket-item .game-card{max-width:205px;transform:rotateZ(0deg);margin:-40px 0px -20px 0px;transition:all 1.5s cubic-bezier(0.19,1,0.22,1);z-index:9;}
.ticket-item:hover .game-card{ transform:rotate3d(400, 0, 0, -30deg) scale(1.3) translateY(-20px) ; z-index:999999;filter:drop-shadow(-20px 10px 20px black);}
.rewardless .ticket-item:hover .game-card{ filter: brightness(0) !important; transform:rotate3d(0, -180, 0, 180deg) scale(0.9) translateY(0px);z-index:999999;filter:drop-shadow(-20px 10px 20px black);}

.prize {background: radial-gradient(ellipse farthest-corner at right bottom, #FEDB37 0%, #FDB931 8%, #9f7928 30%, #8A6E2F 40%, transparent 80%),
                radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #FFFFAC 8%, #D1B464 25%, #5d4a1f 62.5%, #5d4a1f 100%);
                color: #3e2f0c;
                font-size: 1.6rem; font-weight: 900;
                margin: 10px 0; border-radius: 20px; border: 2px solid #5d4a1f;
        }


@media screen and (max-width: 1921px) {
  /* .ticket-gal-container{transform:scale(0.75); } */
}

@media screen and (min-width: 2921px) {
  /* .ticket-gal-container{transform:scale(1.25); margin-top: 220px; } */
}
</style>
