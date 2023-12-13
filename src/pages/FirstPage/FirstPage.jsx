import React, { useState, useEffect } from 'react';

import styles from './FirstPage.module.scss';
import sprite from './../../images/icons/sprite.svg';
import Language from './../../components/Language/Language';
import LogoWithName from './../../components/LogoWithName/LogoWithName';
import { Link } from 'react-router-dom';

const FirstPage = () => {
    let server = 'https://vitamin-strapi.onrender.com'

    let lang = localStorage.getItem('selectedLanguage')
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
                        Authorization: `Bearer afd2f38f8ba0b68ec197f71a6b8c3af7f30656ef362e8dd77602a707fda378ad471de0eb2854feddad49e365122884e2688adbf517669b970c1fa0bca5c2a27b93f4b7aaf6ef084d1520125d7e17964b619e9ca8566761b9a20bcb9974c9e097dff0f96e9c13b2e064a707e2be0415a1918884ae4805804ef04ed3dfd707c5d9`
                    }
                });
                const data = await response.json();
                console.log(data)
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
        backgroundImage: `url(${background.url})`,
    }
    return (
        <section className={styles.firstPage} style={backgroundStyle}>
            <div className={styles.head}>
                <Link to="/home" aria-label="Главная страница" className={styles.logo}>
                    <LogoWithName
                        visibility='desctop'
                        url={logoImg.url}
                        urlWhite={logoWhiteImg.url}
                        alt={logoImg.alternativeText}
                        name={logo.name}
                    />
                </Link>
                <h1>{data.title}</h1>
            </div>
            <div className={styles.foot}>
                <Language />
                <Link to='/home' className={styles.link} aria-label={data.buttonName}>
                    <svg className="icon">
                        <use xlinkHref={`${sprite}#icon-arrow-right`}></use>
                    </svg>
                </Link>
            </div>
        </section>
    );
};

export default FirstPage;