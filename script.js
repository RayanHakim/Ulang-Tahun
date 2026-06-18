let currentSlide = 0;
let slideInterval;
let progressInterval;
let progressPercent = 0;
const SLIDE_DURATION = 6000;

// Tambahkan slides/pekerjaan.html ke urutan array
const slideFiles = [
    'slides/nama.html',
    'slides/waktu.html',
    'slides/pekerjaan.html', // SLIDE BARU MASUK KE SINI
    'slides/zodiak.html',
    'slides/shio.html',
    'slides/batu.html',
    'slides/generasi.html',
    'slides/summary.html'
];

document.getElementById('wrapped-form').addEventListener('submit', function(e) {
    e.preventDefault();
    localStorage.setItem('sw_nama', document.getElementById('nama').value);
    localStorage.setItem('sw_tgl', document.getElementById('tanggal-lahir').value);
    localStorage.setItem('sw_kerja', document.getElementById('pekerjaan').value);
    loadAndStartWrapped();
});

async function loadAndStartWrapped() {
    const container = document.getElementById('slide-container');
    const progContainer = document.getElementById('progress-container');
    container.innerHTML = ''; 
    progContainer.innerHTML = '';

    slideFiles.forEach((_, i) => {
        progContainer.innerHTML += `<div class="progress-bar"><div class="progress-fill" id="fill-${i}"></div></div>`;
    });

    const stats = calculateStats(
        localStorage.getItem('sw_tgl'), 
        localStorage.getItem('sw_nama'),
        localStorage.getItem('sw_kerja')
    );

    for (let i = 0; i < slideFiles.length; i++) {
        try {
            const response = await fetch(slideFiles[i]);
            let html = await response.text();
            for (const [key, value] of Object.entries(stats)) {
                html = html.replace(new RegExp(`\\\${${key}}`, 'g'), value);
            }
            container.innerHTML += html;
        } catch (err) {
            console.error("Gagal load slide", err);
        }
    }

    document.getElementById('input-screen').classList.remove('active');
    document.getElementById('wrapped-screen').classList.add('active');
    
    currentSlide = 0;
    showSlide(currentSlide);
}

function calculateStats(birthStr, name, job) {
    const birth = new Date(birthStr);
    const now = new Date();
    
    const diffDays = Math.floor((now - birth) / (1000 * 60 * 60 * 24));
    const hours = diffDays * 24;

    const month = birth.getMonth() + 1;
    const year = birth.getFullYear();

    return {
        nama: name.toUpperCase(),
        pekerjaan: job.toUpperCase(), 
        pekerjaanDeskripsi: getJobQuote(job), // Mengambil narasi sesuai pekerjaan
        tahunLahir: year,
        hari: diffDays.toLocaleString('id-ID'),
        jam: hours.toLocaleString('id-ID'),
        zodiac: getZodiac(birth.getDate(), month),
        shio: getShio(year),
        batu: getBirthstone(month),
        generasi: getGeneration(year)
    };
}

// LOGIKA NARASI BERDASARKAN PEKERJAAN
function getJobQuote(job) {
    const quotes = {
        "Pelajar": "Masa muda adalah kanvas kosong. Teruslah menyerap ilmu dan nikmati setiap proses panjang belajarmu.",
        "Mahasiswa": "Tugas, revisi, dan ambisi. Ini adalah fase transisi paling krusial untuk membangun fondasi mental dan masa depanmu.",
        "Ibu Rumah Tangga": "Pilar tak terlihat yang menjaga semuanya tetap berdiri. Sebuah dedikasi penuh waktu dan pekerjaan paling mulia tanpa hari libur.",
        "Software Engineer": "Menerjemahkan logika menjadi realita. Di balik barisan kode yang rumit, kamu sedang membangun masa depan digital.",
        "Desainer atau Seniman": "Melihat dunia dengan perspektif yang berbeda. Kamu memiliki kekuatan untuk menciptakan estetika dari kehampaan.",
        "Pegawai Negeri": "Roda penggerak sistem utama. Membutuhkan dedikasi stabil untuk melayani dan membangun struktur masyarakat.",
        "Karyawan Swasta": "Berpacu dengan target dan tenggat waktu. Kamu adalah mesin pendorong industri yang tak kenal lelah.",
        "Tenaga Medis": "Garis depan kehidupan. Dedikasi tertinggi di mana setiap detiknya sangat berarti bagi nyawa manusia lain.",
        "Guru atau Dosen": "Arsitek peradaban. Kamu terus menerus menanam benih pengetahuan yang kelak akan dipanen di masa depan.",
        "Wiraswasta": "Mengambil risiko di saat yang lain bermain aman. Kamu tidak menunggu jalan terbuka, tapi kamu yang membangunnya.",
        "Freelancer": "Kebebasan sejati yang datang dengan tanggung jawab besar. Kamu adalah arsitek dan bos untuk dirimu sendiri.",
        "Pencari Kerja": "Sebuah masa tunggu yang diam-diam membentuk mental baja. Kesempatan terbesarmu saat ini sedang dalam perjalanan."
    };
    
    return quotes[job] || "Teruslah melangkah dan memberikan versi terbaik dari dirimu di jalan yang telah kamu pilih.";
}

