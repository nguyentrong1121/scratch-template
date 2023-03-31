<template>
    <!-- transition-show="flip-down"
    transition-hide="flip-up" -->
  <q-dialog
    ref="dialog"
    @hide="onDialogHide"
    :persistent="persitent"
    style="z-index:1000000"
    position="top"
    :title="title"
  >
    <q-card class="my-card rounded-1" style="width: 600px; max-width: 96vw !important;">
      <q-card-section class="column no-wrap flex-center">
        <q-icon
          v-if="type==='success'"
          name="check_circle"
          color="positive"
          size="70px"
          class="q-ma-lg"
        />
        <q-icon
          v-if="type==='error'"
          name="error_outline"
          color="negative"
          size="70px"
          class="q-ma-lg"
        />
        <q-icon
          v-if="type==='warning'"
          name="warning"
          color="warning"
          size="70px"
          class="q-ma-lg"
        />
        <q-icon v-if="type==='question'" name="help" color="warning" size="70px" class="q-ma-lg" />
      </q-card-section>

      <q-card-section class="q-pa-md q-pt-none">
        <div class="fontsize-04 text-center">{{message}}</div>
      </q-card-section>

      <q-card-actions align="center" class="q-ma-lg justify-around">
        <q-btn v-if="!cancel" v-close-popup unelevated size="md" color="primary" class="rounded-3" :label="kapatText" />
        <q-btn v-if="cancel" flat size="md" color="secondary" label="İptal" class="rounded-3" @click="onCancelClick" />
        <q-btn v-if="cancel" unelevated size="md" color="primary" label="Evet" class="rounded-3" @click="onOKClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'error',
    },
    cancel: {
      type: Boolean,
      default: false,
    },
    persitent: {
      type: Boolean,
      default: false,
    },
    kapatText: {
      type: String,
      default: 'Kapat',
    },
  },

  methods: {
    // following method is REQUIRED
    // (don't change its name --> "show")
    show() {
      this.$refs.dialog.show();
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide() {
      this.$refs.dialog.hide();
    },

    onDialogHide() {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide');
    },

    onOKClick() {
      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
      this.$emit('ok');
      // or with payload: this.$emit('ok', { ... })

      // then hiding dialog
      this.hide();
    },

    onCancelClick() {
      // we just need to hide dialog
      this.hide();
    },
  },
};
</script>
