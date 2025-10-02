// Öğeleri seç
const themeBtn = document.getElementById('themeBtn');
const optionInput = document.getElementById('optionInput');
const addBtn = document.getElementById('addBtn');
const optionsUl = document.getElementById('optionsUl');
const optionCount = document.getElementById('optionCount');
const bulkToggle = document.getElementById('bulkToggle');
const spinBtn = document.getElementById('spinBtn');
const resetBtn = document.getElementById('resetBtn');
const winnerModal = document.getElementById('winnerModal');
const spinAgainBtn = document.getElementById('spinAgainBtn');
const newGameBtn = document.getElementById('newGameBtn');
const winnerText = document.getElementById('winnerText');
const wheelCanvas = document.getElementById('wheelCanvas');
const ctx = wheelCanvas.getContext('2d');

// Durum değişkenleri
let options = [];
let currentRotation = 0;
let isSpinning = false;
let isBulkMode = false;

// Tema Yönetimi
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
}

themeBtn.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Çarkı yeniden çiz (tema değişikliğini yansıtmak için)
    if (options.length > 0) {
        drawWheel();
    }
});

// Bulk Mode Toggle
bulkToggle.addEventListener('change', (e) => {
    isBulkMode = e.target.checked;
    if (isBulkMode) {
        optionInput.placeholder = "Her satıra bir seçenek yazın (Enter'a basın)";
    } else {
        optionInput.placeholder = "Çarka seçenek ekleyin";
    }
});

// Seçenek Ekleme
function addOption() {
    const value = optionInput.value.trim();
    
    if (value === '') {
        return;
    }
    
    if (isBulkMode) {
        // Toplu ekleme - her satırı ayrı seçenek olarak ekle
        const lines = value.split('\n').map(line => line.trim()).filter(line => line !== '');
        lines.forEach(line => {
            if (!options.includes(line)) {
                options.push(line);
            }
        });
    } else {
        // Tek ekleme
        if (options.includes(value)) {
            alert('Bu seçenek zaten mevcut!');
            return;
        }
        options.push(value);
    }
    
    updateOptionsList();
    updateWheel();
    optionInput.value = '';
    optionInput.focus();
}

// Seçenek Silme
function removeOption(index) {
    options.splice(index, 1);
    updateOptionsList();
    updateWheel();
}

// Seçenek Listesini Güncelle
function updateOptionsList() {
    optionsUl.innerHTML = '';
    optionCount.textContent = options.length;
    
    options.forEach((option, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${option}</span>
            <button onclick="removeOption(${index})">🗑️</button>
        `;
        optionsUl.appendChild(li);
    });
    
    // En az 2 seçenek varsa spin butonunu aktif et ve reset butonunu göster
    if (options.length >= 2) {
        spinBtn.disabled = false;
        resetBtn.classList.remove('hidden');
    } else {
        spinBtn.disabled = true;
        resetBtn.classList.add('hidden');
    }
}

// Çarkı Güncelle
function updateWheel() {
    if (options.length > 0) {
        drawWheel();
    } else {
        // Çarkı temizle
        ctx.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);
    }
}

// Çarkı Çiz
function drawWheel() {
    const canvas = wheelCanvas;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 280;
    
    // Canvas'ı temizle
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (options.length === 0) return;
    
    // Çarkı döndür
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((currentRotation * Math.PI) / 180);
    ctx.translate(-centerX, -centerY);
    
    const sliceAngle = (2 * Math.PI) / options.length;
    
    // Renkler
    const colors = [
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A',
        '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2',
        '#F8B739', '#52B788', '#E76F51', '#2A9D8F',
        '#E63946', '#F1FAEE', '#A8DADC', '#457B9D'
    ];
    
    // Her dilimi çiz
    options.forEach((option, index) => {
        const startAngle = index * sliceAngle - Math.PI / 2;
        const endAngle = startAngle + sliceAngle;
        
        // Dilimi çiz
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = colors[index % colors.length];
        ctx.fill();
        
        // Kenarlık
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 4;
        ctx.stroke();
        
        // Metni çiz
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(startAngle + sliceAngle / 2);
        ctx.textAlign = 'center';
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 18px Arial';
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 4;
        
        // Metni oku (döndürülmüş)
        const maxLength = options.length > 8 ? 10 : 15;
        const text = option.length > maxLength ? option.substring(0, maxLength - 3) + '...' : option;
        ctx.fillText(text, radius * 0.65, 5);
        ctx.restore();
    });
    
    ctx.restore();
}

// Çarkı Çevir
function spinWheel() {
    if (isSpinning || options.length < 2) return;
    
    isSpinning = true;
    spinBtn.disabled = true;
    resetBtn.disabled = true;
    
    // Rastgele bir dönüş sayısı (5-10 tur arası + rastgele açı)
    const spins = 5 + Math.random() * 5;
    const randomDegree = Math.random() * 360;
    const totalRotation = spins * 360 + randomDegree;
    
    // Animasyon
    const duration = 4000; // 4 saniye
    const startTime = Date.now();
    const startRotation = currentRotation;
    
    function animate() {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        currentRotation = startRotation + totalRotation * easeOut;
        drawWheel();
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            // Dönüş tamamlandı, kazananı belirle
            determineWinner();
        }
    }
    
    animate();
}

// Kazananı Belirle
function determineWinner() {
    // Normalize et (0-360 arası)
    const normalizedRotation = currentRotation % 360;
    
    // Pointer sağ tarafta (0 derece = sağ). Çarkın dönüşüne göre hangi dilim pointer'a denk geliyor?
    // Çark saat yönünün tersine döndüğü için 360 - rotation kullanıyoruz
    // Başlangıç dilimi üstte olduğu için 90 derece ekliyoruz
    const pointerAngle = (360 - normalizedRotation + 90) % 360;
    
    // Hangi dilimde olduğunu hesapla
    const sliceAngle = 360 / options.length;
    const winnerIndex = Math.floor(pointerAngle / sliceAngle) % options.length;
    
    const winner = options[winnerIndex];
    
    // Kazananı göster
    setTimeout(() => {
        winnerModal.classList.remove('hidden');
        winnerText.textContent = winner;
        isSpinning = false;
        spinBtn.disabled = false;
        resetBtn.disabled = false;
    }, 500);
}

// Tekrar Çevir
function spinAgain() {
    winnerModal.classList.add('hidden');
}

// Yeni Oyun
function resetGame() {
    options = [];
    currentRotation = 0;
    isSpinning = false;
    
    winnerModal.classList.add('hidden');
    
    updateOptionsList();
    updateWheel();
    optionInput.value = '';
    optionInput.focus();
}

// Event Listeners
addBtn.addEventListener('click', addOption);
optionInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        if (!isBulkMode) {
            addOption();
        }
    }
});

// Bulk mode için textarea gibi davranış
optionInput.addEventListener('keydown', (e) => {
    if (isBulkMode && e.key === 'Enter' && e.ctrlKey) {
        e.preventDefault();
        addOption();
    }
});

spinBtn.addEventListener('click', spinWheel);
resetBtn.addEventListener('click', resetGame);
spinAgainBtn.addEventListener('click', spinAgain);
newGameBtn.addEventListener('click', resetGame);

// Modal dışına tıklanınca kapat
winnerModal.addEventListener('click', (e) => {
    if (e.target === winnerModal) {
        spinAgain();
    }
});

// Başlangıçta temayı yükle
initTheme();
optionInput.focus();
updateOptionsList();
