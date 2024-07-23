function BandcampWidget({ trackId, className }) {
  const embedUrl = `https://bandcamp.com/EmbeddedPlayer/track=${trackId}/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/`;

  return (
    <iframe
      className={className}
      style={{ border: 0, width: "90%", height: "120px" }}
      src={embedUrl}
      seamless
      title="Bandcamp Player"
    >
      <a href={`https://bandcamp.com/track/${trackId}`}></a>
    </iframe>
  );
}

export default BandcampWidget;
