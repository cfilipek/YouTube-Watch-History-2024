// Fetch the JSON data
fetch('./search-history.json')
  .then(response => response.json())
  .then(jsonData => {
    // Filter, sort, and extract titles
    const filteredEntries = jsonData.filter(entry => {
      const year = new Date(entry.time).getFullYear();
      return year === 2024;
    });

    const sortedEntries = filteredEntries.sort((a, b) => new Date(b.time) - new Date(a.time));

    const titles = sortedEntries.map(entry => 
      entry.title.replace("Searched for ", "")
    );

    // Create a reference to the unordered list
    const ul = document.getElementById('search-list');

    // Add the titles as list items to the unordered list
    titles.forEach(title => {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-start';
      li.innerHTML = `
        <div>
            <strong>${title}</strong>
        </div>
      `;
      ul.appendChild(li);
    });
  })
  .catch(error => console.error('Error fetching JSON:', error));

// Fetch the watch history JSON file
fetch('./watch-history.json')
  .then(response => response.json())
  .then(jsonData => {
    // Filter entries from 2024
    const filteredEntries = jsonData.filter(entry => {
      const year = new Date(entry.time).getFullYear();
      return year === 2024;
    });

    // Extract titles and YouTubers
    const processedEntries = filteredEntries.map(entry => {
      const title = entry.title.replace("Watched ", ""); // Remove "Watched"
      const youtuber = (entry.subtitles && entry.subtitles.length > 0)
        ? entry.subtitles[0].name // Get YouTuber's name
        : "Unknown"; // Default if no subtitle
      return { title, youtuber, titleUrl: entry.titleUrl };
    });

    // Get the UL element in the DOM
    const ul = document.getElementById('watch-list');

    // Add the titles and YouTubers as list items
    processedEntries.forEach(entry => {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-start';
      li.innerHTML = `
        <div>
          <i class="fab fa-youtube youtube-icon"></i>
          <a href="${entry.titleUrl}" target="_blank" class="text-decoration-none">
            <strong>${entry.title}</strong>
          </a>
          <br>
          <small class="text-muted">by ${entry.youtuber}</small>
        </div>
      `;
      ul.appendChild(li);
    });
  })
  .catch(error => console.error('Error fetching watch-history.json:', error));

// Add light/dark mode toggle
const toggleButton = document.getElementById('toggle-mode');
toggleButton.addEventListener('click', () => {
  const body = document.body;
  body.classList.toggle('light-mode');
  body.classList.toggle('dark-mode');
});
