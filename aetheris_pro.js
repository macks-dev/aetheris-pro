// ===== AETHERIS PRO - JAVASCRIPT COMPLETO Y DEPURADO =====
// Versión: PRO 1.0 | Todas las características implementadas y funcionales

let gameState = {
    player: {
        level: 1,
        xp: 0,
        shards: 200,
        streak: 0,
        totalCompleted: 0,
        longestStreak: 0,
        createdAt: Date.now(),
        totalShardsEarned: 200,
        totalTimeTracked: 0,
        totalNotesWritten: 0,
        activeTheme: 'default',
        activePowerItems: [],
        equippedAvatar: '⚔️'
    },
    habits: [],
    achievements: [],
    shopItems: [],
    lastCompletedDate: null,
    lastResetDate: null,
    currentCalendarMonth: new Date(),
    currentFilter: 'all',
    currentShopFilter: 'companions'
};

const ICONS = ['🏃', '📖', '🥗', '💪', '🧘', '💧', '🎨', '🎵', '✍️', '🌱', '⚔️', '🛡️', '🔮', '🌙', '⭐', '🔥'];

const CATEGORIES = {
    health: { name: 'Salud', icon: '💪', color: '#10b981' },
    productivity: { name: 'Productividad', icon: '💼', color: '#3b82f6' },
    creativity: { name: 'Creatividad', icon: '🎨', color: '#a855f7' },
    social: { name: 'Social', icon: '👥', color: '#f59e0b' },
    wellness: { name: 'Bienestar', icon: '🧘', color: '#06b6d4' }
};

const ACHIEVEMENTS_DATA = [
    // Común (5)
    { id: 1, name: 'Primer Paso', desc: 'Crear tu primera senda', icon: '🎯', reward: 50, unlocked: false, rarity: 'common', progress: 0, max: 1 },
    { id: 2, name: 'Forjador Nato', desc: 'Cumplir tu primer hábito', icon: '⚡', reward: 50, unlocked: false, rarity: 'common', progress: 0, max: 1 },
    { id: 3, name: 'Triple Corona', desc: '3 hábitos en un día', icon: '👑', reward: 100, unlocked: false, rarity: 'common', progress: 0, max: 3 },
    { id: 4, name: 'Chispa', desc: 'Streak de 3 días', icon: '🔥', reward: 100, unlocked: false, rarity: 'common', progress: 0, max: 3 },
    { id: 5, name: 'Coleccionista Inicial', desc: 'Comprar tu primer compañero', icon: '🐾', reward: 75, unlocked: false, rarity: 'common', progress: 0, max: 1 },
    
    // Raro (8)
    { id: 6, name: 'Llama Viva', desc: 'Streak de 7 días', icon: '🔥', reward: 200, unlocked: false, rarity: 'rare', progress: 0, max: 7 },
    { id: 7, name: 'Perfeccionista', desc: '7 días completando todos', icon: '💯', reward: 300, unlocked: false, rarity: 'rare', progress: 0, max: 7 },
    { id: 8, name: 'Diverso', desc: 'Crear 5 sendas diferentes', icon: '🌈', reward: 200, unlocked: false, rarity: 'rare', progress: 0, max: 5 },
    { id: 9, name: 'Madrugador', desc: 'Completar antes de 8am por 7 días', icon: '🌅', reward: 250, unlocked: false, rarity: 'rare', progress: 0, max: 7 },
    { id: 10, name: 'Fénix', desc: 'Retomar después de 7 días', icon: '🦅', reward: 150, unlocked: false, rarity: 'rare', progress: 0, max: 1 },
    { id: 11, name: 'Dedicado al Tiempo', desc: 'Registrar duración en 20 hábitos', icon: '⏱️', reward: 180, unlocked: false, rarity: 'rare', progress: 0, max: 20 },
    { id: 12, name: 'Cronista', desc: 'Escribir 10 notas', icon: '📝', reward: 160, unlocked: false, rarity: 'rare', progress: 0, max: 10 },
    { id: 13, name: 'Flexible', desc: 'Completar 5 hábitos flexibles', icon: '🎲', reward: 220, unlocked: false, rarity: 'rare', progress: 0, max: 5 },
    
    // Épico (10)
    { id: 14, name: 'Inextinguible', desc: 'Streak de 30 días', icon: '🔥', reward: 500, unlocked: false, rarity: 'epic', progress: 0, max: 30 },
    { id: 15, name: 'Centurión', desc: '100 hábitos completados', icon: '💯', reward: 400, unlocked: false, rarity: 'epic', progress: 0, max: 100 },
    { id: 16, name: 'Maestro de Categorías', desc: '2+ hábitos en cada categoría', icon: '🎨', reward: 450, unlocked: false, rarity: 'epic', progress: 0, max: 5 },
    { id: 17, name: 'Dedicado', desc: '30 días en Aetheris', icon: '📅', reward: 350, unlocked: false, rarity: 'epic', progress: 0, max: 30 },
    { id: 18, name: 'Perfección Semanal', desc: '4 semanas perfectas seguidas', icon: '⭐', reward: 600, unlocked: false, rarity: 'epic', progress: 0, max: 4 },
    { id: 19, name: 'Madrugador Extremo', desc: 'Antes de 6am por 30 días', icon: '🌄', reward: 700, unlocked: false, rarity: 'epic', progress: 0, max: 30 },
    { id: 20, name: 'Nocturno Productivo', desc: 'Después de 11pm por 30 días', icon: '🌙', reward: 700, unlocked: false, rarity: 'epic', progress: 0, max: 30 },
    { id: 21, name: 'Explorador', desc: 'Desbloquear las 5 regiones', icon: '🗺️', reward: 500, unlocked: false, rarity: 'epic', progress: 0, max: 5 },
    { id: 22, name: 'Cronista Maestro', desc: 'Escribir 50 notas', icon: '📖', reward: 450, unlocked: false, rarity: 'epic', progress: 0, max: 50 },
    { id: 23, name: 'Maestro del Tiempo', desc: 'Registrar 100 horas totales', icon: '⏰', reward: 520, unlocked: false, rarity: 'epic', progress: 0, max: 6000 },
    
    // Legendario (6)
    { id: 24, name: 'Leyenda Viviente', desc: 'Alcanzar nivel 50', icon: '⚔️', reward: 1000, unlocked: false, rarity: 'legendary', progress: 0, max: 50 },
    { id: 25, name: 'Coleccionista Supremo', desc: 'Tener los 25 compañeros', icon: '🏆', reward: 1500, unlocked: false, rarity: 'legendary', progress: 0, max: 25 },
    { id: 26, name: 'Millonario', desc: 'Acumular 10,000 shards totales', icon: '💎', reward: 2000, unlocked: false, rarity: 'legendary', progress: 0, max: 10000 },
    { id: 27, name: 'Inmortal', desc: 'Streak de 100 días', icon: '♾️', reward: 1500, unlocked: false, rarity: 'legendary', progress: 0, max: 100 },
    { id: 28, name: 'Guardián del Tiempo', desc: '100 días en app', icon: '⏰', reward: 1200, unlocked: false, rarity: 'legendary', progress: 0, max: 100 },
    { id: 29, name: 'Nivel Legendario', desc: 'Alcanzar nivel 100', icon: '👑', reward: 5000, unlocked: false, rarity: 'legendary', progress: 0, max: 100 },
    
    // Mítico (1)
    { id: 30, name: 'Eterno Caminante', desc: 'Streak de 365 días', icon: '🎇', reward: 15000, unlocked: false, rarity: 'mythic', progress: 0, max: 365 }
];

