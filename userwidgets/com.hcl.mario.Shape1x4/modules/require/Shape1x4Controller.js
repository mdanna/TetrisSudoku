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
      defineGetter(this, 'active02', () => {
        return 'on';
      });
      defineSetter(this, 'active02', value => {
        this.view.boardCell02.isVisible = true;
        this.view.boardCell02.active = true;
      });
      defineGetter(this, 'active03', () => {
        return 'on';
      });
      defineSetter(this, 'active03', value => {
        this.view.boardCell03.isVisible = true;
        this.view.boardCell03.active = true;
      });
    },

    getDragClone(){
      const shape = new com.hcl.mario.Shape1x4({
        id: `shape1x4${new Date().getTime()}`
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
        coords.push({
          x: widget.x,
          y: widget.y
        });
      });
      return coords;
    },
    
    setActive(active){
      this.view.widgets().forEach((widget) => widget.skinCell = active ? 'skinCellActive' : 'skinCellInactive');
    },
    
    debugView(context){
      voltmx.print(`this.view is not null ${!!this.view} in ${context}`);
    }
    
  };
});