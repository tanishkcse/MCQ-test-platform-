import { AttemptedTest } from "../models/test.model.js";
import { User } from "../models/user.model.js";
// Create a new attempted test
export const createAttemptedTest = async (req, res) => {
  try {
    // Extract the userId from the request object
    const userId = await User.findById(req.user._id);

    const { testName, questions, totalQuestions, score, startedAt, completedAt } = req.body;

    // Find the user by userId
    const user = await User.findById(userId);
    console.log(`User: ${user}`)

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const newAttemptedTest = new AttemptedTest({
      user: user._id,
      testName,
      questions,
      totalQuestions,
      score,
      startedAt,
      completedAt,
    });

    await newAttemptedTest.save();

    // Update the user's testHistory
    user.testHistory.push(newAttemptedTest._id);
    await user.save();

    res.status(201).json(newAttemptedTest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all attempted tests
export const getAllAttemptedTests = async (req, res) => {
  try {
    const attemptedTests = await AttemptedTest.find();
    res.status(200).json(attemptedTests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get attempted tests by user
export const getAttemptedTestsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const attemptedTests = await AttemptedTest.find({ user: userId });

    if (attemptedTests.length === 0) {
      return res.status(404).json({ error: "No attempted tests found for this user" });
    }

    res.status(200).json(attemptedTests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an attempted test
export const updateAttemptedTest = async (req, res) => {
  try {
    const { questions, score, completedAt } = req.body;

    const updatedAttemptedTest = await AttemptedTest.findByIdAndUpdate(
      req.params.id,
      { questions, score, completedAt },
      { new: true }
    );

    if (!updatedAttemptedTest) {
      return res.status(404).json({ error: "Attempted test not found" });
    }

    res.status(200).json(updatedAttemptedTest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an attempted test
export const deleteAttemptedTest = async (req, res) => {
  try {
    const deletedAttemptedTest = await AttemptedTest.findByIdAndDelete(req.params.id);

    if (!deletedAttemptedTest) {
      return res.status(404).json({ error: "Attempted test not found" });
    }

    res.status(200).json({ message: "Attempted test deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};