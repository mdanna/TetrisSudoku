define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {

    },
    initGettersSetters: function() {
      defineGetter(this, 'active00', () => {
        return this._active00;
      });
      defineSetter(this, 'active00', value => {
        this._active00 = 'on';
        this.view.boardCell00.isVisible = true;
        this.view.boardCell00.active = true;
      });
      defineGetter(this, 'active10', () => {
        return this._active10;
      });
      defineSetter(this, 'active10', value => {
        this._active10 = 'on';
        this.view.boardCell10.isVisible = true;
        this.view.boardCell10.active = true;
      });
      defineGetter(this, 'active20', () => {
        return this._active20;
      });
      defineSetter(this, 'active20', value => {
        this._active20 = 'on';
        this.view.boardCell20.isVisible = true;
        this.view.boardCell20.active = true;
      });
    },

    getDragClone(){
      const shape = new com.hcl.mario.Shape3x1({
        id: `shape3x1_${new Date().getTime()}`
      }, {}, {});
      shape.active00 = this.active00;
      shape.active10 = this.active10;
      shape.active20 = this.active20;
      return shape;
    },
    
    getCoords(){
      const coords = [];
      this.view.widgets().forEach((widget) => {
        widget.className = 'com.hcl.mario.BoardCell' && widget.active && coords.push({
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