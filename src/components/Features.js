import meter1 from "../assets/img/wallet.svg";
import meter2 from "../assets/img/cat-img.svg";
import meter3 from "../assets/img/grow.svg";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import arrow1 from "../assets/img/arrow1.svg";
import arrow2 from "../assets/img/arrow2.svg";
import colorSharp from "../assets/img/color-sharp.png";

export const Features = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <section className="features" id="how-it-works">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="features-bx wow zoomIn">
              <h2>How It Works</h2>
              <p>Fasten your seatbelt. These are the 3 easy steps.</p>
              <Carousel
                responsive={responsive}
                // infinite={true}
                className="owl-carousel owl-theme features-slider"
              >
                <div className="item">
                  <img src={meter1} alt="Image" />
                  <h5>Connect your Wallet</h5>
                  <p>Connect to wallet of your choice</p>
                </div>
                <div className="item">
                  <img src={meter2} alt="Image" />
                  <h5>Setup your engagement NFTs </h5>
                  <p>
                    Create NFTs to mint for your fans, setup the price and
                    mechanism
                  </p>
                </div>
                <div className="item">
                  <img src={meter3} alt="Image" />
                  <h5>Grow your audiences</h5>
                  <p>Share it or integrate with your streaming platforms</p>
                </div>
              </Carousel>
            </div>
          </div>
        </div>
      </div>
      <img className="background-image-left" src={colorSharp} alt="Image" />
    </section>
  );
};