function getZodiac(day, month) {
    if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return "Aries";
    if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return "Taurus";
    if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return "Gemini";
    if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return "Cancer";
    if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return "Leo";
    if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return "Virgo";
    if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return "Libra";
    if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return "Scorpio";
    if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) return "Sagittarius";
    if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) return "Capricorn";
    if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return "Aquarius";
    return "Pisces";
}

function getShio(year) {
    const shios = ["Monyet", "Ayam", "Anjing", "Babi", "Tikus", "Kerbau", "Macan", "Kelinci", "Naga", "Ular", "Kuda", "Kambing"];
    return shios[year % 12];
}

function getBirthstone(month) {
    const stones = ["Garnet", "Amethyst", "Aquamarine", "Diamond", "Emerald", "Pearl", "Ruby", "Peridot", "Sapphire", "Opal", "Topaz", "Turquoise"];
    return stones[month - 1];
}

function getGeneration(year) {
    if (year >= 2013) return "Gen Alpha";
    if (year >= 1997 && year <= 2012) return "Gen Z";
    if (year >= 1981 && year <= 1996) return "Milenial";
    if (year >= 1965 && year <= 1980) return "Gen X";
    return "Baby Boomer";
}

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    if(slides.length === 0) return;

    slides.forEach((slide, idx) => {
        slide.classList.toggle('active', idx === index);
    });

    for(let i=0; i<slides.length; i++) {
        document.getElementById(`fill-${i}`).style.width = i < index ? "100%" : "0%";
    }

    clearInterval(slideInterval);
    clearInterval(progressInterval);
    
    // Total sekarang ada 8 warna transisi untuk 8 slide
    const root = document.documentElement;
    const colors = [
        ['#1DB954', '#ff4d4d', '#8a2be2'], // Intro
        ['#ffb703', '#121212', '#ff4d4d'], // Waktu
        ['#ff4d4d', '#1DB954', '#121212'], // Pekerjaan (Baru)
        ['#8a2be2', '#1DB954', '#121212'], // Zodiak
        ['#ff4d4d', '#ffb703', '#8a2be2'], // Shio
        ['#1DB954', '#121212', '#ffb703'], // Batu
        ['#121212', '#8a2be2', '#ff4d4d'], // Generasi
        ['#1DB954', '#ffb703', '#1DB954']  // Summary
    ];
    root.style.setProperty('--accent-1', colors[index % colors.length][0]);
    root.style.setProperty('--accent-2', colors[index % colors.length][1]);
    root.style.setProperty('--accent-3', colors[index % colors.length][2]);

    progressPercent = 0;
    progressInterval = setInterval(() => {
        progressPercent += 1.66;
        document.getElementById(`fill-${index}`).style.width = `${progressPercent}%`;
    }, 100);

    slideInterval = setTimeout(() => { nextSlide(); }, SLIDE_DURATION);
}

function nextSlide() {
    const slides = document.querySelectorAll('.slide');
    if(currentSlide < slides.length - 1) {
        currentSlide++;
        showSlide(currentSlide);
    }
}

function prevSlide() {
    if(currentSlide > 0) {
        currentSlide--;
        showSlide(currentSlide);
    }
}

function resetWrapped() {
    clearInterval(slideInterval);
    clearInterval(progressInterval);
    document.getElementById('wrapped-screen').classList.remove('active');
    document.getElementById('input-screen').classList.add('active');
}