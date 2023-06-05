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
      defineGetter(this, 'active01', () => {
        return this._active01;
      });
      defineSetter(this, 'active01', value => {
        this._active01 = 'on';
        this.view.boardCell01.isVisible = true;
        this.view.boardCell01.active = true;
      });
      defineGetter(this, 'active02', () => {
        return this._active02;
      });
      defineSetter(this, 'active02', value => {
        this._active02 = 'on';
        this.view.boardCell02.isVisible = true;
        this.view.boardCell02.active = true;
      });
      defineGetter(this, 'active03', () => {
        return this._active03;
      });
      defineSetter(this, 'active03', value => {
        this._active03 = 'on';
        this.view.boardCell03.isVisible = true;
        this.view.boardCell03.active = true;
      });
    },

    getDragClone(){
      const shape = new com.hcl.mario.Shape1x4({
        id: `shape1x4_${new Date().getTime()}`
      }, {}, {});
      shape.active00 = this.active00;
      shape.active01 = this.active01;
      shape.active02 = this.active02;
      shape.active03 = this.active03;
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