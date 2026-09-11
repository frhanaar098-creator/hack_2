/* =========================================
   POINTLESS LAB
   Main JavaScript
========================================= */


/* DATA */

const challenges = [
    "center",
    "button",
    "number",
    "color",
    "loading",
    "iq",
    "bot"
];

const titles = {
    center: "🎯 FIND THE EXACT MIDDLE",
    button: "🖱️ CATCH THE UNCATCHABLE BUTTON",
    number: "🔢 COMPLETELY RANDOM NUMBER",
    color: "🎨 FIND THE DIFFERENT COLOR",
    loading: "⏳ INFINITE LOADING",
    iq: "🧠 NONSENSE IQ TEST",
    bot: "🤖 USELESSBOT"
};

let currentChallenge = 0;

let data = JSON.parse(
    localStorage.getItem("pointlessData")
) || {
    attempts: 0,
    buttonsCaught: 0,
    time: 0
};


/* SAVE DATA */

function saveData() {
    localStorage.setItem(
        "pointlessData",
        JSON.stringify(data)
    );
}


/* PAGE NAVIGATION */

function showPage(page) {

    document.querySelectorAll(".page")
        .forEach(p => p.classList.remove("active"));

    document.getElementById(page)
        .classList.add("active");

    if (page === "results") {
        updateResults();
    }

    window.scrollTo(0, 0);
}


/* OPEN CHALLENGE */

function openChallenge(type) {

    currentChallenge = challenges.indexOf(type);

    if (currentChallenge < 0) {
        currentChallenge = 0;
    }

    showPage("game");

    loadChallenge();
}


/* LOAD CHALLENGE */

function loadChallenge() {

    const type = challenges[currentChallenge];

    document.getElementById("challengeNumber")
        .textContent =
        `CHALLENGE ${currentChallenge + 1} / 7`;

    document.getElementById("gameTitle")
        .textContent = titles[type];

    document.getElementById("gameAttempts")
        .textContent = data.attempts;

    const area =
        document.getElementById("gameArea");

    area.innerHTML = "";

    if (type === "center") {
        centerGame();
    }

    if (type === "button") {
        buttonGame();
    }

    if (type === "number") {
        numberGame();
    }

    if (type === "color") {
        colorGame();
    }

    if (type === "loading") {
        loadingGame();
    }

    if (type === "iq") {
        iqGame();
    }

    if (type === "bot") {
        botGame();
    }
}


/* ATTEMPT */

function attempt(message) {

    data.attempts++;

    saveData();

    document.getElementById("gameAttempts")
        .textContent = data.attempts;

    alert(message);
}


/* =========================================
   1. FIND THE CENTER
========================================= */

function centerGame() {

    const area =
        document.getElementById("gameArea");

    area.innerHTML = `
        <div class="game-message">
            <h2>🎯 Find the exact center</h2>
            <p>Click the center of this box.</p>
        </div>

        <button class="center-target"
                id="centerTarget">
        </button>
    `;

    const target =
        document.getElementById("centerTarget");

    target.style.left = "50%";
    target.style.top = "50%";
    target.style.transform =
        "translate(-50%, -50%)";

    target.onclick = function () {

        data.attempts++;

        saveData();

        target.style.left =
            Math.random() * 90 + 5 + "%";

        target.style.top =
            Math.random() * 80 + 10 + "%";

        document.querySelector(".game-message")
            .innerHTML = `
                <h2>🎉 PERFECT!</h2>
                <p>
                Unfortunately...
                the center moved.
                </p>
            `;

        document.getElementById("gameAttempts")
            .textContent = data.attempts;
    };
}


/* =========================================
   2. CATCH BUTTON
========================================= */

function buttonGame() {

    const area =
        document.getElementById("gameArea");

    area.innerHTML = `
        <div class="game-message">
            <h2>🖱️ CATCH ME!</h2>
            <p>
            Try clicking the button.
            </p>
        </div>

        <button id="escapeButton"
                class="escape-button">
            CLICK ME
        </button>
    `;

    const button =
        document.getElementById("escapeButton");

    function moveButton() {

        const maxX =
            area.clientWidth - 160;

        const maxY =
            area.clientHeight - 80;

        button.style.left =
            Math.random() * maxX + "px";

        button.style.top =
            Math.random() * maxY + "px";

        data.attempts++;

        saveData();

        document.getElementById("gameAttempts")
            .textContent = data.attempts;
    }

    button.addEventListener(
        "mouseenter",
        moveButton
    );

    button.addEventListener(
        "touchstart",
        moveButton
    );

    button.onclick = function () {

        data.buttonsCaught++;

        saveData();

        alert(
            "😳 IMPOSSIBLE!\n\n" +
            "You caught the button.\n" +
            "The button is now disappointed."
        );
    };
}


