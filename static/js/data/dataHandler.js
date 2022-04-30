import {boardsManager} from "../controller/boardsManager.js";

export let dataHandler = {
    deleteBoard: async  function (boardId) {
      return await apiDelete(`/api/delete/board/${boardId}`);
    },
  getBoards: async function () {
    return await apiGet("/api/boards");
  },
  getBoard: async function (boardId) {
    return await apiGet(`/api/board/${boardId}`);
  },
  getStatusesByBoardId: async function (boardId) {
    return await apiGet(`/api/${boardId}/statuses`);
  },
  getStatus: async function (statusId) {
    // the status is retrieved and then the callback function is called with the status
  },
  getCardsByBoardId: async function (boardId) {
    return await apiGet(`/api/boards/${boardId}/cards/`);
  },
  getCard: async function (cardId) {
    // the card is retrieved and then the callback function is called with the card
  },
  createNewBoard: async function () {
    if(localStorage.getItem('id')!==null) {
      let data = await apiPost(`/api/create/board/${localStorage.getItem('id')}`);
      await boardsManager.loadBoard(data['id']);
    }
  },
  createNewCard: async function (boardId) {
    return await apiPost(`/api/create/card/${boardId}`);
  },
  removeCardById: async  function (cardId){
    return apiPost(`/api/remove/card/${cardId}`, {'card_id': cardId});
  },
  updateCardStatus: async function(cardId, position){
    return apiPut(`/api/update/card/${cardId}`, {'position': position});
  }
};

async function apiGet(url) {
  let response = await fetch(url, {
    method: "GET",
  });
  if (response.status === 200) {
    return response.json();
  }
}

export async function apiPost(url, payload) {
  let response = await fetch(url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  if (response.status === 200) {
    return response.json();
  }
}

async function apiDelete(url) {
  let response = await fetch(url, {
    method: "DELETE",
  });
  if (response.status === 200) {
    return response.json();
  }
}

export async function apiPut(url, payload) {
  let response = await fetch(url, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  if (response.status === 200) {
    return response.json();
  }}
