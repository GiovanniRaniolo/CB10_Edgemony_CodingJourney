// Simulated API call for fetching track details
const simulatedTrackDetails = [
  {
    id: "1",
    title: "Geomancy",
    artist: "Jitzu feat. Sonte",
    genre: "Electronic",
    album: "Single",
    releaseDate: "2024-01-01",
    url: "https://jitzu.bandcamp.com/track/geomancy",
    duration: "3:01",
    cover: "https://f4.bcbits.com/img/a1816632902_10.jpg",
    bandcampTrackId: "2495568661",
  },
  {
    id: "2",
    title: "Hydromancy",
    artist: "Jitzu feat. Sonte",
    album: "Album Name",
    genre: "Genre",
    releaseDate: "Release Date",
    cover: "https://f4.bcbits.com/img/a3269282887_10.jpg",
    url: "https://jitzu.bandcamp.com/track/hydromancy",
    duration: "03:12",
    bandcampTrackId: "1713532626",
  },
  {
    id: "3",
    title: "Track Three",
    artist: "DJ Example",
    genre: "House",
    album: "Club Hits",
    releaseDate: "2024-03-01",
    url: "https://bandcamp.com/track-three",
    duration: "5:02",
    cover: "https://f4.bcbits.com/img/a3573301269_10.jpg",
  },
  {
    id: "4",
    title: "Track Four",
    artist: "Electronic Duo",
    genre: "Techno",
    album: "Techno Beats",
    releaseDate: "2024-04-01",
    url: "https://bandcamp.com/track-four",
    duration: "6:10",
    cover: "https://f4.bcbits.com/img/a2707221828_10.jpg",
  },
  {
    id: "5",
    title: "Track Five",
    artist: "Synth Masters",
    genre: "Synthwave",
    album: "Retro Vibes",
    releaseDate: "2024-05-01",
    url: "https://bandcamp.com/track-five",
    duration: "3:55",
    cover: "https://f4.bcbits.com/img/a0547889985_10.jpg",
  },
];

export const getTrackById = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const track = simulatedTrackDetails.find((track) => track.id === id);
      resolve(track);
    }, 2000);
  });
};
