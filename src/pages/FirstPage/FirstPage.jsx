import React, { useState, useEffect } from 'react';

import styles from './FirstPage.module.scss';
import sprite from './../../images/icons/sprite.svg';
import Language from './../../components/Language/Language';
import LogoWithName from './../../components/LogoWithName/LogoWithName';

const FirstPage = () => {
    let server = 'http://localhost:1337'

    let lang = localStorage.getItem('selectedLanguage');

    useEffect(() => {
        const newPromise = (ms = 0) => {
            return new Promise(r => setTimeout(() => r(), ms))
        }

        let firstPage = `${server}/api/first-page?locale=${lang}&populate=deep`;

        async function fetchData() {
            try {
                await newPromise();
                const response = await fetch(firstPage, {
                    headers: {
                        Authorization: `Bearer 52e194f58551bab2374b542d3d9485d74895558793cceba1cb9b6a4d0099470f0831ce59d8d24fbf8dd0c605680e71928ceb3f58eaca6050c6f3bef377ceae97c41312ad4dfa2fab427f65c72091aa183499cbb9ef49a231ed33cce46118eb7990bf7dccb35e9f0fa0fdaf6b0c15668ccb5a2a844eb6b50e8e42a2fb3569ac5b`
                    }
                });
                const data = await response.json();
                // firstpage data
                setData(data.data.attributes);
                // logo
                setLogo(data.data.attributes.logo);
                setLogoImg(data.data.attributes.logo.icon.data.attributes);
                setLogoWhiteImg(data.data.attributes.logo.iconWhite.data.attributes);
                // background
                setBackground(data.data.attributes.background.data.attributes);
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, []);

    // firstpage data
    const [data, setData] = useState({});
    // logo
    const [logo, setLogo] = useState({});
    const [logoImg, setLogoImg] = useState({});
    const [logoWhiteImg, setLogoWhiteImg] = useState({});
    // background
    const [background, setBackground] = useState({});
    let backgroundStyle = {
        backgroundImage: `url(${server}${background.url})`,
    }
    return (
        <section className={styles.firstPage} style={backgroundStyle}>
            <div className={styles.head}>
                <a href="/home" aria-label="Главная страница" className={styles.logo}>
                    <LogoWithName
                        visibility='desctop'
                        url={logoImg.url}
                        urlWhite={logoWhiteImg.url}
                        alt={logoImg.alternativeText}
                        name={logo.name}
                    />
                </a>
                <h1>{data.title}</h1>
            </div>
            <div className={styles.foot}>
                <Language />
                <a href="/home" className={styles.link} aria-label={data.buttonName}>
                    <svg className="icon">
                        <use xlinkHref={`${sprite}#icon-arrow-right`}></use>
                    </svg>
                </a>
            </div>
        </section>
    );
};

export default FirstPage;