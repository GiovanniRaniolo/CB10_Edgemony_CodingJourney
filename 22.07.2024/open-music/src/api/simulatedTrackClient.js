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
    title: "London",
    artist: "Jitzu",
    genre: "Ambient",
    album: "Floods Collection",
    releaseDate: "2024-03-01",
    url: "https://jitzu.bandcamp.com/album/floods-collection",
    duration: "4:46",
    cover: "https://f4.bcbits.com/img/a0163174785_10.jpg",
    bandcampTrackId: "2112921071",
  },
  {
    id: "4",
    title: "Stars Echoes",
    artist: "Jitzu",
    genre: "Ambient",
    album: "Stars Echoes",
    releaseDate: "2024-04-01",
    url: "https://jitzu.bandcamp.com/track/stars-echoes",
    duration: "5:11",
    cover: "https://f4.bcbits.com/img/a2707221828_10.jpg",
    bandcampTrackId: "3331164667",
  },
  {
    id: "5",
    title: "Multiple Rebirths",
    artist: "Jitzu",
    genre: "Electronic",
    album: "Multiple Rebirths",
    releaseDate: "2024-05-01",
    url: "https://jitzu.bandcamp.com/track/multiple-rebirths",
    duration: "5:17",
    cover: "https://f4.bcbits.com/img/a0547889985_10.jpg",
    bandcampTrackId: "3445763432",
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
