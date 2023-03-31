<template>
  <div class="main-gallery-container column non-selectable animate">
    <div class="content-container">
      <div class="content" :class="contentClass">
        <div class="main-gallery-item" v-for="(item, index) in galleryItems" :key="index">
          <div class="topinfo">
            <div class="price">{{ item.title }}</div>
            <div class="desc">{{ item.description }}</div>
          </div >
          <img :src= item.imglogo alt="" class="game-logo non-selectable">
          <img :src= item.imgcard alt="" class="game-card non-selectable">
          <img :src= item.imgcard alt="" class="game-card backer non-selectable">
        </div>
      </div>
      <div class="arrow-container">
        <div class="arrow left-arrow" @click="[startAnimation(), moveGallery('left') ]"><img src="~assets/arrow-b.png" class="inner"></div>
        <div class="arrow right-arrow" @click="[startAnimation() , moveGallery('right')]"><img src="~assets/arrow-b.png" class="inner"></div>
      </div>
    </div>
    <div class="buttonholder non-selectable">
      <a class="fyd_btn" href="/games"><span>{{ $t('main_btn_text') }}</span></a >
    </div>
    <div class="caser non-selectable">
         <div role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="--value:100"></div>
        <img src= "~assets/caser-mid.png" alt="" class="casermid">
        <img src= "~assets/caser.png" alt="" class="caserback">
        <img src= "~assets/Logotype.svg" alt="" class="logotype">

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      galleryItems: [
        {
          title: '$10',
          description: 'WIN UP TO 20x',
          imglogo: 'games/game-logo-win.png',
          imgcard: 'games/game-card-win.png',
          numb: '',
        },
        {
          title: '$15',
          description: 'WIN UP TO 10x',
          imglogo: 'games/game-logo-easy.png',
          imgcard: 'games/game-card-easy.png',
          numb: '',
        },
        {
          title: '$5',
          description: 'WIN UP TO 100x',
          imglogo: 'games/game-logo-blastout.png',
          imgcard: 'games/game-card-blastout.png',
          numb: '',
        },
        {
          title: '$3',
          description: 'WIN UP TO $600',
          imglogo: 'games/game-logo-x200.png',
          imgcard: 'games/game-card-x200.png',
          numb: '',
        },
        {
          title: '$10',
          description: 'WIN UP TO 100x',
          imglogo: 'games/game-logo-booooom.png',
          imgcard: 'games/game-card-booooom.png',
          numb: '',
        },
        {
          title: '1250 $ROUL',
          description: 'WIN UP TO 62500 $ROUL',
          imglogo: 'games/game-logo-roul.png',
          imgcard: 'games/game-card-roul.png',
          numb: '',
        },
        {
          title: '400 $ROUL',
          description: 'WIN UP TO 40.000 $ROUL',
          imglogo: 'games/game-logo-rg-roul.png',
          imgcard: 'games/game-card-rg-roul.png',
          numb: '',
        },
      ],
      contentClass: '',
    };
  },
  methods: {
    startAnimation() {
        const box = document.querySelector('.main-gallery-container');
        box.classList.remove('animate');
        void box.offsetWidth;
        box.classList.add('animate');
      },
    moveGallery(direction) {
      if (direction === 'left') {
        this.galleryItems.unshift(this.galleryItems.pop());
        this.contentClass = 'left-move';
      } else if (direction === 'right') {
        this.galleryItems.push(this.galleryItems.shift());
        this.contentClass = 'right-move';
      }
    },
    onAnimationEnd() {
      if (this.contentClass === 'left-move') {
        this.galleryItems.push(this.galleryItems.shift());
        this.contentClass = '';
      } else if (this.contentClass === 'right-move') {
        this.galleryItems.unshift(this.galleryItems.pop());
        this.contentClass = 'tessssy';
      }
    }
  },
  mounted() {
    this.$refs.content.addEventListener('animationend', this.onAnimationEnd);
  },
  beforeDestroy() {
    this.$refs.content.removeEventListener('animationend', this.onAnimationEnd);
  },
};
</script>

<style scoped>

