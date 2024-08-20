import express from 'express';
import { getAllQuestions, getQuestionByCategory, createQuestion, updateQuestion, deleteQuestion } from '../controllers/question.controller.js';

const router = express.Router();

// Questions routes
router.get('/show', getAllQuestions);
router.get('/show/category', getQuestionByCategory);
router.post('/create', createQuestion);
router.put('/update/:id', updateQuestion);
router.delete('/delete/:id', deleteQuestion);

export default router;