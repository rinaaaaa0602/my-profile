const API_URL = 'https://script.google.com/macros/s/AKfycby3vF3jjRRVTziRy4U1fttt-T8bfAsbP5IRUQYpKuJMzY7Tnfv54UPnX0AOaJK--pNoKg/exec';

// Ambil data saat awal halaman dimuat
window.onload = function () {
  fetch(API_URL)
    .then(res => res.json())
    .then(json => {
      const tbody = document.querySelector('#data-table tbody');
      tbody.innerHTML = '';

      json.data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${item.ID}</td>
          <td>${item.NAMA}</td>
          <td>${item["NO HP"]}</td>
          <td>${item.KETERANGAN}</td>
        `;
        tbody.appendChild(row);
      });
    });
};

function getFormData() {
  return {
    ID: document.getElementById('id').value,
    NAMA: document.getElementById('nama').value,
    "NO HP": document.getElementById('nohp').value,
    KETERANGAN: document.getElementById('keterangan').value
  };
}

function createData() {
  const data = getFormData();
  data.action = 'create';

  fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(json => {
    alert(json.message);
    location.reload();
  });
}

function updateData() {
  const data = getFormData();
  data.action = 'update';

  fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(json => {
    alert(json.message);
    location.reload();
  });
}

function deleteData() {
  const id = document.getElementById('id').value;

  if (!id) {
    alert("Masukkan ID yang akan dihapus.");
    return;
  }

  fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify({ action: 'delete', ID: id })
  })
  .then(res => res.json())
  .then(json => {
    alert(json.message);
    location.reload();
  });
}
