/**
 * SnackBar.js
 * 
 * This small component is borrowed from 
 * https://codepen.io/wibblymat/pen/avAjq
 */


var createSnackbar = (function() {
  // Any snackbar that is already shown
  var previous = null;
  
/*
<div class="paper-snackbar">
  <button class="action">Dismiss</button>
  This is a longer message that won't fit on one line. It is, inevitably, quite a boring thing. Hopefully it is still useful.
</div>
*/
  
  return function(config) {
    var message = config.message,
      actionText = config.actionText,
      action = config.action,
      duration = config.duration;

    if (previous) {
      previous.dismiss();
    }
    var snackbar = document.createElement('div');
    snackbar.className = 'paper-snackbar';
    snackbar.dismiss = function() {
      this.style.opacity = 0;
    };
    var text = document.createTextNode(message);
    snackbar.appendChild(text);
    if (actionText) {
      if (!action) {
        action = snackbar.dismiss.bind(snackbar);
      }
      var actionButton = document.createElement('button');
      actionButton.className = 'action';
      actionButton.innerHTML = actionText;
      actionButton.addEventListener('click', action);
      snackbar.appendChild(actionButton);
    }
    setTimeout(function() {
      if (previous === this) {
        previous.dismiss();
      }
    }.bind(snackbar), duration || 5000);
    
    snackbar.addEventListener('transitionend', function(event, elapsed) {
      if (event.propertyName === 'opacity' && this.style.opacity == 0) {
        this.parentElement.removeChild(this);
        if (previous === this) {
          previous = null;
        }
      }
    }.bind(snackbar));


    
    previous = snackbar;
    document.body.appendChild(snackbar);
    // In order for the animations to trigger, I have to force the original style to be computed, and then change it.
    getComputedStyle(snackbar).bottom;
    snackbar.style.bottom = '0px';
    snackbar.style.opacity = 1;
  };
})();

/* ===========================================================
 * sw-registration.js
 * ===========================================================
 * Copyright 2017 @Quanyin
 * Licensed under Apache 2.0
 * Register service worker.
 * ========================================================== */

/* SW Version Upgrade Ref: <https://youtu.be/Gb9uI67tqV0> */

function handleRegistration(registration){
  console.log('Service Worker Registered. ', registration);
  /**
   * ServiceWorkerRegistration.onupdatefound
   * The service worker registration's installing worker changes.
   */
  registration.onupdatefound = (e) => {
    const installingWorker = registration.installing;
    installingWorker.onstatechange = (e) => {
      if (installingWorker.state !== 'installed') return;
      if (navigator.serviceWorker.controller) {
        console.log('SW is updated');
      } else {
        console.log('A Visit without previous SW');
        createSnackbar({
          message: 'App ready for offline use.',
          duration: 3000
        });
      }
    };
  };
}

if(navigator.serviceWorker){
  /*  For security reasons, a service worker can only control the pages */
  /* that are in the same directory level or below it. That's why we put sw.js at ROOT level. */
  navigator.serviceWorker
    .register('/sw.min.js')
    .then((registration) => handleRegistration(registration))
    .catch((error) => {console.log('ServiceWorker registration failed: ', error);});

  /* register message receiver */
  /*  https://dbwriteups.wordpress.com/2015/11/16/service-workers-part-3-communication-between-sw-and-pages/ */
  navigator.serviceWorker.onmessage = (e) => {
    console.log('SW: SW Broadcasting:', event);
    const data = e.data;
    
    if(data.command == "UPDATE_FOUND"){
      console.log("UPDATE_FOUND_BY_SW", data);
      createSnackbar({
        message: "Content updated.",
        actionText:"refresh",
        action: function(e){location.reload();}
      });
    }
  };
}
