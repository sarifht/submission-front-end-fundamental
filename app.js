import './src/components/index.js';
import notesData from './src/data/data.js';

const noteList = document.querySelector('note-list');
noteList.note = notesData;

document.querySelector('note-form').addEventListener('note-added', (event) => {
    notesData.push(event.detail);

    const noteList = document.querySelector('note-list');
    noteList.note = notesData;
});