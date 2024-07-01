import Song from '../models/song.model';
import Like from '../models/like.model';

interface LikeSong {
  status: number;
  message: string;
}

interface GetSongs {
  _id: string;
  title: string;
  artist: string;
  dateAdded: string;
  likesCount: number;
}

async function getSongs(year: string): Promise<GetSongs[]> {
  const topSongs = await Song.aggregate([
    {
      $match: {
        dateAdded: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $lookup: {
        from: 'likes',
        let: { songId: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$song', '$$songId'] },
                  { $eq: ['$entityType', 'song'] },
                ],
              },
            },
          },
        ],
        as: 'likes',
      },
    },
    {
      $addFields: {
        likesCount: { $size: '$likes' },
      },
    },
    {
      $sort: { likesCount: -1 },
    },
    {
      $limit: 10,
    },
    {
      $project: {
        _id: 1,
        title: 1,
        artist: 1,
        dateAdded: 1,
        likesCount: 1,
      },
    },
  ]);
  return topSongs;
}

async function likeSong(userId: string, songId: string): Promise<LikeSong> {
  const song = await Song.findById(songId);
  if (!song) {
    return {
      status: 404,
      message: 'Song Not Found.',
    };
  }

  // Check if the user has already liked the song
  const existingLike = await Like.findOne({
    userId,
    entityType: 'song',
    song: songId,
  });
  if (existingLike) {
    return {
      status: 400,
      message: 'You have already liked this song.',
    };
  }

  const like = new Like({ userId, entityType: 'song', song: songId });
  await like.save();

  return {
    status: 200,
    message: 'Song liked successfully.',
  };
  //res.status(201).send('Song liked.');
}

export { getSongs, likeSong };
