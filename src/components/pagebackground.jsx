import React from 'react';
import bg from "../images/shape-5.png";
import bg2 from "../images/round-shape.png";
import bg3 from "../images/dottd-squre.png";

const PageBackground = ()=>{
    return <div>
        <div className="shape-image-five">
            <img src={bg} alt=""/>
        </div>
        <div className="shape-image-four">
            <img src={bg2} alt="" />
        </div>
        <div className="shape-image-two">
            <img src={bg3} alt="" />
        </div>
    </div>
}


export default PageBackground;
