const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { default: axios } = require('axios');

const OPENAI_API_KEY ='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';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/taskdb')
.then(()=>{
    console.log('Connected to MongoDB');
})
.catch((err)=>{
    console.log('Error connecting to MongoDB:',err);
})
const taskSchema=new mongoose.Schema({
    task: String,
    description: String,
    dueDate: Date,
    priority: String
})
const Task = mongoose.model('Task', taskSchema);
app.post('/api/tasks',async(req,res)=>{
    try{
        const tasks=new Task({
            task:req.body.taskName,
            description:req.body.taskDescription,
            dueDate:req.body.dueDate,
            priority:req.body.priority
        })
        await tasks.save();
        console.log('Task added successfully:', tasks);
    }
    catch(error)
    {
        console.log('Error adding task:', error);
    }
})
app.get('/api/tasks',async(req,res)=>{
    try{
        const tasks = await Task.find();
        res.json(tasks);
    }
    catch(error){
        console.log('Error fetching tasks:', error);
    
    }
})

app.delete('/api/tasks/:id',async(req,res)=>{
    try{
        const taskId = req.params.id;
        const deltask=await Task.findByIdAndDelete(taskId);
        if(!deltask){
            return res.status(404).json({ message: 'Task not found' });
        }
        console.log('Task deleted successfully:', deltask);
    }
    catch(error)
    {
        console.log('Error deleting task:', error);
    }
})

app.post('/api/chatgpt', async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage || typeof userMessage !== 'string') {
    return res.status(400).json({ error: 'Invalid input message' });
  }

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful AI tutor.' },
          { role: 'user', content: userMessage },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        'HTTP-Referer': 'http://localhost:3000',
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error('ChatGPT API error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch response from ChatGPT' });
  }
});

const reviewSchema = new mongoose.Schema({
    topic: String,
    task: String,
    date: Date,
    });
const Review = mongoose.model('Review', reviewSchema);
app.post('/api/review', async (req, res) => {    
    try{
        const review = new Review({
            topic: req.body.topic,
            task: req.body.task,
            date: new Date(req.body.date),
        });
        await review.save();
        console.log('Review added successfully:', review);
        
    }
    catch(error) {
        console.error('Error adding review:', error);
        return res.status(500).json({ error: 'Failed to add review' });
    }
});

app.get('/api/review', async (req, res) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        return res.status(500).json({ error: 'Failed to fetch reviews' });
    }
});

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
});
const User = mongoose.model('User', userSchema);

app.post('/api/signup', async (req, res) => {
    try{
        const signupUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        await signupUser.save();
        console.log('User signed up successfully:', signupUser);
    }
    catch(error) {
        console.log('Error signing up user:', error);
    }
});

const loginSchema = new mongoose.Schema({
  email: String,
  password: String,
});
const Login = mongoose.model('Login', loginSchema);

// POST /api/login
app.post('/api/login', async (req, res) => {
  try {
    // const { email, password } = req.body;

     const user = new Login({ email: "test@example.com", password: "123456" });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // ✅ Login successful – Send dummy token
    return res.status(200).json({ message: "Login successful", token: "dummy-token" });
  } catch (error) {
    console.error('Error logging in user:', error);
    return res.status(500).json({ message: "Server error" });
  }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
})