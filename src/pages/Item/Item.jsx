import React, { useRef, useState, useEffect } from 'react';

import styles from './Item.module.scss';

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import sprite from './../../images/icons/sprite.svg';
import Name from './../../ui/Name/Name';
import LinkDark from '../../ui/LinkDark/LinkDark';

const Item = () => {
    let server = 'http://localhost:1337'

    let lang = localStorage.getItem('selectedLanguage');

    useEffect(() => {
        const newPromise = (ms = 0) => {
            return new Promise(r => setTimeout(() => r(), ms))
        }

        let ArticlePage = `${server}/api/article-page?locale=${lang}&populate=deep`;

        async function fetchData() {
            try {
                await newPromise();
                const response = await fetch(ArticlePage, {
                    headers: {
                        Authorization: `Bearer 3d3e36e5ea990d87a42dfa45f2ea001352b21b00bf46f682e2f8842e5dabd5a7d8ba4e86ea548f4f380b15383f13bc50408e72492e573d8a864bf64a2bd8e30b78126b41b7bb67f2b45b078179428596009b497a90c6f047db3d678a4ec958b6f90228b65e6e23296d31d1a5b77994cd43fac61dd84c6cdc635db6596f5fc9bd`
                    }
                });
                const data = await response.json();

                // articles
                let articlesTitleArray = []
                let articlesParagraphArray = []
                let articlesParagraphIndentsArray = []
                let articlesParagraphTitleArray = []
                let articlesImageArray = []
                let articlesIdArray = []
                let articlesParagraphIdArray = []
                for (let i = 0; i < data.data.attributes.articles.data[0].attributes.block.length; i++) {
                    let articlesBlockTitle = []
                    let articlesBlockParagraph = []
                    let articlesBlockParagraphIndents = []
                    let articlesBlockId = []
                    let articlesBlockParagraphId = []
                    articlesTitleArray.push(data.data.attributes.articles.data[0].attributes.block[i].title)
                    articlesImageArray.push(data.data.attributes.articles.data[0].attributes.block[i].image.data.attributes.url)
                    for (let j = 0; j < data.data.attributes.articles.data[0].attributes.block[i].paragraph.length; j++) {
                        let paragraphArray = []
                        let paragraphIndentsArray = []
                        articlesBlockTitle.push(data.data.attributes.articles.data[0].attributes.block[i].paragraph[j].title)
                        articlesBlockId.splice(0, 1, data.data.attributes.articles.data[0].attributes.block[i].id)
                        articlesBlockParagraphId.push(data.data.attributes.articles.data[0].attributes.block[i].paragraph[j].id)
                        for (let g = 0; g < data.data.attributes.articles.data[0].attributes.block[i].paragraph[j].paragraph.length; g++) {
                            paragraphArray.push(data.data.attributes.articles.data[0].attributes.block[i].paragraph[j].paragraph[g].paragraph)
                            paragraphIndentsArray.push(data.data.attributes.articles.data[0].attributes.block[i].paragraph[j].paragraph[g].removeIndentation)
                        }
                        articlesBlockParagraph.push(paragraphArray)
                        articlesBlockParagraphIndents.push(paragraphIndentsArray)
                    }
                    articlesParagraphTitleArray.push(articlesBlockTitle)
                    articlesParagraphArray.push(articlesBlockParagraph)
                    articlesParagraphIndentsArray.push(articlesBlockParagraphIndents)
                    articlesIdArray.push(articlesBlockId)
                    articlesParagraphIdArray.push(articlesBlockParagraphId)
                }
                setArticlesTitle(articlesTitleArray)
                setArticlesParagraph(articlesParagraphArray)
                setArticlesParagraphIndents(articlesParagraphIndentsArray)
                setArticlesParagraphTitle(articlesParagraphTitleArray)
                setArticlesImage(articlesImageArray)
                setArticlesId(articlesIdArray)
                setArticlesParagraphId(articlesParagraphIdArray)
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, []);

    // article
    const [articlesId, setArticlesId] = useState([]);
    const [articlesParagraphId, setArticlesParagraphId] = useState([]);
    const [articlesTitle, setArticlesTitle] = useState([]);
    const [articlesParagraphTitle, setArticlesParagraphTitle] = useState([]);
    const [articlesParagraph, setArticlesParagraph] = useState([]);
    const [articlesParagraphIndents, setArticlesParagraphIndents] = useState([]);
    const [articlesImage, setArticlesImage] = useState([]);
    function handleReloadClick() {
        setTimeout(() => {
            window.location.reload();
        }, 0)
    };

    const swiperRef = useRef();
    
    return (
        <>
            <section className={styles.article}>
                {articlesId.map((blockId, index) => (
                    blockId == window.location.hash.substring(1) ? (
                        <div key={index} className={styles.block}>
                            <div className="container">
                                <div className={styles.blockWrap}>
                                    <div className={styles.info}>
                                        <h2>
                                            {articlesTitle[index]}
                                        </h2>
                                        {articlesParagraphId[index].map((paragraphId, paragraphIndex) => (
                                            <div key={paragraphIndex} className={styles.paragraph}>
                                                <h3>
                                                    {articlesParagraphTitle[index][paragraphIndex]}
                                                </h3>
                                                <div className={styles.text}>
                                                    {articlesParagraph[index][paragraphIndex].map((textId, textIndex) => (
                                                        <p key={textIndex} className={articlesParagraphIndents[index][paragraphIndex][textIndex] === true ? '' : 'indent'}>
                                                            {articlesParagraph[index][paragraphIndex][textIndex]}
                                                        </p>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null
                ))}
            </section>
            <section className={styles.otherArticles}>
                <div className="container">
                    <div className={styles.otherArticlesWrap}>
                        <div className={styles.otherArticlesTitle}>
                            <Name name="Ещё рассказы" />
                        </div>
                        <Swiper
                            modules={[Autoplay, Pagination, Navigation]}
                            spaceBetween={20}
                            slidesPerView='1'
                            breakpoints={{
                                480: {
                                    slidesPerView: 2,
                                },
                                768: {
                                    slidesPerView: 3,
                                },
                            }}
                            loop={true}
                            onBeforeInit={(swiper) => {
                                swiperRef.current = swiper;
                            }}
                            autoplay={{
                                delay: 4000,
                                disableOnInteraction: false,
                            }}
                            pagination={{
                                el: '.otherArticlePagination',
                                clickable: true,
                                renderBullet: function (index, className) {
                                    return '<button class="' + className + '">' + (index + 1) + '</button>';
                                },
                            }}
                            className={styles.slider}
                        >
                            {articlesId.map((blockId, index) => (
                                <SwiperSlide key={index}>
                                    <div className={styles.otherArticlesBlockWrap}>
                                        <h2>
                                            {articlesTitle[index]}
                                        </h2>
                                        <div className={styles.otherArticlesImage}>
                                            <img src={`${articlesImage[index]}`} alt="image article" />
                                        </div>
                                        <div onClick={handleReloadClick}>
                                            <LinkDark
                                                link={`/item#${blockId}`}
                                                name='Читать полностью'
                                            />
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div className='paginationWrapper'>
                            <button onClick={() => swiperRef.current?.slidePrev()} className='navigationPrev'>
                                <svg className='icon'>
                                    <use xlinkHref={`${sprite}#icon-navigation-arrow`}></use>
                                </svg>
                            </button>
                            <div className='pagination otherArticlePagination'></div>
                            <button onClick={() => swiperRef.current?.slideNext()} className='navigationNext'>
                                <svg className='icon'>
                                    <use xlinkHref={`${sprite}#icon-navigation-arrow`}></use>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </section >
        </>
    );
};

export default Item;