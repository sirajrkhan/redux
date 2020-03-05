import React, { Component } from 'react';
import classes from './Modal.module.css'
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component{
    
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children; 
    }

    componentWillUpdate(){
        console.log('Modal - Component will Update');        
    }

    render() {
        return(
            <>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div 
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}
                    className={classes.Modal}>
                    {this.props.children} 
                </div>
            </>
        )
    }

}

export default Modal;

// const modal = (props) => (
//     <>
//         <Backdrop show={props.show} clicked={props.modalClosed} />
//         <div 
//             style={{
//                 transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
//                 opacity: props.show ? '1' : '0'
//             }}
//             className={classes.Modal}>
//             {props.children} 
//         </div>
//     </>
// );
