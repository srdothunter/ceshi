# subDAO-frontend


## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### `yarn test`

Launches the test runner in the interactive watch mode.\

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### 所有内容需要添加在develop分支

### main
调用接口写在 forthStep.jsx文件中

### base
调用接口写在 about.jsx文件中

```
useEffect(() => {

        // basecontract


    }, [basecontract]);

```

### daomanager
调用接口写在 about.jsx文件中

```
useEffect(() => {

        // daoManagercontract


    }, [daoManagercontract]);

```


### vote
调用接口写在 vote.jsx文件中

```
useEffect(() => {

        // votecontract


    }, [votecontract]);

```



### vault
调用接口写在 vault.jsx文件中
```
useEffect(() => {

        // vaultcontract


    }, [vaultcontract]);

```

### org
调用接口写在 org.jsx文件中
```
useEffect(() => {

        // orgcontract


    }, [orgcontract]);

```

### query （secondStep.jsx）

```
        const AccountId = JSON.parse(sessionStorage.getItem('account')); //本地账户
        console.log(maincontract)

        let listTemplates = await maincontract.query.listTemplates(AccountId[0].address, { value: 0, gasLimit: -1 });

        console.log("======",listTemplates)
        if(listTemplates && listTemplates.output){
               console.log("======",listTemplates) //格式化
           }
```

### tx (forthStep.jsx)

```
        const value = 0;
        const gasLimit = 138003n * 1000000n;
        const keyring = new Keyring({type: 'sr25519'});
        let alicePair = keyring.createFromUri('//Alice');
        await maincontract.tx.instanceByTemplate({value, gasLimit}, 0, "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY")
        .signAndSend(alicePair, (result) => {
            console.log("hello");
            if (result.status.isInBlock) {
                console.log('in a block',result);
                // console.log(result.output.toHuman())
            } else if (result.status.isFinalized) {
                console.log('finalized');
            }
        });
```
