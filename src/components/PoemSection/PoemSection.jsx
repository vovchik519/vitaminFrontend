import React, { useState, useEffect, useRef } from 'react';

import styles from './PoemSection.module.scss';

import sprite from './../../images/icons/sprite.svg';
import PoemList from './../PoemList/PoemList';

const PoemSection = (props) => {
    let server = 'http://localhost:1337'

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
                        Authorization: `Bearer 3d3e36e5ea990d87a42dfa45f2ea001352b21b00bf46f682e2f8842e5dabd5a7d8ba4e86ea548f4f380b15383f13bc50408e72492e573d8a864bf64a2bd8e30b78126b41b7bb67f2b45b078179428596009b497a90c6f047db3d678a4ec958b6f90228b65e6e23296d31d1a5b77994cd43fac61dd84c6cdc635db6596f5fc9bd`
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
    console.log(poemTextSupArray)

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