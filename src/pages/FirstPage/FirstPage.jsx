import React, { useState, useEffect } from 'react';

import styles from './FirstPage.module.scss';
import sprite from './../../images/icons/sprite.svg';
import Language from './../../components/Language/Language';
import LogoWithName from './../../components/LogoWithName/LogoWithName';
import { Link } from 'react-router-dom';

const FirstPage = () => {
    let server = 'http://localhost:1337'

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
                        Authorization: `Bearer 693722d747686f20e7deb2fbe7b3eecbdb8720b42c1ad70d4ee73e75ecc0a8f46ffb61a89c6bc514385ae6e79f1f5c6851cea7996bcb1ef5a31ed3882ed43457b5345a26cbc9c08b2b2f738f18a25de50c152075e14e4896e5b599e0ed04c73977e8c67fc0d92de41c116c773d6716cbf425351cac529294d3988300d9827b9c`
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