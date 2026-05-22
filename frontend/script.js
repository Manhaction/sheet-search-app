async function searchData() {

    const keyword = document.getElementById('searchInput').value;

    const response = await fetch(
        `https://sheet-search-app.onrender.com/search?q=${keyword}`
    );

    const data = await response.json();

    const resultsDiv = document.getElementById('results');

    resultsDiv.innerHTML = '';

    if (data.length === 0) {
        resultsDiv.innerHTML = '<p>Không tìm thấy dữ liệu</p>';
        return;
    }

    data.forEach(item => {

        let html = '<div class="card">';

for (const key in item) {
    html += `<p><strong>${key}:</strong> ${item[key]}</p>`;
}

html += '</div>';

resultsDiv.innerHTML += html;
        `;
    });
}