/*
DragAndDrop rel. 1.0.2

The DragAndDrop class may be used to implement a drag and drop context inside a form.
The DragAndDrop class deals with the following concepts:

- the Drag Area is the container where the drag and drop action takes place. The Source Areas and the Target Areas must be defined
within the boundaries of the Drag Area. The Drag Area typically is as big as the form itself.

- a Source Area is a container which is the parent of the objects where the drag action originates. 

- the Source Object is the object on which the drag and drop action originates. 

- the Dragged Object is the object that is dragged during the drag and drop action. 
A dragged Object is typically a clone of the Source Object and it is a child of the Drag Area.

- a Target Area is a container an the object is moved/created as a result of a drop action. 

- a Drop Area is a container where the drop action takes place. A Drop Area must be either a Target Area itself
or a direct child of a Target Area.

- the dragCallback is a callback fired when the object is dragged outside the boundaries of any Drop Area

- the endCallback is a callback fired when the object is dropped outside the boundaries of any Drop Area. After calling
this callback the lifecycle of the dragged object ends and the draggedObject is deleted fro the drag area.

- the moveCallback is a callback fired when the object is dragged within the boundaries of a Drop Area

- the dropCallback is a callback fired when the object is dropped within the boundaries of a Drop Area. After calling
this callback the lifecycle of the dragged object ends and the draggedObject is deleted fro the drag area.

WARNING: To use this class you MUST check the box Ënable JS Library mode" in Project Settings.

*/


class DragAndDrop{
  /**
  * When true all event callbacks of this DragAndDrop instance are not executed. 
  */
  suspendEvents(suspend){
    this._suspendEvents = !!suspend;
  }
  
  /**
  * Returns true if the event callbacks are suspended.
  */
  eventsSuspended(){
    return !!this._suspendEvents;
  }

  /**
  * Creates an instance of the DragAndDrop class.
  * 
  * view: the reference to the current view
  */
  constructor(view){
    this._suspendEvents = false;
    this._view = view;
    this._dragging = false;
    this._dragged = null;
    this._dragArea = null;
    this._startX = null;
    this._startY = null;
    this._startLeft = null;
    this._startTop = null;
    this._sourceAreas = [];
    this._targetAreas = [];
    this._dropAreas = [];
    this._dragCallback = null;
    this._endCallback = null;
    this._sourceObject = null;
  }

  /**
  * Returns an array of objects each of which represents a drop area and its related callbacks
  * [{dropArea, moveCallback, dropCallback}, ...] as defined in the makeDropArea method.
  * 
  */
  getDropAreas(){
    return this._dropAreas;
  }

  /**
  * Return an array of references to all currently defined Target Areas.
  */
  getTargetAreas(){
    return this._targetAreas;
  }

  /**
  * Removes a drop area from the list of existing drop areas. One must call this method upon
  * removal of a drop area from a target area.
  *
  * id: id of the drop area.
  */
  removeDropArea(id){
    this._dropAreas = this._dropAreas.filter((a) => a.dropArea.id !== id);
  }

  /**
  * Return the reference to the source object, on which the drag and drop actions originated.
  */
  getSourceObject(){
    return this._sourceObject;
  }

  /**
  * Defines a given flex container as a target area.
  *
  * targetArea: the reference to a flex container.
  */
  addTargetArea(targetArea){
    this._targetAreas.push(targetArea);
  }

  addSourceArea(sourceArea){
    this._sourceAreas.push(sourceArea);
  }

  /**
  * This is an utility method used to check wheter a given widget is a direct child of any of the areas specified.
  *
  * widget: the reference to a widget.
  * areas: an array of flex containers.
  */
  existsInArea(widget, areas){
    for(let area of areas){
      const widgets = area.widgets() || [];
      for(let w of widgets){
        if(w.id === widget .id){
          return true;
        }
      }
    }
    return false;
  }

  /**
  *
  * Defines a given object as the origin of a drag and drop action.
  * Remark: the source object is a child of the Source Area while the dragged object is a child of the dragged area.
  *
  * sourceObject: the source object for the drag and drop action.
  * draggedObject: the reference to the object which is actually dragged. This is typically a clone of the source object.
  */
  makeDraggable(sourceObject, draggedObject){
    sourceObject.onTouchStart = (widget, x, y) => {
      if(!this._suspendEvents){
        if(this.existsInArea(sourceObject, this._sourceAreas) || this.existsInArea(sourceObject, this._targetAreas)){
          //           voltmx.sdk.logsdk.info(`onTouchStart: ${sourceObject.id}`);
          this._sourceObject = sourceObject;
          this._dragging = true;
          this._dragged = draggedObject;

          this._dragged.left = `${this._xInDragArea(sourceObject, 0)}dp`;
          this._dragged.top = `${this._yInDragArea(sourceObject, 0)}dp`;
          this._dragged.width = `${sourceObject.frame.width}dp`;
          this._dragged.height = `${sourceObject.frame.height}dp`;
          this._dragged.onTouchStart = () => {};
          this._dragArea.add(this._dragged);
        }
      }
    };
  }

