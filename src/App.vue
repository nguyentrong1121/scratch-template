<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    const locale = this.$q.lang.getLocale();
    console.log('LOCALE:', locale);
    let storedLocale = null;
    try {
      storedLocale = this.$q.localStorage.getItem('locale');
    } catch (e) {
      console.error('No locale');
    }
    if (!storedLocale) {
      if (['en-us', 'tr'].includes(locale)) { storedLocale = locale; }
    }
    console.log('storedLocale:', storedLocale);
    if (storedLocale) {
      this.$i18n.locale = storedLocale;
    }
  },
};
</script>
