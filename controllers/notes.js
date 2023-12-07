const {db} = require('../db/connect')

//get all notes belongin to a user
const getNotes = async (request, response) => {
    try {
        const userId = request.user.id;
        console.log(userId)

        const query = 'SELECT * FROM notes WHERE user_id = ?';
        const [notes] = await db.query(query, [userId]);

        return response.render('dashboard.ejs', {status: "success", message: "Here are you notes", notes: notes, firstname: request.user.firstname})
    } catch (error) {
        console.error('Error fetching notes:', error);
        response.status(500).json({ message: 'Error fetching notes' });
    }
};

//get a single note
const getNote = async (request, response) => {
    try {
        const noteId = request.params.id;
        const userId = request.user.id;

        const query = 'SELECT * FROM notes WHERE id = ? AND user_id = ?';
        
        const [notes] = await db.query(query, [noteId, userId]);
        
        if (notes.length === 0) {
            return response.render('note.ejs', { status: "error", message: 'Note not found or not accessible by this user', note: null});
        }

        return response.render('note.ejs', {status: "success", message: "", note: notes[0]})

    } catch (error) {
        console.error('Error fetching the note:', error);
        response.status(500).json({ message: 'Error fetching the note' });
    }
};

const getNewNotePage = async(request, response) =>{
    response.render('createNote.ejs', {status: "success", message: ""})
}

const createNote = async (request, response) => {
    try {
        const { title, content } = request.body;
        const userId = request.user.id;

        if(!title || !content) 
            return response.render('createTask.ejs', {status: "error", message: "Some fields are missing"})

        const insertQuery = 'INSERT INTO notes (user_id, title, content) VALUES (?, ?, ?)';
        const [result] = await db.query(insertQuery, [userId, title, content]);

        if (result.affectedRows === 0) {
            return response.render('createNote.ejs', { status: "error", message: 'Could not create a note'});
        }

        return response.render('createNote.ejs', {status: "success", message: "Task created successfully"});
        
    } catch (error) {
        console.error('Error creating note:', error);
        response.status(500).json({ message: 'Error creating the note' });
    }
};


const getUpdatePage = async( request, response) =>{
    try {
        const noteId = request.params.id;
        const userId = request.user.id;

        const query = 'SELECT * FROM notes WHERE id = ? AND user_id = ?';
        
        const [notes] = await db.query(query, [noteId, userId]);
        
        if (notes.length === 0) {
            return response.render('editNote.ejs', { status: "error", message: 'Note not found or not accessible by this user', note: null});
        }

        return response.render('editNote.ejs', {status: "success", message: "", note: notes[0]})

    } catch (error) {
        console.error('Error fetching the note:', error);
        response.status(500).json({ message: 'Error fetching the note' });
    }
}


const updateNote = async (request, response) => {
    try {
        const noteId = request.params.id
        const { title, content } = request.body;
        const userId = request.user.id; 

        const updateQuery = 'UPDATE notes SET title = ?, content = ?, updated_at = NOW() WHERE id = ? AND user_id = ?';
        
        const [result] = await db.query(updateQuery, [title, content, noteId, userId]);

        if (result.affectedRows === 0) {
            return response.render('editNote.ejs', { status: "error", message: 'Note not found or user not authorized to update this note', note: null});
        }

        return response.render('editNote.ejs', {status: "success", message: 'Note updated successfully', note: null});
    } catch (error) {
        console.error('Error updating note:', error);
        response.status(500).json({ message: 'Error updating the note' });
    }
};

const deleteNote = async (request, response) => {
    try {
        const noteId = request.params.id;
        const userId = request.user.id;

        const deleteQuery = 'DELETE FROM notes WHERE id = ? AND user_id = ?';

        const [result] = await db.query(deleteQuery, [noteId, userId]);

        if (result.affectedRows === 0) {
            return response.status(404).render('note.ejs', { status: "error", message: 'Note not found or user not authorized to delete this note', note: null});
        }

        return response.render('note.ejs', { status: "success", message: 'Note deleted successfully', note:null });
    } catch (error) {
        console.error('Error deleting note:', error);
        response.status(500).json({ message: 'Error deleting the note' });
    }
};



module.exports = {
    getNotes,
    getNote,
    createNote,
    getNewNotePage,
    updateNote,
    deleteNote,
    getUpdatePage
}