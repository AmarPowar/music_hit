# Music Hits Management REST API

This project provides a REST API to manage music hits. Users can view the top songs and artists by year, and like or unlike their favorite songs and artists.

## Features

- Display the top 10 most played songs for a given year
- Display the top 10 most popular artists for a given year
- Allow a user to like and unlike a hit or an artist

## Prerequisites

- Node.js (v14.x or later)
- npm (v6.x or later)
- MongoDB (v4.x or later)

## Installation

1. Clone the repository:

   ```sh
   git clone <repository_url>
   cd <repository_directory>
   ```

2. Install the dependencies:

   ```sh
   npm install --legacy-peer-deps
   ```

3. Ensure MongoDB is running on your local machine or update the connection string in the code to point to your MongoDB instance.

4. Run MongoDB On Docker:

   ```sh
   npm run docker-build
   ```

5. Run Application :

   ```sh
   npm run dev
   ```

6. Rest API Calls :

   ```sh
   Get  : http://localhost:3000/api/importCsv

   Get  : http://localhost:3000/api/song/top-songs/:year

   Post : http://localhost:3000/api/song/:songId/like

   Get  : http://localhost:3000/api/artist/top/:year

   Post : http://localhost:3000/api/artist/:artistId/like
   
   ```

### Sample CSV File

The CSV file should have the following format:

```csv
id,artist,title,date_added
433,Bajaga,Vidi Šta Su Mi Uradili Od Pesme Mama,2018-11-23 07:20:40.316538
434,Desireless,Voyage Voyage,2018-11-23 07:17:39.848843
```
