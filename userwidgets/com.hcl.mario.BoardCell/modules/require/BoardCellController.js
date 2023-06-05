define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {

    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineGetter(this, 'active', () => {
        return this._active;
      });
      defineSetter(this, 'active', value => {
        this._active = value;
        this.view.flxCell.skin = value ? 'skinCellActive': 'slFbox';
        this.view.forceLayout();
      });
      defineGetter(this, 'x', () => {
        return this._x;
      });
      defineSetter(this, 'x', value => {
        this._x = value;
      });
      defineGetter(this, 'y', () => {
        return this._y;
      });
      defineSetter(this, 'y', value => {
        this._y = value;
      });
    },
    
    enhance(){
      this.view.flxCell.skin = 'skinCellEnhanced';
    }
  };
});