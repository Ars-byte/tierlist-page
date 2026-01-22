// --- VARIABLES DE ESTADO ---
let activePage = 'home';      // home, tierlist, testers
let activeTierMode = 'overall'; // overall, np, sw, cry, mc

// --- LOADING ---
window.addEventListener('load', () => {
    const loader = document.getElementById('page-loader');
    setTimeout(() => {
        loader.classList.add('loader-hidden');
        setTimeout(() => { loader.style.display = 'none'; }, 500);
    }, 1500);
});

// --- BUSCADOR (LÓGICA NUEVA) ---
document.getElementById('search-input').addEventListener('input', function(e) {
    const term = e.target.value.toLowerCase();

    // Si escribe en Home, lo mandamos a la tierlist
    if (activePage === 'home' && term.length > 0) {
        navTo('tierlist');
    }

    if (activePage === 'tierlist') {
        // Filtramos jugadores
        const filteredPlayers = players.filter(p => p.name.toLowerCase().includes(term));
        
        if (activeTierMode === 'overall') {
            renderOverall(filteredPlayers);
        } else {
            renderTierColumns(activeTierMode, filteredPlayers);
        }
    } 
    else if (activePage === 'testers') {
        // Filtramos testers
        const filteredTesters = testersData.filter(t => t.name.toLowerCase().includes(term));
        renderTesters(filteredTesters);
    }
});

// --- NAVEGACIÓN ---
function navTo(page) {
    activePage = page; // Guardamos donde estamos
    
    // Resetear visualmente
    document.getElementById('page-home').style.display = 'none';
    document.getElementById('page-tierlist').style.display = 'none';
    document.getElementById('page-testers').style.display = 'none';
    document.querySelectorAll('.nav-pill').forEach(btn => btn.classList.remove('active'));

    if (page === 'home') {
        document.getElementById('page-home').style.display = 'block';
        document.querySelectorAll('.nav-pill')[0].classList.add('active');
    } else if (page === 'tierlist') {
        document.getElementById('page-tierlist').style.display = 'block';
        document.querySelectorAll('.nav-pill')[1].classList.add('active');
        // Render inicial (o con filtro si hay algo escrito)
        const term = document.getElementById('search-input').value.toLowerCase();
        const list = term ? players.filter(p => p.name.toLowerCase().includes(term)) : players;
        
        if (activeTierMode === 'overall') renderOverall(list);
        else renderTierColumns(activeTierMode, list);

    } else if (page === 'testers') {
        document.getElementById('page-testers').style.display = 'block';
        document.querySelectorAll('.nav-pill')[2].classList.add('active');
        // Render inicial testers
        const term = document.getElementById('search-input').value.toLowerCase();
        const list = term ? testersData.filter(t => t.name.toLowerCase().includes(term)) : testersData;
        renderTesters(list);
    }
}

// ICONOS LOCALES
const ICONS = {
    sw: "sword.png", np: "nethop.png", cry: "vanilla.png", mc: "mace.png"
};

// ================= DATOS TESTERS =================
const testersData = [
    { rank: 1, name: "kath_rinx", tests: 258, type: "mc" },
    { rank: 2, name: "benza1318", tests: 237, type: "mc" },
    { rank: 3, name: "xdrako98", tests: 143, type: "mc" },
    { rank: 4, name: "ragj90", tests: 107, type: "mc" },
    { rank: 5, name: "boombrowwnie", tests: 103, type: "mc" },
    { rank: 6, name: "shabyneta", tests: 92, type: "initials", initials: "SH" },
    { rank: 7, name: "o898_", tests: 89, type: "initials", initials: "08" },
    { rank: 8, name: "ecunem", tests: 80, type: "mc" }
];

