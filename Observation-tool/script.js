// Human Safari - Observation Tool Script

document.addEventListener('DOMContentLoaded', function () {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const catchBtn = document.getElementById('catchBtn');
    const noteInput = document.getElementById('note');
    const totalCatchesEl = document.getElementById('totalCatches');
    const totalScoreEl = document.getElementById('totalScore');
    const recentList = document.getElementById('recentList');

    let selectedCategory = null;
    let selectedPoints = 0;

    // Load existing data
    let captures = JSON.parse(localStorage.getItem('humanSafariCaptures') || '[]');
    updateUI();

    // Category selection
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            categoryBtns.forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');

            selectedCategory = this.dataset.category;
            selectedPoints = parseInt(this.dataset.points);

            catchBtn.disabled = false;
            catchBtn.textContent = `Catch ${selectedCategory}! (+${selectedPoints} pts)`;
        });
    });

    // Catch button
    catchBtn.addEventListener('click', function () {
        if (!selectedCategory) return;

        const capture = {
            timestamp: new Date().toISOString(),
            category: selectedCategory,
            points: selectedPoints,
            note: noteInput.value.trim()
        };

        captures.unshift(capture); // newest first
        localStorage.setItem('humanSafariCaptures', JSON.stringify(captures));

        // Reset
        noteInput.value = '';
        updateUI();

        // Small feedback
        catchBtn.textContent = 'Caught! ✓';
        setTimeout(() => {
            if (selectedCategory) {
                catchBtn.textContent = `Catch ${selectedCategory}! (+${selectedPoints} pts)`;
            }
        }, 800);
    });

    // Download CSV
    document.getElementById('downloadBtn').addEventListener('click', function () {
        if (captures.length === 0) {
            alert('No captures yet. Go hunt some humans first!');
            return;
        }
        downloadCSV(captures);
    });

    // Clear all data
    document.getElementById('clearBtn').addEventListener('click', function () {
        if (confirm('Clear all captures? This cannot be undone.')) {
            captures = [];
            localStorage.removeItem('humanSafariCaptures');
            updateUI();

            // Reset selection
            categoryBtns.forEach(b => b.classList.remove('selected'));
            selectedCategory = null;
            selectedPoints = 0;
            catchBtn.disabled = true;
            catchBtn.textContent = 'Select a category first';
        }
    });

    // ===== Helpers =====
    function updateUI() {
        // Score
        totalCatchesEl.textContent = captures.length;
        const score = captures.reduce((sum, c) => sum + c.points, 0);
        totalScoreEl.textContent = score;

        // Recent list
        if (captures.length === 0) {
            recentList.innerHTML = '<p class="empty-msg">No captures yet. Go hunting!</p>';
            return;
        }

        recentList.innerHTML = captures.slice(0, 15).map(c => {
            const time = new Date(c.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            return `
                <div class="recent-item">
                    <div>
                        <span class="cat-name">${c.category}</span>
                        ${c.note ? `<br><small>${c.note}</small>` : ''}
                    </div>
                    <div class="points">+${c.points} · ${time}</div>
                </div>
            `;
        }).join('');
    }

    function downloadCSV(data) {
        const headers = ['timestamp', 'category', 'points', 'note'];
        const csvRows = [headers.join(',')];

        data.forEach(row => {
            const values = headers.map(h => {
                const val = row[h] ?? '';
                return `"${String(val).replace(/"/g, '""')}"`;
            });
            csvRows.push(values.join(','));
        });

        const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'human_safari_dataset.csv';
        a.click();
        URL.revokeObjectURL(url);
    }
});