const SHOP_ITEMS_DATA = [
    // Compañeros (25)
    { id: 1, name: 'Dragoncito', desc: 'Un pequeño dragón leal', icon: '🐉', price: 300, type: 'companion', category: 'companions' },
    { id: 2, name: 'Búho Sabio', desc: 'Guardián de la sabiduría', icon: '🦉', price: 400, type: 'companion', category: 'companions' },
    { id: 3, name: 'Fénix', desc: 'Ave de renacimiento eterno', icon: '🔥', price: 600, type: 'companion', category: 'companions' },
    { id: 4, name: 'Lobo Astral', desc: 'Espíritu del bosque nocturno', icon: '🐺', price: 500, type: 'companion', category: 'companions' },
    { id: 5, name: 'Unicornio', desc: 'Criatura de leyenda pura', icon: '🦄', price: 800, type: 'companion', category: 'companions' },
    { id: 6, name: 'Mariposa Mística', desc: 'Símbolo de transformación', icon: '🦋', price: 350, type: 'companion', category: 'companions' },
    { id: 7, name: 'Zorro Plateado', desc: 'Astuto y elegante', icon: '🦊', price: 450, type: 'companion', category: 'companions' },
    { id: 8, name: 'Tigre Dorado', desc: 'Fuerza y coraje', icon: '🐯', price: 700, type: 'companion', category: 'companions' },
    { id: 9, name: 'Tortuga Ancestral', desc: 'Sabiduría milenaria', icon: '🐢', price: 550, type: 'companion', category: 'companions' },
    { id: 10, name: 'Águila Real', desc: 'Visión desde las alturas', icon: '🦅', price: 650, type: 'companion', category: 'companions' },
    { id: 11, name: 'León Celestial', desc: 'Rey de las bestias divinas', icon: '🦁', price: 750, type: 'companion', category: 'companions' },
    { id: 12, name: 'Panda Zen', desc: 'Paz y equilibrio interior', icon: '🐼', price: 400, type: 'companion', category: 'companions' },
    { id: 13, name: 'Koala Soñador', desc: 'Guardián de los sueños', icon: '🐨', price: 380, type: 'companion', category: 'companions' },
    { id: 14, name: 'Pulpo Místico', desc: 'Sabiduría de las profundidades', icon: '🐙', price: 520, type: 'companion', category: 'companions' },
    { id: 15, name: 'Delfín Lunar', desc: 'Mensajero de las mareas', icon: '🐬', price: 480, type: 'companion', category: 'companions' },
    { id: 16, name: 'Serpiente Esmeralda', desc: 'Renovación y sanación', icon: '🐍', price: 420, type: 'companion', category: 'companions' },
    { id: 17, name: 'Caballo de Batalla', desc: 'Velocidad y determinación', icon: '🐴', price: 580, type: 'companion', category: 'companions' },
    { id: 18, name: 'Elefante Sabio', desc: 'Memoria y longevidad', icon: '🐘', price: 680, type: 'companion', category: 'companions' },
    { id: 19, name: 'Pingüino Polar', desc: 'Resistencia en adversidad', icon: '🐧', price: 390, type: 'companion', category: 'companions' },
    { id: 20, name: 'Cisne Plateado', desc: 'Gracia y elegancia eterna', icon: '🦢', price: 540, type: 'companion', category: 'companions' },
    { id: 21, name: 'Murciélago Nocturno', desc: 'Guardián de la noche', icon: '🦇', price: 460, type: 'companion', category: 'companions' },
    { id: 22, name: 'Oso Guardián', desc: 'Protección y fuerza', icon: '🐻', price: 620, type: 'companion', category: 'companions' },
    { id: 23, name: 'Colibrí Veloz', desc: 'Energía y vitalidad', icon: '🐦', price: 360, type: 'companion', category: 'companions' },
    { id: 24, name: 'Gato Místico', desc: 'Intuición y misterio', icon: '🐱', price: 410, type: 'companion', category: 'companions' },
    { id: 25, name: 'Cuervo Profeta', desc: 'Visión del futuro', icon: '🐦‍⬛', price: 720, type: 'companion', category: 'companions' },
    
    // Temas (3)
    { id: 100, name: 'Bosque Encantado', desc: 'Verdes vibrantes y dorados', icon: '🌲', price: 800, type: 'theme', category: 'themes', colors: { primary: '#10b981', secondary: '#f4c542', bg1: '#1a4d2e', bg2: '#2d5f3e' } },
    { id: 101, name: 'Océano Profundo', desc: 'Azules y cianes místicos', icon: '🌊', price: 800, type: 'theme', category: 'themes', colors: { primary: '#06b6d4', secondary: '#3b82f6', bg1: '#0c1e2e', bg2: '#1e3a5f' } },
    { id: 102, name: 'Sakura Dreams', desc: 'Rosas y blancos delicados', icon: '🌸', price: 800, type: 'theme', category: 'themes', colors: { primary: '#ff6b9d', secondary: '#ffb3d9', bg1: '#2d1820', bg2: '#4a2d3e' } },
    
    // Avatares (3)
    { id: 200, name: 'Guerrero Épico', desc: 'Armadura de batalla', icon: '⚔️', price: 0, type: 'avatar', category: 'avatars', owned: true },
    { id: 201, name: 'Mago Arcano', desc: 'Túnica de poder místico', icon: '🔮', price: 600, type: 'avatar', category: 'avatars' },
    { id: 202, name: 'Ninja Sombra', desc: 'Maestro del sigilo', icon: '🥷', price: 600, type: 'avatar', category: 'avatars' },
    
    // Power Items (2)
    { id: 400, name: 'Multiplicador de XP', desc: 'x2 XP por 24 horas', icon: '✨', price: 300, type: 'power', category: 'power', uses: 1, duration: 24, effect: 'xp_boost' },
    { id: 401, name: 'Lluvia de Shards', desc: '+50% shards por 24h', icon: '💎', price: 350, type: 'power', category: 'power', uses: 1, duration: 24, effect: 'shard_boost' }
];

