import logo from '../../utils/images/Logo.png'
import UserAvatar from '../UserAvatar/UserAvatar'
import './Navbar.css'
function Navbar() {
    return (
        <div className='navBar'>
            <div className='branding'>
                <img src={logo} alt="Logo" width={30} height={30} className='brandingLogo' />
                <p className='brandingText'>To-Do</p>
            </div>
            <div>
            <UserAvatar/>
            </div>
        </div>

    )
}

export default Navbar
