import React from 'react';
import style from "./Footer.module.css";
import Octocat from '../../assets/image/Octocat.png'; 
// import { ReactComponent as Logo } from '../../assets/image/rs_school_js.svg';
import rsschooljs from '../../assets/image/rsschooljs.png'; 

const Footer = (props:any) => {
    return(
        <div className={[props.className, style.footer_block].join(' ')}>
            <div className={style.footer_container}>
                <a className={style.author_info} href="https://github.com/cup0ra">
                    <div className={style.github_img}>
                        <img src={Octocat} />
                    </div>
                    <div className={style.author_name}>
                        Siarhei Baranenkau
                    </div>
                </a>
                <a className={style.author_info} href="https://github.com/ritaheav">
                    <div className={style.github_img}>
                        <img src={Octocat} />
                    </div>
                    <div className={style.author_name}>
                        Margharyta Niabesnaya
                    </div>
                </a>
                <a className={style.author_info} href="https://github.com/david-sarif">
                    <div className={style.github_img}>
                        <img src={Octocat} />
                    </div>
                    <div className={style.author_name}>
                        Ruslan Bobreshov
                    </div>
                </a>
                <p className={style.year}>2020</p>
                <div className={style.rs_block}>
                    <a href="https://rs.school/js/" className="rs-logo">
                       <img src={rsschooljs} />
                    </a>              
                </div>
            </div>
        </div>
    )
}

export default Footer