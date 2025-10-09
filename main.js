// 数字をフォーマットする関数（有効数字4桁、接頭辞付き）
function formatNumber(num) {
    const absNum = Math.abs(num);
    let value, prefix;
    
    if (absNum >= 1e30) {
        value = (num / 1e30).toPrecision(6);
        prefix = 'Q';
    } else if (absNum >= 1e27) {
        value = (num / 1e27).toPrecision(6);
        prefix = 'R';
    } else if (absNum >= 1e24) {
        value = (num / 1e24).toPrecision(6);
        prefix = 'Y';
    } else if (absNum >= 1e21) {
        value = (num / 1e21).toPrecision(6);
        prefix = 'Z';
    } else if (absNum >= 1e18) {
        value = (num / 1e18).toPrecision(6);
        prefix = 'E';
    } else if (absNum >= 1e15) {
        value = (num / 1e15).toPrecision(6);
        prefix = 'P';
    } else if (absNum >= 1e12) {
        value = (num / 1e12).toPrecision(6);
        prefix = 'T';
    } else if (absNum >= 1e9) {
        value = (num / 1e9).toPrecision(6);
        prefix = 'G';
    } else if (absNum >= 1e6) {
        value = (num / 1e6).toPrecision(6);
        prefix = 'M';
    } else if (absNum >= 1e3) {
        value = (num / 1e3).toPrecision(6);
        prefix = 'k';
    } else {
        value = num.toPrecision(6);
        prefix = '';
    }
    
    return { value, prefix };
}

// Google Sheets APIから値を取得して数字を表示
async function loadSpeed() {
    try {
        const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets/1oa6Qbkp66DVlC61aVP8UKc5QDFTIKkKkoE9xbtkmGgc/values/Sheet1!A1?key=AIzaSyDX2HzAe8eJgj3CtPtEOtqbsgxoQpd_i2c');
        const data = await response.json();
        const speedNumber = document.getElementById('speedNumber');
        const speedUnit = document.getElementById('speedUnit');
        
        // values[0][0]から数字を取得
        if (data.values && data.values[0] && data.values[0][0]) {
            const number = parseFloat(data.values[0][0]);
            
            if (!isNaN(number)) {
                const { value, prefix } = formatNumber(number);
                speedNumber.textContent = value + prefix;
                speedUnit.textContent = 'phowa/s';
            } else {
                speedNumber.textContent = '---';
                speedUnit.textContent = 'phowa/s';
            }
        } else {
            speedNumber.textContent = '---';
            speedUnit.textContent = 'phowa/s';
        }
    } catch (error) {
        console.error('速度データの取得に失敗しました:', error);
        document.getElementById('speedNumber').textContent = '---';
        document.getElementById('speedUnit').textContent = 'phowa/s';
    }
}

// ページ読み込み時に実行
window.addEventListener('load', loadSpeed);
