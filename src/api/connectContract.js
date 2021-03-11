import { ContractPromise } from '@polkadot/api-contract';

import mainAbi from '../abi/target/main_v0.1';

import baseAbi from '../abi/target/base_v0.1';

import erc20Abi from '../abi/target/erc20_v0.1';

import orgAbi from '../abi/target/org_v0.1';

import vaultAbi from '../abi/target/vault_v0.1';

import voteAbi from '../abi/target/vote_manager_v0.1';

import daoManagerAbi from '../abi/target/dao_manager_v0.1';


const ConnectContract = async (api,type,address) =>{
    if(!api){
      return
    }
    let abi;
    switch(type){

        case'base':
            abi = baseAbi;
            break;
        case'erc20':
            abi = erc20Abi;
            break;
        case'org':
            abi = orgAbi;
            break;
        case'vault':
            abi = vaultAbi;
            break;
        case'vote':
            abi = voteAbi;
            break;
        case'daoManager':
            abi = daoManagerAbi;
            break;
        default:
        case'main':
            abi = mainAbi;
            break;

    }
    const mainContract = new ContractPromise(api, abi, address);
    return mainContract;
  }

export default ConnectContract
