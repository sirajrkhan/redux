import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComp,axios) => {
    return class extends Component{
        constructor(props){
            super();
            axios.interceptors.request.use(
                req => {
                    this.setState({errorLog:null});
                    return req;
                }
            )
            axios.interceptors.response.use( res => res, error => {
                return (
                    this.setState({errorLog: error})
                    )
                }
            )
        }

        state = {
            errorLog: null
        }

        errorConfirmedHandler = () => {
            this.setState({errorLog: null})
        }
        
        render(){
            return (
                <>
                    <Modal 
                        show={this.state.errorLog} 
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.errorLog ? this.state.errorLog.message : null}
                    </Modal>
                    <WrappedComp {...this.props} />
                </>
            )
        }
    }
}

export default withErrorHandler;