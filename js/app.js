let comments = JSON.parse(localStorage.getItem('tsubasa_comments') || '[]');

const defaultComments = [
    { name: 'TsubasaFan', text: 'Tsubasa Dreamfest is the best version! His Drive Tiger Shot is unstoppable! 🔥', time: '1 hour ago', likes: 24, liked: false },
    { name: 'GameAnalyst', text: 'Hyuga has higher kick power but Tsubasa is more balanced overall. Both are top tier.', time: '3 hours ago', likes: 18, liked: false },
    { name: 'CaptainPro', text: 'Use both in your team! Hyuga as pure striker, Tsubasa as playmaker 🎯', time: '5 hours ago', likes: 32, liked: false },
    { name: 'TsubasaLover', text: 'Genzo Dream is the best GK ever! His defense stat is over 10K! 🧤👑', time: '1 day ago', likes: 45, liked: false }
];

if (comments.length === 0) {
    comments = defaultComments;
    localStorage.setItem('tsubasa_comments', JSON.stringify(comments));
}

window.addEventListener('playersLoaded', () => {
    initDropdowns();
    updateAll();
    renderComments();
    renderPlayersList();
});

function initDropdowns() {
    const select1 = document.getElementById('player1Select');
    const select2 = document.getElementById('player2Select');
    
    const sorted = Object.entries(playersData).sort((a, b) => b[1].rating - a[1].rating);
    
    sorted.forEach(([key, p]) => {
        select1.add(new Option(`${p.image} ${p.name} - ${p.version}`, key));
        select2.add(new Option(`${p.image} ${p.name} - ${p.version}`, key));
    });
    
    select1.value = 'tsubasa_dream_dc';
    select2.value = 'hyuga_dream_dc';
    updateAll();
}

function calcPercent(value) {
    return (value / maxStat) * 100;
}

function renderPlayerCard(playerKey, cardNum) {
    const p = playersData[playerKey];
    if (!p) return;
    
    const card = document.getElementById(`player${cardNum}Card`);
    const totalPower = Object.values(p.stats).reduce((a, b) => a + b, 0);
    const stars = renderStars(p.rating);
    
    let html = `
        <div class="card-header">
            <div class="player-info">
                <span class="player-rarity rarity-${p.color}">⭐ ${p.rarity}</span>
                <h2 class="player-name">${p.name}</h2>
                <p class="player-version">${p.version}</p>
                <p class="player-jp">${p.jp || ''}</p>
                <span class="player-position">${p.posLabel}</span>
                <p class="player-team">${p.team}</p>
            </div>
            <div class="player-image">${p.image}</div>
        </div>
        <div class="rating-section">
            <div class="stars">${stars}</div>
            <div class="rating-number">${p.rating} / 5.0</div>
            <div class="rating-count">📊 ${p.votes.toLocaleString()} votes</div>
        </div>
        <div class="stats-section">
    `;
    
    for (const [key, value] of Object.entries(p.stats)) {
        const percent = calcPercent(value);
        html += `
            <div class="stat-row">
                <div class="stat-header">
                    <span class="stat-name">${statEmojis[key]} ${statNames[key]}</span>
                    <span class="stat-value">${value.toLocaleString()}</span>
                </div>
                <div class="stat-bar">
                    <div class="stat-fill" data-width="${percent}%" style="width: 0%"></div>
                </div>
            </div>
        `;
    }
    
    html += `
        </div>
        <div class="total-power">
            <div class="power-label">TOTAL POWER</div>
            <div class="power-value">${totalPower.toLocaleString()}</div>
        </div>
        <div class="skills-section">
            <div class="skills-title">🌟 SPECIAL SKILLS</div>
    `;
    
    p.skills.forEach(skill => {
        html += `<span class="skill-tag">${skill}</span>`;
    });
    
    html += `</div>`;
    card.innerHTML = html;
}

function renderStars(rating) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
        if (rating >= i) html += '<span class="star filled">★</span>';
        else if (rating >= i - 0.5) html += '<span class="star half">★</span>';
        else html += '<span class="star">★</span>';
    }
    return html;
}

