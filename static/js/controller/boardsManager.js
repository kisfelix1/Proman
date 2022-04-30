import { dataHandler } from "../data/dataHandler.js";
import { htmlFactory, htmlTemplates } from "../view/htmlFactory.js";
import { domManager } from "../view/domManager.js";
import { cardsManager } from "./cardsManager.js";
import { dnd } from "./dndManager.js";
import { apiPut } from "../data/dataHandler.js";

export let boardsManager = {
  loadBoards: async function () {
    const boards = await dataHandler.getBoards();
    for (let board of boards) {
      await this.loadBoard(board.id);
    }
  },
  loadBoard: async function (boardId) {
    const board = await dataHandler.getBoard(boardId);
    const boardBuilder = await htmlFactory(htmlTemplates.board);
    const content = await boardBuilder(board);
    domManager.addChild(".board-container", content);
    domManager.addEventListener(
        `.toggle-board-button[data-board-id="${board.id}"]`,
        "click",
        showCardsButtonHandler
    );
    domManager.addEventListener(
        `.board-add[data-board-id="${board.id}"]`,
        "click",
        addCardButtonHandler
    );
    domManager.addEventListener(`.board-title[data-board-id="${boardId}"]`,
        "dblclick",
        renameBoard
    );
    domManager.addEventListener(
        `.board-remove[data-board-id="${board.id}"]`,
        "click",
        deleteBoardButtonHandler
    );
  }
};

async function addCardButtonHandler(clickEvent){
    let boardId = clickEvent.target.dataset.boardId;
    if(await checkBoardAuthentication(boardId)) {
      let card = await dataHandler.createNewCard(boardId);
      let cardElement = document.createElement('div');
      cardElement.classList.add('card');
      cardElement.dataset.cardId=card.id;
      cardElement.innerHTML = `<div class="card-remove"><i class="fas fa-trash-alt" data-card-id="${card.id}" data-board-id="${card.board_id}"></i></div>
                              <div class="card-title">${card.title}</div>
              </div>`;
      document.querySelector(`.board[data-board-id="${boardId}"]`)
          .querySelector('.board-column-content').appendChild(cardElement);
      document.querySelector(`[data-card-id="${card.id}"]`).addEventListener('click', removeCard);
    }
}

async function checkBoardAuthentication(boardId){
  let board = await dataHandler.getBoard(boardId);
  return (board['user_id'] == localStorage.getItem('id')) || board['is_public'];
}

async function showCardsButtonHandler(clickEvent) {
  let boardId = clickEvent.target.dataset.boardId;
  if (clickEvent.target.innerText === "Show Cards"){
    await cardsManager.loadCards(clickEvent);
    document.querySelectorAll('.card-title').forEach(card => card.addEventListener('dblclick', renameCard))
    dnd.initDragAndDrop();
    document.querySelectorAll(".fa-trash-alt")
        .forEach(card => card.addEventListener('click', removeCard))
    clickEvent.target.innerText = "Hide Cards";
  }
  else{
    let boardColumns = document.querySelector(`.board[data-board-id="${boardId}"] .board-columns`);
    boardColumns.innerHTML = "";
    clickEvent.target.innerText = "Show Cards";
  }
}

async function removeCard(clickEvent){
    if (await checkBoardAuthentication(clickEvent.target.dataset.boardId)) {
      await dataHandler.removeCardById(clickEvent.target.dataset.cardId);
      clickEvent.target.parentElement.parentElement.remove();
    }
}

async function renameBoard(clickEvent) {
  let boardId = clickEvent.target.dataset.boardId;
  if (await checkBoardAuthentication(boardId)) {
    let boardText = clickEvent.target.innerText
    clickEvent.target.innerHTML = `<input type="text" size="5" value="${boardText}"><button type="submit">Submit</button>`
    clickEvent.target.querySelector("button").addEventListener("click", renameBoardConfirm)
  }
}

function renameBoardConfirm(clickEvent) {
  let boardId = clickEvent.target.parentElement.dataset.boardId
  let new_title = clickEvent.target.parentElement.querySelector("input").value
  clickEvent.target.parentElement.innerHTML = clickEvent.target.parentElement.querySelector("input").value
  apiPut('/api/board/rename', {'title': new_title, 'id':boardId})
}

async function deleteBoardButtonHandler(clickEvent){
  let boardId = clickEvent.target.dataset.boardId;
  if (await checkBoardAuthentication(boardId)) {
    await dataHandler.deleteBoard(boardId);
    document.querySelector(`.board[data-board-id="${boardId}"]`).remove();
  }
}

async function renameCard(clickEvent){
  let boardId = clickEvent.target.parentElement.dataset.boardId
  let cardId = clickEvent.target.parentElement.dataset.cardId
  if (await checkBoardAuthentication(boardId)) {
    let cardText = clickEvent.target.innerText
    clickEvent.target.innerHTML = `<input type="text" size="5" value="${cardText}">`
    clickEvent.target.querySelector("input").addEventListener("keydown", function(renameCardConfirm) {
      if (renameCardConfirm.key === "Enter") {
        let cardNewText = clickEvent.target.querySelector("input").value
        clickEvent.target.innerText = cardNewText
        apiPut('/api/card/rename', {'title': cardNewText, 'id':cardId})
      }
    })
  }
}
