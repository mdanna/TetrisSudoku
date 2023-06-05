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
      defineGetter(this, 'active01', () => {
        return 'on';
      });
      defineSetter(this, 'active01', value => {
        this.view.boardCell01.isVisible = true;
        this.view.boardCell01.active = true;
      });
    },

    getDragClone(){
      const shape = new com.hcl.mario.Shape1x2({
        id: `shape1x2${new Date().getTime()}`
      }, {}, {});
      shape.active00 = this.active00;
      shape.active01 = this.active01;
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