define({ 
  CELL_SIZE: 34,
  dnd: null,
  count: 0,
  score: 0,

  row0: [],
  row1: [],
  row2: [],
  row3: [],
  row4: [],
  row5: [],
  row6: [],
  row7: [],
  row8: [],
  column0: [],
  column1: [],
  column2: [],
  column3: [],
  column4: [],
  column5: [],
  column6: [],
  column7: [],
  column8: [],
  square0: [],
  square1: [],
  square2: [],
  square3: [],
  square4: [],
  square5: [],
  square6: [],
  square7: [],
  square8: [],
  
  onViewCreated(){
    mainController.onViewCreated.call(this);
  },

  dragCallback(draggedObject){
    mainController.dragCallback.call(this, draggedObject);
  },
  
  endCallback(draggedObject){
    mainController.endCallback.call(this, draggedObject);
  },

  moveCallback(draggedObject, dropArea){
    mainController.moveCallback.call(this, draggedObject, dropArea);
  },

  dropCallback(draggedObject, dropArea){
    mainController.dropCallback.call(this, draggedObject, dropArea);
  },

  getClosestIndex(t){
    return mainController.getClosestIndex.call(this, t);
  },

  setBoardBackground(){
    mainController.setBoardBackground.call(this);
  },

  getBoardCell(x, y){
    return mainController.getBoardCell.call(this, x, y);
  },

  fits(shape, x, y){
    return mainController.fits.call(this, shape, x, y);
  },

  setActive(draggedObject, x, y){
    mainController.setActive.call(this, draggedObject, x, y);
  },

  setEnhanced(draggedObject, x, y){
    mainController.setEnhanced.call(this, draggedObject, x, y);
  },

  draw(){
    mainController.draw.call(this);
  },
  
  testDraw(){
    mainController.testDraw.call(this);
  },

  display3x3(){
    mainController.display3x3.call(this);
  },

  checkShapesInactive(){
    return mainController.checkShapesInactive.call(this);
  },

  getRandomTriple(num){
    return mainController.getRandomTriple.call(this, num);
  },

  emptyFullAreas(){
    return mainController.emptyFullAreas.call(this);
  },

  addScore(points){
    mainController.addScore.call(this, points);
  },

  mayFit(shape){
    return mainController.mayFit.call(this, shape);
  },

  startNewGame(){
    mainController.startNewGame.call(this);
  },
  
  endGame(){
    mainController.endGame.call(this);
  }  
});