const statNames = {
    kick: 'قوة التسديد',
    dribble: 'المراوغة',
    speed: 'السرعة',
    technique: 'التقنية',
    power: 'القوة البدنية',
    defense: 'الدفاع',
    pass: 'التمرير'
};

const statEmojis = {
    kick: '⚡',
    dribble: '🌊',
    speed: '💨',
    technique: '🧠',
    power: '💪',
    defense: '🛡️',
    pass: '⚙️'
};

let playersData = {};
let maxStat = 10500;

fetch('data/players.json')
    .then(res => res.json())
    .then(data => {
        playersData = data.players;
        maxStat = data.maxStat || 10500;
        window.dispatchEvent(new Event('playersLoaded'));
    })
    .catch(err => console.error('خطأ في تحميل البيانات:', err));
