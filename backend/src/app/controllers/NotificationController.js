import Notification from '../schemas/Notification';

import User from '../models/User';

export default {
  async index(req, res) {
    const checkIsProvider = await User.findOne({
      where: {
        id: req.user_id,
        provider: true,
      },
    });

    if (!checkIsProvider) {
      return res
        .status(401)
        .json({ error: 'Only provider can load notification' });
    }

    const notification = await Notification.find({
      user: req.user_id,
    })
      .sort({ createdAT: 'desc' })
      .limit(20);

    return res.json(notification);
  },
  async update(req, res) {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      {
        read: true,
      },
      {
        new: true,
      }
    );

    return res.json(notification);
  },
};
