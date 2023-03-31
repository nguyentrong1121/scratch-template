import { Loading, QSpinnerDots } from 'quasar';

Loading.setDefaults({ customClass: 'myLoadingClass' });

export function spin(delay = 0) {
  // Loading.show({
  //   spinner: QSpinnerDots
  // });
  Loading.show({
    backgroundColor: 'white',
    spinnerColor: 'primary',
    // delay
  });
}

export function hide() {
  Loading.hide();
}
