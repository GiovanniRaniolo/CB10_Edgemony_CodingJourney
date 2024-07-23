// Simulated API call for fetching the list of tracks
export const getTrackList = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "1", // Unique ID of the track
          title: "Geomancy", // Title of the track
          artist: "Jitzu feat. Sonte", // Artist of the track
          genre: "Hip Hop", // Genre of the track
          album: "Geomancy", // Album to which the track belongs
          releaseDate: "2024-01-01", // Release date of the track
          url: "https://jitzu.bandcamp.com/track/geomancy", // URL for the track on Bandcamp
          duration: "3:01", // Duration of the track
          cover: "https://f4.bcbits.com/img/a1816632902_10.jpg", // Cover image URL
        },
        {
          id: "2", // Unique ID of the track
          title: "Hydromancy", // Title of the track
          artist: "Jitzu feat. Sonte", // Artist of the track
          genre: "Trap", // Genre of the track
          album: "Hydromancy", // Album to which the track belongs
          releaseDate: "2024-02-01", // Release date of the track
          url: "https://jitzu.bandcamp.com/track/hydromancy", // URL for the track on Bandcamp
          duration: "3:12", // Duration of the track
          cover: "https://f4.bcbits.com/img/a3269282887_10.jpg", // Cover image URL
        },
        {
          id: "3", // Unique ID of the track
          title: "London", // Title of the track
          artist: "Jitzu", // Artist of the track
          genre: "Drum 'n' Bass", // Genre of the track
          album: "Floods Collection", // Album to which the track belongs
          releaseDate: "2024-03-01", // Release date of the track
          url: "https://jitzu.bandcamp.com/album/floods-collection", // URL for the track on Bandcamp
          duration: "4:46", // Duration of the track
          cover: "https://f4.bcbits.com/img/a0163174785_10.jpg", // Cover image URL
        },
        {
          id: "4", // Unique ID of the track
          title: "Stars Echoes", // Title of the track
          artist: "Jitzu", // Artist of the track
          genre: "Electro Pop", // Genre of the track
          album: "Stars Echoes", // Album to which the track belongs
          releaseDate: "2024-04-01", // Release date of the track
          url: "https://jitzu.bandcamp.com/track/stars-echoes", // URL for the track on Bandcamp
          duration: "5:11", // Duration of the track
          cover: "https://f4.bcbits.com/img/a2707221828_10.jpg", // Cover image URL
        },
        {
          id: "5", // Unique ID of the track
          title: "Multiple Rebirths", // Title of the track
          artist: "Jitzu", // Artist of the track
          genre: "Dance", // Genre of the track
          album: "Multiple Rebirths", // Album to which the track belongs
          releaseDate: "2024-05-01", // Release date of the track
          url: "https://jitzu.bandcamp.com/track/multiple-rebirths", // URL for the track on Bandcamp
          duration: "5:17", // Duration of the track
          cover: "https://f4.bcbits.com/img/a0547889985_10.jpg", // Cover image URL
        },
      ]);
    }, 2000);
  });
};
