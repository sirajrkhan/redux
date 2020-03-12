import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const CheckoutSummary = (props) => {
    const styles = {
        center: {textAlign: `center`},
        bold: {fontWeight: `bold`}
    }

    return (
        <>
            <h1 style={{...styles.center , ...styles.bold}}>Checkout Summary</h1>
            <Burger ingred={props.ingredients} />
            <div style={styles.center}>
                <Button clicked={props.checkoutCancelled} btnType="Danger">CANCEL</Button>
                <Button clicked={props.checkoutContinued} btnType="Success">CONTINUE</Button>
            </div>
        </>
    )
}

export default CheckoutSummary;