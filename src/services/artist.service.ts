import Artist from '../models/artist.model';
import Like from '../models/like.model';

interface LikeArtist {
  status: number;
  message: string;
}

interface GetTopArtists {
  _id: string;
  name: string;
  totalLikes: string;
}

const getTopArtists = async (year: string): Promise<GetTopArtists[]> => {
  const topArtists: GetTopArtists[] = await Artist.aggregate([
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
        let: { artistId: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$artist', '$$artistId'] },
                  { $eq: ['$entityType', 'artist'] },
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
        name: 1,
        likesCount: 1,
      },
    },
  ]);

  return topArtists;
};

const likeArtist = async (
  userId: string,
  artistId: string,
): Promise<LikeArtist> => {
  const artist = await Artist.findById(artistId);
  if (!artist) {
    return {
      status: 404,
      message: 'Artist not found',
    };
  }

  // Check if the user has already liked the artist
  const existingLike = await Like.findOne({
    userId,
    entityType: 'artist',
    artist: artistId,
  });
  if (existingLike) {
    return {
      status: 400,
      message: 'You have already liked this artist.',
    };
  }

  const like = new Like({ userId, entityType: 'artist', artist: artistId });
  await like.save();

  // Increment the likes count for the artist
  // artist.likes += 1;
  // await artist.save();

  return { status: 200, message: 'Artist liked sucessfully.' };
};

export { getTopArtists, likeArtist };
