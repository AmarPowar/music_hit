import express from 'express';

import { getTopSongsByYear ,likeSongByUser } from '../controllers/song.controller';

const router = express.Router();
// Routes
router.get('/top-songs/:year', getTopSongsByYear);
router.post('/:songId/like', likeSongByUser);

export default router;
