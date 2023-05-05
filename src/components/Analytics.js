import ReactGA, { initialize } from 'react-ga';
import conf from '../conf/configuration'
export   function Analytics(page){
        ReactGA.initialize(conf.analyticsTrackingCode);
        ReactGA.pageview(page);
}