// Recibe datos opcionales para filtrar
function renderTesters(dataList = testersData) {
    const container = document.getElementById('testers-container');
    if (dataList.length === 0) {
        container.innerHTML = '<div style="color:#666; width:100%; text-align:center;">No se encontraron testers.</div>';
        return;
    }
    
    container.innerHTML = dataList.map(t => {
        let avatarHtml = '';
        let rankClass = '';
        let badgeIcon = '';

        if (t.rank === 1) { rankClass = 't-rank-1'; badgeIcon = '★'; }
        else if (t.rank === 2) { rankClass = 't-rank-2'; badgeIcon = '★'; }
        else if (t.rank === 3) { rankClass = 't-rank-3'; badgeIcon = '★'; }

        if (t.type === 'mc') {
            avatarHtml = `<img src="https://mc-heads.net/avatar/${t.name}" class="tester-avatar">`;
        } else {
            avatarHtml = `<div class="avatar-placeholder">${t.initials}</div>`;
        }

        return `
            <div class="tester-card ${rankClass}">
                ${badgeIcon ? `<div class="tester-badge-icon">${badgeIcon}</div>` : `<span style="position:absolute; top:15px; left:15px; color:#64748b; font-size:12px;">#${t.rank}</span>`}
                ${avatarHtml}
                <div class="tester-name">${t.name}</div>
                <div class="tester-stats">TESTS: <span>${t.tests}</span></div>
            </div>
        `;
    }).join('');
}

// ================= DATOS PLAYERS =================
const players = [
    { rank: 1, name: "Tfoxit", role: "Especialista", points: 205, region: "SA", sw: "LT3", np: "LT3", cry: "LT3", mc: "N/A" },
    { rank: 2, name: "uFzy6_", role: "Especialista", points: 195, region: "SA", sw: "LT3", np: "LT3", cry: "LT3", mc: "N/A" },
    { rank: 3, name: "montyqx_", role: "Especialista", points: 195, region: "SA", sw: "LT3", np: "LT3", cry: "LT3", mc: "N/A" },
    { rank: 4, name: "kath_rinxx", role: "Especialista", points: 190, region: "SA", sw: "HT4", np: "LT3", cry: "HT3", mc: "N/A" },
    { rank: 5, name: "Squeezz_", role: "Especialista", points: 185, region: "SA", sw: "LT2", np: "LT3", cry: "HT5", mc: "N/A" },
    { rank: 6, name: "Patriuu", role: "Especialista", points: 175, region: "SA", sw: "LT3", np: "LT3", cry: "LT4", mc: "N/A" },
    { rank: 7, name: "paqueadito", role: "Especialista", points: 165, region: "SA", sw: "HT3", np: "HT3", cry: "N/A", mc: "N/A" },
    { rank: 8, name: "3Packs", role: "Especialista", points: 165, region: "SA", sw: "N/A", np: "N/A", cry: "LT5", mc: "N/A" },
    { rank: 9, name: "Nico_DM", role: "Especialista", points: 160, region: "SA", sw: "LT3", np: "LT3", cry: "LT4", mc: "N/A" },
    { rank: 10, name: "qvoh", role: "Especialista", points: 155, region: "SA", sw: "LT2", np: "LT3", cry: "N/A", mc: "N/A" },
    { rank: 11, name: "KyaEnegal", role: "Especialista", points: 145, region: "NA", sw: "LT3", np: "HT3", cry: "N/A", mc: "N/A" },
    { rank: 12, name: "pepesito777", role: "Especialista", points: 140, region: "SA", sw: "LT3", np: "HT4", cry: "HT5", mc: "N/A" },
    { rank: 13, name: "KnockbackI", role: "Especialista", points: 140, region: "NA", sw: "LT3", np: "LT4", cry: "N/A", mc: "N/A" },
    { rank: 14, name: "WaguriFan", role: "Combatiente", points: 135, region: "SA", sw: "HT4", np: "HT4", cry: "HT4", mc: "N/A" },
    { rank: 15, name: "Baldrot", role: "Combatiente", points: 130, region: "NA", sw: "LT3", np: "LT3", cry: "N/A", mc: "N/A" },
    { rank: 16, name: "LumaramBack", role: "Combatiente", points: 130, region: "EU", sw: "LT3", np: "LT3", cry: "N/A", mc: "N/A" },
    { rank: 17, name: "ecunem", role: "Combatiente", points: 130, region: "NA", sw: "LT3", np: "LT3", cry: "N/A", mc: "N/A" },
    { rank: 18, name: "Frans1to", role: "Combatiente", points: 130, region: "EU", sw: "LT3", np: "LT3", cry: "N/A", mc: "N/A" },
    { rank: 19, name: "Benza1318", role: "Combatiente", points: 130, region: "SA", sw: "LT3", np: "LT3", cry: "N/A", mc: "N/A" },
    { rank: 20, name: "GermanyConDrip", role: "Combatiente", points: 130, region: "SA", sw: "LT3", np: "LT3", cry: "N/A", mc: "N/A" },
    { rank: 21, name: "xX1inneXx", role: "Combatiente", points: 125, region: "SA", sw: "LT4", np: "LT3", cry: "HT5", mc: "N/A" },
    { rank: 22, name: "iSamPW", role: "Combatiente", points: 125, region: "NA", sw: "LT3", np: "LT4", cry: "LT4", mc: "N/A" },
    { rank: 23, name: "JovenBalliiin", role: "Combatiente", points: 120, region: "SA", sw: "HT4", np: "LT4", cry: "LT4", mc: "N/A" },
    { rank: 24, name: "Adolf_Shadow", role: "Combatiente", points: 115, region: "SA", sw: "LT3", np: "LT4", cry: "HT5", mc: "N/A" },
    { rank: 25, name: "mantuswn21", role: "Combatiente", points: 115, region: "SA", sw: "LT3", np: "LT4", cry: "HT5", mc: "N/A" },
    { rank: 26, name: "Browwnie_", role: "Combatiente", points: 115, region: "NA", sw: "LT3", np: "HT4", cry: "LT5", mc: "N/A" },
    { rank: 27, name: "Alexmaker", role: "Combatiente", points: 110, region: "SA", sw: "LT3", np: "HT4", cry: "N/A", mc: "N/A" },
    { rank: 28, name: "fqrtrex", role: "Combatiente", points: 110, region: "SA", sw: "LT3", np: "HT4", cry: "N/A", mc: "N/A" },
    { rank: 29, name: "Tzhyann", role: "Combatiente", points: 110, region: "SA", sw: "LT3", np: "HT4", cry: "N/A", mc: "N/A" },
    { rank: 30, name: "Drusilza", role: "Combatiente", points: 110, region: "SA", sw: "LT3", np: "LT4", cry: "HT5", mc: "N/A" },
    { rank: 31, name: "r1nn__", role: "Combatiente", points: 110, region: "SA", sw: "LT3", np: "HT4", cry: "N/A", mc: "N/A" },
    { rank: 32, name: "Olvidada", role: "Combatiente", points: 110, region: "SA", sw: "LT3", np: "LT4", cry: "HT5", mc: "N/A" },
    { rank: 33, name: "eltuiri", role: "Combatiente", points: 110, region: "SA", sw: "LT3", np: "HT4", cry: "N/A", mc: "N/A" },
    { rank: 34, name: "1Tr3xh", role: "Combatiente", points: 110, region: "NA", sw: "LT3", np: "HT4", cry: "N/A", mc: "N/A" },
    { rank: 35, name: "Kyhnta", role: "Combatiente", points: 110, region: "SA", sw: "LT3", np: "HT4", cry: "N/A", mc: "N/A" },
    { rank: 36, name: "xItzMeow", role: "Combatiente", points: 100, region: "SA", sw: "LT3", np: "HT5", cry: "HT5", mc: "N/A" },
    { rank: 37, name: "GamerRizzerPro67", role: "Combatiente", points: 100, region: "SA", sw: "LT3", np: "LT4", cry: "LT4", mc: "N/A" },
    { rank: 38, name: "ChinaConDrip", role: "Combatiente", points: 100, region: "SA", sw: "LT3", np: "LT4", cry: "LT5", mc: "N/A" },
    { rank: 39, name: "KingSantiNew", role: "Combatiente", points: 100, region: "SA", sw: "LT3", np: "HT5", cry: "HT5", mc: "N/A" },
    { rank: 40, name: "gamerrizzerpro67", role: "Combatiente", points: 100, region: "SA", sw: "LT5", np: "N/A", cry: "N/A", mc: "N/A" },
    { rank: 41, name: "47Vnnys", role: "Combatiente", points: 95, region: "SA", sw: "HT3", np: "HT5", cry: "N/A", mc: "N/A" },
    { rank: 42, name: "KroniKs", role: "Combatiente", points: 95, region: "SA", sw: "LT3", np: "LT4", cry: "N/A", mc: "N/A" },
    { rank: 43, name: "1Kako_", role: "Combatiente", points: 95, region: "NA", sw: "LT3", np: "LT4", cry: "N/A", mc: "N/A" },
    { rank: 44, name: "XEnd_3r", role: "Combatiente", points: 95, region: "SA", sw: "LT3", np: "LT4", cry: "N/A", mc: "N/A" },
    { rank: 45, name: "wwv_", role: "Recluta", points: 95, region: "SA", sw: "LT3", np: "LT4", cry: "N/A", mc: "N/A" },
    { rank: 46, name: "iHk_Fairh", role: "Combatiente", points: 95, region: "SA", sw: "LT3", np: "LT4", cry: "N/A", mc: "N/A" },
    { rank: 47, name: "AzoroBitMC", role: "Combatiente", points: 95, region: "NA", sw: "LT3", np: "LT4", cry: "N/A", mc: "N/A" },
    { rank: 48, name: "wqkii", role: "Recluta", points: 95, region: "NA", sw: "LT3", np: "LT3", cry: "LT4", mc: "N/A" },
    { rank: 49, name: "TreFg7", role: "Combatiente", points: 95, region: "SA", sw: "LT3", np: "LT4", cry: "N/A", mc: "N/A" },
    { rank: 50, name: "BreachIVDencityV", role: "Combatiente", points: 95, region: "NA", sw: "LT3", np: "LT4", cry: "N/A", mc: "N/A" }
];

// --- FUNCIONES TIERLIST ---
function switchView(viewName) {
    activeTierMode = viewName; // Actualizar estado
    
    const overallDiv = document.getElementById('overall-view');
    const tierDiv = document.getElementById('tier-view-area');
    const tabs = document.querySelectorAll('.tab-card');

    tabs.forEach(t => t.classList.remove('active'));
    const activeBtn = Array.from(tabs).find(t => t.getAttribute('onclick').includes(`'${viewName}'`));
    if(activeBtn) activeBtn.classList.add('active');

    // Recuperamos lo que haya en el buscador para filtrar
    const term = document.getElementById('search-input').value.toLowerCase();
    const list = term ? players.filter(p => p.name.toLowerCase().includes(term)) : players;

    if (viewName === 'overall') {
        overallDiv.style.display = 'block';
        tierDiv.style.display = 'none';
        renderOverall(list);
    } else {
        overallDiv.style.display = 'none';
        tierDiv.style.display = 'block';
        renderTierColumns(viewName, list);
    }
}

function getTierClass(val) {
    if (!val || val === "N/A") return "tier-na";
    if (val.includes("HT5") || val.includes("LT5")) return "tier-white";
    if (val.includes("HT4")) return "tier-purple";
    if (val.includes("LT4") || val.includes("HT3")) return "tier-red"; 
    if (val.includes("LT")) return "tier-cyan";
    return "tier-na";
}

function getRegionClass(reg) {
    if (reg === "SA") return "reg-sa";
    if (reg === "NA") return "reg-na";
    if (reg === "EU") return "reg-eu";
    return "reg-sa";
}

function renderTierBadge(type, value) {
    const iconUrl = ICONS[type];
    const cssClass = getTierClass(value);
    return `<div class="tier-badge ${cssClass}"><img src="${iconUrl}"> ${value}</div>`;
}

// Recibe lista opcional para renderizar
function renderOverall(dataList = players) {
    const podiumCont = document.getElementById('podium-area');
    const listCont = document.getElementById('leaderboard-list');

    // Si hay búsqueda, el podio se comporta distinto o se mantiene estático? 
    // Lo lógico: Si filtro "pepe", el podio se vacía o muestra si pepe está en top 3.
    // Vamos a hacer que si hay filtro, SOLO se muestre la lista para no romper el podio visualmente con 1 solo elemento.
    
    const isFiltered = dataList.length !== players.length;

    if (!isFiltered) {
        podiumCont.style.display = 'flex';
        // Top 3 Original
        const top3 = [players[1], players[0], players[2]];
        podiumCont.innerHTML = top3.map(p => `
            <div class="podium-card rank-${p.rank}" onclick="openModal('${p.name}')">
                <div class="badge-rank">${p.rank}</div>
                <div class="card-inner">
                    <img src="https://mc-heads.net/body/${p.name}" class="skin-img">
                    <div class="p-name">${p.name}</div>
                    <div class="p-role">${p.role}</div>
                    <div class="p-pts">${p.points} pts</div>
                    <span class="reg-badge ${getRegionClass(p.region)}">${p.region}</span>
                    <div class="badges-grid">
                        ${renderTierBadge('sw', p.sw)} ${renderTierBadge('np', p.np)}
                        ${renderTierBadge('cry', p.cry)} ${renderTierBadge('mc', p.mc)}
                    </div>
                </div>
            </div>
        `).join('');
        
        // Lista del 4 en adelante
        const rest = players.slice(3);
        renderList(rest, listCont);
        
    } else {
        // MODO BÚSQUEDA: Ocultar podio, mostrar todo en lista
        podiumCont.style.display = 'none';
        renderList(dataList, listCont);
    }
}

function renderList(list, container) {
    if(list.length === 0) {
        container.innerHTML = '<div style="padding:20px; text-align:center; color:#666;">No se encontraron resultados.</div>';
        return;
    }
    container.innerHTML = list.map(p => `
        <div class="list-row" onclick="openModal('${p.name}')">
            <div class="col-rank">#${p.rank}</div>
            <div class="col-player">
                <img src="https://mc-heads.net/avatar/${p.name}" style="width:38px; border-radius:6px;">
                <div class="p-list-info">
                    <div class="p-list-name">${p.name}</div>
                    <div class="p-list-meta">
                        <span class="role-text">⚔ ${p.role}</span><span class="pts-text">(${p.points} points)</span>
                    </div>
                </div>
            </div>
            <div class="col-region"><span class="reg-badge ${getRegionClass(p.region)}">${p.region}</span></div>
            <div class="col-tiers">
                ${renderTierBadge('sw', p.sw)} ${renderTierBadge('np', p.np)}
                ${renderTierBadge('cry', p.cry)} ${renderTierBadge('mc', p.mc)}
            </div>
        </div>
    `).join('');
}

function renderTierColumns(mode, dataList = players) {
    const container = document.getElementById('tier-columns-inject');
    container.innerHTML = '';
    
    // Tiers a mostrar
    const tiersToShow = [2, 3, 4, 5];

    tiersToShow.forEach(tierNum => {
        const playersInTier = dataList.filter(p => p[mode] && p[mode].includes(tierNum.toString()));
        const colDiv = document.createElement('div');
        colDiv.className = 'tier-column';
        colDiv.innerHTML = `<div class="tier-header th-${tierNum}" style="color:var(--color-t${tierNum})">Tier ${tierNum}</div>`;
        
        if (playersInTier.length > 0) {
            playersInTier.forEach(p => {
                colDiv.innerHTML += `
                    <div class="player-row-card" onclick="openModal('${p.name}')">
                        <img src="https://mc-heads.net/avatar/${p.name}" class="p-head-mini">
                        <span class="p-name-mini">${p.name}</span>
                    </div>`;
            });
        } else {
            colDiv.innerHTML += `<div style="color:#555; font-size:12px; padding:10px;">Vacio</div>`;
        }
        container.appendChild(colDiv);
    });
}

function openModal(playerName) {
    const p = players.find(x => x.name === playerName);
    if(!p) return;
    document.getElementById('modal-body').innerHTML = `
        <div class="modal-rank"><small>RANK</small> #${p.rank}</div>
        <img src="https://mc-heads.net/body/${p.name}" class="modal-skin">
        <div class="modal-name">${p.name}</div>
        <div class="p-role">${p.role}</div>
        <div class="p-pts">${p.points} pts</div>
        <span class="reg-badge ${getRegionClass(p.region)}">${p.region}</span>
        <div class="modal-grid">
            ${renderTierBadge('sw', p.sw)} ${renderTierBadge('np', p.np)}
            ${renderTierBadge('cry', p.cry)} ${renderTierBadge('mc', p.mc)}
        </div>
    `;
    document.getElementById('player-modal').classList.add('active');
}

function closeModal() {
    document.getElementById('player-modal').classList.remove('active');
}