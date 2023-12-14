import React, { useState, useEffect, useRef } from 'react';

import styles from './PoemSection.module.scss';

import sprite from './../../images/icons/sprite.svg';
import PoemList from './../PoemList/PoemList';

const PoemSection = (props) => {
    let server = 'https://vitamin-strapi.onrender.com'

    let lang = localStorage.getItem('selectedLanguage');

    useEffect(() => {
        const newPromise = (ms = 0) => {
            return new Promise(r => setTimeout(() => r(), ms))
        }

        let PoemData = `${server}/api/${props.page}?locale=${lang}&populate=deep`;

        async function fetchData() {
            try {
                await newPromise();
                const response = await fetch(PoemData, {
                    headers: {
                        Authorization: `Bearer 58311277418a1f6ac723a66b9db9c9b80f0ff6f6c34f18fb90d7375db14538c0f3611f1156e0c86c11d2ee21eb35b6050bf3fa8c3aafd5ba9b655451d9872da6b632e37882e2b166c02d9363aa74cef6796780f4cde18b3caa481959db7aa9aa1a3afc099e7cd8b1539b080381cdc1c8352ced2a7ef7a14a862bd4e3e62ca6f7`
                    }
                });
                const data = await response.json();
                setPoem(data.data.attributes.poemsList)
                setPoemTextSup(data.data.attributes.poemsList.supText)
                setPoemTextSub(data.data.attributes.poemsList.subText)
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, []);

    const [poem, setPoem] = useState([]);
    const [poemTextSup, setPoemTextSup] = useState([]);
    const [poemTextSub, setPoemTextSub] = useState([]);

    const poemTextSupArray = [];
    const poemTextSubArray = [];

    multiData(poemTextSupArray, poemTextSup, 'paragraph')
    multiData(poemTextSubArray, poemTextSub, 'paragraph')

    function multiData(array, data, key) {
        for (let i = 0; i < data.length; i++) {
            array.push(data[i][key])
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.wrap}>
                <div className={styles.supText}>
                    {poemTextSupArray.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </div>
                <h2>{poem.title}</h2>
                <div className={styles.subText}>
                    {poemTextSubArray.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </div>
            </div>
            <PoemList event={props.event} page={props.page} />
        </div>
    );
};

export default PoemSection;