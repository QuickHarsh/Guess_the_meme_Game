const memeImage = document.getElementById('memeImage');
const optionsContainer = document.getElementById('options');
const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const resultElement = document.getElementById('result');
const normalModeBtn = document.getElementById('normalMode');
const hardModeBtn = document.getElementById('hardMode');
const correctSound = document.getElementById('correctSound');
const wrongSound = document.getElementById('wrongSound');
const backgroundMusic = document.getElementById('backgroundMusic');
backgroundMusic.volume = 0.2;

const loadingMessages = [
    "Loading memes... 🤔",
    "Gathering dank content... 😎",
    "Preparing your dose of laughter... 😂",
    "Almost there... 🚀",
    "Loading your meme knowledge... 🧠"
];

let score = 0;
let timeLeft = 60;
let timerInterval;
let isHardMode = false;
let currentMemeIndex = 0;
let streak = 0;

const memes = [
    {
        name: "Chalti Firti Cocaine hai Cocaine",
        image: "images/images.jpeg",
        options: ["Alakh Niranjan", "Nari Sakti Zindabad", "Chalti Firti Cocaine hai Cocaine", "Happy Happy Happy"]
    },
    {
        name: "Ye Gareeb Iski .....",
        image: "images/akkubaba007-gareeb.gif",
        options: ["Ye mere Papa hai", "Ye Gareeb Iski .....", "Ye gareeb bahot Mehnat karta hai", "Isko Hospital le jao"]
    },
    {
        name: "Ye sab Dogalapan hai",
        image: "images/dogalapan-ashneer.gif",
        options: ["Ye sab badhiya hai", "Ye sab Dogalapan hai", "To kaise hai aap log", "Chaliye suru karte hai"]
    },
    {
        name: "Ye G*#du Generation hai",
        image: "images/gendu-generation-generation.gif",
        options: ["Ye G*#du Generation hai", "Ye Can Do Generation hai", "Mere Pyare Deshvashiyon", "BJP ko hi vote dena"]
    },
    {
        name: "Kya Gunda Banega re tu",
        image: "images/giphy.gif",
        options: ["Chup kar be kutte", "Ae raju Khopdi fod Sale ka", "Kya Gunda Banega re tu", "Mera baap totla tha"]
    },
    {
        name: "Kya bak rhe ho ......",
        image: "images/hein-hain.gif",
        options: ["Kuch to gadbad hai daya", "Kya bak rhe ho ......", "pata lagao - pata lagao daya", "Daya darwaza tod do"]
    },
    {
        name: "Abe tu thoda sa ....",
        image: "images/tu-thoda-sa-round-2-hell.gif",
        options: ["race 3 ka salman khan", "Aur bhai kaisa hai", "Abe tu thoda sa ....", "omfoooom"]
    },
    {
        name: "Chup kar be kutte",
        image: "images/rajpal-yadav-chup-chup-ke.gif",
        options: ["Chup kar be kutte", "Acting hai....", "21 din me paisa double", "ye kis janvar ki chamdi hai"]
    },
    {
        name: "Hamare Yaha aisa hi hota hai",
        image: "images/Hamare_Yaha_Aisa_Hi_Hota_Hai_Ashish_Chanchlani_Meme_Template_Funny_Dialogue_Memes_World.gif",
        options: ["Mai tumse bada wala hu", "khwab dikhata hai ....", "Hamare Yaha aisa hi hota hai", "bijli ka bill tera baap bharega"]
    },
    {
        name: "Aaloo lelo .....",
        image: "images/sheaikh-mahim-alo-la-lo.gif",
        options: ["Ja pooch ke aa", "Aaloo lelo .....", "Seh lenge thoda", "Ye raaz bhi usi ke saath chal gaya"]
    },
];

function showLoadingMessage() {
    const randomMessage = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
    resultElement.textContent = randomMessage;
    resultElement.className = 'result loading';
}

function startGame() {
    score = 0;
    streak = 0;
    timeLeft = 60;
    currentMemeIndex = 0;
    scoreElement.textContent = score;
    timerElement.textContent = timeLeft;
    startBtn.style.display = 'none';
    restartBtn.style.display = 'none';
    resultElement.textContent = '';
    
    showLoadingMessage();
    
    backgroundMusic.play().catch(error => {
        console.log("Audio playback failed:", error);
    });

    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
    
    setTimeout(() => {
        showNextMeme();
    }, 2000);
}

function showNextMeme() {
    if (currentMemeIndex >= memes.length) {
        endGame();
        return;
    }

    const currentMeme = memes[currentMemeIndex];
    memeImage.src = currentMeme.image;
    optionsContainer.innerHTML = '';
    
    const shuffledOptions = [...currentMeme.options].sort(() => Math.random() - 0.5);
    
    shuffledOptions.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.addEventListener('click', () => checkAnswer(option));
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedOption) {
    const currentMeme = memes[currentMemeIndex];
    const isCorrect = selectedOption === currentMeme.name;
    
    if (isCorrect) {
        correctSound.play();
        score++;
        streak++;
        scoreElement.textContent = score;
        let message = "You're a meme lord! 🎉";
        if (streak >= 3) {
            message = "You're on fire! 🔥 Keep it up!";
        } else if (streak >= 2) {
            message = "Great streak! 🌟";
        }
        
        resultElement.textContent = message;
        resultElement.className = 'result correct';
    } else {
        wrongSound.play();
        streak = 0;
        resultElement.textContent = "Bruh, I think You are a Meme! 🤡";
        resultElement.className = 'result wrong';
    }

    document.querySelectorAll('.option-btn').forEach(btn => {
        if (btn.textContent === currentMeme.name) {
            btn.classList.add('correct');
        } else if (btn.textContent === selectedOption) {
            btn.classList.add('wrong');
        }
    });

    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.disabled = true;
    });
    
    setTimeout(() => {
        currentMemeIndex++;
        showNextMeme();
    }, 3000);
}

function endGame() {
    clearInterval(timerInterval);
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
    
    let message;
    if (currentMemeIndex >= memes.length) {
        message = `🎮 Game Complete! You're a true meme master! Final score: ${score}`;
    } else {
        message = `⏰ Time's up! Your meme knowledge score: ${score}`;
    }
    
    if (score >= 4) {
        message += "\n🏆 You're a Meme God!";
    } else if (score >= 2) {
        message += "\n👍 Not bad, keep practicing!";
    } else {
        message += "\n😅 Maybe watch more memes?";
    }
    
    resultElement.textContent = message;
    resultElement.className = 'result game-over';
    restartBtn.style.display = 'block';
}

startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);

normalModeBtn.addEventListener('click', () => {
    isHardMode = false;
    normalModeBtn.classList.add('active');
    hardModeBtn.classList.remove('active');
    memeImage.parentElement.classList.remove('hard-mode');
});

hardModeBtn.addEventListener('click', () => {
    isHardMode = true;
    hardModeBtn.classList.add('active');
    normalModeBtn.classList.remove('active');
    memeImage.parentElement.classList.add('hard-mode');
}); 