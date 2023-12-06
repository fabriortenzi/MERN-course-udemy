import { PostModel } from '../models/post.js';
import { getImagePath } from '../utils/image.js';

export async function getPost(req, res) {
  try {
    const { path } = req.params;

    await PostModel.findOne({ path }).then((post) => {
      if (post) {
        return res.status(200).send({ msg: 'Post found', body: post });
      } else {
        return res
          .status(400)
          .send({ msg: 'The path does not correspond to any Post' });
      }
    });
  } catch {
    return res.status(500).send({ msg: 'Internal Server Error' });
  }
}

export async function getPosts(req, res) {
  try {
    const { page = 1, limit = 10 } = req.query;
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: 'desc' },
    };
    PostModel.paginate({}, options, function (err, result) {
      if (err) {
        return res.status(400).send({ msg: 'Error when retrieving posts' });
      } else {
        return res
          .status(200)
          .send({ msg: 'Posts retrieved succesfully', body: result });
      }
    });
  } catch {
    return res.status(500).send({ msg: 'Server error' });
  }
}

export async function createPost(req, res) {
  try {
    const imagePath = getImagePath(req.files.miniature);

    await PostModel.create({
      ...req.body,
      miniature: imagePath,
      createdAt: new Date(),
    }).then((post) => {
      return res
        .status(200)
        .send({ msg: 'Post created successfully', body: post });
    });
  } catch {
    return res.status(500).send({ msg: 'Error when creating Post' });
  }
}

export async function updatePost(req, res) {
  try {
    const { id } = req.params;
    const postData = req.body;

    if (req.files.miniature) {
      const imagePath = getImagePath(req.files.miniature);
      postData.miniature = imagePath;
    }

    await PostModel.findByIdAndUpdate({ _id: id }, postData);

    return res.status(200).send({ msg: 'Post updated successfully' });
  } catch {
    return res.status(500).send({ msg: 'Internal Server Error' });
  }
}

export async function deletePost(req, res) {
  try {
    const { id } = req.params;

    await PostModel.findByIdAndDelete(id);

    return res.status(200).send({ msg: 'Post deleted' });
  } catch {
    return res.status(500).send({ msg: 'Error when deleting Post' });
  }
}
