
// ФУНКЦИИ:
//---------
// Отображение поля ввода текста заметки:
function showAddNoteTextElem(e) {
    let target = e.target;

    if ( !target.classList.contains('create-note-container__add-note__btn') ) {
        return;
    }

    let addNoteTextElem = document.querySelector('.create-note-container__create-note');
    addNoteTextElem.style.display = 'flex';
}

// Добавить новую заметку:
function addNote(e) {
    if (e.key === 'Enter') { // код кнопки Enter "13"
        let noteTextElem = document.querySelector('.create-note-container__create-note');
    
        let noteElem = document.createElement('div');
        noteElem.innerHTML = `${noteTextElem.value}`;
    
        noteElem.classList.add('app-note');
        noteElem.style.background = `${ colorNote() }`;
        // или:  noteElem.setAttribute('style', `background:${ colorNote() }`);
    
        let notesContainerElem = document.querySelector('.note-app__notes-container');
        notesContainerElem.append(noteElem);

        noteTextElem.value = '';
        noteTextElem.style.display = 'none';

        // Обновление localStorage (при добавлении заметки):
        updateLocalStorage();
    }
}

// Удалить заметку:
function deleteNote(e) {
    let target = e.target;

    if (target.classList.contains('app-note')) {
        target.remove();
        // Обновление localStorage (при удалении заметки):
        updateLocalStorage();
    }
};

// Выбор цвета заметки:
let colorCounter = 0;
function colorNote() {
    let randomColors = ['#c2ff3d', '#ff3de8', '#3dc2ff', '#04e022', '#bc83e6', '#ebb328'];

    if (colorCounter > randomColors.length - 1) {
        colorCounter = 0
    }
    
    return randomColors[colorCounter++]; // возвращает цвет заметки (вызывается внутри функции "addNote()" )
}

// ОБРАБОТЧИКИ:
// ------------
document.addEventListener('click', showAddNoteTextElem); // отображение поля ввода текста заметки
document.addEventListener('keydown', addNote); // добавить новую заметку
document.addEventListener('dblclick', deleteNote); // удалить заметку


// Работа с localStorage:
//-----------------------
let notesContainerElem = document.querySelector('.note-app__notes-container');
function updateLocalStorage() {
    localStorage.setItem('my-notes', notesContainerElem.innerHTML);
    localStorage.setItem('color-counter', colorCounter);
}

// При обновлении страницы F5 - отображение всех элементов, сохраненных в localStorage:
function showNotes() {
    notesContainerElem.innerHTML = localStorage.getItem('my-notes');
    colorCounter = localStorage.getItem('color-counter'); // если не задать счетчик цвета при каждом обновлении страницы, он будет равен 0;
};
showNotes();