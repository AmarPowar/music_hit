import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import Artist from '../models/artist.model';
import Song from '../models/song.model';
import moment from 'moment';

const loadCSVData = async (filePath: string) => {
  const results: any[] = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      // Convert the data to the desired format
      const formattedResults = results.map((row) => {

        const parsedDate = moment(row.date_added, 'YYYY-MM-DD HH:mm:ss.SSSSSS', true);

        if (!parsedDate.isValid()) {
          console.error(`Invalid date format for song: ${row.date_added})`);
          return; // Skip this row
        }
       return  {
        id: row.id,
        artist: row.artist,
        title: row.title,
        date_added: parsedDate.toDate(),
        }
      });

      console.log(formattedResults);
      for (const record of results) {
        let artist = await Artist.findOne({ name: record.artist });
        if (!artist) {
          artist = new Artist({
            name: record.artist || "No artist",
            dateAdded: new Date(record.date_added),
          });
          await artist.save();
        }
        const song = new Song({
          title: record.title,
          artist: artist._id,
          dateAdded: new Date(record.date_added),
        });
        await song.save();
      }
    });
};

export default loadCSVData;
