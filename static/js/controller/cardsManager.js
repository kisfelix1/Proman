import { dataHandler } from "../data/dataHandler.js";

export let cardsManager = {
  loadCards: async function (clickEvent) {
    let boardId = clickEvent.target.dataset.boardId;
    let statuses = await dataHandler.getStatusesByBoardId(boardId);
    for (let status of statuses) {
        clickEvent.target.parentElement.parentElement.
        querySelector('.board-columns').innerHTML += statusBuilder(status);
        let cards = await dataHandler.getCardsByBoardId(boardId);
        for(let card of cards){
            if (card.status === status.position ){
                clickEvent.target.parentElement.parentElement.
                querySelector(`.board-column[data-status-id="${status.id}"] .board-column-content`)
                    .innerHTML += cardBuilder(card);
            }
        }
    }
  },
};


export function cardBuilder(card) {
    return `<div class="card" data-card-id="${card.id}" data-board-id="${card.board_id}">
                <div class="card-remove"><i class="fas fa-trash-alt" data-card-id="${card.id}" data-board-id="${card.board_id}"></i></div>
                <div class="card-title">${card.title}</div>
            </div>`;
}

function statusBuilder(status) {
    return  `<div class="board-column" data-status-id="${status.id}" data-position="${status.position}">
                        <div class="board-column-title">${status.title}</div>    
                        <div class="board-column-content">`
}

