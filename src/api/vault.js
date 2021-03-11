import ConnectContract from './connectContract';
import Accounts from "./Account";
import publicJs from "../utils/publicJs";


const InitVault = async (state, dispatch, address,cb) =>  {
    let vaultcontract;
    const {apiState, api} = state;
    let account = await Accounts.accountAddress();

    if (apiState !== 'READY' ||  !account ) return;

    try {
        vaultcontract = await ConnectContract(api, 'vault', address);
        dispatch({ type: 'SET_VAULT', payload: vaultcontract });
        if(vaultcontract){
            cb(true)
        }
    } catch (e) {
        console.error(e);
    }
    return vaultcontract;

}

const value = 0;
const gasLimit = -1;

const getBalanceOf = async (vaultcontract,erc20) => {

    const AccountId = await Accounts.accountAddress();
    if (vaultcontract === null || !vaultcontract || !vaultcontract.query || !AccountId) return;

    let data = await vaultcontract.query.getBalanceOf(AccountId, {value, gasLimit},erc20);
    data = publicJs.formatResult(data);
    return data;

};

const getTokenList = async (vaultcontract) => {

    const AccountId = await Accounts.accountAddress();
    if (vaultcontract === null || !vaultcontract || !vaultcontract.query || !AccountId) return;


    let data = await vaultcontract.query.getTokenList(AccountId, {value, gasLimit});
    data = publicJs.formatResult(data);
    return data;
};

const getTransferHistory = async (vaultcontract) => {

    const AccountId = await Accounts.accountAddress();
    if (vaultcontract === null || !vaultcontract || !vaultcontract.query || !AccountId) return;


    let data = await vaultcontract.query.getTransferHistory(AccountId, {value, gasLimit});

    data = publicJs.formatResult(data);

    return data;
};

const withdraw = async (vaultcontract,obj,cb) => {
    const AccountId = await Accounts.accountAddress();
    const injector = await Accounts.accountInjector();

    const { address, amount, selected} = obj;

    if (vaultcontract === null || !vaultcontract || !vaultcontract.query || !AccountId) return;
    let data;

    await vaultcontract.tx.withdraw({value, gasLimit}, selected,address, amount)
        .signAndSend(AccountId, { signer: injector.signer }, (result) => {
        if (result.status.isFinalized) {
            // console.log("====result.status.isInBlock",result.status.isInBlock || result.status.isFinalized);
            // data = (result.status.isInBlock || result.status.isFinalized);
            // return
            cb(true)
        }
    });
    return data;
}

const checkAuthority = async (vaultcontract) => {

    const AccountId = await Accounts.accountAddress();
    if (vaultcontract === null || !vaultcontract || !vaultcontract.query || !AccountId) return;

    let data = await vaultcontract.query.checkAuthority(AccountId, {value, gasLimit},AccountId);
    data = publicJs.formatResult(data);

    return data;
};


const deposit = async (vaultcontract,obj,cb) => {
    const AccountId = await Accounts.accountAddress();
    const injector = await Accounts.accountInjector();

    const { amount, selected} = obj;

    if (vaultcontract === null || !vaultcontract || !vaultcontract.query || !AccountId) return;
    let data;


    await vaultcontract.tx.deposit({value, gasLimit}, selected,AccountId, amount)
        .signAndSend(AccountId, { signer: injector.signer }, (result) => {
        if (result.status.isFinalized || result.status.isInBlock) {
            cb(true)
        }
    });
    return data;
}

export default {
    InitVault,
    getBalanceOf,
    getTokenList,
    getTransferHistory,
    deposit,
    withdraw,
    checkAuthority,
}

