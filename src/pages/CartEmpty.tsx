import { Link } from "react-router-dom";
import EmptyCart from '../assets/img/empty_cart.png'

const CartEmpty: React.FC = () => {
    return (
        <div className="cart cart--empty"> 
            <h2>Oops...It's empty</h2>
            <img alt="empty" width={250} height={250} className="cart__empty-img" src={EmptyCart}></img>
            <Link to='/'>
                <span className="button button--black">Go back</span>
            </Link>
        </div>
    )
}

export default CartEmpty;