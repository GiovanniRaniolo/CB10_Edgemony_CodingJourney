## Open Sound - PRD (Project Requirements Document)

### **Project Overview**

**Open Music** is a web application for managing and discovering indipendent music tracks. The application allows users to search, view, and manage music tracks, create playlists and charts, and manage their favorite tracks. Bandcamp will be used to fetch the track data.

### **Purpose and Scope**

- **Purpose**: Create an application that allows users to manage and discover indipendent and DJ music, with features for managing tracks, playlists, and charts.
- **Scope**: The application will focus on viewing and managing music tracks, with the ability to create playlists and charts.

### **Product Overview and Use Cases**

#### **Features**

1.  **Track Management**:

    - **Search**: Users can search for tracks by title, artist, genre, album, and release date.
    - **View Details**: Users can view details of a track, including title, artist, album, genre, release date, ID, and URL.

2.  **Chart Management**:

    - **Create Chart**: Users can create charts based on tracks.
    - **Add Tracks**: Users can add tracks to charts.
    - **Manage Chart**: Users can view and edit existing charts.

3.  **Favorites**:

    - **Favorite Tracks**: Users can add and view favorite tracks.

### **Requirements**

#### **First Release**

- **Track Management**:

  - As a user, I want to search for tracks by title, artist, genre, album, and release date.
  - As a user, I want to view details of a track, including title, artist, album, genre, release date, ID, and URL.

#### **Second Release: Update / Edit / Delete**

- **Chart Management**:
  - As a user, I want to create charts and add tracks to them.
  - As a user, I want to view and edit existing charts.

#### **Third Release**

- **Favorites**:
  - As a user, I want to add tracks to my favorites list.

### **Technical Requirements**

- **Frontend**: React.js
- **Backend**: Firebase or MongoDB
- **Deployment**: Vercel
- **API**: Bandcamp API (for fetching music data)

### **Kanban Board**

See roadmap and working table on notion:

[Open Music Kanban](https://thunder-magazine-74e.notion.site/6d713f23a9674c6b9665a7a2951bf4f2?v=e7872b15eeec487abe8599383cff2f91)

### **Future Improvements**

- Integrate user authentication for a personalized experience
- Add more advanced search and filter options
- Enhance UI/UX based on user feedback
