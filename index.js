const redux = require("redux");
const reduxLogger = require('redux-logger');
const createStore = redux.createStore;
const combineReducer = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;

const logger = reduxLogger.createLogger()
const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAMS = "BUY_ICECREAMS"


//Action creator
const buyCake = () => {
  return {
    type: BUY_CAKE,
    info: "First redux action",
  }
};
const buyIceCreams = () => {
  return {
    type : BUY_ICECREAMS,
  }
};

//Initial state
const initialCakeState = {
  numOfCakes:10
}
const initialIceCreamState = {
  numOfIceCreams:20
}
// const initialState = {
//     numOfCakes:10,
//     numOfIceCreams:20
// };


//reducer function
const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return { 
        ...state,
        numOfCakes: state.numOfCakes - 1 
      };
    default:
      return state;
  }
};
const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case BUY_ICECREAMS:
      return { 
        ...state,
        numOfIceCreams: state.numOfIceCreams - 1 
      };
    default:
      return state;
  }
};
// const reducerFunction = (state = initialState, action) => {
//   switch (action.type) {
//     case BUY_CAKE:
//       return { 
//         ...state,
//         numOfCakes: state.numOfCakes - 1 
//       };
//     case BUY_ICECREAMS:
//       return { 
//         // ...state,
//         numOfIceCreams: state.numOfIceCreams - 1 
//       };
//     default:
//       return state;
//   }
// };

//combining all reducers 
const rootReducers = combineReducer({
  cake: cakeReducer,
  iceCream: iceCreamReducer
})

//store initialization
const store = createStore(rootReducers , applyMiddleware(logger));
console.log("Initial State", store.getState());
const unsubscribe = store.subscribe(()=>{})

store.dispatch(buyCake());

store.dispatch(buyCake());

store.dispatch(buyIceCreams());

store.dispatch(buyIceCreams());
unsubscribe();
