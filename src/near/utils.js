//import { connect, Contract, keyStores, WalletConnection } from 'near-api-js'
//import getConfig from './config'


import { CONTRACT_NAME, getConfig } from "./config";

const nearConfig = getConfig('development');

// Initialize contract & set global variables
export async function initContract () {
  // Initialize connection to the NEAR testnet
  //const near = await connect(Object.assign({ deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } }, nearConfig))
    let near = await window.nearApi.connect(nearConfig);

  // Initializing Wallet based Account. It can work with NEAR testnet wallet that
  // is hosted at https://wallet.testnet.near.org
  window.walletConnection = new window.nearApi.WalletConnection(near);

  // Getting the Account ID. If still unauthorized, it's just empty string

  window.account = await window.walletConnection.account()

  // Initializing our contract APIs by contract name and configuration

  window.contract =  new window.nearApi.Contract(
    window.account, 
    CONTRACT_NAME, {
    // View methods are read only. They don't modify the state, but usually return some value.
    viewMethods: ['query_mininum_amount_to_invest', 'query_equivalent_token_reward', 'query_maximum_token_ivestor_can_buy', 'query_ico_closing_date', 'investor_details'],
    // Change methods can modify the state. But you don't receive the returned value when called.
    changeMethods: ['invest'],
  })
}; 


// for checking if account is loging
export const isLogging = () => {
    return window.walletConnection.isSignedIn();
}


// for getting signer account
export const getAccount = () => {
    return window.walletConnection.getAccountId();
    
}


// for loging out user 
export function logout() {

    if (isLogging()) {

        window.walletConnection.signOut();
        window.location.reload();
        // reload page
        //window.location.replace(window.location.origin + window.location.pathname)
        
    } else {

        alert('already logout');
        
    }

}


// for logig in user
export async function login() {
  
  if (!isLogging()) {
    window.walletConnection.requestSignIn(CONTRACT_NAME);
  } else {
   
    alert(`already login please as ${getAccount()}`);
  }
  
}


// function for getting user near token balance
export async function balances () {
    if (isLogging()) {

        let nearConnection =await window.nearApi.connect(nearConfig);
        const account = await nearConnection.account(getAccount());
        let acc = await account.getAccountBalance();

        return acc;
        
    } else {
        
        return false;
    }

}


//function for inveting in ICO
export async function invest(amount){
    let deposit = amount + '4000000000000000000000';
    if (isLogging()) {
  
      let investing = await window.contract.invest(
        {
          amount
        },
        "300000000000000", // attached GAS (optional)
        deposit
      );
  
      return investing;
      
    } else {
  
        return false;
  
    }
  }




// function for query minimum amount to invest
export let query_mininum_amount_to_invest = async () => {

  if (isLogging()) {

    let response = await window.contract.query_mininum_amount_to_invest();

    return response;
  
  } else {

      return false;

  }

}


// function for query equivalent token reward
export let query_equivalent_token_reward = async () => {

  if (isLogging()) {

    let response = await window.contract.query_equivalent_token_reward();

    return response;
  
  } else {

      return false;

  }

}

// function for query maximun token investor can buy
export let query_maximum_token_ivestor_can_buy = async () => {

  if (isLogging()) {

    let response = await window.contract.query_maximum_token_ivestor_can_buy();

    return response;
  
  } else {

      return false;

  }

}


// function for query ico closing date
export let query_ico_closing_date = async () => {

  if (isLogging()) {

    let response = await window.contract.query_ico_closing_date();

    return response;
  
  } else {

      return false;

  }

}



// function for investor detail
export let investor_details = async () => {
  let account = await getAccount();

  if (isLogging()) {

    let response = await window.contract.investor_details(
      {
        account
      }
    );

    return response;
  
  } else {

      return false;

  }

}