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

        resultsDiv.innerHTML += `
            <div class="card">
                <p><strong>ID:</strong> ${item.ID}</p>
                <p><strong>Name:</strong> ${item.Name}</p>
                <p><strong>Phone:</strong> ${item.Phone}</p>
            </div>
        `;
    });
}