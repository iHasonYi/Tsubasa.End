// ============= PAGES CONTENT =============
const pagesContent = {
    'database': {
        title: '📚 قاعدة بيانات اللاعبين',
        content: `
            <div class="page-grid">
                <h3>🌟 جميع اللاعبين (20 لاعب)</h3>
                <div class="db-item"><span>⭐ DREAM</span> - 4 لاعبين: تسوباسا، هيوغا، غينزو، رونالدو</div>
                <div class="db-item"><span>🖤 BLACK</span> - 2 لاعبين: ميساكي، بيير</div>
                <div class="db-item"><span>🥇 GOLD</span> - 4 لاعبين: إيشيزاكي، كيسوغي، كازيمارو، براين</div>
                <div class="db-item"><span>🥈 SILVER</span> - 3 لاعبين: سودا، إيشيكاوا، نيتا</div>
                <div class="db-item"><span>💙 BLUE</span> - 4 لاعبين: جيتو، سا-نو، ساكاي، أوري</div>
                <div class="db-item"><span>💚 GREEN</span> - 3 لاعبين: أورابي، يامادا، موري</div>
                
                <h3 style="margin-top: 20px;">📊 إحصائيات عامة</h3>
                <div class="db-stats">
                    <div class="db-stat-card">👥<br><strong>20</strong><br>لاعب إجمالي</div>
                    <div class="db-stat-card">⭐<br><strong>4.5</strong><br>متوسط التقييم</div>
                    <div class="db-stat-card">🏆<br><strong>5</strong><br>مستويات ندرة</div>
                </div>
            </div>
        `
    },
    
    'top': {
        title: '🏆 أفضل اللاعبين',
        content: `
            <div class="page-grid">
                <h3>🥇 Top 10 - أفضل اللاعبين تقييماً</h3>
                <div class="top-item">1. <strong>رونالدو</strong> ⭐ 5.0 - 🇧🇷 البرازيل</div>
                <div class="top-item">2. <strong>تسوباسا أوزورا</strong> ⭐ 4.9 - 🇯🇵 اليابان</div>
                <div class="top-item">3. <strong>غينزو واكاباياشي</strong> ⭐ 4.9 - 🇯🇵 اليابان</div>
                <div class="top-item">4. <strong>كوجيرو هيوغا</strong> ⭐ 4.8 - 🇯🇵 اليابان</div>
                <div class="top-item">5. <strong>تارو ميساكي</strong> ⭐ 4.7 - 🇯🇵 اليابان</div>
                <div class="top-item">6. <strong>بيير</strong> ⭐ 4.7 - 🇫🇷 فرنسا</div>
                <div class="top-item">7. <strong>تاتسويا كيسوغي</strong> ⭐ 4.6 - 🇯🇵 اليابان</div>
                <div class="top-item">8. <strong>كازيمارو</strong> ⭐ 4.5 - 🇯🇵 اليابان</div>
                <div class="top-item">9. <strong>براين كلوي</strong> ⭐ 4.5 - 🏴󠁧󠁢󠁥󠁮󠁧󠁿 إنجلترا</div>
                <div class="top-item">10. <strong>هيديو سودا</strong> ⭐ 4.5 - 🇯🇵 اليابان</div>
            </div>
        `
    },
    
    'teams': {
        title: '⚽ الفرق والمنتخبات',
        content: `
            <div class="page-grid">
                <h3>🌍 الفرق المتوفرة</h3>
                <div class="teams-grid">
                    <div class="team-card">
                        <h4>🇯🇵 منتخب اليابان</h4>
                        <p><strong>16 لاعب</strong></p>
                        <p>⭐⭐⭐⭐⭐ القوة: 92%</p>
                        <p>🥇 الأفضل: تسوباسا</p>
                    </div>
                    <div class="team-card">
                        <h4>🇧🇷 البرازيل</h4>
                        <p><strong>1 لاعب</strong></p>
                        <p>⭐⭐⭐⭐⭐ القوة: 95%</p>
                        <p>🥇 الأفضل: رونالدو</p>
                    </div>
                    <div class="team-card">
                        <h4>🇫🇷 فرنسا</h4>
                        <p><strong>1 لاعب</strong></p>
                        <p>⭐⭐⭐⭐⭐ القوة: 88%</p>
                        <p>🥇 الأفضل: بيير</p>
                    </div>
                    <div class="team-card">
                        <h4>🏴󠁧󠁢󠁥󠁮󠁧󠁿 إنجلترا</h4>
                        <p><strong>1 لاعب</strong></p>
                        <p>⭐⭐⭐⭐ القوة: 85%</p>
                        <p>🥇 الأفضل: براين</p>
                    </div>
                </div>
            </div>
        `
    },
    
    'skills': {
        title: '🌟 جميع المهارات الخاصة',
        content: `
            <div class="page-grid">
                <h3>💫 المهارات الهجومية</h3>
                <div class="skills-grid">
                    <div class="skill-cat">⚡ <strong>تسديدات قوية</strong>
                        <ul>
                            <li>Tiger Shot</li>
                            <li>Drive Tiger Shot</li>
                            <li>Neo Tiger Shot</li>
                            <li>Overhead Kick</li>
                            <li>Hawk Shot</li>
                        </ul>
                    </div>
                    <div class="skill-cat">🎯 <strong>تسديدات دقيقة</strong>
                        <ul>
                            <li>Golden Combi</li>
                            <li>Phantom Shot</li>
                            <li>Spin Shot</li>
                            <li>Raijuu Shot</li>
                        </ul>
                    </div>
                    <div class="skill-cat">💨 <strong>مهارات السرعة</strong>
                        <ul>
                            <li>Speed Burst</li>
                            <li>Dribble Rush</li>
                            <li>Counter Attack</li>
                        </ul>
                    </div>
                    <div class="skill-cat">🛡️ <strong>مهارات دفاعية</strong>
                        <ul>
                            <li>Iron Wall</li>
                            <li>Power Tackle</li>
                            <li>Slide Tackle</li>
                        </ul>
                    </div>
                    <div class="skill-cat">🧤 <strong>مهارات الحراسة</strong>
                        <ul>
                            <li>God Hand</li>
                            <li>Super Save</li>
                            <li>Hurricane Catch</li>
                        </ul>
                    </div>
                </div>
            </div>
        `
    }
};
