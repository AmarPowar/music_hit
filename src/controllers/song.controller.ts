import { getSongs, likeSong } from '../services/song.service';

import { Request, Response } from 'express';

const getTopSongsByYear = async (req: Request, res: Response) => {
  const { year } = req.params;

  try {
    const result = await getSongs(year);
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

const likeSongByUser = async (req: Request, res: Response) => {
  const userId  = req.headers.authorization?.split('=')[1]  as string;
  const { songId } = req.params;
  try {
    const result = await likeSong(userId, songId);
    res.status(result.status).send(result.message);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

export { getTopSongsByYear, likeSongByUser };
