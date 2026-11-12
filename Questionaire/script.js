document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('chaosForm');
    const resultBox = document.getElementById('result');
    const reportText = document.getElementById('reportText');

    // ===== Live slider feedback =====
    const sleepSlider = document.getElementById('sleep');
    const sleepValue = document.getElementById('sleepValue');
    const sleepComment = document.getElementById('sleepComment');

    const exerciseSlider = document.getElementById('exercise');
    const exerciseValue = document.getElementById('exerciseValue');
    const exerciseComment = document.getElementById('exerciseComment');

    const chaosSlider = document.getElementById('chaos');
    const chaosValue = document.getElementById('chaosValue');
    const chaosComment = document.getElementById('chaosComment');

    function updateSleep() {
        const val = parseFloat(sleepSlider.value);
        sleepValue.textContent = val;

        if (val <= 3) sleepComment.textContent = "You are running on pure spite and caffeine.";
        else if (val <= 5) sleepComment.textContent = "Functional? Barely. Respect.";
        else if (val <= 7) sleepComment.textContent = "Acceptable. Barely.";
        else if (val <= 9) sleepComment.textContent = "Look at you, sleeping like a responsible adult.";
        else sleepComment.textContent = "Are you okay? That’s a lot of sleep.";
    }

    function updateExercise() {
        const val = parseInt(exerciseSlider.value);
        exerciseValue.textContent = val;

        if (val === 0) exerciseComment.textContent = "The couch has claimed another soul.";
        else if (val <= 2) exerciseComment.textContent = "You walk to the fridge. That counts.";
        else if (val <= 4) exerciseComment.textContent = "Occasional movement detected.";
        else if (val <= 6) exerciseComment.textContent = "Not bad. Your future self says thanks.";
        else if (val <= 8) exerciseComment.textContent = "Impressive. Do you even sit?";
        else exerciseComment.textContent = "Are you training for the apocalypse?";
    }

    function updateChaos() {
        const val = parseInt(chaosSlider.value);
        chaosValue.textContent = val;

        if (val <= 2) chaosComment.textContent = "Suspiciously organized. We are watching you.";
        else if (val <= 4) chaosComment.textContent = "Mild chaos detected.";
        else if (val <= 6) chaosComment.textContent = "Standard modern human chaos level.";
        else if (val <= 8) chaosComment.textContent = "High chaos. Reality is optional for you.";
        else chaosComment.textContent = "Maximum chaos. You are the storm.";
    }

    sleepSlider.addEventListener('input', updateSleep);
    exerciseSlider.addEventListener('input', updateExercise);
    chaosSlider.addEventListener('input', updateChaos);

    // Initialize comments
    updateSleep();
    updateExercise();
    updateChaos();

    // ===== Form Submit =====
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const data = collectFormData();
        saveToLocalStorage(data);
        showReport(data);
    });

    // ===== Download CSV =====
    document.getElementById('downloadBtn').addEventListener('click', function () {
        const stored = localStorage.getItem('chaosResponses');
        if (!stored) {
            alert('No data saved yet. Fill the form and click "Generate Chaos Report" first.');
            return;
        }

        const responses = JSON.parse(stored);
        downloadCSV(responses);
    });

    // ===== Clear Form =====
    document.getElementById('clearBtn').addEventListener('click', function () {
        form.reset();
        sleepSlider.value = 7;
        exerciseSlider.value = 3;
        chaosSlider.value = 5;
        updateSleep();
        updateExercise();
        updateChaos();
        resultBox.classList.add('hidden');
    });

    // ===== Helpers =====
    function collectFormData() {
        const dopamine = [];
        document.querySelectorAll('input[name="dopamine"]:checked').forEach(cb => {
            dopamine.push(cb.value);
        });

        return {
            timestamp: new Date().toISOString(),
            age: document.getElementById('age').value,
            gender: document.querySelector('input[name="gender"]:checked')?.value || '',
            sleepHours: document.getElementById('sleep').value,
            exerciseLevel: document.getElementById('exercise').value,
            chaosLevel: document.getElementById('chaos').value,
            dopamineSources: dopamine.join('; '),
            browserTabs: document.getElementById('tabs').value,
            unreadEmails: document.getElementById('emails').value,
            confession: document.getElementById('confession').value
        };
    }

    function saveToLocalStorage(data) {
        let responses = [];
        const stored = localStorage.getItem('chaosResponses');
        if (stored) {
            responses = JSON.parse(stored);
        }
        responses.push(data);
        localStorage.setItem('chaosResponses', JSON.stringify(responses));
    }

    function showReport(data) {
        const chaos = parseInt(data.chaosLevel);
        let verdict = '';

        if (chaos <= 3) verdict = "You appear dangerously stable. Touch some grass... or maybe don’t.";
        else if (chaos <= 6) verdict = "You are a perfectly average modern human. Chaos level: sustainable.";
        else if (chaos <= 8) verdict = "High chaos detected. You are either a creative genius or one bad day away from becoming a meme.";
        else verdict = "MAXIMUM CHAOS. The system recommends snacks and emotional support.";

        reportText.innerHTML = `
            <strong>Age:</strong> ${data.age}<br>
            <strong>Chaos Level:</strong> ${data.chaosLevel}/10<br>
            <strong>Sleep:</strong> ${data.sleepHours} hours<br>
            <strong>Open Tabs:</strong> ${data.browserTabs}<br>
            <strong>Unread Emails:</strong> ${data.unreadEmails}<br><br>
            <em>${verdict}</em>
        `;

        resultBox.classList.remove('hidden');
        resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function downloadCSV(responses) {
        if (responses.length === 0) return;

        const headers = Object.keys(responses[0]);
        const csvRows = [headers.join(',')];

        responses.forEach(row => {
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
        a.download = 'chaos_dataset.csv';
        a.click();
        URL.revokeObjectURL(url);
    }
});