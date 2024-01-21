import React, { useState, useEffect } from 'react';
import "./Nav.css";

export default function Nav() {

    const [show, setShow] = useState(false);
    // scroll 시 네비게이션 배경색 변경
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if(window.scrollY > 50) {
                setShow(true);
            } else {
                setShow(false);
            }
        });
        return() => {
            window.removeEventListener("scroll", () => {});
        }
    }, []);

  return (
    <nav className={`nav ${show && "nav__black"}`}>
        <img 
            alt='netflix logo'
            src='https://upload.wikimedia.org/wikipedia/commons/6/69/Netflix_logo.svg'
            className='nav__logo'
            onClick={() => window.location.reload()}
        />
        <img 
            alt='user logged'
            src='https://pro2-bar-s3-cdn-cf.myportfolio.com/dddb0c1b4ab622854dd81280840458d3/baffc96f5eccbde6402befe0.png?h=b705fe09bd172c857c3d1f4ef01b406a'
            className='nav__avatar'
        />
    </nav>
  )
}
