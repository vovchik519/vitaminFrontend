import React, { useState, useEffect } from 'react';

import styles from './Header.module.scss';
import Language from './../Language/Language';
import sprite from './../../images/icons/sprite.svg';
import { Link } from 'react-router-dom';

const Header = () => {
    let server = 'https://vitamin-strapi.onrender.com'

    let lang = localStorage.getItem('selectedLanguage');

    useEffect(() => {
        const newPromise = (ms = 0) => {
            return new Promise(r => setTimeout(() => r(), ms))
        }

        let header = `${server}/api/header?locale=${lang}&populate=deep`;

        async function fetchData() {
            try {
                await newPromise();
                const response = await fetch(header, {
                    headers: {
                        Authorization: `Bearer c5224769461038b577a69ae124da6d08dcd47d9a4ec518004002c0134ebbb20fa0e47fff5627cc00daf7910ce640fb688bc6eaff09b59e1402ccebd2dff38f358cc7bfa3be02fc1d9b41b7fd638f564c3f0a617b242d884e0f053d1dc23f18b0740e256c4ef8a45a9f5f9462587d64f035978be5f45a43f117d7303585cd9f39`
                    }
                });
                const data = await response.json();
                // logo
                setLogo(data.data.attributes.logo.data.attributes);
                // menu
                let menuList = []
                for (let i = 0; i < data.data.attributes.menu.data.attributes.item.length; i++) {
                    let menuItem = { name: '', link: '' }
                    menuItem.name = data.data.attributes.menu.data.attributes.item[i].name;
                    menuItem.link = data.data.attributes.menu.data.attributes.item[i].link;
                    menuList.push(menuItem)
                }
                setMenu(menuList);

            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, []);
    // logo
    const [logo, setLogo] = useState({});
    // menu
    const [menu, setMenu] = useState([]);

    const [menuOpen, setMenuOpen] = useState(false);

    let body = document.querySelector('body')
    const handleMenuOpen = () => {
        setMenuOpen(!menuOpen);
    };
    if (menuOpen === true) {
        body.classList.add('lock')
    } else {
        body.classList.remove('lock')
    }
    return (
        <header className={styles.header}>
            <div className='container'>
                <div className={styles.header__wrapper}>
                    <div className={styles.left}>
                        <button type="button" className={`${styles.menu__burger} ${menuOpen ? styles.opened : ''}`} onClick={handleMenuOpen} aria-label="Открыть меню">
                            <svg className='icon'>
                                <use xlinkHref={`${sprite}#icon-burger-open`}></use>
                            </svg>
                        </button>
                        <div className={styles.logo}>
                            <Link to="/home" aria-label='Главная страница'>
                                <img src={`${logo.url}`} alt={logo.alternativeText} />
                            </Link>
                        </div>
                    </div>
                    <div className={`${styles.menu__modal} ${menuOpen ? styles.active : ''}`}>
                        <div className={styles.menu__modalWrap}>
                            <div className={styles.menu__logo}>
                                <Link to="/home" aria-label="Главная страница">
                                    <img src={`${logo.url}`} alt={logo.alternativeText} />
                                </Link>
                                <button type="button" className={styles.menu__burger} onClick={handleMenuOpen} aria-label="Закрыть меню">
                                    <svg className='icon'>
                                        <use xlinkHref={`${sprite}#icon-burger-close`}></use>
                                    </svg>
                                </button>
                            </div>
                            <nav className={styles.menu}>
                                <ul>
                                    {menu.map((item, index) => (
                                        <li key={index}>
                                            <Link to={item.link}>{item.name}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <Language />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;