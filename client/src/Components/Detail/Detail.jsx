import axios from 'axios'
import styles from '../Detail/Detail.module.css';
import React, { useEffect, useState } from "react";
import { useParams, Link  } from "react-router-dom";

const Detail = () => {
    
    return (
        <div className={styles.div}>
            <div>   
                <div>
                    <Link to="/home" className={styles.TheDogApp}>
                        THE DOG APP
                    </Link>
                </div>
            </div>
            
           
        </div>       
    )
}

export default Detail;