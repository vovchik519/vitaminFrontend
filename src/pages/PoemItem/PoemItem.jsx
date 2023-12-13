import React, { useRef, useState, useEffect } from 'react';

import styles from './PoemItem.module.scss';

import 'swiper/css';
import 'swiper/css/autoplay';

import PoemSection from '../../components/PoemSection/PoemSection';

import Header from './../../components/Header/Header';
import Footer from './../../components/Footer/Footer';

const PoemItem = () => {
    let server = 'https://vitamin-strapi.onrender.com'

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
                        Authorization: `Bearer afd19907103b263dc4102aaa14423bb320719813562c7e3bf752bb7793293d1661443b01ffa7d3094dc29268226832582d05e4ef8efa5a0bcd299aa8c42e0a69f96c58ba126448cec746f0ac55fc59da0115c656357fcefaed94d637cc390ce3680d18b700fcd2b12d84cacdbcda10a1dd4e18d9d6b70d80b7cefc2af2eab96e`
                    }
                });
                const data = await response.json();
                // articles
                let articlesTitleArray = []
                let articlesTypeArray = []
                let articlesParagraphArray = []
                let articlesParagraphIndentsArray = []
                let articlesIdArray = []
                for (let i = 0; i < data.data.attributes.poemsList.poems.data[0].attributes.item.length; i++) {
                    let articlesBlockParagraph = []
                    let articlesBlockParagraphIndents = []
                    let articlesBlockId = []
                    articlesTitleArray.push(data.data.attributes.poemsList.poems.data[0].attributes.item[i].title)
                    articlesTypeArray.push(data.data.attributes.poemsList.poems.data[0].attributes.item[i].storiesStyle)
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
                setArticlesType(articlesTypeArray)
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, []);

    // article
    const [articlesId, setArticlesId] = useState([]);
    const [articlesType, setArticlesType] = useState([]);
    const [articlesTitle, setArticlesTitle] = useState([]);
    const [articlesParagraph, setArticlesParagraph] = useState([]);
    const [articlesParagraphIndents, setArticlesParagraphIndents] = useState([]);
    console.log(articlesType)
    function handleReloadClick() {
        setTimeout(() => {
            window.location.reload();
        }, 0)
    };

    return (
        <>
            <Header />
            {articlesId.map((blockId, index) => (
                blockId == window.location.hash.substring(1) ? (
                    <div key={index}>
                        {articlesType[index] === true ?
                            <section className={styles.wrapperTwo}>
                                <div className="container">

                                    <div className={styles.blockTwo}>
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
                                </div>
                            </section> :
                            <section className={styles.wrapper}>
                                <div className="container">

                                    <div className={styles.block}>
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
                                </div>
                            </section>
                        }
                    </div>
                ) : null
            ))}
            <PoemSection
                event={handleReloadClick}
                page='poem-page'
            />
            <Footer />
        </>
    );
};

export default PoemItem;