const init = {
  eq: [],
  score: 0,
  lifes: 3,
  bumX: 100,
  bumY: 100,
  displayPassIndicator: false,
};

module.exports = function reducer(state = init, action, args) {
  switch (action) {
    case 'ADD_SCORE': {
      const [value] = args;
      return {
        ...state,
        score: state.score + value,
      }
    }
    case 'SET_PASS_INDICATOR': {
      const [passIndicatorX, passIndicatorY] = args;
      return {
        ...state,
        passIndicatorX,
        passIndicatorY,
        displayPassIndicator: true,
      };
    }
    case 'SHOW_PASS_INDICATOR': {
      return {
        ...state,
        displayPassIndicator: true,
      }
    }
    case 'HIDE_PASS_INDICATOR': {
      return {
        ...state,
        displayPassIndicator: false,
      }
    } 
    case 'SET_INDICATOR': {
      const [indicatorX, indicatorY, playerX, playerY] = args;
      return {
        ...state,
        indicatorX,
        indicatorY,
        playerX,
        playerY,
        displayIndicator: true,
      };
    }
    case 'SHOW_INDICATOR': {
      return {
        ...state,
        displayIndicator: true,
      }
    }
    case 'HIDE_INDICATOR': {
      return {
        ...state,
        displayIndicator: false,
      }
    } 
    case 'UPDATE_TIME': {
      return {
        ...state,
        timeLeft: args[0]
      };
    }
    case 'SHOW_GOM': {
      return {
        ...state,
        displayGOModal: true,
        killedBy: args[0],
      };
    }
    case 'HIDE_GOM': {
      return {
        ...state,
        score: 0,
        displayGOModal: false,
      };
    }
    // show back up modal
    case 'SHOW_BU_MODAL': {
      const [buTime] = args;
      return {
        ...state,
        buTime,
        displayBUModal: true,
      }
    }
    case 'HIDE_BU_MODAL': {
      return {
        ...state,
        displayBUModal: false,
      }
    }
    case 'SHOW_HTP': {
      return {
        ...state,
        htpVisible: true,
      }
    }
    case 'HIDE_HTP': {
      return {
        ...state,
        htpVisible: false,
      }
    }
    case 'SHOW_MENU': {
      return {
        ...state,
        menuStateVisible: true,
      }
    }
    case 'HIDE_MENU': {
      return {
        ...state,
        menuStateVisible: false,
      }
    }
  }
  return state;
}
