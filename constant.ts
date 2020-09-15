export const AuthConstant = {
  $Set: {
    Info: 'SET/USER/INFO',
    Profile: 'SET/PROFILE',
  },
  $Call: {
    Info: 'CALL/USER/INFO',
    Profile: 'CALL/USER/PROFILE',
    GitHubSigin: 'CALL/GITHUB/SIGNIN',
  },
  $Get: {
    Info: 'GET/USER/INFO',
    Profile: 'GET/PROFILE',
  },
}

export const MainConstant = {
  $Set: {
    MainData: 'SET/DATA',
  },
  $Call: {
    MainData: 'CALL/DATA',
  },
  $Get: {
    MainData: 'GET/DATA',
  },
}

export const SnackConstant = {
  $Set: {
    SnackStatus: 'SET/STATUS',
  },
  $Call: {
    SnackStatus: 'CALL/STATUS',
    Success: 'CALL/SUCCESS',
    Error: 'CALL/ERROR',
  },
  $Get: {
    SnackStatus: 'GET/STATUS',
  },
}

export const CommuteConstant = {
  $Set: {
    CommuteItem: 'SET/ITEM',
    CommuteList: 'SET/LIST',
    CommuteListTotal: 'SET/LIST/TOTAL',
  },
  $Call: {
    CommutePost: 'CALL/POST',
    CommutePut: 'CALL/PUT',
    CommuteGetList: 'CALL/GET/LIST',
    CommuteGetItem: 'CALL/GET/ITEM',
  },
  $Get: {
    CommuteList: 'GET/LIST',
    CommuteItem: 'GET/ITEM',
    CommuteListTotal: 'GET/LIST/TOTAL',
  },
}
