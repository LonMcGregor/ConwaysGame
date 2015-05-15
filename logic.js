/*
* CONWAYS GAME LOGIC
* Array, life checks etc.
*/

function ConwaysGame(){
    console.log("Initiating ConwaysGame Library");
}

ConwaysGame.prototype = {
    
cgArray: [0][0],
sizeX: 0,
sizeY: 0,

/*
* Getter methods
*/
getArray : function()   { return this.cgArray; },
getSizeX : function()   { return this.sizeX; },
getSizeY : function()   { return this.sizeY; },
getState : function(x,y){ return this.cgArray[x][y]; },

/*
* Setter methods
*/
setArray : function(nArr) { this.cgArray       = nArr; },
setSizeX : function(newX) { this.sizeX         = newX; },
setSizeY : function(newY) { this.sizeY         = newY; },
setState : function(x,y,b){ this.cgArray[x][y] = b;    },


/*
* Initialise array to a false state
* In: Size x, Size y
*/
init : function(x,y){
    this.cgArray = [];
    this.sizeX = x;
    this.sizeY = y;
    this.clearArray(false);
},

/*
* Set entire array to false
*/
clearArray : function(){
    for (var i = 0; i < this.sizeX; i++){
        this.cgArray[i] = [];
        for (var j = 0; j < this.sizeY; j++){
            this.cgArray[i][j] = false;
        }
    }
},

/*
* Switch state of cell
* In: Position x, position y
*/
switchCellState : function(x,y){
    this.cgArray[x][y] = !this.cgArray[x][y];
},

/*
* Simulate one complete step of life across the array
*/
simulateStep : function(){
    var nextStageArray = [];
    for (var i = 0; i < sizeX; i++){
        nextStageArray[i] = [];
        for (var j = 0; j < sizeY; j++){
            nextStageArray[i][j] = this.checkOneCell(i,j);
        }
    }
    this.cgArray = nextStageArray;
},

/*
* Determine if a cell should live or die
* In: Position x, position y
*/
checkOneCell : function(x,y){
    var neighbours = this.countAliveNear(x,y);
    var currentState = this.getState(x,y);
    if(currentState && neighbours<2)
        return false;
    if(currentState && neighbours>1 && neighbours<4)
        return true;
    if(currentState && neighbours>3)
        return false;
    if(!currentState && neighbours==3)
        return true;
},

/*
* Count number of alive cells near the cell
* Also check if coordinated provided are on edge of the array
* In: position x, position y
*/
countAliveNear : function(x,y){
    var count = 0;
    var maxX = this.getSizeX();
    var maxY = this.getSizeY();
    if(((x-1) > 0)     && ((y-1) > 0)    && this.getState(x-1, y-1)) count++;
    if(                   ((y-1) > 0)    && this.getState(x,   y-1)) count++;
    if(((x+1) < maxX)  && ((y-1) > 0)    && this.getState(x+1, y-1)) count++;
    if(((x-1) > 0)     &&                   this.getState(x-1, y  )) count++;
    if(((x+1) < maxX)  &&                   this.getState(x+1, y  )) count++;
    if(((x-1) > 0)     && ((y+1) < maxY) && this.getState(x-1, y+1)) count++;
    if(                   ((y+1) < maxY) && this.getState(x,   y+1)) count++;
    if(((x+1) < maxX)  && ((y+1) < maxY) && this.getState(x+1, y+1)) count++;
    return count;
}
};



