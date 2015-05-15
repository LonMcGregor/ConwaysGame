/*
* CONWAYS GAME CONTROLS
* Start, stop, reset etc.
*/

/*
* Controls Getter methods
*/
function getx(){return $('#dataX').val();}
function gety(){return $('#dataY').val();}
function geti(){return $('#dataI').val();}

/*
* Adds Listeners to controls
*/
function addControlListeners(){
    $('#cmdStop').on('click', function(){
        running = false;
    });
    $('#cmdStart').on('click', function(){
        running = true;
        simulate();
    });
    $('#dataIterTime').on('change', function(){
        console.log('new time: '+this.value);
        interval = geti();
    });
    $('#cmdReset').on('click', function(){
        running = false;
        initGrid(getx(),gety());
    });
}

/*
* Initialisation commands
*/
addControlListeners();