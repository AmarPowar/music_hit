import { getTopArtists, likeArtist } from '../services/artist.service';

import { Request, Response } from 'express';

const getTopArtistList = async (req: Request, res: Response) => {
  const { year } = req.params;

  try {
    const result = await getTopArtists(year);
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

const likesArtistByUser = async (req: Request, res: Response) => {
  const userId = req.headers.authorization?.split('=')[1] as string;
  const { artistId } = req.params;
  try {
    const result = await likeArtist(userId, artistId);
    res.status(result.status).send(result.message);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

export { getTopArtistList, likesArtistByUser };
