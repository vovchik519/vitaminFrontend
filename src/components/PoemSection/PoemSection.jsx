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
                        Authorization: `Bearer 52e194f58551bab2374b542d3d9485d74895558793cceba1cb9b6a4d0099470f0831ce59d8d24fbf8dd0c605680e71928ceb3f58eaca6050c6f3bef377ceae97c41312ad4dfa2fab427f65c72091aa183499cbb9ef49a231ed33cce46118eb7990bf7dccb35e9f0fa0fdaf6b0c15668ccb5a2a844eb6b50e8e42a2fb3569ac5b`
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