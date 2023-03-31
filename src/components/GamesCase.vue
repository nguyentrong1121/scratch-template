<template>
  <div class="gallery-container column animate">
    <h1 class="text-center">OUR SCRATCH GAMES</h1>
    <p class="full-width text-center bg-black text-red">Our system is not yet live, we are only testing it.</p>
    <div class="content-container">
      <div class="gallery-item q-pa-lg" v-for="(item, index) in gameItems" :key="index">

        <q-dialog v-model="item.numb" class="z-max">
          <q-card class="q-pa-xl detail-dialog">
            <q-card-section class="row items-center q-pb-md">
              <div class="text-h4 text-white"><b>BUY <span class="text-primary">{{ item.name }}</span > SCRATCHCARDS</b></div>
              <q-space />

              <q-btn size="xl" icon="close" color="white" flat round dense v-close-popup />
            </q-card-section>

            <q-card-section class="flex topinfo no-wrap text-white">
              <img :src="item.imgcard" alt="" class="game-card non-selectable" />
              <img :src="item.imglogo" alt="" class="game-logo non-selectable q-mx-xl" />
              <div class="full-width">
                <div class="text-h5">Choose card quantity</div>
                <div class="flex no-wrap text-black">
                  <div class="itembox"><b>1</b><span>card</span></div>
                  <div class="itembox"><b>3</b><span>cards</span></div>
                  <div class="itembox"><b>5</b><span>cards</span></div>
                  <div class="itembox"><b>10</b><span>cards</span></div>
                  <div class="itembox"><b>15</b><span>cards</span></div>
                  <div class="itembox"><b>20</b><span>cards</span></div>
                </div>
                <div class="flex row no-wrap q-gutter-md  ">
                  <div class="q-pa-md q-mb-md pond col">
                    <label for="model" class="topb"><b>Quantity</b></label>
                    <q-input v-model.number="model" type="number" filled standout class="input" input-class="text-white in-input full-width" />
                  </div>
                  <div class="q-pa-md totalfee q-mb-md col totalbox pond">
                    <label for="fee" class="no-wrap topb"><b>Total fee</b></label>
                    <div class="flex no-wrap">
                      <span class="currency">{{ item.currency }}</span> <strong>{{ model * item.fee }}</strong>
                    </div>
                  </div>
                  
                </div>
                <div class="remain flex justify-between q-mb-sm topx">
                    <b>Remaining Tickets: </b><span><strong>101,824 </strong>/ 149000</span>
                </div>
                <div class="full-width">
                  <q-btn rounded no-caps no-wrap size="xl" color="primary" class="full-width">BUY &nbsp; <b> {{ item.name }} </b>&nbsp;(SOON)</q-btn>
                </div>
              </div>
            </q-card-section>

            <q-card-section>
              <h5 class="text-center">Game Details</h5>
              <component :is="item.descPage" />
            </q-card-section>
          </q-card>
        </q-dialog>


        <img :src="item.imgcard" alt="" class="game-card non-selectable" />
        <img :src="item.imglogo" alt="" class="game-logo non-selectable q-mx-xl" />
        <div class="full-width q-pa-md column">
          <div class="topinfo flex q-mb-md full-width col-12 no-wrap">
            <div class="price column q-mr-sm topx">
              <b>Price: </b>
                <span>
                 {{ item.currency }}
                </span>
                <strong class="currency">{{ item.fee }}</strong>
            </div>
            <div class="desc column q-mr-sm topx full-width">
              <b>Description: </b><span>{{ item.description }}</span>
            </div>
            <div class="remain column q-mr-sm topx">
              <b>Remaining Tickets: </b><span><strong>101,824 </strong>/ 149000</span>
            </div>
          </div>

          <div class="flex no-wrap form items-top row">
            <div class="q-pa-md pond q-mr-md col-3">
              <label for="model" class="topb"><b>Quantity</b></label>
              <q-input v-model.number="model" type="number" filled standout class="input" input-class="text-white in-input full-width" />
            </div>
            <div class="q-pa-md totalfee pond q-mr-md col-3 totalbox">
              <label for="fee" class="no-wrap topb"><b>Total fee</b></label>
              <div class="flex no-wrap">
                <span class="currency">{{ item.currency }}</span> <strong>{{ model * item.fee }}</strong>
              </div>
            </div>

            <div class="full-width">
              <q-btn rounded outline no-caps no-wrap @click="item.numb = true" size="lg" color="primary" class="full-width q-mb-md">MORE DETAILS</q-btn>
              <q-btn rounded no-caps no-wrap size="xl" color="primary" class="full-width">BUY (SOON)</q-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Blastout from './game-details/Blastout.vue';
