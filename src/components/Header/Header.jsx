import React, { useState, useEffect } from 'react';

import styles from './Header.module.scss';
import Language from './../Language/Language';
import sprite from './../../images/icons/sprite.svg';
import { Link } from 'react-router-dom';

const Header = () => {
    let server = 'http://localhost:1337'

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
                        Authorization: `Bearer 693722d747686f20e7deb2fbe7b3eecbdb8720b42c1ad70d4ee73e75ecc0a8f46ffb61a89c6bc514385ae6e79f1f5c6851cea7996bcb1ef5a31ed3882ed43457b5345a26cbc9c08b2b2f738f18a25de50c152075e14e4896e5b599e0ed04c73977e8c67fc0d92de41c116c773d6716cbf425351cac529294d3988300d9827b9c`
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