// ===== VISUAL THEME SWITCHER =====
function setVisualTheme(themeName) {
    document.body.setAttribute('data-theme', themeName);
    localStorage.setItem('aetherisVisualTheme', themeName);

    // Update switcher buttons
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === themeName);
    });
}

function restoreVisualTheme() {
    const saved = localStorage.getItem('aetherisVisualTheme');
    if (saved) setVisualTheme(saved);
}

// ===== INITIALIZATION =====
function init() {
    loadGameState();
    restoreVisualTheme();
    createStarfield();
    checkDailyReset();
    updateUI();
    renderHabits();
    renderAchievements();
    renderShop();
    applyOwnedItems();
    updateActivePowers();
}

function applyOwnedItems() {
    gameState.shopItems.forEach(item => {
        if (item.owned && item.type === 'companion') {
            applyItemEffect(item, false);
        }
    });
}

// ===== STARFIELD =====
function createStarfield() {
    const starfield = document.getElementById('starfield');
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = star.style.height = (Math.random() * 2 + 1) + 'px';
        star.style.animationDelay = Math.random() * 3 + 's';
        starfield.appendChild(star);
    }
}

// ===== SAVE/LOAD =====
function saveGameState() {
    localStorage.setItem('aetherisProGame', JSON.stringify(gameState));
}

function loadGameState() {
    const saved = localStorage.getItem('aetherisProGame');
    if (saved) {
        gameState = JSON.parse(saved);
        
        // Ensure all required fields exist
        if (!gameState.achievements || gameState.achievements.length === 0) {
            gameState.achievements = JSON.parse(JSON.stringify(ACHIEVEMENTS_DATA));
        }
        if (!gameState.shopItems || gameState.shopItems.length === 0) {
            gameState.shopItems = JSON.parse(JSON.stringify(SHOP_ITEMS_DATA));
        }
        if (!gameState.habits) gameState.habits = [];
        if (!gameState.player.activePowerItems) gameState.player.activePowerItems = [];
        if (!gameState.player.totalShardsEarned) gameState.player.totalShardsEarned = gameState.player.shards;
        if (!gameState.player.totalTimeTracked) gameState.player.totalTimeTracked = 0;
        if (!gameState.player.totalNotesWritten) gameState.player.totalNotesWritten = 0;
        // Re-hydrate: JSON.stringify turns Date → string; we need a real Date back
        gameState.currentCalendarMonth = gameState.currentCalendarMonth
            ? new Date(gameState.currentCalendarMonth)
            : new Date();
    } else {
        gameState.achievements = JSON.parse(JSON.stringify(ACHIEVEMENTS_DATA));
        gameState.shopItems = JSON.parse(JSON.stringify(SHOP_ITEMS_DATA));
    }
}

// ===== DAILY RESET =====
function checkDailyReset() {
    const today = new Date().toDateString();
    
    if (gameState.lastResetDate !== today) {
        gameState.habits.forEach(habit => {
            if (!habit.completionHistory) habit.completionHistory = [];
            if (!habit.completionDates) habit.completionDates = {};
            
            // Mark yesterday as failed in completionDates if it wasn't completed
            // (only if the habit existed yesterday)
            if (gameState.lastResetDate) {
                const yesterday = gameState.lastResetDate; // this is yesterday's toDateString
                if (habit.completionDates[yesterday] === undefined) {
                    // Check if habit existed by that date
                    const habitCreated = new Date(habit.createdAt || Date.now());
                    const yesterdayDate = new Date(yesterday);
                    if (yesterdayDate >= habitCreated) {
                        habit.completionDates[yesterday] = false;
                    }
                }
            }
            
            // Legacy array: push a new entry for today
            if (habit.historyDate !== today) {
                habit.completionHistory.push(false);
                habit.historyDate = today;
                
                if (habit.completionHistory.length > 30) {
                    habit.completionHistory = habit.completionHistory.slice(-30);
                }
            }
            
            // Reset today's state
            habit.completedToday = false;
            habit.todayDuration = 0;
            habit.todayNote = '';
            
            // Streak check
            if (habit.lastCompletedDate) {
                const lastDate = new Date(habit.lastCompletedDate);
                const currentDate = new Date(today);
                const diffTime = currentDate - lastDate;
                const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                
                if (diffDays > 1) {
                    habit.streak = 0;
                }
            }
        });
        
        gameState.lastResetDate = today;
        updatePlayerStreak();
        checkPowerItemExpiry();
        saveGameState();
    }
}

// ===== POWER ITEMS =====
function checkPowerItemExpiry() {
    const now = Date.now();
    gameState.player.activePowerItems = gameState.player.activePowerItems.filter(item => {
        if (item.expiresAt && now >= item.expiresAt) {
            showNotification(`${item.icon} ${item.name} ha expirado`);
            return false;
        }
        return true;
    });
    updateActivePowers();
    saveGameState();
}

function updateActivePowers() {
    const container = document.getElementById('activePowers');
    if (!gameState.player.activePowerItems || gameState.player.activePowerItems.length === 0) {
        container.innerHTML = '';
        return;
    }
    
    container.innerHTML = gameState.player.activePowerItems.map(item => {
        const timeLeft = item.expiresAt ? Math.ceil((item.expiresAt - Date.now()) / (1000 * 60 * 60)) : 0;
        return `
            <div class="power-indicator">
                <span>${item.icon}</span>
                <span>${item.name}</span>
                ${timeLeft > 0 ? `<span>(${timeLeft}h)</span>` : ''}
            </div>
        `;
    }).join('');
}

function activatePowerItem(item) {
    const powerItem = {...item};
    
    if (powerItem.duration) {
        powerItem.expiresAt = Date.now() + (powerItem.duration * 60 * 60 * 1000);
    }
    
    gameState.player.activePowerItems.push(powerItem);
    updateActivePowers();
    saveGameState();
    
    showNotification(`${powerItem.icon} ${powerItem.name} activado!`);
}

function getXPMultiplier() {
    const xpBoost = gameState.player.activePowerItems.find(item => item.effect === 'xp_boost');
    return xpBoost ? 2 : 1;
}

function getShardMultiplier() {
    const shardBoost = gameState.player.activePowerItems.find(item => item.effect === 'shard_boost');
    return shardBoost ? 1.5 : 1;
}

