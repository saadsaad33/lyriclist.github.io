document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    const artistNameElement = document.getElementById('artist-name');
    const artistBioElement = document.getElementById('artist-bio');

    searchButton.addEventListener('click', async () => {
        const searchTerm = searchInput.value.trim();

        if (!searchTerm) {
            alert('Please enter an artist name');
            return;
        }

        try {
            const response = await fetch(`/api/artist/${encodeURIComponent(searchTerm)}`);
            const data = await response.json();

            if (response.ok) {
                artistNameElement.textContent = data.artistInfo.name;
                artistBioElement.innerHTML = data.artistInfo.bio || 'No biography available.';
            } else {
                artistNameElement.textContent = 'Artist not found';
                artistBioElement.textContent = 'No artist information available.';
            }
        } catch (error) {
            console.error('Error fetching artist information:', error);
            artistNameElement.textContent = 'Error fetching artist information';
            artistBioElement.textContent = 'Please try again later.';
        }
    });
});
