import { CourseModel } from '../models/course.js';
import { getImagePath } from '../utils/image.js';

export async function getCourses(req, res) {
  try {
    const { page = 1, limit = 10 } = req.query;
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
    };
    CourseModel.paginate({}, options, function (err, result) {
      if (err) {
        return res.status(400).send({ msg: 'Error when retrieving courses' });
      } else {
        return res
          .status(200)
          .send({ msg: 'Courses retrieved succesfully', body: result });
      }
    });
  } catch {
    return res.status(500).send({ msg: 'Server error' });
  }
}

export async function createCourse(req, res) {
  try {
    let imagePath;

    if (req.files.miniature) {
      imagePath = getImagePath(req.files.miniature);
    }

    await CourseModel.create({ ...req.body, miniature: imagePath }).then(
      (user) => {
        return res.status(200).send({ msg: 'Course created', body: user });
      }
    );
  } catch {
    return res.status(500).send({ msg: 'Error when creating course' });
  }
}

export async function updateCourse(req, res) {
  try {
    const { id } = req.params;
    const courseData = req.body;

    if (req.files.miniature) {
      const imagePath = getImagePath(req.files.miniature);
      courseData.miniature = imagePath;
    }

    await CourseModel.findByIdAndUpdate({ _id: id }, courseData);

    return res.status(200).send({ msg: 'Course updated successfully' });
  } catch {
    return res.status(400).send({ msg: 'Error when updating Course' });
  }
}

export async function deleteCourse(req, res) {
  try {
    const { id } = req.params;

    await CourseModel.findByIdAndDelete(id);

    return res.status(200).send({ msg: 'Course deleted successfully' });
  } catch {
    return res.status(400).send({ msg: 'Error when deleting course' });
  }
}
