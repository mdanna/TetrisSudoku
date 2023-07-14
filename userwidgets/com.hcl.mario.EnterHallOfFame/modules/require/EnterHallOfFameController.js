define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.preShow = () => {
        if(!this.initDone){
          this.view.isVisible = false;
          this.view.flxBackground.onClick = () => this.view.isVisible = false;
          this.view.flxClose.onClick = () => this.view.isVisible = false;
          this.view.txtName.onTextChange = () => {
            this.view.flxRegister.skin = this.view.txtName.text ? 'skinFlxPurpleRounded' : 'skinFlxPurpleRoundedDisabled';
          };
          this.view.flxRegister.onClick = () => {
            const name = this.view.txtName.text.trim();
            if(name){
              this.view.isVisible = false;
              this.onRegister({name, score: this.score});
            }
          };
        }
      };
    },

    onRegister(){},

    initGettersSetters: function() {},

    show(score){
      this.score = score;
      const name = voltmx.store.getItem('userName') || '';
      this.view.txtName.text = name;
      this.view.flxRegister.skin = name ? 'skinFlxPurpleRounded' : 'skinFlxPurpleRoundedDisabled';
      this.view.lblTitle.text = `Your score: ${score}`;
      this.view.isVisible = true;
      this.view.flxBackground.isVisible = true;
    }
  };
});