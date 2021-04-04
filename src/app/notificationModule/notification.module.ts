
import {NotifierModule} from 'angular-notifier';
import {NgModule} from '@angular/core';

const notifierCustomOptions: NotifierModule = {
  position: {
    horizontal: {
      position: 'left',
      distance: 150
    },
    vertical: {
      position: 'top',
      distance: 12,
      gap: 10
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onmouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animation: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'hide',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }

};

@NgModule({
  imports: [NotifierModule.withConfig(notifierCustomOptions)],
  exports: [NotifierModule]
})
export class NotificationModule {}
