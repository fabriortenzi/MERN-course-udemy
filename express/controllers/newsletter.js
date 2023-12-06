import { NewsletterModel } from '../models/newsletter.js';

export async function getEmails(req, res) {
  try {
    const { page = 1, limit = 10 } = req.query;
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
    };
    NewsletterModel.paginate({}, options, function (err, result) {
      if (err) {
        return res
          .status(400)
          .send({ msg: 'Error when retrieving newsletters' });
      } else {
        return res
          .status(200)
          .send({ msg: 'Newsletter retrieved succesfully', body: result });
      }
    });
  } catch {
    return res.status(500).send({ msg: 'Internal Server error' });
  }
}

export async function suscribeEmail(req, res) {
  try {
    const { email } = req.body;

    await NewsletterModel.create({
      email: email.toLowerCase(),
    })
      .then(() => {
        return res.status(200).send({ msg: 'Email registered' });
      })
      .catch(() => {
        return res.status(400).send({ msg: 'Email already registered' });
      });
  } catch {
    return res.status(500).send({ msg: 'Internal Server Error' });
  }
}

export async function deleteEmail(req, res) {
  try {
    const { id } = req.params;

    await NewsletterModel.findByIdAndDelete(id);

    return res.status(200).send({ msg: 'Email deleted' });
  } catch {
    return res.status(500).send({ msg: 'Error when deleting Email' });
  }
}
