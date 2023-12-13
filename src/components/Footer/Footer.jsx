import React, { useState, useEffect } from 'react';

import styles from './Footer.module.scss';
import LogoWithName from './../LogoWithName/LogoWithName';
import { Link } from 'react-router-dom';

const Footer = (props) => {
    let server = 'http://localhost:1337'

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
                        Authorization: `Bearer 693722d747686f20e7deb2fbe7b3eecbdb8720b42c1ad70d4ee73e75ecc0a8f46ffb61a89c6bc514385ae6e79f1f5c6851cea7996bcb1ef5a31ed3882ed43457b5345a26cbc9c08b2b2f738f18a25de50c152075e14e4896e5b599e0ed04c73977e8c67fc0d92de41c116c773d6716cbf425351cac529294d3988300d9827b9c`
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