// ===== UPDATE UI =====
function updateUI() {
    const neededXP = getNeededXP(gameState.player.level);
    const progress = (gameState.player.xp / neededXP) * 100;
    
    document.getElementById('playerLevel').textContent = gameState.player.level;
    document.getElementById('streakDays').textContent = gameState.player.streak;
    document.getElementById('currentXP').textContent = gameState.player.xp;
    document.getElementById('neededXP').textContent = neededXP;
    document.getElementById('xpProgress').style.width = progress + '%';
    document.getElementById('shards').textContent = gameState.player.shards;
    document.getElementById('shopShards').textContent = gameState.player.shards;
    
    const unlockedAchievements = gameState.achievements.filter(a => a.unlocked).length;
    document.getElementById('achievements').textContent = unlockedAchievements;
    document.getElementById('achievementCount').textContent = `${unlockedAchievements}/${gameState.achievements.length}`;
    
    updateWorld();
    
    document.getElementById('totalCompleted').textContent = gameState.player.totalCompleted;
    document.getElementById('longestStreak').textContent = gameState.player.longestStreak + ' días';
    const daysInGame = Math.floor((Date.now() - gameState.player.createdAt) / (1000 * 60 * 60 * 24)) + 1;
    document.getElementById('daysInGame').textContent = daysInGame;
    document.getElementById('rankTitle').textContent = getRankTitle(gameState.player.level);
    document.getElementById('totalShardsEarned').textContent = gameState.player.totalShardsEarned;
    document.getElementById('totalHoursTracked').textContent = Math.floor(gameState.player.totalTimeTracked / 60);
    document.getElementById('totalNotesCount').textContent = gameState.player.totalNotesWritten;
    
    document.getElementById('avatarIcon').textContent = gameState.player.equippedAvatar;
}

function getNeededXP(level) {
    return Math.floor(100 * Math.pow(1.2, level - 1));
}

function getRankTitle(level) {
    if (level <= 10) return 'Novicio';
    if (level <= 25) return 'Caminante';
    if (level <= 50) return 'Maestro';
    if (level <= 75) return 'Ancestral';
    if (level <= 99) return 'Eterno';
    return 'Leyenda';
}

function updateWorld() {
    const level = gameState.player.level;
    let icon = '🏰';
    let name = 'Bosque del Inicio';
    
    if (level >= 11) {
        icon = '💧';
        name = 'Valle de las Aguas';
    }
    if (level >= 26) {
        icon = '⛰️';
        name = 'Montañas de Cristal';
    }
    if (level >= 51) {
        icon = '🏛️';
        name = 'Templo Celestial';
    }
    if (level >= 76) {
        icon = '✨';
        name = 'Ciudadela Eterna';
    }
    
    document.getElementById('worldIcon').textContent = icon;
    document.getElementById('worldName').textContent = name;
}

// ===== HABITS =====
let currentCategoryFilter = 'all';

function filterByCategory(category) {
    currentCategoryFilter = category;
    document.querySelectorAll('.category-tab').forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
    renderHabits();
}

function renderHabits() {
    const habitsList = document.getElementById('habitsList');
    habitsList.innerHTML = '';
    
    const filteredHabits = currentCategoryFilter === 'all' 
        ? gameState.habits 
        : gameState.habits.filter(h => h.category === currentCategoryFilter);
    
    const completed = filteredHabits.filter(h => h.completedToday).length;
    const total = filteredHabits.length;
    document.getElementById('dailyProgress').textContent = `${completed}/${total}`;
    
    filteredHabits.forEach(habit => {
        const weeklyRate = calculateWeeklyRate(habit);
        const categoryInfo = CATEGORIES[habit.category] || { name: 'General', color: '#8b5cf6' };
        
        let habitMeta = `<span>${categoryInfo.icon} ${categoryInfo.name}</span>
                        <span>🔥 ${habit.streak || 0} días</span>
                        <span>+${getHabitXP(habit)} XP</span>`;
        
        if (habit.isFlexible) {
            const weeklyGoal = habit.weeklyGoal || 3;
            const weeklyCompleted = getWeeklyCompletions(habit);
            habitMeta += `<span>🎲 ${weeklyCompleted}/${weeklyGoal} semana</span>`;
        }
        
        if (habit.trackDuration && habit.todayDuration) {
            habitMeta += `<span>⏱️ ${habit.todayDuration}min</span>`;
        }
        
        if (habit.todayNote) {
            habitMeta += `<span>📝 Nota</span>`;
        }
        
        const card = document.createElement('div');
        card.className = `habit-card ${habit.category}`;
        card.innerHTML = `
            <div class="habit-header">
                <div class="habit-icon">${habit.icon}</div>
                <div class="habit-info">
                    <div class="habit-name">${habit.name}</div>
                    <div class="habit-meta">
                        ${habitMeta}
                    </div>
                </div>
                <div class="habit-check ${habit.completedToday ? 'completed' : ''}" 
                     onclick="toggleHabit(${habit.id}, event)"
                     style="${habit.completedToday ? 'cursor: not-allowed;' : ''}">
                    ${habit.completedToday ? '✓' : ''}
                </div>
            </div>
            <div class="habit-progress">
                <div class="progress-bar-small">
                    <div class="progress-fill-small" style="width: ${weeklyRate}%"></div>
                </div>
                <div style="font-size: 10px; color: var(--silver); opacity: 0.6; margin-top: 4px;">
                    ${weeklyRate}% esta semana
                </div>
            </div>
        `;
        habitsList.appendChild(card);
    });
    
    if (filteredHabits.length === 0) {
        habitsList.innerHTML = '<p style="text-align: center; opacity: 0.6; padding: 40px;">No hay hábitos en esta categoría. ¡Crea uno nuevo!</p>';
    }
    
    updateHabitSelect();
}

function getWeeklyCompletions(habit) {
    if (!habit.completionHistory || habit.completionHistory.length === 0) return 0;
    const last7 = habit.completionHistory.slice(-7);
    return last7.filter(day => day === true).length;
}

function calculateWeeklyRate(habit) {
    if (!habit.completionHistory || habit.completionHistory.length === 0) {
        return 0;
    }
    
    const last7Days = habit.completionHistory.slice(-7);
    const completedDays = last7Days.filter(day => day === true).length;
    const totalDays = last7Days.length;
    
    return totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0;
}

function getHabitXP(habit) {
    let xp = 10;
    if (habit.streak >= 3) xp *= 1.5;
    if (habit.streak >= 7) xp *= 2;
    if (habit.streak >= 14) xp *= 2.5;
    if (habit.streak >= 30) xp *= 3;
    
    xp *= getXPMultiplier();
    
    return Math.floor(xp);
}

