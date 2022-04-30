export const htmlTemplates = {
    board: 1,
    card: 2,
    status: 3
}

export function htmlFactory(template) {
    switch (template) {
        case htmlTemplates.board:
            return boardBuilder
        case htmlTemplates.card:
            return cardBuilder
        default:
            console.error("Undefined template: " + template)
            return () => { return "" }
    }
}

async function boardBuilder(board) {
    return `<section class="board" data-board-id="${board.id}">
                <div class="board-header">
                <span class="board-title" data-board-id="${board.id}">${board.title}</span>
                <button class="board-add" data-board-id="${board.id}">Add Card</button>
                <button class="board-remove" data-board-id="${board.id}">Delete board</button>
                <button class="toggle-board-button board-toggle" data-board-id="${board.id}">Show Cards</button>
                </div>
                <div class="board-columns"></div>
            </section>`;
}
async function cardBuilder(card){
    let cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.dataset.cardId = card.id;
    cardElement.innerHTML = `<div class="card-remove">
                    <i class="fas fa-trash-alt" data-card-id="${card.id}" data-board-id="${card.board_id}"></i>
                </div>
                <div class="card-title">new card</div>`;
    return cardElement;
}

