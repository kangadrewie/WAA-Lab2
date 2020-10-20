$(document).ready(() => {

    let colors = ['blue', 'red', 'green', 'orange'] 
    let score = {
        current: '',
        count: 0,
        gameCounter: 0
    }

    $('body').attr("onload", "startGame()");

    createGrid = () => {
        let table = document.getElementById("grid");
        let size = 6;

        for (i = 0; i < size; i++) {
            let row = table.insertRow();
            for (n = 0; n < size; n++) {
                row.insertCell();
                $(row.cells[n]).addClass(colorGenerator());
                $(row.cells[n]).attr('onclick', 'handleClick(this)');
            }
        }

        table.style.opacity = '1';
        $('#startButton').css('opacity', '0');
        $('#startButton').css('zIndex', '-9999');
    }

    colorGenerator = () => {
        let randomColor = colors[Math.floor(Math.random() * colors.length)];
        return randomColor
    }

    handleClick = (e) => {
        console.log(score.gameCounter);

        if (score.gameCounter < 35) {
            if (!$(e).hasClass('inactive') && $(e).hasClass(score.current)) {
                score.gameCounter = score.gameCounter + 1
                removeColorFromGrid(e);
                updateScore(); 
            }
        } else {
            clearGame();
        }
    }

    updatePrimaryHeading = (color) => {
        $('#primaryHeading').html(captialiseFirstLetter(color));
        $('#primaryHeading').css('color', color);
    }

    captialiseFirstLetter = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    removeColorFromGrid = (grid) => {
       $(grid).addClass('inactive'); 
    }

    updateScore = () => {
        score.count = score.count - 1;
        $('#score').html(score.count + ' ' + captialiseFirstLetter(score.current) + 's Colours Left'); 
        if (score.count === 0) {
            colors = colors.filter(e => e !== score.current);
            initalise();
            $('#score').html(score.count + ' ' + captialiseFirstLetter(score.current) + 's Colours Left'); 
        } 
    }

    clearGame = () => {
        $('#primaryHeading').css('opacity', '0');
        $('#score').css('opacity', '0');
        $('#grid').css('opacity', '0');
        $('#gameComplete').css('opacity', '1');
        $('#startButton').css('opacity', '1');
        $('#grid').empty();
        $('#startButton').attr("onclick", "window.location.reload()");
        $('#startButton').css("zIndex", "9999");
    }

    setCount = () => {
        score.count = $(document).find('td.' + score.current).length;
    }

    initalise = () => {
        let firstColor = colorGenerator();
        score.current = firstColor;

        setCount();
        updatePrimaryHeading(firstColor);
    }

    startGame = () => {
        createGrid();
        initalise();
        $('body').attr("onclick", "").unbind("click");
        $('body').css("cursor", "auto");
    }
})