function toggleHabit(id, event) {
    const habit = gameState.habits.find(h => h.id === id);
    if (!habit) return;
    
    // Si ya fue completado hoy, no se permite desmarcar
    if (habit.completedToday) return;
    
    // Point the calendar at the habit the user just ticked.
    // Must be set BEFORE completeHabit → renderHabits → updateHabitSelect reads it.
    gameState.lastCalendarHabitId = String(habit.id);

    // Check - open modal if tracking
    if (habit.trackDuration || habit.allowNotes) {
        openHabitCompletionModal(habit, event);
    } else {
        completeHabit(habit, 0, '');
    }
}

function openHabitCompletionModal(habit, clickEvent) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal">
            <h2>✓ ${habit.name}</h2>
            ${habit.trackDuration ? `
                <label style="display: block; margin-bottom: 5px; font-size: 14px;">Duración (minutos):</label>
                <input type="number" id="habitDuration" placeholder="¿Cuántos minutos?" min="0" max="999" value="${habit.goalDuration || ''}">
            ` : ''}
            ${habit.allowNotes ? `
                <label style="display: block; margin-bottom: 5px; margin-top: 15px; font-size: 14px;">Nota (opcional):</label>
                <textarea id="habitNote" placeholder="¿Cómo te fue hoy?" maxlength="200" style="width: 100%; padding: 12px; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(139, 92, 246, 0.3); border-radius: 10px; color: white; font-family: 'Lora', serif; min-height: 80px; resize: vertical;"></textarea>
            ` : ''}
            <div class="modal-buttons">
                <button class="modal-btn secondary" onclick="closeModal()">Cancelar</button>
                <button class="modal-btn primary" onclick="completeHabitFromModal(${habit.id})">Completar</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    if (habit.trackDuration) {
        document.getElementById('habitDuration').focus();
    }
}

function completeHabitFromModal(habitId) {
    const habit = gameState.habits.find(h => h.id === habitId);
    if (!habit) return;
    
    const duration = habit.trackDuration ? parseInt(document.getElementById('habitDuration').value) || 0 : 0;
    const note = habit.allowNotes ? document.getElementById('habitNote').value.trim() : '';
    
    completeHabit(habit, duration, note);
    closeModal();
}

function completeHabit(habit, duration, note) {
    const today = new Date().toDateString();
    
    if (!habit.completionHistory) habit.completionHistory = [];
    if (!habit.completionDates) habit.completionDates = {};
    
    habit.completedToday = true;
    
    // Write to the date-keyed map (used by calendar)
    habit.completionDates[today] = true;
    
    // Legacy array (kept for weekly rate calculation)
    const todayIndex = habit.completionHistory.length - 1;
    if (todayIndex >= 0 && habit.historyDate === today) {
        habit.completionHistory[todayIndex] = true;
    } else {
        habit.completionHistory.push(true);
        habit.historyDate = today;
    }
    
    if (habit.completionHistory.length > 30) {
        habit.completionHistory = habit.completionHistory.slice(-30);
    }
    
    // Track duration
    if (habit.trackDuration && duration > 0) {
        habit.todayDuration = duration;
        habit.totalDuration = (habit.totalDuration || 0) + duration;
        gameState.player.totalTimeTracked += duration;
    }
    
    // Track note
    if (note) {
        habit.todayNote = note;
        if (!habit.notes) habit.notes = [];
        habit.notes.push({ date: today, text: note });
        gameState.player.totalNotesWritten++;
    }
    
    const xp = getHabitXP(habit);
    const baseShards = Math.floor(Math.random() * 11) + 5;
    const shards = Math.floor(baseShards * getShardMultiplier());
    
    addXP(xp);
    gameState.player.shards += shards;
    gameState.player.totalShardsEarned += shards;
    gameState.player.totalCompleted++;
    
    if (!habit.lastCompletedDate) {
        habit.streak = 1;
        habit.lastCompletedDate = today;
    } else {
        const lastDate = new Date(habit.lastCompletedDate);
        const currentDate = new Date(today);
        const diffTime = currentDate - lastDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
            habit.streak = (habit.streak || 1) + 1;
        } else if (diffDays > 1) {
            habit.streak = 1;
        }
        
        habit.lastCompletedDate = today;
    }
    
    updatePlayerStreak();
    
    if (gameState.player.streak > gameState.player.longestStreak) {
        gameState.player.longestStreak = gameState.player.streak;
    }
    
    gameState.lastCompletedDate = today;
    
    showXPNotification(`+${xp} XP`, `+${shards} 💎`);
    createParticles(event);
    
    checkAchievements();
    saveGameState();
    renderHabits();
    updateUI();
}

function updatePlayerStreak() {
    const maxStreak = Math.max(0, ...gameState.habits.map(h => h.streak || 0));
    gameState.player.streak = maxStreak;
}

function addXP(amount) {
    gameState.player.xp += amount;
    const neededXP = getNeededXP(gameState.player.level);
    
    if (gameState.player.xp >= neededXP) {
        gameState.player.level++;
        gameState.player.xp -= neededXP;
        gameState.player.shards += 100;
        gameState.player.totalShardsEarned += 100;
        showLevelUp();
        checkAchievements();
    }
}

// ===== CALENDAR =====
function updateHabitSelect() {
    const select = document.getElementById('habitSelect');

    // Remember what was selected before we rebuild
    const previousValue = select.value || gameState.lastCalendarHabitId || '';

    select.innerHTML = '<option value="">Selecciona un hábito...</option>';

    gameState.habits.forEach(habit => {
        const option = document.createElement('option');
        option.value = habit.id;
        option.textContent = `${habit.icon} ${habit.name}`;
        select.appendChild(option);
    });

    // Restore previous selection if the habit still exists
    if (previousValue && gameState.habits.find(h => String(h.id) === String(previousValue))) {
        select.value = previousValue;
    }

    // Persist whatever is now selected
    gameState.lastCalendarHabitId = select.value;

    select.onchange = () => {
        gameState.lastCalendarHabitId = select.value;
        renderCalendar();
    };

    // Only re-render the calendar grid if the calendar section is currently visible
    if (!document.getElementById('calendarSection').classList.contains('hidden')) {
        renderCalendar();
    }
}

function changeMonth(direction) {
    // Safety: re-hydrate if it lost its Date type (e.g. after JSON round-trip)
    if (!(gameState.currentCalendarMonth instanceof Date)) {
        gameState.currentCalendarMonth = new Date(gameState.currentCalendarMonth || Date.now());
    }
    gameState.currentCalendarMonth = new Date(
        gameState.currentCalendarMonth.getFullYear(),
        gameState.currentCalendarMonth.getMonth() + direction,
        1
    );
    renderCalendar();
}

