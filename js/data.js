const statNames = {
    kick: 'Kick',
    dribble: 'Dribble',
    speed: 'Speed',
    technique: 'Technique',
    power: 'Power',
    defense: 'Defense',
    pass: 'Pass'
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
let maxStat = 11500;

fetch('data/players.json')
    .then(res => res.json())
    .then(data => {
        playersData = data.players;
        maxStat = data.maxStat || 11500;
        document.getElementById('totalCount').textContent = Object.keys(playersData).length;
        window.dispatchEvent(new Event('playersLoaded'));
    })
    .catch(err => console.error('Error loading data:', err));
