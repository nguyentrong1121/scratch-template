<template>
    <div class="container" >
      <button @click="startAnimation">Animasyon Başlat</button>
      <div class="box"></div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      startAnimation() {
        const box = document.querySelector('.box');
        box.classList.remove('animate-class');
        void box.offsetWidth;
        box.classList.add('animate-class');
      }
    }
  }
  </script>
  
  <style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  
  .box {
    width: 50px;
    height: 50px;
    background-color: red;
  }
  
  .animate-class {
    animation: myAnimation 1s ease;
  }
  
  @keyframes myAnimation {
    from { transform: scale(1); }
    to { transform: scale(1.5); }
  }
  </style>
  