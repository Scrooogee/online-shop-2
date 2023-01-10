
import Header from './Header';
import { Outlet } from "react-router-dom";

const  MainLayloat: React.FC = () => (
    <div className="wrapper">
        <Header/>
        <div className="content">
            <div className="container">
                <Outlet/>
            </div>
        </div>
    </div>
);

export default MainLayloat;