function drawRadarChart() {
    const svg = document.getElementById('radarChart');
    const p1Key = document.getElementById('player1Select').value;
    const p2Key = document.getElementById('player2Select').value;
    const p1 = playersData[p1Key];
    const p2 = playersData[p2Key];
    
    if (!p1 || !p2) return;
    
    const stats = Object.keys(p1.stats);
    const cx = 200, cy = 200, radius = 150;
    const angleStep = (Math.PI * 2) / stats.length;
    
    let html = '';
    
    for (let i = 1; i <= 5; i++) {
        const r = (radius / 5) * i;
        html += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="rgba(0, 150, 255, 0.2)" stroke-width="1"/>`;
    }
    
    stats.forEach((stat, i) => {
        const angle = (angleStep * i) - Math.PI / 2;
        const x = cx + radius * Math.cos(angle);
        const y = cy + radius * Math.sin(angle);
        html += `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="rgba(0, 150, 255, 0.3)" stroke-width="1"/>`;
        
        const labelX = cx + (radius + 25) * Math.cos(angle);
        const labelY = cy + (radius + 25) * Math.sin(angle);
        html += `<text x="${labelX}" y="${labelY}" fill="#b8c5d6" font-size="11" font-weight="700" text-anchor="middle" dominant-baseline="middle">${statEmojis[stat]}</text>`;
        html += `<text x="${labelX}" y="${labelY + 12}" fill="#8a9bb5" font-size="8" text-anchor="middle" dominant-baseline="middle">${statNames[stat]}</text>`;
    });
    
    let p1Points = '';
    stats.forEach((stat, i) => {
        const angle = (angleStep * i) - Math.PI / 2;
        const value = p1.stats[stat] / maxStat;
        const x = cx + radius * value * Math.cos(angle);
        const y = cy + radius * value * Math.sin(angle);
        p1Points += `${x},${y} `;
    });
    html += `<polygon points="${p1Points}" fill="rgba(0, 212, 255, 0.3)" stroke="#00d4ff" stroke-width="2"/>`;
    
    stats.forEach((stat, i) => {
        const angle = (angleStep * i) - Math.PI / 2;
        const value = p1.stats[stat] / maxStat;
        const x = cx + radius * value * Math.cos(angle);
        const y = cy + radius * value * Math.sin(angle);
        html += `<circle cx="${x}" cy="${y}" r="4" fill="#00d4ff"/>`;
    });
    
    let p2Points = '';
    stats.forEach((stat, i) => {
        const angle = (angleStep * i) - Math.PI / 2;
        const value = p2.stats[stat] / maxStat;
        const x = cx + radius * value * Math.cos(angle);
        const y = cy + radius * value * Math.sin(angle);
        p2Points += `${x},${y} `;
    });
    html += `<polygon points="${p2Points}" fill="rgba(255, 51, 102, 0.3)" stroke="#ff3366" stroke-width="2"/>`;
    
    stats.forEach((stat, i) => {
        const angle = (angleStep * i) - Math.PI / 2;
        const value = p2.stats[stat] / maxStat;
        const x = cx + radius * value * Math.cos(angle);
        const y = cy + radius * value * Math.sin(angle);
        html += `<circle cx="${x}" cy="${y}" r="4" fill="#ff3366"/>`;
    });
    
    svg.innerHTML = html;
    document.getElementById('legendName1').textContent = `${p1.name} (${p.version.split(' - ')[0]})`;
    document.getElementById('legendName2').textContent = `${p2.name} (${p.version.split(' - ')[0]})`;
}

function checkWinner() {
    const p1Key = document.getElementById('player1Select').value;
    const p2Key = document.getElementById('player2Select').value;
    const p1 = playersData[p1Key];
    const p2 = playersData[p2Key];
    
    if (!p1 || !p2) return;
    
    let p1Wins = 0, p2Wins = 0;
    const wonStats = [];
    
    for (const key in p1.stats) {
        if (p1.stats[key] > p2.stats[key]) {
            p1Wins++;
            wonStats.push(statNames[key]);
        } else if (p2.stats[key] > p1.stats[key]) {
            p2Wins++;
        }
    }
    
    const winnerSection = document.getElementById('winnerSection');
    
    if (p1Wins > p2Wins) {
        winnerSection.innerHTML = `
            <div class="winner-trophy">🏆</div>
            <div class="winner-text">⭐ WINNER ⭐</div>
            <div class="winner-name">${p1.name}</div>
            <p class="winner-reason">${p1.version} | Won ${p1Wins}/7 stats: ${wonStats.join(', ')}</p>
        `;
    } else if (p2Wins > p1Wins) {
        winnerSection.innerHTML = `
            <div class="winner-trophy">🏆</div>
            <div class="winner-text">⭐ WINNER ⭐</div>
            <div class="winner-name">${p2.name}</div>
            <p class="winner-reason">${p2.version} | Won ${p2Wins}/7 stats</p>
        `;
    } else {
        winnerSection.innerHTML = `
            <div class="winner-trophy">🤝</div>
            <div class="winner-text" style="color: #ccc;">DRAW!</div>
            <p class="winner-reason">Both players are equal (${p1Wins} - ${p2Wins})</p>
        `;
    }
}

function updateAll() {
    const p1Key = document.getElementById('player1Select').value;
    const p2Key = document.getElementById('player2Select').value;
    
    if (!playersData[p1Key] || !playersData[p2Key]) return;
    
    renderPlayerCard(p1Key, 1);
    renderPlayerCard(p2Key, 2);
    drawRadarChart();
    checkWinner();
    
    setTimeout(() => {
        document.querySelectorAll('.stat-fill').forEach(fill => {
            const w = fill.dataset.width;
            fill.style.width = w;
        });
    }, 100);
}

function renderComments() {
    const list = document.getElementById('commentsList');
    list.innerHTML = comments.map((c, i) => `
        <div class="comment">
            <div class="comment-header">
                <div class="comment-avatar">${c.name.charAt(0)}</div>
                <div>
                    <div class="comment-author">${c.name}</div>
                    <div class="comment-time">${c.time}</div>
                </div>
            </div>
            <div class="comment-text">${c.text}</div>
            <div class="comment-actions-bar">
                <button class="comment-action ${c.liked ? 'liked' : ''}" onclick="likeComment(${i})">
                    ${c.liked ? '❤️' : '🤍'} ${c.likes}
                </button>
                <button class="comment-action">💬 Reply</button>
                <button class="comment-action">🔗 Share</button>
            </div>
        </div>
    `).join('');
}

function addComment() {
    const name = document.getElementById('userName').value.trim() || 'Anonymous';
    const text = document.getElementById('commentText').value.trim();
    
    if (!text) {
        alert('Please write a comment');
        return;
    }
    
    comments.unshift({ name, text, time: 'Just now', likes: 0, liked: false });
    localStorage.setItem('tsubasa_comments', JSON.stringify(comments));
    document.getElementById('commentText').value = '';
    document.getElementById('userName').value = '';
    renderComments();
}

function likeComment(index) {
    comments[index].liked = !comments[index].liked;
    comments[index].likes += comments[index].liked ? 1 : -1;
    localStorage.setItem('tsubasa_comments', JSON.stringify(comments));
    renderComments();
}

window.likeComment = likeComment;

function renderPlayersList() {
    const grid = document.getElementById('allPlayersGrid');
    const sorted = Object.entries(playersData).sort((a, b) => b[1].rating - a[1].rating);
    
    grid.innerHTML = sorted.map(([key, p]) => `
        <div class="mini-player-card" data-key="${key}">
            <div class="mini-player-avatar">${p.image}</div>
            <div class="mini-player-name">${p.name}</div>
            <div class="mini-player-version">${p.version.split(' - ')[0]}</div>
            <span class="mini-player-rarity rarity-${p.color}">⭐ ${p.rarity}</span>
            <div style="color: #ffd700; font-size: 11px; margin-top: 4px;">${p.rating} ★</div>
        </div>
    `).join('');
    
    attachCardListeners();
}

function attachCardListeners() {
    document.querySelectorAll('.mini-player-card').forEach(card => {
        card.addEventListener('click', () => {
            const key = card.dataset.key;
            const p1 = document.getElementById('player1Select');
            if (p1.value !== key) {
                p1.value = key;
                updateAll();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });
}

function filterPlayers() {
    const search = document.getElementById('searchInput').value.toLowerCase();
    const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
    
    const filtered = Object.entries(playersData).filter(([key, p]) => {
        const matchSearch = p.name.toLowerCase().includes(search) || 
                           p.version.toLowerCase().includes(search) ||
                           p.team.toLowerCase().includes(search) ||
                           p.posLabel.toLowerCase().includes(search);
        const matchFilter = activeFilter === 'all' || p.position === activeFilter;
        return matchSearch && matchFilter;
    });
    
    const grid = document.getElementById('allPlayersGrid');
    if (filtered.length === 0) {
        grid.innerHTML = '<p style="color: #8a9bb5; grid-column: 1/-1; text-align: center; padding: 30px;">No results found</p>';
        return;
    }
    
    grid.innerHTML = filtered.map(([key, p]) => `
        <div class="mini-player-card" data-key="${key}">
            <div class="mini-player-avatar">${p.image}</div>
            <div class="mini-player-name">${p.name}</div>
            <div class="mini-player-version">${p.version.split(' - ')[0]}</div>
            <span class="mini-player-rarity rarity-${p.color}">⭐ ${p.rarity}</span>
            <div style="color: #ffd700; font-size: 11px; margin-top: 4px;">${p.rating} ★</div>
        </div>
    `).join('');
    
    attachCardListeners();
}

function openPage(pageKey) {
    const page = pagesContent[pageKey];
    if (!page) return;
    
    document.getElementById('modalTitle').innerHTML = page.title;
    document.getElementById('modalBody').innerHTML = page.content;
    document.getElementById('pageModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('pageModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

window.openPage = openPage;
window.closeModal = closeModal;
window.addComment = addComment;

document.getElementById('player1Select').addEventListener('change', updateAll);
document.getElementById('player2Select').addEventListener('change', updateAll);
document.getElementById('searchInput').addEventListener('input', filterPlayers);
document.getElementById('submitComment').addEventListener('click', addComment);
document.getElementById('closeModal').addEventListener('click', closeModal);

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        filterPlayers();
    });
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const page = this.dataset.page;
        
        document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        
        if (page && page !== 'compare') {
            openPage(page);
        }
    });
});

document.getElementById('pageModal').addEventListener('click', (e) => {
    if (e.target.id === 'pageModal') closeModal();
});
