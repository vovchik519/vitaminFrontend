import React, { useState, useEffect } from 'react';

import styles from './Footer.module.scss';
import LogoWithName from './../LogoWithName/LogoWithName';
import { Link } from 'react-router-dom';

const Footer = (props) => {
    let server = 'https://vitamin-strapi.onrender.com'

    let [lang, setLang] = useState(localStorage.getItem('selectedLanguage') || 'ru');
    const changeLang = (newLang) => {
        setLang(newLang);
        localStorage.setItem('selectedLanguage', newLang);
        document.location.reload()
    };

    useEffect(() => {
        const newPromise = (ms = 0) => {
            return new Promise(r => setTimeout(() => r(), ms))
        }

        let footer = `${server}/api/footer?locale=${lang}&populate=deep`;

        async function fetchData() {
            try {
                await newPromise();
                const response = await fetch(footer, {
                    headers: {
                        Authorization: `Bearer 7c8c0a4eb49f1a805223ddc1c4cf372097105591875a611b9a2441195a7b0a068f494b9d2e96d87517c7200383390c70ee5d90162b1f58c6f5826ce7356997dfdc33dfb3e67b4b2be5798450d7184b4fbbf1da25e56d8e672e6c668e9d1be6c8375c3623c908a7dc4f1f67f4cc6f855dffa8be229094f29eecda98e3dac9d0ce`
                    }
                });
                const data = await response.json();
                // footer
                setFooter(data.data.attributes);
                // logo
                setLogo(data.data.attributes.logo);
                setLogoImg(data.data.attributes.logo.icon.data.attributes);
                setLogoWhiteImg(data.data.attributes.logo.iconWhite.data.attributes);
                // menu
                let menuList = []
                for (let i = 0; i < data.data.attributes.menu.data.attributes.item.length; i++) {
                    let menuItem = { name: '', link: '' }
                    menuItem.name = data.data.attributes.menu.data.attributes.item[i].name;
                    menuItem.link = data.data.attributes.menu.data.attributes.item[i].link;
                    menuList.push(menuItem)
                }
                setMenu(menuList);
                // social
                let socialList = []
                for (let i = 0; i < data.data.attributes.social.data.attributes.item.length; i++) {
                    let socialItem = { name: '', type: '', link: '', url: '', alt: '' }
                    socialItem.name = data.data.attributes.social.data.attributes.item[i].name;
                    socialItem.link = data.data.attributes.social.data.attributes.item[i].link;
                    socialItem.type = data.data.attributes.social.data.attributes.item[i].type;
                    socialItem.url = data.data.attributes.social.data.attributes.item[i].icon.data.attributes.url;
                    socialItem.urlWhite = data.data.attributes.social.data.attributes.item[i].iconWhite.data.attributes.url;
                    socialItem.alt = data.data.attributes.social.data.attributes.item[i].icon.data.attributes.alternativeText;
                    socialList.push(socialItem)
                }
                setSocial(socialList);
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, []);
    // footer
    const [footer, setFooter] = useState({});
    // logo
    const [logo, setLogo] = useState({});
    const [logoImg, setLogoImg] = useState({});
    const [logoWhiteImg, setLogoWhiteImg] = useState({});
    // menu
    const [menu, setMenu] = useState([]);
    // menu
    const [social, setSocial] = useState([]);
    return (
        <footer className={`${styles.footer} ${props.theme !== undefined ? styles[props.theme] : ''}`}>
            <div className={styles.wrap}>
                <div className="container">
                    <div className={styles.main}>
                        <Link to="/home" aria-label="Главная страница" className={styles.logo}>
                            <LogoWithName
                                theme={props.theme}
                                url={logoImg.url}
                                urlWhite={logoWhiteImg.url}
                                alt={logoImg.alternativeText}
                                name={logo.name}
                            />
                        </Link>
                        <nav className={styles.menu}>
                            <ul>
                                {menu.map((item, index) => (
                                    <li key={index}><Link to={item.link}>{item.name}</Link></li>
                                ))}
                            </ul>
                        </nav>
                        <div className={styles.socials}>
                            <ul>
                                {social.map((item, index) => (
                                    <li key={index}>
                                        {item.link == null ? (
                                            <p>
                                                <img src={`${item.url}`} alt={item.alt} className={styles.icon}/>
                                                <img src={`${item.urlWhite}`} alt={item.alt} className={styles.iconWhite}/>
                                                {item.name}
                                            </p>
                                        ) : item.type == null ? (
                                            <a href={`${item.link}`}>
                                                <img src={`${item.url}`} alt={item.alt} className={styles.icon}/>
                                                <img src={`${item.urlWhite}`} alt={item.alt} className={styles.iconWhite}/>
                                                {item.name}
                                            </a>
                                        ) : (
                                            <a href={`${item.type}${item.link}`}>
                                                <img src={`${item.url}`} alt={item.alt} className={styles.icon}/>
                                                <img src={`${item.urlWhite}`} alt={item.alt} className={styles.iconWhite}/>
                                                {item.name}
                                            </a>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={styles.subinfoWrap}>
                    <div className="container">
                        {lang === 'ru' ? 
                        <div className={styles.subinfo}>
                            <p>Все права защищены @ 2023</p>
                            <p>Политика конфиденциальности</p>
                            <p>Сделано в Deviart</p>
                            </div>
                            :
                            <div className={styles.subinfo}>
                                <p>All rights reserved @ 2023</p>
                                <p>Confidentiality Policy</p>
                                <p>Made in Deviart</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;