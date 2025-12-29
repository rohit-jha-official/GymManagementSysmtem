import Member from "../models/member.js";

export const addMember = async (req, res) => {
  const member = await Member.create(req.body);
  res.status(201).json(member);
};

export const getMembers = async (req, res) => {
  const members = await Member.find();
  res.json(members);
};