import Win from './game-details/Win.vue';
import Easy from './game-details/Easy.vue';

export default {
  name: 'GamesCase',
  components: { Blastout, Win, Easy },
  data() {
    return {
      gameItems: [
        {
          name: 'Win $50, $100 or $200',
          currency: '$USDT',
          fee: '10',
          description: 'WIN UP TO 20x',
          imglogo: 'games/game-logo-win.png',
          imgcard: 'games/game-card-win.png',
          detail: '',
          numb: 'num01',
          tableData: [
            ['5', '8.28', '36200'],
            ['10', '10.43', '28750'],
            ['25', '36.14', '8300'],
            ['50', '200.00', '1500'],
            ['100', '272.72', '1100'],
            ['250', '2000.00', '150'],
            ['500', '600.00', '500'],
          ],
          descPage: Win,
        },
        {
          name: 'EASY! $75 or $150',
          currency: '$USDT',
          fee: '15',
          description: 'WIN UP TO 30x',
          imglogo: 'games/game-logo-easy.png',
          imgcard: 'games/game-card-easy.png',
          detail: '',
          numb: 'num02',
          tableData: [
            ['5', '8.28', '36200'],
            ['10', '10.43', '28750'],
            ['25', '36.14', '8300'],
            ['50', '200.00', '1500'],
            ['100', '272.72', '1100'],
            ['250', '2000.00', '150'],
            ['500', '600.00', '500'],
          ],
          descPage: Easy,
        },
        {
          name: 'BLASTOUT! $500',
          currency: '$USDT',
          fee: '5',
          description: 'WIN UP TO 100x',
          imglogo: 'games/game-logo-blastout.png',
          imgcard: 'games/game-card-blastout.png',
          detail: 'Blastout',
          numb: 'num03',
          tableData: [
            ['5', '8.28', '36200'],
            ['10', '10.43', '28750'],
            ['25', '36.14', '8300'],
            ['50', '200.00', '1500'],
            ['100', '272.72', '1100'],
            ['250', '2000.00', '150'],
            ['500', '600.00', '500'],
          ],
          descPage: Blastout,
        },
        {
          name: 'X200',
          currency: '$USDT',
          fee: '3',
          description: 'WIN UP TO $600',
          imglogo: 'games/game-logo-x200.png',
          imgcard: 'games/game-card-x200.png',
          detail: '',
          numb: 'num04',
          tableData: [
            ['5', '8.28', '36200'],
            ['10', '10.43', '28750'],
            ['25', '36.14', '8300'],
            ['50', '200.00', '1500'],
            ['100', '272.72', '1100'],
            ['250', '2000.00', '150'],
            ['500', '600.00', '500'],
          ],
          // descPage: x200,
        },
        {
          name: 'Booooom $1000',
          currency: '$USDT',
          fee: '10',
          description: 'WIN UP TO 100x',
          imglogo: 'games/game-logo-booooom.png',
          imgcard: 'games/game-card-booooom.png',
          detail: '',
          numb: 'num05',
          tableData: [
            ['5', '8.28', '36200'],
            ['10', '10.43', '28750'],
            ['25', '36.14', '8300'],
            ['50', '200.00', '1500'],
            ['100', '272.72', '1100'],
            ['250', '2000.00', '150'],
            ['500', '600.00', '500'],
          ],
          // descPage: Booooom,
        },
        {
          name: 'WIN 6.250, 12.500 or 62.500 $ROUL ',
          currency: '$ROUL ',
          fee: '1250',
          description: 'WIN UP TO 62500 $ROUL',
          imglogo: 'games/game-logo-roul.png',
          imgcard: 'games/game-card-roul.png',
          detail: '',
          numb: 'num06',
          tableData: [
            ['5', '8.28', '36200'],
            ['10', '10.43', '28750'],
            ['25', '36.14', '8300'],
            ['50', '200.00', '1500'],
            ['100', '272.72', '1100'],
            ['250', '2000.00', '150'],
            ['500', '600.00', '500'],
          ],
          // descPage: Winroul,
        },
        {
          name: 'REAL GAIN',
          currency: '$ROUL ',
          fee: '400',
          description: 'WIN UP TO 40.000 $ROUL',
          imglogo: 'games/game-logo-rg-roul.png',
          imgcard: 'games/game-card-rg-roul.png',
          detail: '',
          numb: 'num07',
          tableData: [
            ['5', '8.28', '36200'],
            ['10', '10.43', '28750'],
            ['25', '36.14', '8300'],
            ['50', '200.00', '1500'],
            ['100', '272.72', '1100'],
            ['250', '2000.00', '150'],
            ['500', '600.00', '500'],
          ],
          // descPage: Realgain,
        },
      ],
      model: 10,
    };
  },
};
</script>

