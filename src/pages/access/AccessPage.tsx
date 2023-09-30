import LoginPage from './Loginpage'
import SignUppage from './SignUpPage'
import './styles/AccessGlobalStyle.css'
import { useSelector } from 'react-redux'
interface IState {
    access: {
      isLogin: boolean; 
    };
  }
function AccessPage() {
  let IsLogin=useSelector((state:IState)=>state.access.isLogin)
  return (
   <>
   {IsLogin?<LoginPage/>: <SignUppage/>}
   </>
  )
}

export default AccessPage