define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.preShow = () => {
        if(!this.initDone){
          this.view.isVisible = false;
          this.view.flxBackground.onClick = () => this.view.isVisible = false;
          this.view.flxClose.onClick = () => this.view.isVisible = false;
          this.initDone = true;
        }
      };
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {},

    show(){
      globals.hallOfFame.sort((a, b) => {
        let ret = 0;
        a.score > b.score && (ret = -1);
        a.score < b.score && (ret = 1);
        return ret;
      });
      const data = [];
      globals.hallOfFame.forEach((record, index) => {
        if(index < 8){
          data.push({
            idRecord: record.id,
            lblIndex: `${index + 1}`,
            lblName: record.name,
            lblScore: `${record.score}`
          });
        }
      });
      this.view.segHallOfFame.setData(data);
      this.view.isVisible = true;
      this.view.flxBackground.isVisible = true;
    }
  };
});