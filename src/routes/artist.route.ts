import express from 'express';

import {
  getTopArtistList,
  likesArtistByUser,
} from '../controllers/artist.controller';

const router = express.Router();
// Routes
router.get('/top/:year', getTopArtistList);
router.post('/:artistId/like', likesArtistByUser);

export default router;
