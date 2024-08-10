// ФУНКЦИИ:
//---------

// Отображение поля ввода заметки:
function showAddNoteTextElem(e: Event): void {
    let target = e.target as HTMLButtonElement; // указание что таргет события является кнопкой, чтобы получить нужные свойства / методы

    if ( !target.classList.contains('create-note-container__add-note__btn') ) {
        return;
    };

    let addNoteTextElem: HTMLElement | null = document.querySelector('.create-note-container__create-note'); //  Тип "Element" более общий, чем "HTMLElement"
    
    if (addNoteTextElem !== null) {
        addNoteTextElem.style.display = 'flex';
    };
}

// Добавить новую заметку:
function addNote(e: KeyboardEvent): void { // Если применять события клавиатуры нужно указывать не "Event", в "KeyboardEvent"

    if (e.key === 'Enter') {
        let noteTextElem: HTMLInputElement | null = document.querySelector('.create-note-container__create-note'); // поля ввода типизируются как "HTMLInputElement"

        let noteElem: HTMLDivElement = document.createElement('div');
        
        if (noteTextElem !== null) {
            noteElem.innerHTML = `${noteTextElem.value}`;

            noteElem.classList.add('app-note');
            noteElem.style.background = `${ colorNote() }`;
            // или noteElem.setAttribute('style', `background:${ colorNote() }`);

            let notesContainerElem: HTMLElement | null = document.querySelector('.note-app__notes-container'); // "HTMLElement" или "HTMLDivElement"
            notesContainerElem?.append(noteElem) // при указании знака вопроса "?" необязательно писать условие "if() {}" с проверкой на "null"

            noteTextElem.value = '';
            noteTextElem.style.display = 'none';

            // Обновление localStorage (при добавлении заметки):
            updateLocalStorage();
        };
    };
};

// Удалить заметку:
function deleteNote(e: Event) {
    let target = e.target as HTMLButtonElement;

    if (target !== null && target.classList.contains('app-note')) {        
            target.remove();
            updateLocalStorage();
    };
};

// Выбор цвета заметки:
let colorCounter: number = 0;

function colorNote(): string {
    let randomColors: string[] = ['#c2ff3d', '#ff3de8', '#3dc2ff', '#04e022', '#bc83e6', '#ebb328'];

    if (colorCounter > randomColors.length - 1) {
        colorCounter = 0;
    };

    return randomColors[colorCounter++];
};

// ОБРАБОТЧИКИ:
// -----------
document.addEventListener('click', showAddNoteTextElem); // отображение поля ввода заметки
document.addEventListener('keydown', addNote); // добавить новую заметку
document.addEventListener('dblclick', deleteNote); // удалить заметку


// Работа с localStorage:
//----------------------
let notesContainerElem: HTMLElement | null = document.querySelector('.note-app__notes-container');

function updateLocalStorage(): void {
    let colorCounterStrType: string = String(colorCounter); // конвертация числа № цвета в строку для работы с "localStorage"

    if (notesContainerElem !== null) {
        localStorage.setItem('my-notes', notesContainerElem.innerHTML);
    };

    localStorage.setItem('color-counter', colorCounterStrType);
};

// При обновлении страницы F5 - отображение всех элементов, сохраненных в localStorage:
function showNotes(): void {

    if (notesContainerElem !== null) {
        let notesContainerElemInner: string | null = localStorage.getItem('my-notes');

        if (notesContainerElemInner) { // указать проверку на null, без нее выдается ошибка Тип 'string | null' не присвоить к типу 'string'
            notesContainerElem.innerHTML = notesContainerElemInner;
        }
    };

    let colorCounterNumberType: number = Number( localStorage.getItem('color-counter') );

    colorCounter = colorCounterNumberType;
}
showNotes();