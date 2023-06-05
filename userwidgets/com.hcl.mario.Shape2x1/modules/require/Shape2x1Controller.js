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
    },

    getDragClone(){
      const shape = new com.hcl.mario.Shape2x1({
        id: `shape2x1${new Date().getTime()}`
      }, {}, {});
      shape.active00 = this.active00;
      shape.active10 = this.active10;
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