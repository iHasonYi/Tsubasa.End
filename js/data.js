// ============= STATIC DATA =============
const statNames = {
    shoot: 'التسديد',
    accuracy: 'الدقة',
    speed: 'السرعة',
    intelligence: 'الذكاء',
    power: 'القوة',
    defense: 'الدفاع',
    passing: 'التمرير'
};

const statEmojis = {
    shoot: '⚡',
    accuracy: '🎯',
    speed: '💨',
    intelligence: '🧠',
    power: '💪',
    defense: '🛡️',
    passing: '⚙️'
};

// تحميل اللاعبين من JSON
let playersData = {};
fetch('data/players.json')
    .then(res => res.json())
    .then(data => {
        playersData = data.players;
        window.dispatchEvent(new Event('playersLoaded'));
    })
    .catch(err => console.error('خطأ في تحميل البيانات:', err));
