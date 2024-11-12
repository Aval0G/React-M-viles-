import { ArtistResource } from "@/types/artist";

const API_KEY = "f3c9d7ad73bb6c3e26173ce27b328c3e";
const URL = `http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=spain&api_key=${API_KEY}&format=json`;

function getMusicData() {
    return fetch(URL, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => data.topartists.artist)
    .then(artists => artists.map((artist: ArtistResource) => ({
        id: artist.mbid,
        name: artist.name,
        image: artist.image[0]['#text']
    })))
    .catch(error => {
        console.error("An error occurred while fetching music data:", error);
        return [];
    });
}

export { getMusicData };
