import Carousel from 'react-bootstrap/Carousel';

const Banner = ({libroBanner}) => {
    return (
        <div className="banner-container">
            <Carousel fade>
                {libroBanner.map((item) => (
                    <Carousel.Item key={item.id}>
                        <img className="d-block w-100 banner-img" src={item.imagen} alt={item.nombre} />
                        <Carousel.Caption className="banner-caption">
                            <h3>{item.nombre}</h3>
                            <p>{item.descripcion}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
}

export default Banner;