/* =========================================
   3. RANDOM NUMBER
========================================= */

function numberGame() {

    const area =
        document.getElementById("gameArea");

    let buttons = "";

    for (let i = 1; i <= 10; i++) {

        buttons += `
            <button onclick="wrongNumber(${i})">
                ${i}
            </button>
        `;
    }

    area.innerHTML = `
        <div class="iq-box">

            <h2>
                🔢 Guess the number I'm thinking of
            </h2>

            <p style="margin:20px;color:#999">
                Pick a number from 1 to 10.
            </p>

            <div class="number-buttons">
                ${buttons}
            </div>

        </div>
    `;
}


function wrongNumber(number) {

    data.attempts++;

    saveData();

    document.getElementById("gameAttempts")
        .textContent = data.attempts;

    alert(
        `❌ WRONG!\n\n` +
        `You selected ${number}.\n\n` +
        `I was thinking about a number ` +
        `between 1 and 10.\n\n` +
        `Unfortunately, it wasn't that one.`
    );
}


/* =========================================
   4. DIFFERENT COLOR
========================================= */

function colorGame() {

    const area =
        document.getElementById("gameArea");

    let circles = "";

    for (let i = 0; i < 50; i++) {

        let color =
            i === 27
                ? "rgb(145,70,220)"
                : "rgb(140,70,220)";

        circles += `
            <div
                class="color-circle"
                style="background:${color}"
                onclick="wrongColor()">
            </div>
        `;
    }

    area.innerHTML = `
        <div class="iq-box">

            <h2>🎨 Find the different color</h2>

            <p style="color:#999;margin:15px">
                One circle is different.
            </p>

            <div class="color-grid">
                ${circles}
            </div>

        </div>
    `;
}


function wrongColor() {

    data.attempts++;

    saveData();

    document.getElementById("gameAttempts")
        .textContent = data.attempts;

    const messages = [
        "❌ Wrong.",
        "❌ Nice try. Still wrong.",
        "❌ Your eyes have betrayed you.",
        "❌ That's not the one I meant.",
        "❌ Technically correct. Emotionally wrong."
    ];

    alert(
        messages[
            Math.floor(Math.random() * messages.length)
        ]
    );
}


/* =========================================
   5. INFINITE LOADING
========================================= */

function loadingGame() {

    const area =
        document.getElementById("gameArea");

    area.innerHTML = `
        <div class="loading-box">

            <div class="loading-number"
                 id="loadingNumber">
                0%
            </div>

            <div class="progress">
                <div id="loadingProgress"></div>
            </div>

            <p id="loadingText"
               style="margin-top:20px;color:#999">
                Click START to waste some time.
            </p>

            <button
                class="main-btn"
                onclick="startLoading()">
                START
            </button>

        </div>
    `;
}


function startLoading() {

    let progress = 0;

    const number =
        document.getElementById("loadingNumber");

    const bar =
        document.getElementById("loadingProgress");

    const text =
        document.getElementById("loadingText");

    const interval =
        setInterval(() => {

            progress++;

            number.textContent =
                progress + "%";

            bar.style.width =
                progress + "%";

            if (progress >= 99) {

                clearInterval(interval);

                setTimeout(() => {

                    number.textContent = "ERROR";

                    text.textContent =
                        "Loading failed. Obviously.";

                }, 500);
            }

        }, 80);
}


/* =========================================
   6. NONSENSE IQ
========================================= */

function iqGame() {

    const questions = [

        {
            q: "What is the color of Tuesday?",
            options: [
                "Red",
                "Blue",
                "Green",
                "Tuesday"
            ]
        },

        {
            q: "How many pixels are you thinking about?",
            options: [
                "12",
                "500",
                "∞",
                "Potato"
            ]
        },

        {
            q: "If a computer eats a sandwich, what happens?",
            options: [
                "It becomes faster",
                "Nothing",
                "It becomes hungry",
                "Windows crashes"
            ]
        }

    ];

    const question =
        questions[
            Math.floor(Math.random() * questions.length)
        ];

    let options = "";

    question.options.forEach(option => {

        options += `
            <button onclick="iqAnswer()">
                ${option}
            </button>
        `;
    });

    document.getElementById("gameArea")
        .innerHTML = `

        <div class="iq-box">

            <div class="iq-question">
                🧠 ${question.q}
            </div>

            <div class="iq-options">
                ${options}
            </div>

        </div>
    `;
}


