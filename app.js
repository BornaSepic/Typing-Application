function ready(fn) {
    if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

var questions = [{
        'image': "https://cdn.vox-cdn.com/thumbor/Wd-2zsFlWxXz1HgmGEEwXx5iYBI=/0x0:1000x605/1200x800/filters:focal(420x223:580x383)/cdn.vox-cdn.com/uploads/chorus_image/image/48780381/duck.0.png",
        'name': "duck"
    },
    {
        'image': "https://fthmb.tqn.com/Fy2WTHwl1ZTnGsX1OVW7eKCzGmg=/960x0/filters:no_upscale()/horse-galloping-in-grass-688899769-587673275f9b584db3a44cdf.jpg",
        'name': "horse"
    },
    {
        'image': "https://d3jkudlc7u70kh.cloudfront.net/dolphin-fact.jpg",
        'name': "dolphin"
    },
    {
        'image': "https://www.cesarsway.com/sites/newcesarsway/files/styles/large_article_preview/public/Natural-Dog-Law-2-To-dogs%2C-energy-is-everything.jpg?itok=Z-ujUOUr",
        'name': "dog"
    },
    {
        'image': "https://puxccbo05z-flywheel.netdna-ssl.com/wp-content/uploads/2015/02/camel-1.jpg",
        'name': "camel"
    },
    {
        'image': "https://www.total-croatia-news.com/media/k2/items/cache/b4b57ce0a3582370e4a9776c195da329_XL.jpg",
        'name': "lion"
    },
    {
        'image': "https://blog.oxforddictionaries.com/wp-content/uploads/zebra.jpg",
        'name': "zebra"
    },
    {
        'image': "https://cdn.modernfarmer.com/wp-content/uploads/2014/09/cowhero2.jpg",
        'name': "cow"
    },
    {
        'image': "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA5Ny85NTkvb3JpZ2luYWwvc2h1dHRlcnN0b2NrXzYzOTcxNjY1LmpwZw==",
        'name': "cat"
    },
    {
        'image': "https://fthmb.tqn.com/52eoBCUCLaeXZiKNz66Fg6z043Q=/960x0/filters:no_upscale()/you-have-called-me-dwarf-hamster-6-weeks-old-184337772-5848b1065f9b58dccc9fc10c.jpg",
        'name': "hamster"
    }
];
var questionKey;
var questionIndex = 0;
var lettersDisplayed = [];
var lettersHidden = [];
var randomlyPickedLettersCount = 0;
var score = 1;
var endScore = 0;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function startApp() {
    document.querySelector('.startApp').style.display = 'none';
    document.querySelector('.app').style.display = 'block';
    document.querySelector('.endScreen').style.display = 'none';

    score = 1;
    emptyArrays();
    shuffleArray(questions);
    generateQuestion();
    document.querySelector('.starDisplay').innerHTML = '';

}

function emptyArrays() {
    console.log(document.querySelector('.ta-input').firstChild);
    questionIndex = 0;
    lettersDisplayed = [];
    lettersHidden = [];
    randomlyPickedLettersCount = 0;
    var myNode = document.querySelector('.ta-input');
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }

}

function appEnd() {
    if (score === 11) {
        setTimeout(() => {
        document.querySelector('.app').style.display = 'none';
        document.querySelector('.endScreen').style.display = 'block';
        document.querySelector('.endScore').innerHTML = 'You have completed this task with a  ' + endScore + '/10 score';
        }, 1500);
    }else{
        openNextModal();
    }
}
function openNextModal() {
    document.querySelector('.nextTask').style.display = 'block';
    document.querySelector('.ta-next').addEventListener ('click', newQuestion);
}
function starAppend() {
    const starDisplay = document.querySelector('.starDisplay');
    var star = document.createElement("p");
    var textStar = document.createTextNode('');
    star.appendChild(textStar);
    star.classList.add('fas','fa-star');
    console.dir('star');
    
    starDisplay.appendChild(star);
}
function newQuestion() {
    starAppend();
    document.querySelector('.nextTask').style.display = 'none';

    lettersDisplayed = [];
    lettersHidden = [];
    document.querySelector('.ta-message').innerHTML = "";
    let inputDisplay = document.querySelector('.ta-input');
    while (inputDisplay.firstChild) {
        inputDisplay.removeChild(inputDisplay.firstChild);
    }
    generateQuestion();
}

function generateQuestion() {
    document.querySelector('.ta-message').innerHTML = 'Type in a letter!';
    if (questionIndex < questions.length) {
        displayInformation(questions[questionIndex]);
        questionIndex++;
    } else {
        console.log("ran out of questions");
    }
}

function displayInformation(question) {
    //display image
    const imageDisplay = document.querySelector('.ta-image');
    imageDisplay.style.backgroundImage = "url('" + question.image + "')";
    var letters = question.name.split('');
    //display letters
    letters.forEach(letter => {
        let letterHolder = document.createElement("span");
        let individualLetter = document.createTextNode(letter.toUpperCase());
        letterHolder.appendChild(individualLetter);
        letterHolder.classList.add('lettersDisplay');
        lettersDisplayed.push(letterHolder);
        document.querySelector('.ta-input').appendChild(letterHolder);
    });
    //hide some letters
    randomlyPickedLettersCount = 0;
    const numberOfLettersToHide = Math.ceil(question.name.length / 2);
    let lettersToPickFrom = question.name;
    while (randomlyPickedLettersCount < numberOfLettersToHide) {
        const letterIndex = Math.floor((Math.random() * (lettersToPickFrom.length - 1)) + 0);
        const randomlyPickedLetter = lettersToPickFrom[letterIndex];
        const elementAboutToBeHidden = lettersDisplayed[letters.indexOf(randomlyPickedLetter)];
        lettersHidden.push(elementAboutToBeHidden);
        lettersToPickFrom = lettersToPickFrom.substr(0, letterIndex) + lettersToPickFrom.substr(letterIndex + 1);
        elementAboutToBeHidden.classList.add('hiddenLetter');
        randomlyPickedLettersCount += 1;
    }
}


function remove(array, element) {
    const index = array.indexOf(element);
    array.splice(index, 1);
}

function checkForWin() {
    if (lettersHidden.length === 0) {
        document.querySelector('.ta-message').innerHTML = 'Good job!';
        score++;
        appEnd();
    } else if (lettersHidden.length === 1) {
        document.querySelector('.ta-message').innerHTML = 'There is ' + lettersHidden.length + ' letter to go';
    } else {
        document.querySelector('.ta-message').innerHTML = 'There are ' + lettersHidden.length + ' letters to go';
    }
}

function submitAnswer() {
    var even = function(element) {
        if (event.key.toUpperCase() !== element.innerHTML) {
            document.querySelector('.ta-message').innerHTML = 'Wrong key, try again!';
            return false;
        }

        element.classList.remove('hiddenLetter');
        remove(lettersHidden, element);
        checkForWin();
        return true;
    }

    lettersHidden.some(even);
};


ready(function() {
    const startButton = document.querySelector('.start-button');
    const restartButton = document.querySelector('.ta-restart');
    startButton.addEventListener('click', startApp);
    restartButton.addEventListener('click', startApp);
    document.addEventListener('keydown', submitAnswer);
});