<style scoped>

.detail-dialog {width: 1200px; max-width: 80vw; border-radius: 20px !important; backdrop-filter: blur(20px); background: #2a364d91; box-shadow: 0 0 40px 20px black; padding: 50px;}

.gallery-container {
  max-width: 90vw;
  width: 1500px;
  display: block;
}
.content-container {
  backdrop-filter: blur(5px);
  padding: 50px 50px;
  border-radius: 80px;
  border: 1px solid #68f3e0;
  box-shadow: 0 0 20px 20px #00000057;
}
.gallery-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 40px;
  background: #24334e28;
  margin-bottom: 50px;
  position: relative;
  transition: all 0.6s ease;
  perspective: 1200px;
  perspective-origin: 50% 50%;
  transition: all 0.5s ease;
  z-index: 9;
  box-shadow: 0 5px 10px -5px black;
  transform: translateY(10px);
}
.gallery-item:hover{box-shadow:0 10px 30px -10px black;background:#060e1eb5;z-index:999;transform:translateY(0px);}
.gallery-item .game-logo{max-width:250px;opacity:0.8;transition:all 0.6s ease;}
.gallery-item:hover .game-logo{opacity:1;transform:scale(1.2);}
.gallery-item .game-card{max-width:205px;transform:rotateZ(-7deg);margin:-60px 20px -60px -20px;transition:all 1.5s cubic-bezier(0.19,1,0.22,1);z-index:9;}
.gallery-item:hover .game-card{transform:rotate3d(300,850,-70,60deg) scale(1.5) translateY(-20px);z-index:999999;filter:drop-shadow(-20px 10px 20px black);}
.gallery-item .topinfo{background:#214e715e;border-radius:28px;}
.gallery-item .price span{font-weight:900;}
.gallery-item .topx{padding:20px;border-radius:10px;}
.gallery-item .topx b{font-size:1rem;opacity:0.5;}
.gallery-item .topx span{font-size:1.2rem;line-height:1;}
.gallery-item .topx strong{font-size:2.5rem;line-height:1; font-weight: 900;}
.gallery-item .topx.desc span{font-size:1.5rem;}
.gallery-item .topx.remain{white-space:nowrap;}
.gallery-item .topx.remain span{white-space:nowrap;font-size:1.4rem;}
.gallery-item .totalbox{background: #0d4f6b;}

.detail-dialog .topinfo {perspective:1200px; perspective-origin:0% 0%; background: #1abaff2d; border-radius: 20px !important; position: relative; }
.detail-dialog .topinfo .game-logo{max-width:250px;}
.detail-dialog .topinfo .game-card{max-width:150px; transform:rotate3d(80,50,-50,10deg) scale(1.5) translateX(-10px) translateY(0px);z-index:9999999999;filter:drop-shadow(-20px 10px 20px black);}

.detail-dialog .topinfo .itembox {background: #ffffff96; display: flex; flex-direction: column; border: 1px solid #00000057; border-radius: 10px; justify-content: center; align-items: center; width: 100%; margin: 2%; padding: 10px 0 ;}
.detail-dialog .topinfo .itembox * {padding: 0; margin: 0; line-height: 1.2; }

.totalfee label{white-space:nowrap;}
.totalfee div{font-size:2rem;line-height:4rem;width:100px;}

.pond{border-radius:28px;border:1px solid #1ab9ff;background:#214e715e;}
.totalfee .currency{font-size:1.4rem;font-weight:400; line-height: 1;}



@media screen and (max-width: 1921px) {
  /* .gallery-container{transform:scale(0.75); } */
}

@media screen and (min-width: 2921px) {
  /* .gallery-container{transform:scale(1.25); margin-top: 220px; } */
}
</style>
