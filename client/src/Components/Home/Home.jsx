import { Link } from "react-router-dom";
import styles from '../Home/Home.module.css'


function Home() {
    
    
    return (
      <div className={styles.div}>
        <button>
        <Link to="/Landing" className={styles.LinkHomeButton}> 
        <p className={styles.text}>WE LOVE DOGS!</p>
        </Link>  
        </button>
      </div>
    );
   }
  
  export default Home;