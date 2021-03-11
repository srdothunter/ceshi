import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../scss/slider.scss"
import React, {Component} from 'react';
import Slider from "react-slick";

class Slick extends Component {
    handleClicktoAbout(id) {
        this.props.history.push(`/about/${id}`)
    }
    next = () => {
        this.slider.slickNext();
    }
    prev = () => {
        this.slider.slickPrev();
    }
    componentDidMount() {
        let list = JSON.parse(sessionStorage.getItem('homelist'))
        if(list!=null){
            this.setState({list})
        }
    }

    render() {
        const settings = {
            slidesToShow: 5,
            slidesToScroll: 1,
            dots: false,
            infinite: true,
            centerMode: true,
            swipeToSlide: true,
            focusOnSelect: true,
            arrows: false,
            responsive: [{
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        };
        const {list} = this.props;
        return (
            <div>
                <span className={list&&list.length?"slick-prev":"slick-prev slick-disabled"} onClick={this.prev}>prev</span>
                <span className={list&&list.length?"slick-next":"slick-next slick-disabled"} onClick={this.next}>Next</span>
            <div className='sliderBrdr'>
                <Slider ref={slider => (this.slider = slider)} {...settings}>
                    {
                        list.map(item=>
                            <div className="testimonial-slider-img" key={item.address}>
                                <img src={item.logo} alt="" onClick={this.handleClicktoAbout.bind(this,item.address)}/>
                            </div>
                        )
                    }
                </Slider>

            </div>

            </div>
        );
    }

}
export default Slick;
