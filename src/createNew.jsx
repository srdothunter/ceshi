import React, {useState, useEffect} from 'react';
import StepNav from './components/stepNav';
import FirstStep from './components/create/firstStep';
import SecondStep from './components/create/secondStep';
import ThirdStep from './components/create/thirdStep';
import ForthStep from './components/create/forthStep';
import PageBackground from "./components/pagebackground";

export default function  Createnew(props) {

    const [type, settype] = useState(1);
    let [imgUrl, setimgUrl ]= useState('');

    const setStep = (i) => {
        settype(i);
        sessionStorage.setItem('step', i)
    }

    const handleImageChange = (e) => {
        setimgUrl(e.target.value)
        sessionStorage.setItem('ImageUrl', e.target.value)
    }

    const removeImage = () => {
        setimgUrl('')
        sessionStorage.setItem('ImageUrl', '')
    }

    useEffect(() => {
        let type = sessionStorage.getItem('step');
        settype( type ?  parseInt(type) : 1);

        let ImageUrl = sessionStorage.getItem('ImageUrl');
        setimgUrl( setimgUrl ?  ImageUrl : '');

    }, []);


        return (<div>
                <section>
                    <PageBackground/>
                    <div className="container">
                        <div className="createSingle row">
                            <StepNav type={type}/>
                            <div className='col-lg-4'>
                                {
                                    imgUrl && <div className='uploadBrdr'>
                                        <img src={imgUrl} alt=""/>
                                        {
                                            type !== 4 &&<i className='fa fa-remove removeBrdr'  onClick={removeImage}/>
                                        }

                                    </div>

                                }
                                {
                                    !imgUrl && <div className='uploadBrdr'>
                                        <input type="text"
                                               placeholder="Please fill your DAO's imageUrl"
                                               onChange={handleImageChange}
                                        />
                                    </div>
                                }
                            </div>
                            <div className='col-lg-8'>
                                {type === 1 && <FirstStep handlerSet={setStep}/>}
                                {type === 2 && <SecondStep handlerSet={setStep}/>}
                                {type === 3 && <ThirdStep handlerSet={setStep}/>}
                                {type === 4 && <ForthStep handlerSet={setStep}  history={props.history}/>}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );

}
