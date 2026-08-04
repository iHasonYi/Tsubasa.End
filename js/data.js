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
let maxStat = 11000;

fetch('data/players.json')
    .then(res => res.json())
    .then(data => {
        playersData = data.players;
        maxStat = data.maxStat || 11000;
        window.dispatchEvent(new Event('playersLoaded'));
    })
    .catch(err => console.error('Error loading data:', err));
