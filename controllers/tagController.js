import Tag from "../models/tag.js";

class tagController {
  async getAllTags(req, res) {
    const records = await Tag.find();
    try {
      if (!records || records.length == 0) {
        return res.status(404).send({ error: "No results found" });
      }
      return res.status(200).json(records);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error" });
    }
  }

  async createTag(req, res) {
    const { value } = req.body;
    if (!value) {
      return res.status(403).send({ error: "You need to send value" });
    }
    try {
      const record = new Tag({ value });
      await record.save();
      return res.status(200).json(record);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error" });
    }
  }
}

export default new tagController();
