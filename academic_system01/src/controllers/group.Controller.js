import Group from '../models/group.js';

export const getGroups = async (req, res) => {
  try {
    const groups = await Group.find();
    res.json(groups);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createGroup = async (req, res) => {
  try {
    const newGroup = new Group(req.body);
    await newGroup.save();
    res.status(201).json(newGroup);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getGroupById = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) return res.status(404).json({ message: 'Group not found' });
    res.json(group);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateGroup = async (req, res) => {
  try {
    const updatedGroup = await Group.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedGroup);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteGroup = async (req, res) => {
  try {
    await Group.findByIdAndDelete(req.params.id);
    res.json({ message: 'Group deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
