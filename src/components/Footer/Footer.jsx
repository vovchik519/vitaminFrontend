import React, { useState, useEffect } from 'react';

import styles from './Footer.module.scss';
import LogoWithName from './../LogoWithName/LogoWithName';

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
                        Authorization: `Bearer 52e194f58551bab2374b542d3d9485d74895558793cceba1cb9b6a4d0099470f0831ce59d8d24fbf8dd0c605680e71928ceb3f58eaca6050c6f3bef377ceae97c41312ad4dfa2fab427f65c72091aa183499cbb9ef49a231ed33cce46118eb7990bf7dccb35e9f0fa0fdaf6b0c15668ccb5a2a844eb6b50e8e42a2fb3569ac5b`
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
                        <a href="/home" aria-label="Главная страница" className={styles.logo}>
                            <LogoWithName
                                theme={props.theme}
                                url={logoImg.url}
                                urlWhite={logoWhiteImg.url}
                                alt={logoImg.alternativeText}
                                name={logo.name}
                            />
                        </a>
                        <nav className={styles.menu}>
                            <ul>
                                {menu.map((item, index) => (
                                    <li key={index}><a href={item.link}>{item.name}</a></li>
                                ))}
                            </ul>
                        </nav>
                        <div className={styles.socials}>
                            <ul>
                                {social.map((item, index) => (
                                    <li key={index}>
                                        {item.link == null ? (
                                            <p>
                                                <img src={`${server}${item.url}`} alt={item.alt} className={styles.icon}/>
                                                <img src={`${server}${item.urlWhite}`} alt={item.alt} className={styles.iconWhite}/>
                                                {item.name}
                                            </p>
                                        ) : item.type == null ? (
                                            <a href={`${item.link}`}>
                                                <img src={`${server}${item.url}`} alt={item.alt} className={styles.icon}/>
                                                <img src={`${server}${item.urlWhite}`} alt={item.alt} className={styles.iconWhite}/>
                                                {item.name}
                                            </a>
                                        ) : (
                                            <a href={`${item.type}${item.link}`}>
                                                <img src={`${server}${item.url}`} alt={item.alt} className={styles.icon}/>
                                                <img src={`${server}${item.urlWhite}`} alt={item.alt} className={styles.iconWhite}/>
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
                        <div className={styles.subinfo}>
                            <p>Все права защищены @ 2023 </p>
                            <p>Политика конфиденциальности</p>
                            <p>Сделано в Deviart</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;