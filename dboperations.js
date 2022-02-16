var config = require('./dbconfig');
const sql = require("mssql/msnodesqlv8");


async function getAllNotes() {
    try {
        let pool = await sql.connect(config);
        let notes = await pool.request().query("select id , title , note_desc from stickyNote");
        return notes.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}
async function getNote(noteId) {
    try {
        let pool = await sql.connect(config);
        let notes = await pool.request().input('input_parameter',sql.Int , noteId).query("select id , title , note_desc from stickyNote where id = @input_parameter");
        return notes.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function addNote(note) {

    try {
        let pool = await sql.connect(config);
        let insertNote = await pool.request().query(`insert into stickyNote(title ,note_desc) values('${note.title}','${note.note_desc}')`)
        return insertNote.recordsets;
    }
    catch (err) {
        console.log(err);
    }

}

async function deleteNote(noteId) {
    try {
        let pool = await sql.connect(config);
        let notes = await pool.request().input('input_parameter',sql.Int , noteId).query("delete from stickyNote where id = @input_parameter");
        return notes.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function updateNote(noteId , note) {
    try {
        let pool = await sql.connect(config);
        let notes = await pool.request().input('input_parameter',sql.Int , noteId).query(`UPDATE stickyNote SET title = '${note.title}' , note_desc = '${note.note_desc}' where id = @input_parameter`);
        return notes.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}


module.exports = {
    getAllNotes: getAllNotes,
    getNote:getNote,
    addNote:addNote,
    deleteNote:deleteNote,
    updateNote:updateNote,
}