import React, { useState, useEffect, useRef } from 'react';

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

import styles from './PoemList.module.scss';

import sprite from './../../images/icons/sprite.svg';

const PoemList = (props) => {
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

    const swiperRef = useRef();

    return (
        <div className={styles.wrapper}>
            <div className="container">
                <section className={styles.articles}>
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
                            disableOnInteraction: true,
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
                                <div className={styles.block}>
                                    <div className={styles.info}>
                                        <div className={styles.infoWrap}>
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
                                        {lang === 'ru' ?
                                            <a href={`/poem#${blockId}`} onClick={props.event} className={styles.link}>Читать полностью</a>
                                            :
                                            <a href={`/poem#${blockId}`} onClick={props.event} className={styles.link}>read in full</a>
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
                </section>
            </div>
        </div >
    );
};

export default PoemList;