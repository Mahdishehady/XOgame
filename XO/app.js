window.addEventListener('DOMContentLoaded', () => {
   const tiles = Array.from(document.querySelectorAll('.tile'));
   const playerDisplay = document.querySelector('.display-player');
   const resetbutton = document.querySelector('#reset');
   const announcer = document.querySelector('.announcer');

   let board = ['', '', '', '', '', '', '', '', ''];
   let currentPlayer = 'X';
   let isGamrActive = true;
   const PLAYERX_WON = 'PLAYERX_WON';
   const PLAYERO_WON = 'PLAYERO_WON';
   const TIE = 'TIE';

   const WINNERConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
   ];
   const announce = (type) => {
      switch (type) {
         case PLAYERO_WON:
            announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
            break;
         case PLAYERX_WON:
            announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
            break;
         case TIE:
            announcer.innerText = 'TIE';

      }
      announcer.classList.remove('hide');
   };
   function handleResultValidation() {
      let roundwon = false;
      for (let i = 0; i <= 7; i++) {
         const winCondition = WINNERConditions[i];
         let a = board[winCondition[0]];
         let b = board[winCondition[1]];
         let c = board[winCondition[2]];
         if (a === '' || b === '' || c === '')
            continue;
         if (a === b && b === c) {
            roundwon = true;
            break;
         }
      }
      if (roundwon) {
         announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
         isGamrActive = false;
         return;
      }
      if (!board.includes(''))
         announce(TIE);

   }

   const isValidAction = (tile) => {
      if (tile.innerText === 'X' || tile.innerText === 'O') {
         return false;
      }
      return true;
   }
   const updateBoard = (index) => {
      board[index] = currentPlayer;
   }

   const changePlayer = () => {
      playerDisplay.classList.remove(`player${currentPlayer}`);
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      playerDisplay.innerText = currentPlayer;
      playerDisplay.classList.add(`player${currentPlayer}`);

   }
   const userAction = (tile, index) => {
      if (isValidAction(tile) && isGamrActive) {
         tile.innerText = currentPlayer;
         tile.classList.add(`player${currentPlayer}`);
         updateBoard(index);
         handleResultValidation();
         changePlayer();

      }
   }
   const resetBoard = () => {
      board = ['', '', '', '', '', '', '', '', ''];
      isGamrActive = true;
      announcer.classList.add('hide');
      if (currentPlayer === 'O') {
         changePlayer();
      }
      tiles.forEach(tile => {
         tile.innerText = '';
         tile.classList.remove('playerX');
         tile.classList.remove('playerO');
      });
   }
   tiles.forEach((tile, index) => {
      tile.addEventListener('click', () => userAction(tile, index));

   });
   resetbutton.addEventListener('click', resetBoard);

})