/* h2 {font-size: 15rem;} */

.main-gallery-container{position:relative;display:flex;justify-content:center;align-items:center;height:800px;width:100vw;flex-wrap:nowrap; margin-bottom: 50px;}
.content-container{position:relative;width:960px;height:800px;display:flex;align-items:center;justify-content:center;z-index:99;}
.content{display:flex;position:relative;align-items:center;justify-content:center;top:0;left:0;width:100%;height:800px;transition:transform 0.5s ease;}
.main-gallery-item{position:absolute;display:none;flex-direction:column;justify-content:center;align-items:center;width:100%;height:800px; transition:all .5s ease;}
.arrow-container{position:absolute;display:flex;justify-content:space-between;align-items:center;width:100%;height:100%;pointer-events:none;}


.arrow {
  position: absolute;
  z-index: 1;
  width: 135px;
  height: 135px;
  pointer-events: auto;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('~assets/arrow-a.png') no-repeat;
  background-size: contain;
  transition: all .5s ease;
}
.arrow .inner {height: 70%; transform: translateX(-25px); transition: all .5s ease;}
.left-arrow{left:-130px;}
.right-arrow{right:-130px; transform: scaleX(-1);}

.arrow:hover {filter: brightness(1.5); transform: scale(.95);}
.arrow.right-arrow:hover { transform: scaleX(-1)  scale(0.95);}
.arrow:hover .inner {height: 72%; transform: translateX(-20px);}

.buttonholder{ position: absolute; display:flex;justify-content:center;align-items:flex-start;z-index:999; bottom: 130px; }
.caser {display: flex; z-index: 0; 
  justify-content:center;align-items:flex-end; perspective:1000px;perspective-origin:50% 50%;transition:all .5s ease;position:absolute;width:1080px;height:370px; bottom: -60px;}
.caser img{display:block;z-index:0;position:absolute;width:100%;height:370px;}

.caser img.logotype {height: 120px; position: absolute; z-index: 9900; bottom: 10px;} 

