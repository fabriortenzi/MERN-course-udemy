import { MenuModel } from '../models/menu.js';

export async function getMenus(req, res) {
  try {
    const { active } = req.query;
    let response;

    if (active === undefined) {
      response = await MenuModel.find().sort({ order: 'asc' });
    } else {
      const query = MenuModel.where({ active: active });
      response = await query.find().sort({ order: 'asc' });
    }

    if (!response) {
      return res.status(400).send({ msg: 'Menus not found' });
    }

    return res.status(200).send({ response });
  } catch {
    return res.status(500).send({ msg: 'Server error' });
  }
}

export async function createMenu(req, res) {
  try {
    await MenuModel.create(req.body).then((menu) => {
      return res.status(200).send({ msg: 'Menu created', body: menu });
    });
  } catch {
    return res.status(500).send({ msg: 'Error when creating Menu' });
  }
}

export async function updateMenu(req, res) {
  try {
    const { id } = req.params;
    const menuData = req.body;

    await MenuModel.findByIdAndUpdate({ _id: id }, menuData);

    return res.status(200).send({ msg: 'Menu updated succesfully' });
  } catch {
    return res.status(500).send({ msg: 'Error when updating Menu' });
  }
}

export async function deleteMenu(req, res) {
  try {
    const { id } = req.params;

    await MenuModel.findByIdAndDelete(id);

    return res.status(200).send({ msg: 'Menu deleted' });
  } catch {
    return res.status(500).send({ msg: 'Error when deleting Menu' });
  }
}
