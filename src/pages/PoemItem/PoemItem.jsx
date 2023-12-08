import React, { useRef, useState, useEffect } from 'react';

import styles from './PoemItem.module.scss';

import 'swiper/css';
import 'swiper/css/autoplay';

import PoemSection from '../../components/PoemSection/PoemSection';

import Header from './../../components/Header/Header';
import Footer from './../../components/Footer/Footer';

const PoemItem = () => {
    let server = 'http://localhost:1337'

    let lang = localStorage.getItem('selectedLanguage');

    useEffect(() => {
        const newPromise = (ms = 0) => {
            return new Promise(r => setTimeout(() => r(), ms))
        }

        let PoemData = `${server}/api/pantry?locale=${lang}&populate=deep`;

        async function fetchData() {
            try {
                await newPromise();
                const response = await fetch(PoemData, {
                    headers: {
                        Authorization: `Bearer 3d3e36e5ea990d87a42dfa45f2ea001352b21b00bf46f682e2f8842e5dabd5a7d8ba4e86ea548f4f380b15383f13bc50408e72492e573d8a864bf64a2bd8e30b78126b41b7bb67f2b45b078179428596009b497a90c6f047db3d678a4ec958b6f90228b65e6e23296d31d1a5b77994cd43fac61dd84c6cdc635db6596f5fc9bd`
                    }
                });
                const data = await response.json();
                // articles
                let articlesTitleArray = []
                let articlesParagraphArray = []
                let articlesParagraphIndentsArray = []
                let articlesIdArray = []
                for (let i = 0; i < data.data.attributes.poemsList.poems.data[0].attributes.item.length; i++) {
                    let articlesBlockParagraph = []
                    let articlesBlockParagraphIndents = []
                    let articlesBlockId = []
                    articlesTitleArray.push(data.data.attributes.poemsList.poems.data[0].attributes.item[i].title)
                    for (let j = 0; j < data.data.attributes.poemsList.poems.data[0].attributes.item[i].paragraph.length; j++) {
                        articlesBlockId.splice(0, 1, data.data.attributes.poemsList.poems.data[0].attributes.item[i].id)
                        articlesBlockParagraph.push(data.data.attributes.poemsList.poems.data[0].attributes.item[i].paragraph[j].paragraph)
                        articlesBlockParagraphIndents.push(data.data.attributes.poemsList.poems.data[0].attributes.item[i].paragraph[j].removeIndentation)
                    }
                    articlesParagraphArray.push(articlesBlockParagraph)
                    articlesParagraphIndentsArray.push(articlesBlockParagraphIndents)
                    articlesIdArray.push(articlesBlockId)
                }
                setArticlesTitle(articlesTitleArray)
                setArticlesParagraph(articlesParagraphArray)
                setArticlesParagraphIndents(articlesParagraphIndentsArray)
                setArticlesId(articlesIdArray)
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, []);

    // article
    const [articlesId, setArticlesId] = useState([]);
    const [articlesTitle, setArticlesTitle] = useState([]);
    const [articlesParagraph, setArticlesParagraph] = useState([]);
    const [articlesParagraphIndents, setArticlesParagraphIndents] = useState([]);
    function handleReloadClick() {
        setTimeout(() => {
            window.location.reload();
        }, 0)
    };

    return (
        <>
            <Header />
            <section className={styles.wrapper}>
                <div className="container">
                    {articlesId.map((blockId, index) => (
                        blockId == window.location.hash.substring(1) ? (
                            <div key={index} className={styles.block}>
                                <h2>
                                    {articlesTitle[index]}
                                </h2>
                                <div className={styles.text}>
                                    {articlesParagraph[index].map((textId, textIndex) => (
                                        <p key={textIndex} className={articlesParagraphIndents[index][textIndex] === true ? '' : 'indent'}>
                                            {articlesParagraph[index][textIndex]}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        ) : null
                    ))}
                </div>
            </section>
            <PoemSection
                event={handleReloadClick}
                page='poem-page'
            />
            <Footer />
        </>
    );
};

export default PoemItem;