.fyd_btn {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.3rem;
  font-weight: 800;
  border-radius: 15px;
  background-image: linear-gradient(to right top, #00ff80,  #0044ff);
  box-shadow: inset -6px -6px 15px 0px #1a0e03c2, inset 0px 3px 15px 10px #fff7ef4d, inset 0px 2px 2px 1px #fffdfce3, inset 0px 8px 30px 0px #00000081;
  width: 440px;
  height: 90px;
  border: 2px solid black;
  cursor: pointer;
  transition: all .5s ease;
  filter: brightness(1.2);
}

.fyd_btn:hover {
  transition: all .5s ease;
  filter: brightness(1.5);
  box-shadow: inset -2px -2px 15px 0px #1a0e03c2, inset 0px 3px 15px 10px #fff7ef4d, inset 0px 2px 2px 1px #fffdfce3, inset 0px 8px 30px 0px #00000081;
}

.fyd_btn span {text-shadow: 0 4px 5px black; transition: all .5s ease;}
.fyd_btn:hover span {text-shadow: 0 1px 2px black; transform: translateY(4px);}


.content{perspective:1000px;perspective-origin:50% 50%; transition: all .5s ease;}
.main-gallery-item{perspective:1000px;perspective-origin:50% 50%; transition: all .5s ease;}

.main-gallery-item .topinfo {color: white; position: absolute; top: 0; left: 0; text-align: left;}
.main-gallery-item .price {font-size: 4.5rem; font-weight: 900; line-height: 1; }
.main-gallery-item .desc {font-size:2rem;}
.main-gallery-item .game-logo {position: absolute; z-index: 93; max-width: 450px; max-height: 100%; left: 60px; bottom: 200px; transform: rotateY(0deg) translateZ(100px); }
.main-gallery-item .game-card {position: absolute; z-index: 90; max-width: 500px; max-height: 770px; transform:rotateZ(14deg) translate(0px);  right: 50px; top: -60px;}
.main-gallery-item .game-card.backer {z-index: 89; transform:rotateZ(10deg) translate(-19px); filter: brightness(0.6);}


.main-gallery-item:nth-child(1) {display: flex; opacity: 0; margin-left: 0vw ; transform: rotateY(-30deg);  }
.main-gallery-item:nth-child(2) {display: flex;}
.main-gallery-item:nth-child(3) {display: flex; opacity: 0; margin-right: 0vw ; transform: rotateY(30deg);  }

.animate .content .backer { animation: backer 1.9s ease;  }
@keyframes backer {
    0% { transform:rotateZ(10deg) translate(-19px); }
    50% { transform:rotateZ(-2deg) translate(-78px); }
    100% { transform:rotateZ(10deg) translate(-19px); }
  }

.animate .content .game-logo { animation: gamelogo 1.2s ease;  }
@keyframes gamelogo {
    0% { transform: rotateY(0deg) translateZ(100px) translateX(0px) ; }
    50% { transform: rotateY(-20deg) translateZ(220px) translateX(100px) ; }
    100% { transform: rotateY( 0deg) translateZ(100px) translateX(0px) ; }
  }

.animate .content.left-move .main-gallery-item:nth-child(2){animation:leftone .8s ease;}
@keyframes leftone {
    from { opacity: 0; margin-right: -1000px ; transform:  rotateY(40deg) ;  }
    to { opacity: 1; margin-left: 0vw ; transform:  rotateY( 0deg);   }
  }

.animate .content.left-move .main-gallery-item:nth-child(3){animation:lefttwo .8s ease;}
@keyframes lefttwo {
    from {opacity: 1; margin-left: 0vw ; transform:  rotateY( 0deg);  }
    to { opacity: 0; margin-left: -1000px ; transform:  rotateY(-40deg);   }
  }


.animate .content.right-move .main-gallery-item:nth-child(2){animation:rightone .8s ease;}
@keyframes rightone {
    from { opacity: 0; margin-left: -1000px ; transform:  rotateY(-40deg);}
    to { opacity: 1; margin-left: 0vw ; transform:  rotateY( 0deg); }
  }

.animate .content.right-move .main-gallery-item:nth-child(1){animation:righttwo .8s ease;}
@keyframes righttwo {
    from { opacity: 1; margin-right: 0vw ; transform:  rotateY( 0deg);  }
    to { opacity: 0; margin-right: -1000px ; transform:  rotateY(40deg);   }
  }

 @keyframes growProgressBar{
  0%{--pgPercentage:0; transform: rotateX(84deg) translateZ(-263px) rotate(180deg) scaleX(1);}
  49.9%{--pgPercentage:var(--value); transform: rotateX(84deg) translateZ(-263px) rotate(180deg) scaleX(1);}
  50%{--pgPercentage:var(--value); transform: rotateX(84deg) translateZ(-263px) rotate(180deg) scaleX(-1);}
  100%{--pgPercentage:0; transform: rotateX(84deg) translateZ(-263px) rotate(180deg) scaleX(-1);}
}

@property --pgPercentage {
  syntax: "<number>";
  inherits: false;
  initial-value: 0;
}

.caser img.casermid {
  position: absolute;
  z-index: 120;
  transform: translateY(-23px) scale(0.93);
}

div[role="progressbar"] {
  position: absolute;
  transform: rotateX(84deg) translateZ(-263px) rotate(180deg);
  z-index: 100;
  --size: 870px;
  --fg: #369;
  --bg: #def;
  --pgPercentage: var(--value);
  animation: growProgressBar 5s  infinite;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: radial-gradient(
      closest-side,
      transparent 95%,
      transparent 0 99.9%,
      transparent 0
    ),
    conic-gradient(var(--fg) calc(var(--pgPercentage) * 1%), var(--bg) 0);
  font-family: Helvetica, Arial, sans-serif;
  font-size: calc(var(--size) / 5);
  color: var(--fg);
}

@media screen and (max-width: 1921px) {
 .main-gallery-container{transform:scale(0.75); }
}

@media screen and (min-width: 2921px) {
 .main-gallery-container{transform:scale(1.25); margin-top: 220px; }
}


</style>
