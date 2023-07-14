const hallOfFame = {
  fetch(){
    const promise = new Promise((resolve, reject) => {
      const objSvc = VMXFoundry.getObjectService("TetrisSudokuObjectService", {"access": "online"});
      const dataObject = new voltmx.sdk.dto.DataObject("HallOfFame");
      objSvc.fetch({
        "dataObject": dataObject
      }, (response) => {
        resolve(response.records);
      }, (error) => {
        reject(error.errmsg);
      });
    });
    return promise;
  },
  
  update({id, score}){
    const promise = new Promise((resolve, reject) => {
      const objSvc = VMXFoundry.getObjectService("TetrisSudokuObjectService", {"access": "online"});
      const dataObject = new voltmx.sdk.dto.DataObject("HallOfFame");
      dataObject.addField('primaryKeyField', 'id');
      dataObject.addField('id', id);
      dataObject.addField('score', score);
      objSvc.update({
        "dataObject": dataObject
      }, () => {
        resolve();
      }, (error) => {
        reject(error.errmsg);
      });
    });
    return promise;
  },
  
  create({name, score}){
    const promise = new Promise((resolve, reject) => {
      const objSvc = VMXFoundry.getObjectService("TetrisSudokuObjectService", {"access": "online"});
      const dataObject = new voltmx.sdk.dto.DataObject("HallOfFame");
      dataObject.addField('name', name);
      dataObject.addField('score', score);
      objSvc.create({
        "dataObject": dataObject
      }, () => {
        resolve();
      }, (error) => {
        reject(error.errmsg);
      });
    });
    return promise;
  },
  
};