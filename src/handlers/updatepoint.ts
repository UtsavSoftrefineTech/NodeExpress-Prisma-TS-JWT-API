import prisma from "../db";

// Get one
export const getUpdatePoint = async (req, res) => {
  const updatePoint = await prisma.updatePoint.findUnique({
    where: {
      id: req.params.id,
    },
  });

  res.json({ data: updatePoint });
};

// Get all
export const getUpdatePoints = async (req, res) => {
  const updates = await prisma.update.findMany({
    where: {
      id: req.params.id,
    },
    include: {
      updatePoints: true,
    },
  });

  const updatePoints = updates.reduce((allUpdatePoints, update) => {
    return [...allUpdatePoints, ...update.updatePoints];
  }, []);

  res.json({ data: updatePoints });
};

// Create one
export const createUpdatePoint = async (req, res) => {
  const update = await prisma.update.findUnique({
    where: {
      id: req.body.updateId,
    },
  });

  if (!update) {
    // does not belong to user
    return res.json({ message: "nope" });
  }

  const updatePoint = await prisma.updatePoint.create({
    data: {
      name: req.body.name,
      description: req.body.description,
      update: { connect: { id: update.id } },
      updatedAt: new Date(), // Add the updatedAt property
    },
  });

  res.json({ data: updatePoint });
};

// Update one
export const updateUpdatePoint = async (req, res) => {
  const update = await prisma.update.findMany({
    where: {
      id: req.params.updatedId,
    },
    include: {
      updatePoints: true,
    },
  });

  const updatePoints = update.reduce((allUpdatePoints, update) => {
    return [...allUpdatePoints, ...update.updatePoints];
  }, []);

  const match = updatePoints.find(
    (updatePoint) => updatePoint.id === req.params.id
  );

  if (!match) {
    // does not belong to user
    return res.json({ message: "nope" });
  }

  const updateUpdatePoint = await prisma.updatePoint.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  });

  res.json({ data: updateUpdatePoint });
};

// Delete one
export const deleteUpdatePoint = async (req, res) => {
  const update = await prisma.update.findMany({
    where: {
      id: req.params.updatedId,
    },
    include: {
      updatePoints: true,
    },
  });

  const updatePoints = update.reduce((allUpdatePoints, update) => {
    return [...allUpdatePoints, ...update.updatePoints];
  }, []);

  const match = updatePoints.find(
    (updatePoint) => updatePoint.id === req.params.id
  );

  if (!match) {
    // does not belong to user
    return res.json({ message: "nope" });
  }

  const deleteUpdatePoint = await prisma.updatePoint.delete({
    where: {
      id: req.params.id,
    },
  });

  res.json({ data: deleteUpdatePoint });
};
