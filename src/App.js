import Routerlink from './router/router'
import FootBtm from "./components/footBtm";
import React from "react";
import Headertop from "./components/header";
import { SubstrateContextProvider} from './api/contracts';


function App() {
    return (
        <SubstrateContextProvider>
            <div >
                <Headertop />
                <Routerlink />
                <FootBtm />
            </div>
      </SubstrateContextProvider>
    );
}

export default App;
