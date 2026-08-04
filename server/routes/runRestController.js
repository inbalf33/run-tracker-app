const express = require("express");
const auth = require("../auth/authService");
const { createRun, getRunsByUserId, getRunById, updateRun, deleteRun } = require("../services/runAccessDataService");
const router = express.Router();

// Create a new run
router.post("/", auth, async (req, res) => {
  try {
    const userId = req.user._id || req.user.id || req.user;    
    const runData = { 
      ...req.body, 
      user_id: userId 
    };
    const newRun = await createRun(runData);
    res.status(201).json(newRun);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all runs for logged-in user
router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user._id || req.user.id || req.user;
    const runs = await getRunsByUserId(userId);
    res.status(200).json(runs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single run by ID
router.get("/:id", auth, async (req, res) => {
  try {
    const run = await getRunById(req.params.id);
    if (!run) {
      return res.status(404).json({ error: "Run not found" });
    }
    const userId = req.user._id || req.user.id || req.user;
    if (run.user_id.toString() !== userId.toString()) {
      return res.status(403).json({ error: "Unauthorized access" });
    }
    res.status(200).json(run);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a run by ID
router.put("/:id", auth, async (req, res) => {
  try {
    const run = await getRunById(req.params.id);
    if (!run) {
      return res.status(404).json({ error: "Run not found" });
    }
    const userId = req.user._id || req.user.id || req.user;
    if (run.user_id.toString() !== userId.toString()) {
      return res.status(403).json({ error: "Unauthorized access" });
    }
    const updatedRun = await updateRun(req.params.id, req.body);
    res.status(200).json(updatedRun);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a run by ID
router.delete("/:id", auth, async (req, res) => {
  try {
    const run = await getRunById(req.params.id);
    if (!run) {
      return res.status(404).json({ error: "Run not found" });
    }
    const userId = req.user._id || req.user.id || req.user;
    if (run.user_id.toString() !== userId.toString()) {
      return res.status(403).json({ error: "Unauthorized access" });
    }
    await deleteRun(req.params.id);
    res.status(200).json({ message: "Run deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;