function renderCalendar() {
    const habitId = Number(document.getElementById('habitSelect').value);
    if (!habitId || isNaN(habitId)) {
        document.getElementById('calendarGrid').innerHTML = '<p style="text-align: center; opacity: 0.6; padding: 20px; grid-column: 1 / -1;">Selecciona un hábito para ver el calendario</p>';
        return;
    }
    
    const habit = gameState.habits.find(h => h.id === habitId);
    if (!habit) return;
    
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    
    const year = gameState.currentCalendarMonth.getFullYear();
    const month = gameState.currentCalendarMonth.getMonth();
    
    document.getElementById('calendarMonth').textContent = `${monthNames[month]} ${year}`;
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const grid = document.getElementById('calendarGrid');
    grid.innerHTML = '';
    
    // Day headers
    ['D', 'L', 'M', 'M', 'J', 'V', 'S'].forEach(day => {
        const header = document.createElement('div');
        header.className = 'calendar-day-header';
        header.textContent = day;
        grid.appendChild(header);
    });
    
    // Empty cells before first day
    for (let i = 0; i < firstDay; i++) {
        const empty = document.createElement('div');
        empty.className = 'calendar-day empty';
        grid.appendChild(empty);
    }
    
    let completedDays = 0;
    let failedDays = 0;
    
    const habitCreatedDate = new Date(habit.createdAt || Date.now());
    habitCreatedDate.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Build a set of completed date strings for O(1) lookup
    const completedDatesSet = new Set();
    if (habit.completionDates) {
        Object.keys(habit.completionDates).forEach(dateStr => {
            if (habit.completionDates[dateStr] === true) {
                completedDatesSet.add(dateStr);
            }
        });
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        date.setHours(0, 0, 0, 0);
        const dayDiv = document.createElement('div');
        dayDiv.className = 'calendar-day';
        dayDiv.textContent = day;
        
        const dateStr = date.toDateString();
        const isToday = dateStr === today.toDateString();
        const isBeforeCreation = date < habitCreatedDate;
        const isFuture = date > today;
        
        if (isToday) {
            dayDiv.classList.add('today');
        }
        
        if (isFuture || isBeforeCreation) {
            dayDiv.classList.add('no-data');
        } else {
            // Use the date-keyed map
            if (habit.completionDates && habit.completionDates[dateStr] !== undefined) {
                if (habit.completionDates[dateStr] === true) {
                    dayDiv.classList.add('completed');
                    completedDays++;
                } else {
                    dayDiv.classList.add('failed');
                    failedDays++;
                }
            } else {
                // Past day with no record and not today → failed (missed)
                if (!isToday) {
                    dayDiv.classList.add('failed');
                    failedDays++;
                } else {
                    dayDiv.classList.add('no-data');
                }
            }
        }
        
        grid.appendChild(dayDiv);
    }
    
    const totalTrackedDays = completedDays + failedDays;
    const completionRate = totalTrackedDays > 0 ? Math.round((completedDays / totalTrackedDays) * 100) : 0;
    document.getElementById('calendarStats').textContent = `${completionRate}% completado`;
}

// ===== ACHIEVEMENTS =====
let currentAchievementFilter = 'all';

function filterAchievements(rarity) {
    currentAchievementFilter = rarity;
    document.querySelectorAll('#achievementsSection .category-tab').forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
    renderAchievements();
}

function renderAchievements() {
    const achievementsList = document.getElementById('achievementsList');
    achievementsList.innerHTML = '';
    
    const filtered = currentAchievementFilter === 'all' 
        ? gameState.achievements 
        : gameState.achievements.filter(a => a.rarity === currentAchievementFilter);
    
    filtered.forEach(achievement => {
        const progressPercent = achievement.max > 0 ? Math.round((achievement.progress / achievement.max) * 100) : 0;
        
        const card = document.createElement('div');
        card.className = `achievement-card ${achievement.rarity} ${achievement.unlocked ? '' : 'locked'}`;
        card.innerHTML = `
            <div class="achievement-icon ${achievement.unlocked ? '' : 'locked'}">
                ${achievement.icon}
            </div>
            <div class="achievement-info">
                <h3>
                    ${achievement.name}
                    <span class="rarity-badge ${achievement.rarity}">${achievement.rarity}</span>
                </h3>
                <p>${achievement.desc}</p>
                ${!achievement.unlocked ? `
                    <div class="achievement-progress">
                        <div class="achievement-progress-fill ${achievement.rarity}" style="width: ${progressPercent}%"></div>
                    </div>
                    <div class="achievement-progress-text">${achievement.progress}/${achievement.max} (${progressPercent}%)</div>
                ` : ''}
                <div class="achievement-reward">Recompensa: +${achievement.reward} 💎</div>
            </div>
        `;
        achievementsList.appendChild(card);
    });
}

function checkAchievements() {
    // Update all achievement progress
    if (gameState.habits.length > 0) gameState.achievements[0].progress = 1;
    if (gameState.player.totalCompleted >= 1) gameState.achievements[1].progress = 1;
    
    const completedToday = gameState.habits.filter(h => h.completedToday).length;
    gameState.achievements[2].progress = Math.min(completedToday, 3);
    
    const currentStreak = gameState.player.streak || 0;
    gameState.achievements[3].progress = Math.min(currentStreak, 3);
    gameState.achievements[5].progress = Math.min(currentStreak, 7);
    gameState.achievements[13].progress = Math.min(currentStreak, 30);
    gameState.achievements[26].progress = Math.min(currentStreak, 100);
    gameState.achievements[29].progress = Math.min(currentStreak, 365);
    
    const ownedCompanions = gameState.shopItems.filter(item => item.type === 'companion' && item.owned).length;
    gameState.achievements[4].progress = Math.min(ownedCompanions, 1);
    gameState.achievements[24].progress = Math.min(ownedCompanions, 25);
    
    gameState.achievements[7].progress = Math.min(gameState.habits.length, 5);
    gameState.achievements[14].progress = Math.min(gameState.player.totalCompleted, 100);
    
    const categoryCounts = {};
    gameState.habits.forEach(h => {
        categoryCounts[h.category] = (categoryCounts[h.category] || 0) + 1;
    });
    const categoriesWithMultiple = Object.values(categoryCounts).filter(count => count >= 2).length;
    gameState.achievements[15].progress = Math.min(categoriesWithMultiple, 5);
    
    gameState.achievements[23].progress = Math.min(gameState.player.level, 50);
    gameState.achievements[28].progress = Math.min(gameState.player.level, 100);
    gameState.achievements[25].progress = Math.min(gameState.player.totalShardsEarned, 10000);
    
    const daysInGame = Math.floor((Date.now() - gameState.player.createdAt) / (1000 * 60 * 60 * 24)) + 1;
    gameState.achievements[16].progress = Math.min(daysInGame, 30);
    gameState.achievements[27].progress = Math.min(daysInGame, 100);
    
    gameState.achievements[11].progress = Math.min(gameState.player.totalNotesWritten, 10);
    gameState.achievements[21].progress = Math.min(gameState.player.totalNotesWritten, 50);
    
    const habitsWithDuration = gameState.habits.filter(h => h.trackDuration && h.totalDuration > 0).length;
    gameState.achievements[10].progress = Math.min(habitsWithDuration, 20);
    gameState.achievements[22].progress = Math.min(gameState.player.totalTimeTracked, 6000);
    
    // Unlock achievements that meet criteria
    gameState.achievements.forEach((ach, index) => {
        if (!ach.unlocked && ach.progress >= ach.max) {
            unlockAchievement(index);
        }
    });
    
    renderAchievements();
}

