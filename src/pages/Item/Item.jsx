import React, { useRef, useState, useEffect } from 'react';

import styles from './Item.module.scss';

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import sprite from './../../images/icons/sprite.svg';
import Name from './../../ui/Name/Name';
import LinkDark from '../../ui/LinkDark/LinkDark';

import Header from './../../components/Header/Header';
import Footer from './../../components/Footer/Footer';

const Item = () => {
    let server = 'https://vitamin-strapi.onrender.com'

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
                        Authorization: `Bearer 58311277418a1f6ac723a66b9db9c9b80f0ff6f6c34f18fb90d7375db14538c0f3611f1156e0c86c11d2ee21eb35b6050bf3fa8c3aafd5ba9b655451d9872da6b632e37882e2b166c02d9363aa74cef6796780f4cde18b3caa481959db7aa9aa1a3afc099e7cd8b1539b080381cdc1c8352ced2a7ef7a14a862bd4e3e62ca6f7`
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
            <Header />
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
                            {lang === 'ru' ? 
                                <Name name="Ещё рассказы" />
                                :
                                <Name name="More stories" />
                            }
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
                                            {lang === 'ru' ?
                                            <LinkDark
                                                link={`/item#${blockId}`}
                                                name='Читать полностью'
                                                /> :
                                                <LinkDark
                                                    link={`/item#${blockId}`}
                                                    name='read'
                                                />
                                            }
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
            <Footer />
        </>
    );
};

export default Item;