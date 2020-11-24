export const AuthConstant = {
  $Set: {
    Info: 'SET/USER/INFO',
    Profile: 'SET/PROFILE',
  },
  $Call: {
    Info: 'CALL/USER/INFO',
    InfoPut: 'CALL/USER/INFO/PUT',
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
    TodayData: 'SET/TODAY/DATA',
  },
  $Call: {
    MainData: 'CALL/DATA',
    TodayData: 'CALL/TODAY/DATA',
  },
  $Get: {
    MainData: 'GET/DATA',
    TodayData: 'GET/TODAY/DATA',
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

export const CompanyConstant = {
  $Set: {
    List: 'SET/LIST',
  },
  $Call: {
    List: 'CALL/LIST',
    ListReset: 'CALL/LIST/RESET',
  },
  $Get: {
    List: 'GET/LIST',
  },
}
