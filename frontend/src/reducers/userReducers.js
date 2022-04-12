import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_EMAIL_EXIST_REQUEST,
  USER_EMAIL_EXIST_SUCCESS,
  USER_EMAIL_EXIST_FAIL,
  USER_REGISTER_RESET,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_CONFIRM_REQUEST,
  PASSWORD_RESET_CONFIRM_FAIL,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  ACTIVATE_REQUEST,
  ACTIVATE_SUCCESS,
  ACTIVATE_FAIL,
  ACTIVATE_RESET,
} from "../constants/UserConstants";

export const userActivateReducers = (state = {}, action) => {
  switch (action.type) {
    case ACTIVATE_REQUEST:
      return { loading: true };

    case ACTIVATE_SUCCESS:
      return { loading: false, activationInfo: action.payload, success: true };

    case ACTIVATE_FAIL:
      return { loading: false, error: action.payload };

    case ACTIVATE_RESET:
      return {};

    default:
      return state;
  }
};

// const initialState = {
//     access: localStorage.getItem('access'),
//     refresh: localStorage.getItem('refresh'),
//     isAuthenticated: null,
//     user: null
// }

// export const userLogin2Reducers = (state = initialState, action) =>{
//     switch(action.type){
//         case LOGIN_REQUEST:
//             return { loading: true}

//         case LOGIN_SUCCESS:
//             localStorage.setItem('access', action.payload.access)
//             return {
//                 loading: false,
//                 ...state,
//                 isAuthenticated: true,
//                 access: action.payload.access,
//                 refresh: action.payload.refresh
//             }

//         case USER_LOADED_SUCCESS:
//             return {
//                 ...state,
//                 user: action.payload
//             }

//         case LOGIN_FAIL:
//             localStorage.removeItem('access')
//             localStorage.removeItem('refresh')
//             return {
//                 loading: false,
//                 access: null,
//                 refresh: null,
//                 isAuthenticated: false,
//                 user: null
//             }

//         case USER_LOADED_FAIL:
//             return {
//                 ...state,
//                 user: null
//             }

//         default:
//             return state
//     }
// }

export const userLoginReducers = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };

    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };

    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

export const userRegisterReducers = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };

    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload, success: true };

    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };

    case USER_REGISTER_RESET:
      return {};

    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

export const userPasswordResetReducers = (state = {}, action) => {
  switch (action.type) {
    case PASSWORD_RESET_REQUEST:
      return { loading: true };

    case PASSWORD_RESET_SUCCESS:
      return {
        loading: false,
        succes: true,
        email: action.payload,
      };

    case PASSWORD_RESET_FAIL:
      return { loading: false, error: action.payload };

    case PASSWORD_RESET_CONFIRM_SUCCESS:
      return { loading: false, succes: true };

    // case PASSWORD_RESET_CONFIRM_FAIL:
    //   return { loading: false, error: action.payload };

    case PASSWORD_RESET_CONFIRM_FAIL:
      return { loading: false, error: true };

    // return {
    //     ...state
    // }

    default:
      return state;
  }
};

export const userEmailExistReducers = (state = {}, action) => {
  switch (action.type) {
    case USER_EMAIL_EXIST_REQUEST:
      return { loading: true };

    case USER_EMAIL_EXIST_SUCCESS:
      return { loading: false, succes: true };

    case USER_EMAIL_EXIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const userDetailsReducers = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };

    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };

    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    case USER_DETAILS_RESET:
      return { user: {} };

    default:
      return state;
  }
};

export const userUpdateProfileReducers = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };

    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };

    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };

    case USER_UPDATE_PROFILE_RESET:
      return {};

    default:
      return state;
  }
};

export const userListReducers = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };

    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };

    case USER_LIST_FAIL:
      return { loading: false, error: action.payload };

    case USER_LIST_RESET:
      return { users: [] };

    default:
      return state;
  }
};

export const userDeleteReducers = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true };

    case USER_DELETE_SUCCESS:
      return { loading: false, success: true };

    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const userUpdateReducers = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };

    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true };

    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    case USER_UPDATE_RESET:
      return { user: {} };

    default:
      return state;
  }
};
