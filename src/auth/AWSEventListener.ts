import { Auth, Hub } from 'aws-amplify';

type AuthEvent = (
  'configured' | 'signIn' | 'signIn_failure' | 'signUp' | 'signUp_failure' | 'confirmSignUp' |
  'completeNewPassword_failure' | 'autoSignIn' | 'autoSignIn_failure' | 'forgotPassword' |
  'forgotPassword_failure' | 'forgotPasswordSubmit' | 'forgotPasswordSubmit_failure' |
  'tokenRefresh' | 'tokenRefresh_failure' | 'cognitoHostedUI' | 'cognitoHostedUI_failure' |
  'customOAuthState' | 'customState_failure' | 'parsingCallbackUrl' | 'userDeleted' | 'signOut'
)

const subscriptions: Record<AuthEvent, {[index: string]: (user?: any, payload?: any) => void}> = {
  'configured': {},
  'signIn': {},
  'signIn_failure': {},
  'signUp': {},
  'signUp_failure': {},
  'confirmSignUp': {},
  'completeNewPassword_failure': {},
  'autoSignIn': {},
  'autoSignIn_failure': {},
  'forgotPassword': {},
  'forgotPassword_failure': {},
  'forgotPasswordSubmit': {},
  'forgotPasswordSubmit_failure': {},
  'tokenRefresh': {},
  'tokenRefresh_failure': {},
  'cognitoHostedUI': {},
  'cognitoHostedUI_failure': {},
  'customOAuthState': {},
  'customState_failure': {},
  'parsingCallbackUrl': {},
  'userDeleted': {},
  'signOut': {},
}

export function subscribeAuthEvent(id: string, events: AuthEvent[], callback: (user?: any, payload?: any) => void) {
  for (let event of events) {
    subscriptions[event][id] = callback
  }
}

const listener = (data: any) => {
  switch (data.payload.event) {
    case 'configured':
      console.info('the Auth module is configured');
      break;
    case 'signIn':
      console.info('user signed in');
      break;
    case 'signIn_failure':
      console.error('user sign in failed');
      break;
    case 'signUp':
      console.info('user signed up');
      break;
    case 'signUp_failure':
      console.error('user sign up failed');
      break;
    case 'confirmSignUp':
      console.info('user confirmation successful');
      break;
    case 'completeNewPassword_failure':
      console.error('user did not complete new password flow');
      break;
    case 'autoSignIn':
      console.info('auto sign in successful');
      break;
    case 'autoSignIn_failure':
      console.error('auto sign in failed');
      break;
    case 'forgotPassword':
      console.info('password recovery initiated');
      break;
    case 'forgotPassword_failure':
      console.error('password recovery failed');
      break;
    case 'forgotPasswordSubmit':
      console.info('password confirmation successful');
      break;
    case 'forgotPasswordSubmit_failure':
      console.error('password confirmation failed');
      break;
    case 'tokenRefresh':
      console.info('token refresh succeeded');
      break;
    case 'tokenRefresh_failure':
      console.error('token refresh failed');
      break;
    case 'cognitoHostedUI':
      console.info('Cognito Hosted UI sign in successful');
      break;
    case 'cognitoHostedUI_failure':
      console.error('Cognito Hosted UI sign in failed');
      break;
    case 'customOAuthState':
      console.info('custom state returned from CognitoHosted UI');
      break;
    case 'customState_failure':
      console.error('custom state failure');
      break;
    case 'parsingCallbackUrl':
      console.info('Cognito Hosted UI OAuth url parsing initiated');
      break;
    case 'userDeleted':
      console.info('user deletion successful');
      break;
    case 'signOut':
      console.info('user signed out');
      break;
  }
  Auth.currentUserInfo().then(currentUserInfo => {
    for (let key of Object.keys(subscriptions[data.payload.event as AuthEvent])) {
      console.info('Executing subscription', data.payload.event, key)
      subscriptions[data.payload.event as AuthEvent][key](currentUserInfo, data.payload)
    }
  })
};

Hub.listen('auth', listener);