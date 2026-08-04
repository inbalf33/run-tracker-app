const Run = require("../models/Run");

// Creat new run
const createRun = async (runData) => {
  try {
    const newRun = new Run(runData);
    const savedRun = await newRun.save();
    return savedRun;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get all runs for a specific user
const getRunsByUserId = async (userId) => {
  try {
    const userRuns = await Run.find({ user_id: userId }).sort({ date: -1 });
    return userRuns;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get a single run by ID
const getRunById = async (runId) => {
  try {
    const run = await Run.findById(runId);
    return run;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Update run
const updateRun = async (runId, updateData) => {
  try {
    const updatedRun = await Run.findByIdAndUpdate(runId, updateData, {
      new: true,
      runValidators: true,
    });
    return updatedRun;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Delete run
const deleteRun = async (runId) => {
  try {
    const deletedRun = await Run.findByIdAndDelete(runId);
    return deletedRun;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { createRun, getRunsByUserId, getRunById, updateRun, deleteRun };