import React,{Component} from 'react';

class StepNav extends Component{
    render() {
        return <div className='col-lg-12'>
            <ul className="breadcrumbstep">
                <li className={this.props.type === 1?'active':''}>Step 1. Basic information</li>
                <li className={this.props.type === 2?'active':''}>Step 2. Template selection</li>
                <li className={this.props.type === 3?'active':''}>Step 3. Template configuration</li>
                <li className={this.props.type === 4?'active':''}>Step 4. Completion</li>
            </ul>
        </div>;
    }
}

export default StepNav;
