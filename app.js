let isRunning = true;
let timer = null;

// 表示時間（秒）を選択可能：5秒・7秒・9秒
const displayTimes = [5000, 7000, 9000];

// ランダム桁数の数字を生成（1〜10桁）
function generateRandomNumber() {
    const length = Math.floor(Math.random() * 10) + 1; // 1〜10桁
    let num = "";
    for (let i = 0; i < length; i++) {
        num += Math.floor(Math.random() * 10);
    }
    return num;
}

// 数字を表示し続けるメイン処理
function startSequence() {
    const display = document.getElementById("number-display");

    function showNext() {
        if (!isRunning) return;

        const num = generateRandomNumber();
        display.textContent = num;

        const duration = displayTimes[Math.floor(Math.random() * displayTimes.length)];

        timer = setTimeout(showNext, duration);
    }

    showNext();
}

// 停止／再開ボタン
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

// 終了ボタン（PWAではホーム画面に戻る動作）
document.getElementById("end-btn").addEventListener("click", () => {
    window.close(); // Safariでは閉じられない場合がある
    location.href = "about:blank"; // ホーム画面に戻る代替動作
});

// 初回起動
startSequence();