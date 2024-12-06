document.getElementById('songForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const recipient = document.getElementById('recipient').value;
    const message = document.getElementById('message').value;
    const song = document.getElementById('song').value;

    document.getElementById('outputRecipient').textContent = recipient;
    document.getElementById('outputMessage').textContent = message;
    document.getElementById('outputSong').href = song;

    document.getElementById('output').classList.remove('hidden');
});
document.addEventListener('DOMContentLoaded', function () {
    const audio = document.getElementById('backgroundMusic');
    audio.play().then(() => {
        console.log("Music started playing automatically.");
    }).catch(error => {
        console.warn("Autoplay was blocked. Playing after user interaction.");
    });
});
document.getElementById('playMusicButton').addEventListener('click', function () {
    const audio = document.getElementById('backgroundMusic');
    audio.play();
});
document.getElementById('songForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Ambil nilai dari form
    const recipient = document.getElementById('recipient').value;
    const message = document.getElementById('message').value;
    const songLink = document.getElementById('song').value;
    
    // Buat objek pesan
    const menfessData = {
        recipient: recipient,
        message: message,
        songLink: songLink
    };
    
    // Ambil data sebelumnya dari LocalStorage (jika ada)
    let existingData = JSON.parse(localStorage.getItem('menfess')) || [];
    
    // Tambahkan data baru ke array
    existingData.push(menfessData);
    
    // Simpan kembali ke LocalStorage
    localStorage.setItem('menfess', JSON.stringify(existingData));
    
    // Tampilkan pesan baru
    displayMessages();
});

// Fungsi untuk menampilkan pesan
function displayMessages() {
    const outputDiv = document.getElementById('output');
    outputDiv.classList.remove('hidden');  // Tampilkan div

    // Ambil data dari LocalStorage
    const savedData = JSON.parse(localStorage.getItem('menfess')) || [];
    
    // Kosongkan konten lama
    outputDiv.innerHTML = '<h2>Pesan Menfess</h2>';
    
    // Loop melalui data dan tampilkan
    savedData.forEach((data, index) => {
        outputDiv.innerHTML += `
            <p><strong>Untuk:</strong> ${data.recipient}</p>
            <p><strong>Pesan:</strong> ${data.message}</p>
            <p><strong>Lagu:</strong> <a href="${data.songLink}" target="_blank">Dengarkan di sini!</a></p>
            <hr>
        `;
    });
}

// Panggil fungsi untuk menampilkan pesan saat halaman dimuat
window.onload = displayMessages;
