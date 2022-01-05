const redux = require('redux');
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios');


//initial State
const initialState = {
  loading: false,
  users: [],
  error: "",
};

const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_FAILED = "FETCH_USERS_FAILED";

//Actions
const fetchUsersRequest = () =>{
    return {
        type:FETCH_USERS_REQUEST
    }
} 
const fetchUsersSuccess = (users) =>{
    return {
        type:FETCH_USERS_SUCCESS,
        payload:users
    }
} 
const fetchUsersFailed = (error) =>{
    return {
        type:FETCH_USERS_FAILED,
        payload:error
    }
} 

const reducer = (state = initialState ,action) => {
    switch(action.type){
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loading:true
            }

        case FETCH_USERS_SUCCESS:
            return {
                loading:false,
                users:action.payload,
                error:''
            }
        case FETCH_USERS_FAILED:
            return {
                loading:false,
                users:[],
                error:action.payload
            }
    }
}

//thunk middleware allows us to return function from action Creators
const fetchUsers = () => {
    store.dispatch(fetchUsersRequest())
    //this function can dispatch actions 
    return function(dispatch){
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(res => {
            const users = res.data.map(user => user.id);
            dispatch(fetchUsersSuccess(users))
            //res.data is the array of the users
        })
        .catch(err => {
            //err.message is the error description
            dispatch(fetchUsersFailed(err.message))
        })
    }
}
const store = createStore(reducer , applyMiddleware(thunkMiddleware));
store.subscribe(() => { console.log(store.getState())});
store.dispatch(fetchUsers());
