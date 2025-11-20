document.addEventListener('DOMContentLoaded', () => {
    const mapContainer = document.getElementById('adventure-map-container');
    const map = document.getElementById('adventure-map');
    const levels = document.querySelectorAll('.level');
    const modal = document.getElementById('quiz-modal');
    const modalTitle = document.getElementById('modal-title');
    const closeBtn = document.querySelector('.close-btn');
    const completeLevelBtn = document.getElementById('complete-level-btn');

    // --- 1. Logika Klik Level & Modal ---
    levels.forEach(level => {
        level.addEventListener('click', () => {
            const status = level.dataset.status;
            const levelName = level.textContent;
            
            if (status === 'unlocked') {
                // Buka Modal Kuis
                modalTitle.textContent = `Tantangan: ${levelName}`;
                modal.classList.remove('hidden');
                
                // Simpan referensi level yang sedang dibuka
                modal.dataset.currentLevelId = level.dataset.level;
            } else if (status === 'locked') {
                alert('Tantangan ini masih terkunci! Selesaikan level sebelumnya dulu.');
            }
        });
    });

    // Logika Tutup Modal
    closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    // Logika Menyelesaikan Level (Simulasi Kuis Selesai)
    completeLevelBtn.addEventListener('click', () => {
        const levelId = modal.dataset.currentLevelId;
        const targetLevel = document.querySelector(`.level[data-level="${levelId}"]`);

        if (targetLevel) {
            // Ubah status level menjadi completed
            targetLevel.dataset.status = 'completed';
            alert('🎉 HEBAT! Tantangan selesai. Pulau ini sekarang lebih cerah!');
            
            // Logika untuk membuka level berikutnya
            // (Disini perlu kode untuk mencari levelId + 1 dan mengubah statusnya menjadi 'unlocked')
        }
        modal.classList.add('hidden');
    });


    // --- 2. Logika Peta Drag-and-Drop (UX Kunci) ---
    let isDragging = false;
    let startX, startY, scrollLeft, scrollTop;

    mapContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        mapContainer.classList.add('active');
        startX = e.pageX - mapContainer.offsetLeft;
        startY = e.pageY - mapContainer.offsetTop;
        scrollLeft = mapContainer.scrollLeft;
        scrollTop = mapContainer.scrollTop;
    });

    mapContainer.addEventListener('mouseleave', () => {
        isDragging = false;
        mapContainer.classList.remove('active');
    });

    mapContainer.addEventListener('mouseup', () => {
        isDragging = false;
        mapContainer.classList.remove('active');
    });

    mapContainer.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        
        const x = e.pageX - mapContainer.offsetLeft;
        const y = e.pageY - mapContainer.offsetTop;
        const walkX = (x - startX) * 2; // Kecepatan geser
        const walkY = (y - startY) * 2;
        
        mapContainer.scrollLeft = scrollLeft - walkX;
        mapContainer.scrollTop = scrollTop - walkY;
    });

});
