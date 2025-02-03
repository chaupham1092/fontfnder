const apiKey = 'AIzaSyArV-WMY4eh3F0bm1i_vPh-0QXPej2j4Ms'; // Replace with your actual API key
const apiUrl = `https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}`;

let fonts = [];

// Fetch fonts from Google Fonts API
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        fonts = data.items;
        displayFonts(fonts);
    })
    .catch(error => console.error('Error fetching fonts:', error));

// Display font list
function displayFonts(fontList) {
    const fontListContainer = document.getElementById('fontList');
    fontListContainer.innerHTML = '';
    fontList.forEach(font => {
        const fontItem = document.createElement('div');
        fontItem.classList.add('font-item');
        fontItem.style.fontFamily = font.family;
        fontItem.innerHTML = `<div style="font-family: ${font.family};">${font.family}</div><span>Click to preview</span>`;
        fontItem.onclick = () => setPreviewFont(font.family);
        fontListContainer.appendChild(fontItem);
    });
}

// Set font for preview
function setPreviewFont(fontFamily) {
    const previewText = document.getElementById('customText').value || 'Preview Text';
    const previewElement = document.getElementById('fontPreview');
    previewElement.style.fontFamily = fontFamily;
    previewElement.innerHTML = `<input type="text" id="customText" placeholder="Enter custom text" value="${previewText}" oninput="updatePreview()">`;
}

// Update the preview text as the user types
function updatePreview() {
    const previewText = document.getElementById('customText').value;
    const previewElement = document.getElementById('fontPreview');
    previewElement.style.fontFamily = previewElement.style.fontFamily || 'Arial, sans-serif';
    previewElement.innerHTML = `<input type="text" id="customText" placeholder="Enter custom text" value="${previewText}" oninput="updatePreview()">`;
}

// Search function to filter fonts by name
function searchFonts() {
    const query = document.getElementById('searchBox').value.toLowerCase();
    const filteredFonts = fonts.filter(font => font.family.toLowerCase().includes(query));
    displayFonts(filteredFonts);
}
