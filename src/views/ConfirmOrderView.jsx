import { useLocation } from 'react-router-dom';
import ConfirmOrder from '../components/checkout/ConfirmOrder';
import Breadcrumb from '../components/breadcrumb/Breadcrumb';

const ConfirmOrderView = () => {
  const location = useLocation();
  const orderData = location.state?.orderData || null;

  return (
    <>
      <Breadcrumb />
      <ConfirmOrder orderData={orderData} />
    </>
  );
};

export default ConfirmOrderView;