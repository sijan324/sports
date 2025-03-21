import prisma from "../config/db.js";

export const addStudent = async (req, res) => {
  try {
    const { name, faculty, sports } = req.body;

    // Ensure selected sports exist
    const selectedSports = await prisma.sport.findMany({
      where: { name: { in: sports } },
    });

    if (selectedSports.length !== sports.length) {
      return res.status(400).json({ error: "Some sports are invalid." });
    }

    const student = await prisma.student.create({
      data: {
        name,
        faculty,
        sports: { connect: selectedSports.map((sport) => ({ id: sport.id })) },
      },
    });

    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getStudents = async (req, res) => {
  try {
    const students = await prisma.student.findMany({
      include: { sports: true },
    });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
