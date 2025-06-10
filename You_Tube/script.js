const API_KEY = 'AIzaSyCZjCr0L139y_XxtRZZLcAXdY2Dn6H5R5U';

async function fetchVideos() {
    const query = document.getElementById('searchQuery').value;
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${API_KEY}&maxResults=200`);
    const data = await response.json();
    displayResults(data.items);
}

async function fetchSuggestions() {
    const query = document.getElementById('searchQuery').value;
    if (query.length < 1) {
        document.getElementById('suggestions').style.display = 'none';
        return;
    }
    const response = await fetch(`https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${query}`);
    const data = await response.json();
    displaySuggestions(data[1]);
}

function displaySuggestions(suggestions) {
    const suggestionsDiv = document.getElementById('suggestions');
    suggestionsDiv.innerHTML = '';
    suggestions.forEach(suggestion => {
        const div = document.createElement('div');
        div.innerText = suggestion;
        div.onclick = function () {
            document.getElementById('searchQuery').value = suggestion;
            fetchVideos();
            suggestionsDiv.style.display = 'none';
        };
        suggestionsDiv.appendChild(div);
    });
    suggestionsDiv.style.display = 'block';
}

function displayResults(videos) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    videos.forEach(video => {
        const videoElement = document.createElement('div');
        videoElement.classList.add('video');
        videoElement.innerHTML = `
            <h3>${video.snippet.title}</h3>
            <img src="${video.snippet.thumbnails.medium.url}" alt="Thumbnail">
        `;
        videoElement.addEventListener('click', () => playVideo(video.id.videoId));
        resultsDiv.appendChild(videoElement);
    });
}

function playVideo(videoId) {
    const videoPlayer = document.getElementById('videoPlayer');
    videoPlayer.innerHTML = `
        <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1" frameborder="0" allowfullscreen></iframe>
    `;
    document.getElementById('results').style.marginTop = '20px';
}

// Open the draggable modal
// Open the draggable modal
function openPage() {
    let modal = document.getElementById('draggableModal');
    modal.style.display = 'block';

    // Load saved data from localStorage
    let savedData = localStorage.getItem('modalData');
    if (savedData) {
        document.getElementById('modalContent').value = savedData;
    }
}

// Close modal on clicking 'X'
document.getElementById('closeModal').addEventListener('click', function () {
    document.getElementById('draggableModal').style.display = 'none';
});

// Save Data Automatically
document.getElementById('modalContent').addEventListener('input', function () {
    localStorage.setItem('modalData', this.value);
});

// Download Data as .txt File
function downloadData() {
    let content = document.getElementById('modalContent').value;
    let blob = new Blob([content], { type: 'text/plain' });
    let link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'saved_data.txt';
    link.click();
}

// Clear Data
function clearData() {
    document.getElementById('modalContent').value = '';
    localStorage.removeItem('modalData');
}

// Dragging functionality (Only Header is Draggable)
let modal = document.getElementById('draggableModal');
let header = document.querySelector('.modal-header');

header.addEventListener('mousedown', function (e) {
    let shiftX = e.clientX - modal.getBoundingClientRect().left;
    let shiftY = e.clientY - modal.getBoundingClientRect().top;

    function moveAt(x, y) {
        modal.style.left = x - shiftX + 'px';
        modal.style.top = y - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.clientX, event.clientY);
    }

    document.addEventListener('mousemove', onMouseMove);

    header.addEventListener('mouseup', function () {
        document.removeEventListener('mousemove', onMouseMove);
    });
});

header.addEventListener('dragstart', function () {
    return false;
});


header.addEventListener('dragstart', function () {
    return false;
});




