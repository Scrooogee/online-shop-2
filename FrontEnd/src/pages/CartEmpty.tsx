
import EmptyCart from '../assets/img/empty_cart.png'
import { useNavigate } from "react-router-dom";

const CartEmpty: React.FC = () => {
    
    const navigate = useNavigate()
    const goToHome = () => {
        navigate('/')
        window.scrollTo({top: 0})
    }


    return(

        <div className="cart cart--empty"> 
            <h2>Oops...It's empty</h2>
            <img alt="empty" width={250} height={250} className="cart--empty-img" src={EmptyCart}></img>
            <button onClick={() => goToHome()} className="button button--black">Go back</button>
        </div>
    )
};


export default CartEmpty;