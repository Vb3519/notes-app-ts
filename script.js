// ФУНКЦИИ:
//---------
// Отображение поля ввода заметки:
function showAddNoteTextElem(e) {
    var target = e.target; // указание что таргет события является кнопкой, чтобы получить нужные свойства / методы
    if (!target.classList.contains('create-note-container__add-note__btn')) {
        return;
    }
    ;
    var addNoteTextElem = document.querySelector('.create-note-container__create-note'); //  Тип "Element" более общий, чем "HTMLElement"
    if (addNoteTextElem !== null) {
        addNoteTextElem.style.display = 'flex';
    }
    ;
}
// Добавить новую заметку:
function addNote(e) {
    if (e.key === 'Enter') {
        var noteTextElem = document.querySelector('.create-note-container__create-note'); // поля ввода типизируются как "HTMLInputElement"
        var noteElem = document.createElement('div');
        if (noteTextElem !== null) {
            noteElem.innerHTML = "".concat(noteTextElem.value);
            noteElem.classList.add('app-note');
            noteElem.style.background = "".concat(colorNote());
            // или noteElem.setAttribute('style', `background:${ colorNote() }`);
            var notesContainerElem_1 = document.querySelector('.note-app__notes-container'); // "HTMLElement" или "HTMLDivElement"
            notesContainerElem_1 === null || notesContainerElem_1 === void 0 ? void 0 : notesContainerElem_1.append(noteElem); // при указании знака вопроса "?" необязательно писать условие "if() {}" с проверкой на "null"
            noteTextElem.value = '';
            noteTextElem.style.display = 'none';
            // Обновление localStorage (при добавлении заметки):
            updateLocalStorage();
        }
        ;
    }
    ;
}
;
// Удалить заметку:
function deleteNote(e) {
    var target = e.target;
    if (target !== null && target.classList.contains('app-note')) {
        target.remove();
        updateLocalStorage();
    }
    ;
}
;
// Выбор цвета заметки:
var colorCounter = 0;
function colorNote() {
    var randomColors = ['#c2ff3d', '#ff3de8', '#3dc2ff', '#04e022', '#bc83e6', '#ebb328'];
    if (colorCounter > randomColors.length - 1) {
        colorCounter = 0;
    }
    ;
    return randomColors[colorCounter++];
}
;
// ОБРАБОТЧИКИ:
// -----------
document.addEventListener('click', showAddNoteTextElem); // отображение поля ввода заметки
document.addEventListener('keydown', addNote); // добавить новую заметку
document.addEventListener('dblclick', deleteNote); // удалить заметку
// Работа с localStorage:
//----------------------
var notesContainerElem = document.querySelector('.note-app__notes-container');
function updateLocalStorage() {
    var colorCounterStrType = String(colorCounter); // конвертация числа № цвета в строку для работы с "localStorage"
    if (notesContainerElem !== null) {
        localStorage.setItem('my-notes', notesContainerElem.innerHTML);
    }
    ;
    localStorage.setItem('color-counter', colorCounterStrType);
}
;
// При обновлении страницы F5 - отображение всех элементов, сохраненных в localStorage:
function showNotes() {
    if (notesContainerElem !== null) {
        var notesContainerElemInner = localStorage.getItem('my-notes');
        if (notesContainerElemInner) { // указать проверку на null, без нее выдается ошибка Тип 'string | null' не присвоить к типу 'string'
            notesContainerElem.innerHTML = notesContainerElemInner;
        }
    }
    ;
    var colorCounterNumberType = Number(localStorage.getItem('color-counter'));
    colorCounter = colorCounterNumberType;
}
showNotes();