function unlockAchievement(index) {
    const achievement = gameState.achievements[index];
    if (achievement.unlocked) return;
    
    achievement.unlocked = true;
    gameState.player.shards += achievement.reward;
    gameState.player.totalShardsEarned += achievement.reward;
    
    showAchievementNotification(achievement);
    renderAchievements();
    updateUI();
    saveGameState();
}

// ===== SHOP =====
function filterShop(category) {
    gameState.currentShopFilter = category;
    document.querySelectorAll('.shop-tab').forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
    renderShop();
}

function renderShop() {
    const shopItems = document.getElementById('shopItems');
    shopItems.innerHTML = '';
    
    const filtered = gameState.shopItems.filter(item => item.category === gameState.currentShopFilter);
    
    filtered.forEach(item => {
        const owned = item.owned || false;
        const isConsumable = item.type === 'power';
        const canAfford = gameState.player.shards >= item.price;
        
        // Determine button label and disabled state
        let btnLabel, btnDisabled;
        if (isConsumable) {
            // Power items: always show "Comprar", disabled only if can't afford
            btnLabel = 'Comprar';
            btnDisabled = !canAfford;
        } else if (owned) {
            // Owned non-consumable: companions show "Comprado" (locked), themes/avatars show "Equipar"
            if (item.type === 'companion') {
                btnLabel = 'Comprado';
                btnDisabled = true;
            } else {
                btnLabel = 'Equipar';
                btnDisabled = false;
            }
        } else {
            // Not owned: show "Comprar", disabled if can't afford
            btnLabel = 'Comprar';
            btnDisabled = !canAfford;
        }
        
        const card = document.createElement('div');
        card.className = 'shop-item';
        card.style.opacity = (owned && item.type === 'companion') ? '0.6' : '1';
        card.innerHTML = `
            <div class="shop-icon">${item.icon}</div>
            <div class="shop-details">
                <h3>${item.name} ${(owned && item.type === 'companion') ? '✓' : ''}</h3>
                <p>${item.desc}</p>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div class="shop-price">💎 ${item.price}</div>
                    <button class="buy-btn" onclick="buyItem(${item.id})" 
                            ${btnDisabled ? 'disabled' : ''}>
                        ${btnLabel}
                    </button>
                </div>
            </div>
        `;
        shopItems.appendChild(card);
    });
    
    if (filtered.length === 0) {
        shopItems.innerHTML = '<p style="text-align: center; opacity: 0.6; padding: 40px;">No hay items en esta categoría</p>';
    }
}

function buyItem(id) {
    const item = gameState.shopItems.find(i => i.id === id);
    if (!item || gameState.player.shards < item.price) return;
    
    // Power items are consumables: never blocked by "owned", always purchasable
    if (item.type === 'power') {
        gameState.player.shards -= item.price;
        applyItemEffect(item, true);
        showPurchaseNotification(item);
        saveGameState();
        updateUI();
        renderShop();
        checkAchievements();
        return;
    }
    
    // For non-consumable items: if already owned, just re-apply (equip) for free
    if (item.owned) {
        applyItemEffect(item, true);
        showNotification(`${item.icon} ¡${item.name} equipado!`);
        saveGameState();
        renderShop();
        return;
    }
    
    // First-time purchase
    gameState.player.shards -= item.price;
    item.owned = true;
    
    applyItemEffect(item, true);
    showPurchaseNotification(item);
    
    saveGameState();
    updateUI();
    renderShop();
    checkAchievements();
}

function applyItemEffect(item, isNewPurchase = false) {
    if (item.type === 'companion') {
        addCompanionToWorld(item);
    } else if (item.type === 'theme' && isNewPurchase) {
        applyTheme(item);
    } else if (item.type === 'avatar' && isNewPurchase) {
        gameState.player.equippedAvatar = item.icon;
        document.getElementById('avatarIcon').textContent = item.icon;
    } else if (item.type === 'power' && isNewPurchase) {
        activatePowerItem(item);
    }
}

function applyTheme(theme) {
    gameState.player.activeTheme = theme.id;
    
    if (theme.colors) {
        document.documentElement.style.setProperty('--mystic-purple', theme.colors.primary);
        document.documentElement.style.setProperty('--emerald', theme.colors.secondary);
        document.documentElement.style.setProperty('--night-deep', theme.colors.bg1);
        document.documentElement.style.setProperty('--night-blue', theme.colors.bg2);
    }
    
    saveGameState();
}

function addCompanionToWorld(item) {
    const container = document.getElementById('companionsContainer');
    
    // If this companion already exists in DOM, skip (will be rebuilt below)
    const existingCompanion = container.querySelector(`[data-companion-id="${item.id}"]`);
    if (existingCompanion) return;
    
    // Add the new companion element
    const companion = document.createElement('div');
    companion.className = 'world-companion';
    companion.setAttribute('data-companion-id', item.id);
    companion.textContent = item.icon;
    companion.title = item.name;
    companion.onclick = () => showCompanionMessage(item);
    container.appendChild(companion);
    
    // Re-sort all companions in the container by their numeric ID
    const allCompanions = Array.from(container.querySelectorAll('.world-companion'));
    allCompanions.sort((a, b) => {
        return parseInt(a.getAttribute('data-companion-id')) - parseInt(b.getAttribute('data-companion-id'));
    });
    
    // Re-append in sorted order (moves existing nodes, doesn't duplicate)
    allCompanions.forEach(el => container.appendChild(el));
}

