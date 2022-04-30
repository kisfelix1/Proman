import {dataHandler} from "../data/dataHandler.js";

const dom = {
    isEmpty: function (el) {
        return el.children.length === 0;
    },
    hasClass: function (el, cls) {
        return el.classList.contains(cls);
    },
};

const ui = {
    mixedCardsContainer: null,
    slots: null,
    cards: null,
};

export const dnd = {
    dragged: null,
    initDragAndDrop: function () {
        initElements();
        initDragEvents();
    }
};

function initElements() {
    ui.cards = document.querySelectorAll(".card");
    ui.slots = document.querySelectorAll(".board-column");
}

function initDragEvents() {
    ui.cards.forEach(function (card) { initDraggable(card) });
    ui.slots.forEach(function (slot) { initDropzone(slot) });
}

function initDraggable(draggable) {
    draggable.setAttribute("draggable", true);
    draggable.addEventListener("dragstart", handleDragStart);
    draggable.addEventListener("dragend", handleDragEnd);
}

function initDropzone(dropzone) {
    dropzone.addEventListener("dragenter", handleDragEnter);
    dropzone.addEventListener("dragover", handleDragOver);
    dropzone.addEventListener("dragleave", handleDragLeave);
    dropzone.addEventListener("drop", handleDrop);
}

function handleDragStart(e) {
    dnd.dragged = e.currentTarget;
}

function handleDragEnd() {
    dnd.dragged = null;
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDragEnter(e) {
}

function handleDragLeave(e) {
}

function handleDrop(e) {
    e.preventDefault();
    e.currentTarget.querySelector(".board-column-content").appendChild(dnd.dragged);
    dataHandler.updateCardStatus(dnd.dragged.dataset.cardId, e.currentTarget.dataset.position);

}
