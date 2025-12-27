import { Row, Col } from 'react-bootstrap';
import { dataBanner } from '../data/database';
import Banner from '../components/Banner';

const BannerListView = () => {
    return (
        <Row>
            <Banner libroBanner={dataBanner} />
        </Row>
    );
};

export default BannerListView;