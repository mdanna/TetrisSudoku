const mainController = {
  release: '1.0.12',

  onViewCreated(){
    this.view.init = () => {

      for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
          const top = `${this.CELL_SIZE * i + i + 1}dp`;
          const left = `${this.CELL_SIZE * j + j + 1}dp`;
          const boardCell = new com.hcl.mario.BoardCell({
            id: `boardCell${i}_${j}_${new Date().getTime()}`,
            left,
            top
          }, {}, {});
          boardCell.x = i;
          boardCell.y = j;
          this[`row${i}`].push(boardCell);
          this[`column${j}`].push(boardCell);
          this[`square${utils.getSquare(i, j)}`].push(boardCell);

          boardCell.active = false;
          this.view.board.add(boardCell);
        }
      }

      this.dnd = new DragAndDrop(this.view);

      this.dnd.makeDragArea(this.view.dragArea, this.dragCallback, this.endCallback);

      this.dnd.makeDropArea(this.view.board, this.moveCallback, this.dropCallback);

      this.dnd.addSourceArea(this.view.deck);
      this.dnd.addTargetArea(this.view.board);
      this.setBoardBackground();   

      this.view.lblRefresh.onTouchEnd = () => {
        voltmx.ui.Alert(`Start a new game?`, (value) => {
          value && this.startNewGame();
        }, constants.ALERT_TYPE_CONFIRMATION, 'Yes', 'No', 'Start new game', {});
      };
      this.view.lblFooterLeft.text = `TetrisSudoku rel. ${mainController.release}`;
    };

    this.view.preShow = () => {
      this.view.enableScrolling = false;
      this.view.bounces = false;
      this.view.allowVerticalBounce = false;
    };

    this.view.postShow = () => {
      this.draw();
      //this.display3x3();
    };
  },

  dragCallback(draggedObject){
    this.dnd.getSourceObject().isVisible = false;
    this.setBoardBackground();
  },

  endCallback(draggedObject){
    this.dnd.getSourceObject().isVisible = true;
  },
  
  getCoordsInDropArea(dropArea, xInDragArea, yInDragArea){
    return {
      x: xInDragArea - dropArea.frame.x,
      y: yInDragArea - dropArea.frame.y
    };
  },

  moveCallback(draggedObject, dropArea){
    const {x, y} = mainController.getCoordsInDropArea(dropArea, draggedObject.frame.x, draggedObject.frame.y);
    const leftIndex = this.getClosestIndex(x);
    const topIndex = this.getClosestIndex(y);
    if(this.fits(draggedObject, topIndex, leftIndex)){
      this.setEnhanced(draggedObject, topIndex, leftIndex);
    }
  },

  dropCallback(draggedObject, dropArea){
    const {x, y} = mainController.getCoordsInDropArea(dropArea, draggedObject.frame.x, draggedObject.frame.y);
    const leftIndex = this.getClosestIndex(x);
    const topIndex = this.getClosestIndex(y);

    if(this.fits(draggedObject, topIndex, leftIndex)){
      this.setActive(draggedObject, topIndex, leftIndex);
      this.dnd.getSourceObject().parent.remove(this.dnd.getSourceObject());
      this.emptyFullAreas().then(() => {
        if(this.checkShapesInactive()){
          this.endGame();
        } else {
          this.count++;
          if(this.count === 3){
            this.count = 0;
            this.draw();
          } else if(this.checkShapesInactive()){
            this.endGame();
          }
        }
      });
    } else {
      this.dnd.getSourceObject().isVisible = true;
      this.setBoardBackground();
    }
  },

  getClosestIndex(t){
    const values = [];
    for(let i = 0; i < 9; i++){
      const coord = 35 * i;
      values.push(Math.max(t - coord, coord - t));
    }
    const min = Math.min(...values);
    return values.findIndex((x) => x === min);
  },

  setBoardBackground(){
    for(let i = 0; i < 9; i++){
      for(let j = 0; j < 9; j++){
        const boardCell = this.getBoardCell(i, j);
        boardCell.active || (boardCell.skinCell = utils.getSkin(i, j));
      }
    }    
  },

  getBoardCell(x, y){
    return this.view.board.widgets().find((widget) => widget.x === x && widget.y === y);
  },

  fits(shape, x, y){
    const coords = shape.getCoords();
    for(let i = 0; i < coords.length; i++){
      const coord = coords[i];
      const boardCell = this.getBoardCell(x + coord.x, y + coord.y);
      if(!boardCell){
        return false;
      }
      if(boardCell.active && shape[`active${coord.x}${coord.y}`] === 'on') {
        return false;
      }
    }
    return true;
  },

  setActive(draggedObject, x, y){
    const coords = draggedObject.getCoords();
    for(let i = 0; i < coords.length; i++){
      const coord = coords[i];
      const boardCell = this.getBoardCell(x + coord.x, y + coord.y);
      if(draggedObject[`active${coord.x}${coord.y}`] === 'on'){
        this.addScore(10);
        boardCell.active = true;
      }
    }
  },

  setEnhanced(draggedObject, x, y){
    this.setBoardBackground();
    const coords = draggedObject.getCoords();
    for(let i = 0; i < coords.length; i++){
      const coord = coords[i];
      const boardCell = this.getBoardCell(x + coord.x, y + coord.y);
      boardCell.enhance();
    }
  },

  draw(){
    const shape1x1 = new com.hcl.mario.Shape1x1({id: `shape1x1_${new Date().getTime()}`},{},{});
    const shape2x1 = new com.hcl.mario.Shape2x1({id: `shape2x1_${new Date().getTime()}`},{},{});
    const shape1x2 = new com.hcl.mario.Shape1x2({id: `shape1x2_${new Date().getTime()}`},{},{});
    const shape2x2 = new com.hcl.mario.Shape2x2({id: `shape2x2_${new Date().getTime()}`},{},{});
    const shape1x3 = new com.hcl.mario.Shape1x3({id: `shape1x3_${new Date().getTime()}`},{},{});
    const shape3x1 = new com.hcl.mario.Shape3x1({id: `shape3x1_${new Date().getTime()}`},{},{});
    const shape1x4 = new com.hcl.mario.Shape1x4({id: `shape1x4_${new Date().getTime()}`},{},{});
    const shape4x1 = new com.hcl.mario.Shape4x1({id: `shape4x1_${new Date().getTime()}`},{},{});
    const shape2x3 = new com.hcl.mario.Shape2x3({id: `shape2x3_${new Date().getTime()}`},{},{});
    const shape3x2 = new com.hcl.mario.Shape3x2({id: `shape3x2_${new Date().getTime()}`},{},{});
    const shape3x3 = new com.hcl.mario.Shape3x3({id: `shape3x3_${new Date().getTime()}`},{},{});
    const shapes = [
      shape1x1, shape2x1, shape1x2, shape3x1, shape1x3, shape4x1, shape1x4,  
      ...shape2x2.getAll(), ...shape2x3.getAll(), ...shape3x2.getAll(), ...shape3x3.getAll()
    ];
    const triple = this.getRandomTriple(shapes.length);
    const shape1 = shapes[triple[0]];
    const shape2 = shapes[triple[1]];
    const widthShape1 = parseInt((shape1.width || '0').replace(/dp/g, ''));
    shape2.left = `${widthShape1 + 10}dp`;
    const widthShape2 = parseInt((shape2.width || '0').replace(/dp/g, ''));
    const shape3 = shapes[triple[2]];
    shape3.left = `${widthShape1 + 10 + widthShape2 + 10}dp`;
    const widthShape3 = parseInt((shape3.width || '0').replace(/dp/g, ''));

    this.view.deck.removeAll();
    this.view.deck.add(shape1);
    this.view.deck.add(shape2);
    this.view.deck.add(shape3);

    const deckWidth = widthShape1 + widthShape2 + widthShape3 + 20;
    this.view.deck.width = `${deckWidth}dp`;
    //this.view.deck.left = `${Math.round((this.view.frame.width - deckWidth) / 2)}dp`;
    this.view.dragArea.forceLayout();

    this.dnd.makeDraggable(shape1, shape1.getDragClone());
    this.dnd.makeDraggable(shape2, shape2.getDragClone());
    this.dnd.makeDraggable(shape3, shape3.getDragClone());
    if(this.checkShapesInactive()){
      this.endGame();
    }
  },

  display3x3(){
    this.view.deck.removeAll();
    const shape3x3 = new com.hcl.mario.Shape3x3({id: `shape3x3_${new Date().getTime()}`},{},{});
    shape3x3.getAll().forEach((shape, index) => {
      shape.left = `${150 * index}dp`;
      this.view.deck.add(shape);
      this.dnd.makeDraggable(shape, shape.getDragClone());
    });
  },

  checkShapesInactive(){
    let countActive = 0;
    const widgets = this.view.deck.widgets();
    if(widgets.length === 0){
      return false;
    }

    widgets.forEach((shape) => {
      if(this.mayFit(shape)){
        shape.setActive(true);
        countActive ++;
      } else {
        shape.setActive(false);
      }
    });

    const ret = countActive === 0;
    return ret;
  },

  getRandomTriple(num){
    const triple = [];
    while(triple.length < 3){
      const number = Math.floor(Math.random() * num);
      if(triple.indexOf(number) === -1){
        triple.push(number);
      }
    }
    return triple;
  },

  emptyFullAreas(){
    const promise = new Promise((resolve, reject) => {
      const fullAreas = [];

      for(let i = 0; i < 9; i++){
        const row = this[`row${i}`];
        let add = true;
        for(let boardCell of row){
          if(!boardCell.active){
            add = false;
            break;
          }
        }
        add && fullAreas.push(row);
      }
      for(let i = 0; i < 9; i++){
        const column = this[`column${i}`];
        let add = true;
        for(let boardCell of column){
          if(!boardCell.active){
            add = false;
            break;
          }
        }
        add && fullAreas.push(column);
      }
      for(let i = 0; i < 9; i++){
        const square = this[`square${i}`];
        let add = true;
        for(let boardCell of square){
          if(!boardCell.active){
            add = false;
            break;
          }
        }
        add && fullAreas.push(square);
      }

      fullAreas.forEach((area) => {
        area.forEach((boardCell) => {
          boardCell.enhance();
        });
      });

      voltmx.timer.schedule('empyFullAreaTimer', () =>{
        fullAreas.forEach((area) => {
          area.forEach((boardCell) => {
            boardCell.active = false;
          });
          this.addScore(100);
        });
        this.setBoardBackground();
        resolve();
      }, 0.1);
    });

    return promise;
  },

  addScore(points){
    this.score += points || 0;
    this.view.lblScore.text = `Game score: ${this.score}`;
  },

  mayFit(shape){
    for(let i = 0; i < 9; i++){
      for(let j = 0; j < 9; j++){
        if(this.fits(shape, i, j)){
          return true;
        }
      }
    }
    return false;
  },

  startNewGame(){
    this.dnd.suspendEvents(false);
    for(let i = 0; i < 9; i++){
      const row = this[`row${i}`];
      row.forEach((boardCell) => boardCell.active = false);
    }
    this.view.lblScore.text = 'Score: 0';
    this.setBoardBackground();
    this.draw();
  },

  endGame(){
    voltmx.timer.schedule('endGameTimer', () => {
      const record = voltmx.store.getItem('record') || 0;
      let congrats = '';
      if(this.score > record){
        congrats = 'CONGRATULATIONS, you achieved a new record!!!\n';
      }

      voltmx.ui.Alert(`Game over.\nYour score is ${this.score}.\n${congrats}Do you want to play again?`, (value) => {
        value && this.startNewGame();
        value || (this.dnd.suspendEvents(true));
      }, constants.ALERT_TYPE_CONFIRMATION, 'Yes', 'No', 'Game over', {});
    }, 0.3);
  }  
};