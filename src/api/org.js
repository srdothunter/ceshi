import ConnectContract from './connectContract';
import Accounts from "./Account";
import publicJs from "../utils/publicJs";

let orgcontract;
const InitOrg = async (state, dispatch,address,cb) =>  {

    const {apiState, api} = state;

    let account = await Accounts.accountAddress();

    if (apiState !== 'READY' ||  !account) return;

    try {
        orgcontract = await ConnectContract(api, 'org', address);
        dispatch({ type: 'SET_ORG', payload: orgcontract });
        if(orgcontract){
            cb(true)
        }
    } catch (e) {
        console.error(e);
    }
    return orgcontract;
}

const value = 0;
const gasLimit = -1;

const getDaoModeratorList = async (orgcontract) => {

    const AccountId = await Accounts.accountAddress();
    if (orgcontract === null || !orgcontract || !orgcontract.query || !AccountId) return;

    let data = await orgcontract.query.getDaoModeratorDetailList(AccountId, {value, gasLimit});
    data = publicJs.formatResult(data);
    return data;

};

const getDaoMembersList = async (orgcontract) => {

    const AccountId = await Accounts.accountAddress();
    if (orgcontract === null || !orgcontract || !orgcontract.tx || !AccountId) return;


    let data = await orgcontract.query.getDaoMemberDetailList(AccountId, {value, gasLimit});
    data = publicJs.formatResult(data);
    return data;

};

const addDaoModerator = async (orgcontract,obj,cb) => {

    const AccountId = await Accounts.accountAddress();
    if (orgcontract === null || !orgcontract || !orgcontract.tx || !AccountId) return;

    const {name,address} = obj;
    const injector = await Accounts.accountInjector();

     await orgcontract.tx.addDaoModerator({value, gasLimit}, name,address)
        .signAndSend(AccountId, { signer: injector.signer }, (result) => {
            if (result.status.isFinalized ) {
                cb(true)
             }
         });
};
const addDaoMember = async (orgcontract,obj,cb) => {

    const AccountId = await Accounts.accountAddress();
    if (orgcontract === null || !orgcontract || !orgcontract.tx || !AccountId) return;

    const {name,address} = obj;
    const injector = await Accounts.accountInjector();

    let data = await orgcontract.tx.addDaoMember({value, gasLimit}, name,address)
            .signAndSend(AccountId, { signer: injector.signer }, (result) => {
                if (result.status.isFinalized) {

                    cb(true)
                }
             });
    return data;
};


const resign = async (orgcontract,cb)=>{

    const AccountId = await Accounts.accountAddress();
    if (orgcontract === null || !orgcontract || !orgcontract.tx || !AccountId) return;

    const injector = await Accounts.accountInjector();

    await orgcontract.tx.resign({value, gasLimit},AccountId)
    .signAndSend(AccountId, { signer: injector.signer }, (result) => {
            cb(true)
         });
}
const removeDaoMember = async (orgcontract,obj,cb) => {

    const AccountId = await Accounts.accountAddress();
    if (orgcontract === null || !orgcontract || !orgcontract.tx || !AccountId) return;

    const {address} = obj;
    const injector = await Accounts.accountInjector();



    await orgcontract.tx.removeDaoMember({value, gasLimit}, address)
            .signAndSend(AccountId, { signer: injector.signer }, (result) => {
                if (result.status.isFinalized || result.status.isInBlock ) {
                    // cb(true)
                    // resolve(true);
                    if(AccountId !== address){
                        cb(true)
                    }else{
                        resign(orgcontract,cb)
                    }
                }
             });
};

const removeDaoModerator = async (orgcontract,obj,cb) => {

    const AccountId = await Accounts.accountAddress();
    if (orgcontract === null || !orgcontract || !orgcontract.tx || !AccountId) return;

    const {address} = obj;
    const injector = await Accounts.accountInjector();



    await orgcontract.tx.removeDaoModerator({value, gasLimit}, address)
        .signAndSend(AccountId, { signer: injector.signer }, (result) => {
            if (result.status.isFinalized) {

                if(AccountId !== address){
                    cb(true)
                }else{
                    resign(orgcontract,cb)
                }
            }
         });

};

export default {
    InitOrg,
    getDaoModeratorList,
    getDaoMembersList,
    addDaoModerator,
    addDaoMember,
    removeDaoMember,
    removeDaoModerator,
}
