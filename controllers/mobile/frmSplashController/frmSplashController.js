define({ 

  onViewCreated(){
    this.view.preShow = () => {
      splashController.preShow.call(this);
    };

    this.view.postShow = () => {
      splashController.postShow.call(this);
    };
  }

});