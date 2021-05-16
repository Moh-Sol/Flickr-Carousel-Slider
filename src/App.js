/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-loop-func */

/* 

-För att kunna ändra i koden och få den funkar du behöver skriva bara:
npm i
i terminalen.
-Och för att kunna köra koden i local server du skriver bara: 
npm start 
i terminalen.
Obs. Se till att du har node installerat i din dator: 
https://nodejs.org/en/download/
 */

import './App.css';
import React, { useState, useEffect } from "react"
import Slider from "react-slick";      /*  Slider library for React */
import { motion } from 'framer-motion';   /*   Animation library for React  */
import ImageItem from './componenet/imageItem'

function App() {


  /* Här är de olika inställningar för den slider vi har   */
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    responsive: [ /* extra responsive möjligheter för att minska antal 'slides' när skärmen är mindre*/
      {
        breakpoint: 1070,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 720,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
    ]
  };



  let searchWord = ' cats';
  let apiKey = '9588ff16cc05d4e98bcb23ab4b518b05'
  let url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${searchWord}&sort=relevance&safe_search=1&per_page=500&format=json&nojsoncallback=1 `;



  const [allImagesLinks, setAllImagesLinks] = useState([]);       /* react state som ska inehålla alla länker för våra bilder */


  useEffect(() => {                        /* anrop för api som kommer köras en gång när koden börjar */
    fetch(url).then(function (responsiv) {
      return responsiv.json(url);
    }).then(function (data) {
      // console.log(data)
      let PhotoServer, PhotoId, PhotoSecret, PhotoSize, photoLink;
      for (let i = 1; i <= 12; i++) {
        PhotoServer = data.photos.photo[i].server;
        PhotoId = data.photos.photo[i].id;
        PhotoSecret = data.photos.photo[i].secret;
        PhotoSize = 'n';
        photoLink = `https://live.staticflickr.com/${PhotoServer}/${PhotoId}_${PhotoSecret}_${PhotoSize}.jpg`;

        // här pushar jag bliderna till react state som vi har. 
        setAllImagesLinks(link => [...link, { photoLink: photoLink, description: `Description of the ${i} component` }]
          // obs. eftersom vi har inte något beskrivning i data som vi har fått från api, så skapade jag standard data med bara ett nummer på image, men man kan ersätta med det det data man vill ha från DB.
        )
      }
    })
  }, [])





  return (
    <div className="App">
      <div className="slideshow-container">
        <h1 className='app-tilte'>  Flickr Carousel Slider</h1>
        <section>
          <Slider {...settings}>

            {allImagesLinks.map((link, key) => (
              <motion.div className='slide-container' key={key}
                /* Animation for hover on images for scale and color*/
                whileHover={{
                  scale: 0.98,
                  color: 'rgb(184, 150, 57)',
                }}
              >
                {/* här skpar jag en copmonent för varje image och skickar med den länken och describe för just den image som react-props  */}
                <ImageItem photoLink={link.photoLink} description={link.description} />

              </motion.div>
            ))}

          </Slider>

        </section>

      </div>


    </div >
  );
}

export default App;