  /**
  * Defines the drag area for the drag and drop action. That is the flex container within 
  * which boundaries an object can be dragged.
  *
  * dragArea: the reference to the flex container which is defined as the drag area
  * dragCallback: fired when the draggedObject {@see makeDraggable} is dragged outside the boundaries
  *.  of a drop area. The dragCallback is called with the draggedObject reference as the only argument
  * endCallback: fired when the draggedObject {@see makeDraggable} is dropped outside the boundaries
  *.  of a drop area. The endCallback is called with the draggedObject reference as the only argument
  */
  makeDragArea(dragArea, dragCallback, endCallback){
    dragCallback = dragCallback || (() => {});
    endCallback = endCallback || (() => {});
    this._dragCallback = dragCallback;
    this._endCallback = endCallback;
    this._dragArea = dragArea;

    dragArea.onTouchStart = (widget, x, y) => {
      if(!this._suspendEvents){
        if(this._dragging && this._dragged){
          //           voltmx.sdk.logsdk.info(`onTouchStart: ${widget.id}`);
          this._startLeft = parseInt(this._dragged.left.replace(/dp/g, ''));
          this._startTop = parseInt(this._dragged.top.replace(/dp/g, ''));
          this._startX = Math.round(x);
          this._startY = Math.round(y);
        }
      }
    };

    dragArea.onTouchMove = (widget, x, y) => {
      if(!this._suspendEvents){
        if(this._dragging && this._dragged){
          const deltaX = Math.round(x) - this._startX;
          const deltaY = Math.round(y) - this._startY;
          this._dragged.left = `${this._startLeft + deltaX}dp`;
          this._dragged.top = `${this._startTop + deltaY}dp`;
          this._view.forceLayout();

          let found = false;

          for(let {dropArea, moveCallback} of this._dropAreas){
            if(this.isInsideDropArea({x, y, dropArea})){
              moveCallback(this._dragged, dropArea);
              found = true;
              break;
            }
          }

          if(!found){
            this._dragCallback(this._dragged);
          }
        }

      }
    };

    dragArea.onTouchEnd = (widget, x, y) => {
      if(!this._suspendEvents){
        if(this._dragging && this._dragged){
          //           voltmx.sdk.logsdk.info(`onTouchEnd: ${widget.id}`);
          this._dragging = false;
          const deltaX = Math.round(x) - this._startX;
          const deltaY = Math.round(y) - this._startY;

          let found = false;

          try {
            for(let {dropArea, dropCallback} of this._dropAreas){
              if(this.isInsideDropArea({x, y, dropArea})){
                this._dragged.left = `${this._startLeft + deltaX}dp`;
                this._dragged.top = `${this._startTop + deltaY}dp`;
                dropCallback(this._dragged, dropArea);
                this._dragArea.remove(this._dragged);
                found = true;
                break;
              }
            }
          } catch(error) {
            found = false;
          }

          if(!found){
            this._endCallback(this._dragged);
            this._dragArea.remove(this._dragged);
          }

        }}

    };
  }

  /**
  * Set a given container as a drop area. When an object is dragged or dropped inside a drop area 
  * the corresponding moveCallback or dropCallback are fired.
  *
  * dropArea: a flex container.
  * moveCallback: the callback fired when the draggedObject {@see makeDraggable} is dragged within the boundaries
  *.  of a drop area. The moveCallback is called with the following aruments moveCallback(draggedObject, dropArea).
  * dropCallback: the callback fired when the draggedObject {@see makeDraggable} is dropped within the boundaries
  *.  of a drop area. The dropCallback is called with the following aruments dropCallback(draggedObject, dropArea).
  */
  makeDropArea(dropArea, moveCallback, dropCallback){
    moveCallback = moveCallback || (() => {});
    dropCallback = dropCallback || (() => {});
    this._dropAreas.push({
      dropArea,
      moveCallback,
      dropCallback
    });
  }


  _xInDragArea(area, x){
    const parent = area.parent;
    const offset = parent.contentOffsetMeasured ? parent.contentOffsetMeasured.x : 0;
    //     offset && voltmx.sdk.logsdk.info(`offset X: ${offset}`);
    x += area.frame.x - offset;
    return parent.id === this._dragArea.id ? x : this._xInDragArea(parent, x);
  }

  _yInDragArea(area, y){
    const parent = area.parent;
    const offset = parent.contentOffsetMeasured ? parent.contentOffsetMeasured.y : 0;
    //     offset && voltmx.sdk.logsdk.info(`offset y: ${offset}`);
    y += area.frame.y - offset;
    return parent.id === this._dragArea.id ? y : this._yInDragArea(parent, y);
  }


  /**
  * This is an utility method used to determine whether a given point having coordinates {x, y}
  * in the drag area lies inside the given drop area.
  */
  isInsideDropArea({x, y, dropArea}){
    const leftDropArea = this._xInDragArea(dropArea, 0);
    const topDropArea = this._yInDragArea(dropArea, 0);
    return(x > leftDropArea && x < leftDropArea + dropArea.frame.width &&
           y > topDropArea && y < topDropArea + dropArea.frame.height);
  }

}
