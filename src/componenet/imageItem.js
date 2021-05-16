import React, { useState } from "react"
import { motion } from 'framer-motion';






function ImageItem(props) {

    let imageSize = props.photoLink;

    /* Denna funktion för att ändra query i api länken som ger oss storlekn på image */
    function changeImgSize(img) {
        return img.replace('_n', '_b');
    }

    changeImgSize(imageSize);

    const [showDescription, setShowDescription] = useState('none');   /* display ska vara 'none' som standard  */

    return (
        <motion.div
            // obs. detta kan jag fixa en vanlig css-kod också.
            onHoverStart={() => setShowDescription('block')} /* on hover - display : block  */
            onHoverEnd={() => setShowDescription('none')} /*  hover end  - display : none  */
            onClick={() => window.location.href = `${changeImgSize(imageSize)} `  /* för att öpnna image på ett större storlek vid klick */
            }

        >
            < img className='img-class' src={props.photoLink} alt={props.description} title={props.photoLink} />
            <h5 className='describe-text' style={{ display: showDescription }}>{props.description} </h5>
        </motion.div >
    );
}

export default ImageItem;