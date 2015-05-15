/*
* CONWAYS GAME DOM
* grid manager, controls etc.
*/

/*
* Global State Variables
*/
var sizeX      = 0;
var sizeY      = 0;
var interval   = 20;
var running    = false;
var wasRunning = false;
var cg = new ConwaysGame();


/*
* Initialise CG and Grid Display
* In: Size x, size y
*/
function initGrid(x,y){
    cg.init(x,y);
    interval = geti();
    syncDown();
}

/*
* Sync from CG Logic to Dom Grid
*/
function syncDown(){
    sizeX = cg.getSizeX();
    sizeY = cg.getSizeY();
    arrayToGrid(cg.getArray());
}

/*
* Sync one dom cell's change up to CG logic
* In: Element cell
*/
function syncOneCell(el){
    var x = getCx(el);
    var y = getCy(el);
    cg.setState(x, y, isAlive(x, y));
}

/*
* Convert array into Dom grid, and set listeners for these
*/
function arrayToGrid(array){
    clearGrid();
    for (var i = 0; i < sizeX; i++){
        var row = '<div class="row">';
        for (var j = 0; j < sizeY; j++){
            row = row + '<div class="cell '
            if(array[i][j])
                row = row + 'alive" id="cell-'+i+'-'+j+'"></div>';
            else
                row = row + 'dead" id="cell-'+i+'-'+j+'"></div>';
        }
        row = row + '</div>';
        $('#gameContainer').append(row);
    }
    addBoardListeners();
}

/*
* Remove listeners from grid, and clear dom elements
*/
function clearGrid(){
    $('.cell').off('click');
    $('#gameContainer').off('mousedown');
    $('#gameContainer').empty();
}

/*
* Getter methods for cells positions
* In: Element cell
*/
function getCx(el){
    var cellID = $(el).attr('id').split('-');
    return cellID[1];
}
function getCy(el){
    var cellID = $(el).attr('id').split('-');
    return cellID[2];
}

/*
* Getter method for cell state
* In: Element cell
*/
function isAlive(x,y){
    var cellID = '#cell-'+x+'-'+y;
    if(x>=0  && x<sizeX && y>=0 && y<sizeY)
        return $(cellID).hasClass('alive');
}

/*
* Setter for a cell's state
* In: position x, position y, bool state
*/
function setCellState(x,y,state){
    var cellID = '#cell-'+x+'-'+y;
    $(el).removeClass('alive');
    $(el).removeClass('dead');
    if(bool)
        $(el).addClass('alive');
    else
        $(el).addClass('dead');
}

/*
* Switch a cell's state
* In: position x, position y
*/
function switchCellStateCoords(x,y){
    var cellID = '#cell-'+x+'-'+y;
    switchCellState($(cellID));
}

/*
* Switch a cell's state
* In: Element cell
*/
function switchCellState(el){
    if($(el).hasClass('alive')){
        $(el).removeClass('alive');
        $(el).addClass('dead');
    }else{
        $(el).removeClass('dead');
        $(el).addClass('alive');
    }
}

/* 
* Run the simulation
*/
function simulate(){
    cg.simulateStep();
    syncDown();
    if(running)
        setTimeout(function(){simulate()}, interval);
}

/*
* Add listeners to the main game grid and cells
*/
function addBoardListeners(){
    $('#gameContainer').on('mousedown', function(){
        wasRunning = running;
        running = false;
        $('.cell').on('mouseover', function(){
            switchCellState(this);
            syncOneCell(this);
        });
    });
    $('#gameContainer').on('mouseup', function(){
        $('.cell').off('mouseover');
        running = wasRunning;
    });
    $('.cell').on('click', function(){
        wasRunning = running;
        running = false;
        switchCellState(this);
        syncOneCell(this);
        running = wasRunning;
    });
}