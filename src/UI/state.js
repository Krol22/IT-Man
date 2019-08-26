const init = {
  eq: [],
  score: 0,
  lifes: 3,
  bumX: 100,
  bumY: 100,
};

module.exports = function reducer(state = init, action, args) {
  switch (action) {
    case 'ADD_EQ': {
      const [value] = args;
      return {
        ...state,
        eq: [
          ...state.eq,
          value,
        ],
      };
    }
    case 'ADD_SCORE': {
      const [value] = args;
      return {
        ...state,
        score: state.score + value,
      }
    }
    case 'ADD_LIFE': {
      return {
        ...state,
        lifes: state.lifes + 1,
      }
    }
    // show back up modal
    case 'SHOW_BU_MODAL': {
      const [buTime, bumX, bumY] = args;
      return {
        ...state,
        buTime,
        bumX,
        bumY,
        displayBUModal: true,
      }
    }
    case 'HIDE_BU_MODAL': {
      return {
        ...state,
        displayBUModal: false,
      }
    }

  }
  return state;
}
