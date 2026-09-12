let isRunning = true;
let timer = null;

// 初期表示時間（デフォルトは5秒）
let currentDisplayTime = 5000;

// 日本語読み上げ（位取り対応）
function readJapaneseNumber(numStr) {
    const num = Number(numStr.replace(/,/g, ""));

    const units = ["", "万", "億"];
    let parts = [];
    let temp = num;

    while (temp > 0) {
        parts.push(temp % 10000);
        temp = Math.floor(temp / 10000);
    }

    let result = [];

    parts.forEach((part, index) => {
        if (part === 0) return;

        let text = "";
        const thousands = Math.floor(part / 1000);
        const hundreds = Math.floor((part % 1000) / 100);
        const tens = Math.floor((part % 100) / 10);
        const ones = part % 10;

        if (thousands > 0) text += (thousands === 1 ? "せん" : thousands + "せん");
        if (hundreds > 0) text += (hundreds === 1 ? "ひゃく" : hundreds + "ひゃく");
        if (tens > 0) text += (tens === 1 ? "じゅう" : tens + "じゅう");
        if (ones > 0) text += ones;

        text += units[index];
        result.unshift(text);
    });

    return result.join("");
}

// ランダム数字生成（先頭ゼロ禁止＋コンマ区切り）
function generateRandomNumber() {
    const length = Math.floor(Math.random() * 10) + 1;

    let num = String(Math.floor(Math.random() * 9) + 1);

    for (let i = 1; i < length; i++) {
        num += Math.floor(Math.random() * 10);
    }

    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// 数字表示ループ
function startSequence() {
    const display = document.getElementById("number-display");

    function showNext() {
        if (!isRunning) return;

        const num = generateRandomNumber();
        display.textContent = num;

        timer = setTimeout(showNext, currentDisplayTime);
    }

    showNext();
}

// 停止／再開
document.getElementById("toggle-btn").addEventListener("click", () => {
    const btn = document.getElementById("toggle-btn");

    if (isRunning) {
        isRunning = false;
        clearTimeout(timer);
        btn.textContent = "再開";
    } else {
        isRunning = true;
        btn.textContent = "停止";
        startSequence();
    }
});

// 終了
document.getElementById("end-btn").addEventListener("click", () => {
    window.close();
    location.href = "about:blank";
});

// 表示時間変更
document.querySelectorAll(".time-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        currentDisplayTime = Number(btn.dataset.time);
    });
});

// 音声読み上げ
document.getElementById("voice-btn").addEventListener("click", () => {
    const num = document.getElementById("number-display").textContent;
    const text = readJapaneseNumber(num);

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "ja-JP";
    speechSynthesis.speak(utter);
});

// 初回起動
startSequence();