function showCompanionMessage(item) {
    const messages = [
        `${item.name} te saluda con entusiasmo`,
        `${item.name} brilla con energía`,
        `${item.name} está orgulloso de tu progreso`,
        `${item.name} te anima a seguir adelante`,
        `${item.name} resplandece a tu lado`
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    showNotification(randomMessage);
}

// ===== MODAL =====
function openAddHabitModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal">
            <h2>Nueva Senda</h2>
            <input type="text" id="habitName" placeholder="Nombre de tu senda..." maxlength="30">
            <select id="habitCategory" style="width: 100%; padding: 12px; margin-bottom: 15px; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(139, 92, 246, 0.3); border-radius: 10px; color: white; font-family: 'Lora', serif;">
                <option value="health">💪 Salud</option>
                <option value="productivity">💼 Productividad</option>
                <option value="creativity">🎨 Creatividad</option>
                <option value="social">👥 Social</option>
                <option value="wellness">🧘 Bienestar</option>
            </select>
            <label style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px; font-size: 14px;">
                <input type="checkbox" id="habitFlexible"> Flexible (no todos los días)
            </label>
            <div id="flexibleOptions" style="display: none; margin-bottom: 15px;">
                Meta semanal: <input type="number" id="weeklyGoal" min="1" max="7" value="3" style="width: 60px; padding: 5px; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(139, 92, 246, 0.3); border-radius: 5px; color: white; font-family: 'Lora', serif;"> días
            </div>
            <label style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px; font-size: 14px;">
                <input type="checkbox" id="trackDuration"> Rastrear duración
            </label>
            <div id="durationOptions" style="display: none; margin-bottom: 15px;">
                Meta diaria: <input type="number" id="goalDuration" min="0" max="999" value="30" style="width: 70px; padding: 5px; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(139, 92, 246, 0.3); border-radius: 5px; color: white; font-family: 'Lora', serif;"> min
            </div>
            <label style="display: flex; align-items: center; gap: 8px; margin-bottom: 15px; font-size: 14px;">
                <input type="checkbox" id="allowNotes" checked> Permitir notas diarias
            </label>
            <div class="icon-selector" id="iconSelector"></div>
            <div class="modal-buttons">
                <button class="modal-btn secondary" onclick="closeModal()">Cancelar</button>
                <button class="modal-btn primary" onclick="createHabit()">Crear</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    const iconSelector = document.getElementById('iconSelector');
    ICONS.forEach((icon, index) => {
        const option = document.createElement('div');
        option.className = 'icon-option';
        option.textContent = icon;
        option.onclick = () => selectIcon(index);
        iconSelector.appendChild(option);
    });
    
    iconSelector.children[0].classList.add('selected');
    window.selectedIcon = ICONS[0];
    
    document.getElementById('habitFlexible').onchange = function() {
        document.getElementById('flexibleOptions').style.display = this.checked ? 'block' : 'none';
    };
    
    document.getElementById('trackDuration').onchange = function() {
        document.getElementById('durationOptions').style.display = this.checked ? 'block' : 'none';
    };
}

function selectIcon(index) {
    document.querySelectorAll('.icon-option').forEach(el => el.classList.remove('selected'));
    document.querySelectorAll('.icon-option')[index].classList.add('selected');
    window.selectedIcon = ICONS[index];
}

function createHabit() {
    const name = document.getElementById('habitName').value.trim();
    const category = document.getElementById('habitCategory').value;
    const isFlexible = document.getElementById('habitFlexible').checked;
    const weeklyGoal = isFlexible ? parseInt(document.getElementById('weeklyGoal').value) : 7;
    const trackDuration = document.getElementById('trackDuration').checked;
    const goalDuration = trackDuration ? parseInt(document.getElementById('goalDuration').value) : 0;
    const allowNotes = document.getElementById('allowNotes').checked;
    
    if (!name) {
        alert('Por favor escribe un nombre para tu senda');
        return;
    }
    
    const newHabit = {
        id: Date.now(),
        name: name,
        category: category,
        icon: window.selectedIcon || '⭐',
        streak: 0,
        completedToday: false,
        createdAt: Date.now(),
        completionHistory: [],
        completionDates: {},
        isFlexible: isFlexible,
        weeklyGoal: weeklyGoal,
        trackDuration: trackDuration,
        goalDuration: goalDuration,
        allowNotes: allowNotes,
        todayDuration: 0,
        totalDuration: 0,
        todayNote: '',
        notes: []
    };
    
    gameState.habits.push(newHabit);
    checkAchievements();
    saveGameState();
    renderHabits();
    closeModal();
}

function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) modal.remove();
}

// ===== EFFECTS =====
function showXPNotification(text1, text2) {
    const notification = document.createElement('div');
    notification.className = 'xp-notification';
    notification.innerHTML = `${text1}<br><small>${text2}</small>`;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 1500);
}

function showLevelUp() {
    const notification = document.createElement('div');
    notification.className = 'xp-notification';
    notification.innerHTML = `🎉<br>¡NIVEL ${gameState.player.level}!<br><small>+100 💎</small>`;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 1500);
}

function showAchievementNotification(achievement) {
    const notification = document.createElement('div');
    notification.className = 'xp-notification';
    notification.innerHTML = `${achievement.icon}<br>${achievement.name}<br><small>+${achievement.reward} 💎</small>`;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 1500);
}

function showPurchaseNotification(item) {
    const notification = document.createElement('div');
    notification.className = 'xp-notification';
    notification.innerHTML = `${item.icon}<br>¡Adquirido!<br><small>${item.name}</small>`;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 1500);
}

function showNotification(text) {
    const notification = document.createElement('div');
    notification.className = 'xp-notification';
    notification.style.fontSize = '18px';
    notification.innerHTML = text;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 1500);
}

function createParticles(event) {
    if (!event) return;
    
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.textContent = ['✨', '⭐', '💫'][Math.floor(Math.random() * 3)];
        particle.style.left = event.clientX + (Math.random() - 0.5) * 50 + 'px';
        particle.style.top = event.clientY + (Math.random() - 0.5) * 50 + 'px';
        particle.style.fontSize = (Math.random() * 20 + 15) + 'px';
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 2000);
    }
}

// ===== NAVIGATION =====
function showSection(section) {
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    event.currentTarget.classList.add('active');
    
    document.getElementById('pathsSection').classList.add('hidden');
    document.getElementById('calendarSection').classList.add('hidden');
    document.getElementById('achievementsSection').classList.add('hidden');
    document.getElementById('profileSection').classList.add('hidden');
    document.getElementById('shopSection').classList.add('hidden');
    
    document.getElementById(section + 'Section').classList.remove('hidden');

    // Calendar tab opened → restore selection and refresh grid
    if (section === 'calendar') {
        const select = document.getElementById('habitSelect');
        if (gameState.lastCalendarHabitId) {
            select.value = gameState.lastCalendarHabitId;
        }
        renderCalendar();
    }
}

// ===== START APP =====
window.addEventListener('DOMContentLoaded', init);

