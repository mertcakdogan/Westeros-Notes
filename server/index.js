const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const app = express();
const PORT = process.env.PORT || 5000;
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// API Routes

// Tüm notları getir
app.get('/api/notes', async (req, res) => {
  try {
    const notes = await prisma.note.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});

// Not oluşturma endpoint'i
app.post('/api/notes', async (req, res) => {
  try {
    const { title, text, color } = req.body;

    if (!title || !text || !color) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newNote = await prisma.note.create({
      data: {
        title,
        text,
        color,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    res.json(newNote);
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).json({ error: 'Failed to create note' });
  }
});

// Not sil
app.delete('/api/notes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedNote = await prisma.note.delete({
      where: { id }
    });
    
    res.json({ message: 'Note deleted successfully', note: deletedNote });
  } catch (error) {
    console.error('Error deleting note:', error);
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Note not found' });
    } else {
      res.status(500).json({ error: 'Failed to delete note' });
    }
  }
});

// Not güncelle
app.put('/api/notes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, text, color } = req.body;

    if (!title || !text) {
      return res.status(400).json({ error: 'Title and text are required' });
    }

    const updatedNote = await prisma.note.update({
      where: { id },
      data: {
        title,
        text,
        color,
        updatedAt: new Date(),
      },
    });

    res.json(updatedNote);
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).json({ error: 'Failed to update note' });
  }
});

// Arama endpoint'i
app.get('/api/notes/search', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      // Arama terimi yoksa tüm notları döndür
      const notes = await prisma.note.findMany({
        orderBy: {
          createdAt: 'desc'
        }
      });
      return res.json(notes);
    }
    
    const notes = await prisma.note.findMany({
      where: {
        OR: [
          {
            title: {
              contains: q
            }
          },
          {
            text: {
              contains: q
            }
          }
        ]
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    res.json(notes);
  } catch (error) {
    console.error('Error searching notes:', error);
    res.status(500).json({ error: 'Failed to search notes' });
  }
});

// Tek not getirme endpoint'i
app.get('/api/notes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const note = await prisma.note.findUnique({
      where: { id }
    });
    
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    
    res.json(note);
  } catch (error) {
    console.error('Error fetching note:', error);
    res.status(500).json({ error: 'Failed to fetch note' });
  }
});

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Database: ${process.env.DATABASE_URL}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
}); 