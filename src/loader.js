import Loader from 'react-loader-spinner';
const LoaderComp = () => {
  return (
    <Loader
      type="Bars"
      color="rgb(147, 0, 167)"
      height={70}
      width={70}
      timeout={5000}
      
    />
  );
};
export default LoaderComp;
