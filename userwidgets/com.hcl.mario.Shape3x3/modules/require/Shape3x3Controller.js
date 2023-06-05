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
      defineGetter(this, 'active02', () => {
        return this._active02;
      });
      defineSetter(this, 'active02', value => {
        this._active02 = value;
        this.view.boardCell02.isVisible = value === 'on';
        this.view.boardCell02.active = value === 'on';
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
      defineGetter(this, 'active12', () => {
        return this._active12;
      });
      defineSetter(this, 'active12', value => {
        this._active12 = value;
        this.view.boardCell12.isVisible = value === 'on';
        this.view.boardCell12.active = value === 'on';
      });
      defineGetter(this, 'active20', () => {
        return this._active20;
      });
      defineSetter(this, 'active20', value => {
        this._active20 = value;
        this.view.boardCell20.isVisible = value === 'on';
        this.view.boardCell20.active = value === 'on';
      });
      defineGetter(this, 'active21', () => {
        return this._active21;
      });
      defineSetter(this, 'active21', value => {
        this._active21 = value;
        this.view.boardCell21.isVisible = value === 'on';
        this.view.boardCell21.active = value === 'on';
      });
      defineGetter(this, 'active22', () => {
        return this._active22;
      });
      defineSetter(this, 'active22', value => {
        this._active22 = value;
        this.view.boardCell22.isVisible = value === 'on';
        this.view.boardCell22.active = value === 'on';
      });
    },

    getDragClone(){
      const shape = new com.hcl.mario.Shape3x3({
        id: `shape3x3_${new Date().getTime()}`
      }, {}, {});
      shape.active00 = this.active00;
      shape.active01 = this.active01;
      shape.active02 = this.active02;
      shape.active10 = this.active10;
      shape.active11 = this.active11;
      shape.active12 = this.active12;
      shape.active20 = this.active20;
      shape.active21 = this.active21;
      shape.active22 = this.active22;
      return shape;
    },
    
    getAll(){
      const shapes = [];
      const types = [
        ['00', '01', '02', '10', '20'],
        ['00', '01', '02', '11', '21'],
        ['00', '01', '02', '12', '22'],
        ['00', '10', '20', '21', '22'],
        ['01', '11', '20', '21', '22'],
        ['02', '12', '20', '21', '22'],
        ['00', '10', '20', '11', '12'],
        ['10', '11', '02', '12', '22'],
        ['00', '11', '22'],
        ['02', '11', '20'],
        ['01', '10', '11', '12', '21']
      ];
      
      types.forEach((typeArray) => {
        const shape = new com.hcl.mario.Shape3x3({
          id: `shape3x3_${new Date().getTime()}`
        }, {}, {});
        shape.active00 = typeArray.indexOf('00') > -1 ? 'on' : 'off';
        shape.active01 = typeArray.indexOf('01') > -1 ? 'on' : 'off';
        shape.active02 = typeArray.indexOf('02') > -1 ? 'on' : 'off';
        shape.active10 = typeArray.indexOf('10') > -1 ? 'on' : 'off';
        shape.active11 = typeArray.indexOf('11') > -1 ? 'on' : 'off';
        shape.active12 = typeArray.indexOf('12') > -1 ? 'on' : 'off';
        shape.active20 = typeArray.indexOf('20') > -1 ? 'on' : 'off';
        shape.active21 = typeArray.indexOf('21') > -1 ? 'on' : 'off';
        shape.active22 = typeArray.indexOf('22') > -1 ? 'on' : 'off';
        shapes.push(shape);
      });
      return shapes;
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