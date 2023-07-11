define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {

    },
    initGettersSetters: function() {
      defineGetter(this, 'active00', () => {
        return this._active00;
      });
      defineSetter(this, 'active00', value => {
        this._active00 = value;
        this.view.boardCell00.isVisible = value === 'on';
        this.view.boardCell00.active = value === 'on';
      });
      defineGetter(this, 'active01', () => {
        return this._active01;
      });
      defineSetter(this, 'active01', value => {
        this._active01 = value;
        this.view.boardCell01.isVisible = value === 'on';
        this.view.boardCell01.active = value === 'on';
      });
      defineGetter(this, 'active10', () => {
        return this._active10;
      });
      defineSetter(this, 'active10', value => {
        this._active10 = value;
        this.view.boardCell10.isVisible = value === 'on';
        this.view.boardCell10.active = value === 'on';
      });
      defineGetter(this, 'active11', () => {
        return this._active11;
      });
      defineSetter(this, 'active11', value => {
        this._active11 = value;
        this.view.boardCell11.isVisible = value === 'on';
        this.view.boardCell11.active = value === 'on';
      });
    },

    getDragClone(){
      const shape = new com.hcl.mario.Shape2x2({
        id: `shapeSquare${new Date().getTime()}`
      }, {}, {});
      shape.active00 = this.active00;
      shape.active01 = this.active01;
      shape.active10 = this.active10;
      shape.active11 = this.active11;
      return shape;
    },
    
    getAll(){
      const shapes = [];
      const types = [
        ['00', '01', '10', '11'],
        ['00', '01', '10'],
        ['00', '01', '11'],
        ['00', '10', '11'],
        ['01', '10', '11'],
        ['00', '11'],
        ['01', '10'],
      ];
      
      types.forEach((typeArray) => {
        const shape = new com.hcl.mario.Shape2x2({
          id: `shape2x2${new Date().getTime()}`
        }, {}, {});
        shape.active00 = typeArray.indexOf('00') > -1 ? 'on' : 'off';
        shape.active01 = typeArray.indexOf('01') > -1 ? 'on' : 'off';
        shape.active10 = typeArray.indexOf('10') > -1 ? 'on' : 'off';
        shape.active11 = typeArray.indexOf('11') > -1 ? 'on' : 'off';
        shapes.push(shape);
      });
      return shapes;
    },

    getCoords(){
      const coords = [];
      this.view.widgets().forEach((widget) => {
        widget.active && coords.push({
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