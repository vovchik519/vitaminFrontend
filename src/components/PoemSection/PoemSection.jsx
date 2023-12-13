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
                        Authorization: `Bearer afd19907103b263dc4102aaa14423bb320719813562c7e3bf752bb7793293d1661443b01ffa7d3094dc29268226832582d05e4ef8efa5a0bcd299aa8c42e0a69f96c58ba126448cec746f0ac55fc59da0115c656357fcefaed94d637cc390ce3680d18b700fcd2b12d84cacdbcda10a1dd4e18d9d6b70d80b7cefc2af2eab96e`
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