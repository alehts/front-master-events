import Gif from '../../Images/loader-gif.gif';
import './LoadingComponent.scss';

const LoadingComponent = () => {
   return (
      <div className="db-loading-component">
         <img src={Gif} />
      </div>
   );
};

export default LoadingComponent;
