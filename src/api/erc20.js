import ConnectContract from './connectContract';
import Accounts from "./Account";

let erc20contract;
const InitErc20 = async (state, dispatch, address) =>  {

    const {apiState, api,} = state;
    let account = JSON.parse(sessionStorage.getItem('account'));
    if (apiState !== 'READY' || !account ) return;

    try {
        erc20contract = await ConnectContract(api, 'erc20',address);
        dispatch({ type: 'SET_ERC20', payload: erc20contract });
    } catch (e) {
        console.error(e);
    }
    return erc20contract;
}

const value = 0;
const gasLimit = -1;

const approveOp = async (erc20contract,total,cb) => {
    const AccountId = await Accounts.accountAddress();
    const injector = await Accounts.accountInjector();


    if (erc20contract === null || !erc20contract || !erc20contract.tx || !AccountId) return;

    await erc20contract.tx.approve({value, gasLimit},AccountId,total)
        .signAndSend(AccountId, { signer: injector.signer }, (result) => {
          if (result.status.isFinalized) {
             cb(true);
         }
       });
}
export default {
    InitErc20,
    approveOp,
}
