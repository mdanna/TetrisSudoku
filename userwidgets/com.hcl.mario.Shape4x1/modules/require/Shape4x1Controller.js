define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {

    },
    initGettersSetters: function() {
      defineGetter(this, 'active00', () => {
        return 'on';
      });
      defineSetter(this, 'active00', value => {
        this.view.boardCell00.isVisible = true;
        this.view.boardCell00.active = true;
      });
      defineGetter(this, 'active10', () => {
        return 'on';
      });
      defineSetter(this, 'active10', value => {
        this.view.boardCell10.isVisible = true;
        this.view.boardCell10.active = true;
      });
      defineGetter(this, 'active20', () => {
        return 'on';
      });
      defineSetter(this, 'active20', value => {
        this.view.boardCell20.isVisible = true;
        this.view.boardCell20.active = true;
      });
      defineGetter(this, 'active30', () => {
        return 'on';
      });
      defineSetter(this, 'active30', value => {
        this.view.boardCell30.isVisible = true;
        this.view.boardCell30.active = true;
      });
    },

    getDragClone(){
      const shape = new com.hcl.mario.Shape4x1({
        id: `shape4x1_${new Date().getTime()}`
      }, {}, {});
      shape.active00 = this.active00;
      shape.active10 = this.active10;
      shape.active20 = this.active20;
      shape.active30 = this.active30;
      return shape;
    },
    
    getCoords(){
      const coords = [];
      this.view.widgets().forEach((widget) => {
        coords.push({
          x: widget.x,
          y: widget.y
        });
      });
      return coords;
    },
    
    setActive(active){
      this.view.widgets().forEach((widget) => widget.skinCell = active ? 'skinCellActive' : 'skinCellInactive');
    }
  };
});