const utils = {
  getSkin(i, j) {
    if(i < 3) {
      if(j < 3) {
        return 'skinCellEmpty1';
      } else if(j < 6) {
        return 'skinCellEmpty2';
      } else {
        return 'skinCellEmpty1';
      }
    } else if(i < 6) {
      if(j < 3) {
        return 'skinCellEmpty2';
      } else if(j < 6) {
        return 'skinCellEmpty1';
      } else {
        return 'skinCellEmpty2';
      }
    } else {
      if(j < 3) {
        return 'skinCellEmpty1';
      } else if(j < 6) {
        return 'skinCellEmpty2';
      } else {
        return 'skinCellEmpty1';
      }
    }
  },
  
    getSquare(i, j) {
    if(i < 3) {
      if(j < 3) {
        return 0;
      } else if(j < 6) {
        return 3;
      } else {
        return 6;
      }
    } else if(i < 6) {
      if(j < 3) {
        return 1;
      } else if(j < 6) {
        return 4;
      } else {
        return 7;
      }
    } else {
      if(j < 3) {
        return 2;
      } else if(j < 6) {
        return 5;
      } else {
        return 8;
      }
    }
  }


};