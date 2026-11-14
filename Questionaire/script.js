document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('datingForm');
    const resultBox = document.getElementById('result');
    const reportText = document.getElementById('reportText');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const data = collectFormData();
        saveToLocalStorage(data);
        showReport(data);
    });

    document.getElementById('downloadBtn').addEventListener('click', function () {
        const stored = localStorage.getItem('datingProfiles');
        if (!stored) {
            alert('No data saved yet. Submit at least one profile first.');
            return;
        }

        const responses = JSON.parse(stored);
        downloadCSV(responses);
    });

    document.getElementById('clearBtn').addEventListener('click', function () {
        form.reset();
        resultBox.classList.add('hidden');
    });

    function collectFormData() {
        const interests = [];
        document.querySelectorAll('input[name="interests"]:checked').forEach(cb => {
            interests.push(cb.value);
        });

        return {
            timestamp: new Date().toISOString(),
            displayName: document.getElementById('displayName').value.trim(),
            age: document.getElementById('age').value,
            gender: document.querySelector('input[name="gender"]:checked')?.value || '',
            lookingFor: document.querySelector('input[name="lookingFor"]:checked')?.value || '',
            height: document.getElementById('height').value,
            city: document.getElementById('city').value.trim(),
            education: document.getElementById('education').value,
            interests: interests.join('; '),
            about: document.getElementById('about').value.trim()
        };
    }

    function saveToLocalStorage(data) {
        let responses = [];
        const stored = localStorage.getItem('datingProfiles');
        if (stored) {
            responses = JSON.parse(stored);
        }
        responses.push(data);
        localStorage.setItem('datingProfiles', JSON.stringify(responses));
    }

    function showReport(data) {
        reportText.innerHTML = `
            <strong>Name:</strong> ${data.displayName}<br>
            <strong>Age:</strong> ${data.age}<br>
            <strong>Gender:</strong> ${data.gender}<br>
            <strong>Looking for:</strong> ${data.lookingFor}<br>
            <strong>Height:</strong> ${data.height} cm<br>
            <strong>City:</strong> ${data.city}<br>
            <strong>Education:</strong> ${data.education}<br>
            <strong>Interests:</strong> ${data.interests || 'None selected'}
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
        a.download = 'dating_profiles_dataset.csv';
        a.click();
        URL.revokeObjectURL(url);
    }
});