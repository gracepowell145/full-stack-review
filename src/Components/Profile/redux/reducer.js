//store user sesss on redux state so we can displya prof_pic, username, email and userId to grab their posts and see those in the dassh board state

const initialState ={
    user: {}
}
//user will contain object from db with actual properties. 
const GET_USER ='GET_USER'
      CLEAR_USER =  'CLEAR_USER';
export function getUser(){

// 
return{
    type: GET_USER,
    payload: userObj
}
}

export function clearUser(userObj){
  return{
      type: CLEAR_USER,
      payload: {}
  }
}

export default function reducer(state=initialState, action){
    const {type, payload} =action;

    switch(type){
        case GET_USER:
            return {...state, user: payload};
    }
}
// export vs export default: can have as many exports, but only one export default. export default is main import from the file and will always come first. you ref the others specifically in curly brackets when needed
// will be used with logout to remove the info from redux state

// creating actions in user, subscribing to redux state and subscribing to redux state in other components

// action types are how a reducer function knows which action fired. gets an action obj passed into it when one of the funcs in invoked. 

// has type and payload