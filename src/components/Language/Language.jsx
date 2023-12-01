import React, { useState, useEffect } from 'react';
import styles from './Language.module.scss';
import sprite from './../../images/icons/sprite.svg';

const Language = () => {
    let [lang, setLang] = useState(localStorage.getItem('selectedLanguage') || 'ru');
    const changeLang = (newLang) => {
        setLang(newLang);
        localStorage.setItem('selectedLanguage', newLang);
        document.location.reload()
    };

    return (
        <div className={styles.language}>
            <div className={styles.border}>
                <svg>
                    <use xlinkHref={`${sprite}#icon-border-one`}></use>
                </svg>
            </div>
            <button onClick={() => changeLang('ru')}>Рус</button>
            <button onClick={() => changeLang('en')}>Eng</button>
        </div>
    );
};

export default Language;