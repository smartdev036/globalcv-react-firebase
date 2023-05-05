import React ,{Component} from 'react';
import Lottie from 'react-lottie';
import './installationSuccess.scss'
import successAnimation from '../../../assets/animations/lottie-success.json'
class InstallationSuccess extends Component{
    render(){
        const successOptions = {
            loop: false,
            autoplay: true,
            animationData: successAnimation,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        };
        return(
            <div className="instalationSuccess">
                <Lottie  options={successOptions} height={200} width={200} />
                <span className="successMessage">Almost there, Lets setup your admin account</span>
                <a onClick={()=>this.props.nextStep()} className="btn-default"> Setup</a>
            </div>
        )
    }
}
export default InstallationSuccess