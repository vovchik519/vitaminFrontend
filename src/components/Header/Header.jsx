import React, { useState, useEffect } from 'react';

import styles from './Header.module.scss';
import Language from './../Language/Language';
import sprite from './../../images/icons/sprite.svg';
import { Link } from 'react-router-dom';

const Header = () => {
    let server = 'https://vitamin-strapi.onrender.com/admin'

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
                        Authorization: `Bearer afd2f38f8ba0b68ec197f71a6b8c3af7f30656ef362e8dd77602a707fda378ad471de0eb2854feddad49e365122884e2688adbf517669b970c1fa0bca5c2a27b93f4b7aaf6ef084d1520125d7e17964b619e9ca8566761b9a20bcb9974c9e097dff0f96e9c13b2e064a707e2be0415a1918884ae4805804ef04ed3dfd707c5d9`
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
        body.classList.toggle('lock')
    };
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