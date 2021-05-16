import React, { useState } from "react"
import { motion } from 'framer-motion';


function ImageItem(props) {

    const [showDescription, setShowDescription] = useState('none');   /* display ska vara 'none' som standard  */

    return (
        <motion.div
            // obs. detta kan jag fixa en vanlig css-kod också.
            onHoverStart={() => setShowDescription('block')} /* on hover - display : block  */
            onHoverEnd={() => setShowDescription('none')} /*  hover end  - display : none  */
            onClick={() => window.location.href = `${props.photoLink} `  /* för att öpnna image vid klick */
            }

        >
            < img className='img-class' src={props.photoLink} alt={props.description} title={props.photoLink} />
            <h5 className='describe-text' style={{ display: showDescription }}>{props.description} </h5>
        </motion.div >
    );
}

export default ImageItem;