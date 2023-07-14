const splashController = {
  preShow(){
    this.view.lblRelease.text = `rel. ${globals.release}`;
  },

  postShow() {
    voltmx.timer.schedule('splashTimer', () => {
      if(voltmx.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)){
        voltmx.application.showLoadingScreen(null, '', constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
        hallOfFame.fetch().then((records) => {
          globals.hallOfFame = records;
          const userName = voltmx.store.getItem('userName') || '';
          const record = globals.hallOfFame.find((entry) => entry.name === userName);
          const highScore = parseInt(voltmx.store.getItem('record') || '0');
          if(userName && parseInt(record.score) < highScore){
            record.score = highScore;
            hallOfFame.update({id: record.id, score: highScore}).then(() => {
              voltmx.application.dismissLoadingScreen();
              new voltmx.mvc.Navigation('frmMain').navigate();
            }).catch((errmsg) => {
              voltmx.application.dismissLoadingScreen();
              alert(errmsg);
            });
          } else {
            voltmx.application.dismissLoadingScreen();
            new voltmx.mvc.Navigation('frmMain').navigate();
          }
        }).catch((errmsg) => {
          voltmx.application.dismissLoadingScreen();
          alert(errmsg);
        });
      } else {
        alert("Offline mode: the Hall of Fame won't be available.");
        globals.offlineMode = true;
        new voltmx.mvc.Navigation('frmMain').navigate();
      }
    }, 2);
  }
};