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

    // Lấy tên cột
    const headers = Object.keys(data[0]);

    let table = '<table>';

    // Header
    table += '<tr>';

    headers.forEach(header => {
        table += `<th>${header}</th>`;
    });

    table += '</tr>';

    // Data rows
    data.forEach(item => {

        table += '<tr>';

        headers.forEach(header => {

            // Nếu là cột Image thì hiện ảnh
            if (header.toLowerCase() === 'image') {

                table += `
                    <td>
                        <img src="${item[header]}"
                             class="table-image">
                    </td>
                `;

            } else {

                table += `<td>${item[header]}</td>`;
            }
        });

        table += '</tr>';
    });

    table += '</table>';

    resultsDiv.innerHTML = table;
}


// ENTER để search
document.getElementById('searchInput')
    .addEventListener('keypress', function(event) {

        if (event.key === 'Enter') {
            searchData();
        }
    });