function iqAnswer() {

    data.attempts++;

    saveData();

    document.getElementById("gameAttempts")
        .textContent = data.attempts;

    alert(
        "❌ INCORRECT.\n\n" +
        "Your intelligence was too logical."
    );

    iqGame();
}


/* =========================================
   7. USELESS BOT
========================================= */

function botGame() {

    document.getElementById("gameArea")
        .innerHTML = `

        <div class="iq-box">

            <div style="font-size:60px">
                🤖
            </div>

            <h2>UselessBot</h2>

            <p style="color:#999;margin:15px">
                The world's least useful AI.
            </p>

            <div class="chat-input"
                 style="max-width:500px;margin:auto">

                <input
                    id="gameBotInput"
                    placeholder="Ask me anything..."
                >

                <button onclick="gameBotReply()">
                    →
                </button>

            </div>

            <p id="botReply"
               style="margin-top:25px;color:#aaa">
            </p>

        </div>
    `;
}


function gameBotReply() {

    const input =
        document.getElementById("gameBotInput");

    const reply =
        document.getElementById("botReply");

    const text =
        input.value.toLowerCase();

    let answer;

    if (text.includes("center")) {

        answer =
            "Have you tried looking in the middle?";

    } else if (text.includes("useful")) {

        answer =
            "Absolutely not. That's our main feature.";

    } else if (text.includes("why")) {

        answer =
            "Because someone thought this was a good idea.";

    } else if (text.includes("hello") ||
               text.includes("hi")) {

        answer =
            "Hello. I hope you're wasting your time responsibly.";

    } else {

        const replies = [
            "Interesting. Unfortunately, I don't care.",
            "Processing... processing... still useless.",
            "That's above my pay grade.",
            "Have you tried turning your problem off and on again?",
            "Excellent question. Wrong website.",
            "I consulted my database. It contains nothing."
        ];

        answer =
            replies[
                Math.floor(Math.random() * replies.length)
            ];
    }

    reply.textContent =
        "🤖 " + answer;
}


/* =========================================
   CHALLENGE NAVIGATION
========================================= */

function nextChallenge() {

    currentChallenge++;

    if (currentChallenge >= challenges.length) {

        showPage("results");

        return;
    }

    loadChallenge();
}


function previousChallenge() {

    currentChallenge--;

    if (currentChallenge < 0) {
        currentChallenge = 0;
    }

    loadChallenge();
}


/* =========================================
   RESULTS
========================================= */

function updateResults() {

    document.getElementById("totalAttempts")
        .textContent = data.attempts;

    document.getElementById("buttonsCaught")
        .textContent = data.buttonsCaught;

    let accuracy = 0;

    if (data.buttonsCaught > 0) {

        accuracy =
            Math.min(
                100,
                data.buttonsCaught * 10
            );
    }

    document.getElementById("accuracy")
        .textContent = accuracy + "%";


    let rank = "🥉 BEGINNER";

    if (data.attempts >= 10) {
        rank = "🥈 PROFESSIONAL WASTER";
    }

    if (data.attempts >= 30) {
        rank = "🥇 MASTER OF USELESSNESS";
    }

    if (data.attempts >= 70) {
        rank = "👑 CEO OF WASTING TIME";
    }

    document.getElementById("rank")
        .textContent = rank;
}


/* =========================================
   CHATBOT
========================================= */

function toggleChat() {

    const chatbot =
        document.getElementById("chatbot");

    chatbot.style.display =
        chatbot.style.display === "block"
            ? "none"
            : "block";
}


function sendMessage() {

    const input =
        document.getElementById("chatInput");

    const messages =
        document.getElementById("chatMessages");

    const text =
        input.value.trim();

    if (!text) return;


    messages.innerHTML += `
        <div class="user-message">
            ${text}
        </div>
    `;


    const replies = [
        "Have you tried doing absolutely nothing?",
        "Interesting. I will ignore that.",
        "That sounds like a problem for a useful AI.",
        "Processing... still useless.",
        "Why would you ask me that?",
        "I don't know. And I don't plan to find out.",
        "Excellent question. Completely unnecessary.",
        "My answer is probably wrong."
    ];


    setTimeout(() => {

        const reply =
            replies[
                Math.floor(
                    Math.random() * replies.length
                )
            ];

        messages.innerHTML += `
            <div class="bot-message">
                ${reply}
            </div>
        `;

        messages.scrollTop =
            messages.scrollHeight;

    }, 500);


    input.value = "";
}


/* ENTER KEY FOR CHAT */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Enter" &&
            document.activeElement.id === "chatInput"
        ) {
            sendMessage();
        }

    }
);


/* INITIALIZE */

saveData();