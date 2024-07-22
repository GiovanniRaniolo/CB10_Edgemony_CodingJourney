// Simulated API call for fetching the list of tracks
export const getTrackList = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "1", // Unique ID of the track
          title: "Track One", // Title of the track
          artist: "Artist Name", // Artist of the track
          genre: "Electronic", // Genre of the track
          album: "Album Title", // Album to which the track belongs
          releaseDate: "2024-01-01", // Release date of the track
          url: "https://bandcamp.com/track-one", // URL for the track on Bandcamp
          duration: "3:45", // Duration of the track
        },
        {
          id: "2", // Unique ID of the track
          title: "Track Two", // Title of the track
          artist: "Another Artist", // Artist of the track
          genre: "Dance", // Genre of the track
          album: "Another Album", // Album to which the track belongs
          releaseDate: "2024-02-01", // Release date of the track
          url: "https://bandcamp.com/track-two", // URL for the track on Bandcamp
          duration: "4:15", // Duration of the track
        },
        {
          id: "3", // Unique ID of the track
          title: "Track Three", // Title of the track
          artist: "DJ Example", // Artist of the track
          genre: "House", // Genre of the track
          album: "Club Hits", // Album to which the track belongs
          releaseDate: "2024-03-01", // Release date of the track
          url: "https://bandcamp.com/track-three", // URL for the track on Bandcamp
          duration: "5:02", // Duration of the track
        },
        {
          id: "4", // Unique ID of the track
          title: "Track Four", // Title of the track
          artist: "Electronic Duo", // Artist of the track
          genre: "Techno", // Genre of the track
          album: "Techno Beats", // Album to which the track belongs
          releaseDate: "2024-04-01", // Release date of the track
          url: "https://bandcamp.com/track-four", // URL for the track on Bandcamp
          duration: "6:10", // Duration of the track
        },
        {
          id: "5", // Unique ID of the track
          title: "Track Five", // Title of the track
          artist: "Synth Masters", // Artist of the track
          genre: "Synthwave", // Genre of the track
          album: "Retro Vibes", // Album to which the track belongs
          releaseDate: "2024-05-01", // Release date of the track
          url: "https://bandcamp.com/track-five", // URL for the track on Bandcamp
          duration: "3:55", // Duration of the track
        },
      ]);
    }, 2000);
  });
};
