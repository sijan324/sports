import prisma from "../config/db.js";

export const addSport = async (req, res) => {
  try {
    const { name } = req.body;
    const sport = await prisma.sport.create({ data: { name } });
    res.status(201).json(sport);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSports = async (req, res) => {
  try {
    const sports = await prisma.sport.findMany();
    res.status(200).json(sports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
