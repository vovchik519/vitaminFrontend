import React, { useState, useEffect } from 'react';
import { ImageGroup, Image } from 'react-fullscreen-image'

import styles from './Pantry.module.scss';
import FirstScreen from './../../components/FirstScreen/FirstScreen';
import Masonry from 'react-masonry-css';
import Poem from './../../components/Poem/Poem';
import PoemSection from '../../components/PoemSection/PoemSection';

import Header from './../../components/Header/Header';
import Footer from './../../components/Footer/Footer';
import { Link } from 'react-router-dom';

const Pantry = () => {
    let server = 'https://vitamin-strapi.onrender.com'

    let lang = localStorage.getItem('selectedLanguage');

    useEffect(() => {
        const newPromise = (ms = 0) => {
            return new Promise(r => setTimeout(() => r(), ms))
        }

        let PantryPage = `${server}/api/pantry?locale=${lang}&populate=deep`;

        async function fetchData() {
            try {
                await newPromise();
                const response = await fetch(PantryPage, {
                    headers: {
                        Authorization: `Bearer c5224769461038b577a69ae124da6d08dcd47d9a4ec518004002c0134ebbb20fa0e47fff5627cc00daf7910ce640fb688bc6eaff09b59e1402ccebd2dff38f358cc7bfa3be02fc1d9b41b7fd638f564c3f0a617b242d884e0f053d1dc23f18b0740e256c4ef8a45a9f5f9462587d64f035978be5f45a43f117d7303585cd9f39`
                    }
                });
                const data = await response.json();
                // mainScreen
                setMainScreen(data.data.attributes.mainScreen);
                setMainScreenTitle(data.data.attributes.mainScreen.title);
                setMainScreenImage(data.data.attributes.mainScreen.background.data.attributes);
                {
                    data.data.attributes.mainScreen.decoration.data !== null ?
                        setMainScreenDecoration(data.data.attributes.mainScreen.decoration.data.attributes)
                        : setMainScreenDecoration(false)
                }
                // gallery
                let galleryId = []
                let galleryImageArray = []
                let galleryTitleArray = []
                let gallerySubTitleArray = []
                let galleryDescriptionArray = []
                let galleryDescriptionIndentArray = []
                let gallerySignatureArray = []
                for (let i = 0; i < data.data.attributes.gallery.length; i++) {
                    galleryId.push(data.data.attributes.gallery[i].id)
                    galleryTitleArray.push(data.data.attributes.gallery[i].title)
                    gallerySubTitleArray.push(data.data.attributes.gallery[i].subTitle)
                    let descriptionArray = []
                    let descriptionIndentArray = []
                    let imageArray = []
                    let signatureArray = []
                    for (let g = 0; g < data.data.attributes.gallery[i].gallery.data.attributes.Image.length; g++) {
                        imageArray.push(data.data.attributes.gallery[i].gallery.data.attributes.Image[g].image.data.attributes.url)
                        signatureArray.push(data.data.attributes.gallery[i].gallery.data.attributes.Image[g].signature)
                    }
                    for (let j = 0; j < data.data.attributes.gallery[i].description.length; j++) {
                        descriptionArray.push(data.data.attributes.gallery[i].description[j].paragraph)
                        descriptionIndentArray.push(data.data.attributes.gallery[i].description[j].removeIndentation)
                    }
                    galleryDescriptionArray.push(descriptionArray)
                    galleryDescriptionIndentArray.push(descriptionIndentArray)
                    galleryImageArray.push(imageArray)
                    gallerySignatureArray.push(signatureArray)
                }
                setGalleryId(galleryId)
                setGalleryTitle(galleryTitleArray)
                setGallerySubTitle(gallerySubTitleArray)
                setGalleryDescription(galleryDescriptionArray)
                setGalleryDescriptionIndent(galleryDescriptionIndentArray)
                setGalleryImage(galleryImageArray)
                setGallerySignature(gallerySignatureArray)
                // poem
                setPoems(data.data.attributes.poem);
                setPoemItem(data.data.attributes.poem.poemItem);
                setPoemBlock(data.data.attributes);
                setPoemBlockImage(data.data.attributes.PoemBlock.image.data.attributes);
                setPoemBlockButton(data.data.attributes.PoemBlock.button)
                setPoemBlockLine(data.data.attributes.PoemBlock.poemLine)
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, []);

    // mainScreen
    const [mainScreen, setMainScreen] = useState({});
    const [mainScreenTitle, setMainScreenTitle] = useState({});
    const [mainScreenImage, setMainScreenImage] = useState({});
    const [mainScreenDecoration, setMainScreenDecoration] = useState({});
    // poem
    const [poems, setPoems] = useState({});
    const [poemItem, setPoemItem] = useState({});
    let poemParagraphArray = []
    let poemIndentsArray = []
    multiData(poemParagraphArray, poemItem, 'paragraph')
    multiData(poemIndentsArray, poemItem, 'removeIndentation')
    // galery
    const [galleryId, setGalleryId] = useState([]);
    const [galleryTitle, setGalleryTitle] = useState([]);
    const [gallerySubTitle, setGallerySubTitle] = useState([]);
    const [galleryDescription, setGalleryDescription] = useState([]);
    const [galleryDescriptionIndent, setGalleryDescriptionIndent] = useState([]);
    const [galleryImage, setGalleryImage] = useState([]);
    const [gallerySignature, setGallerySignature] = useState([]);
    // poem
    const [poemBlockImage, setPoemBlockImage] = useState('');
    const [poemBlockButton, setPoemBlockButton] = useState({});
    const [poemBlockLine, setPoemBlockLine] = useState({});
    const [poemBlock, setPoemBlock] = useState({});
    let poemBlockArray = []
    let poemBlockIndents = []
    multiData(poemBlockArray, poemBlockLine, 'paragraph')
    multiData(poemBlockIndents, poemBlockLine, 'removeIndentation')
    const breakpointColumnsObj = {
        default: 3,
        1024: 2,
        520: 1,
    };

    function multiData(array, data, key) {
        for (let i = 0; i < data.length; i++) {
            array.push(data[i][key])
        }
    }
    return (
        <>
            <Header />
            <div className={styles.wrapper}>
                <FirstScreen
                    name={mainScreen.name}
                    titleStart={mainScreenTitle.titleStart}
                    titleColored={mainScreenTitle.titleColored}
                    titleEnd={mainScreenTitle.titleEnd}
                    description={mainScreen.description}
                    imageUrl={mainScreenImage.url}
                    imageAlt={mainScreenImage.alternativeText}
                    decoration={mainScreenDecoration.url}
                />
                <div>
                    {galleryId.map((blockId, index) => (
                        <div key={index} className={styles.gallery}>
                            <div className="container">
                                <div className={styles.titleWrap}>
                                    <div className={styles.titleTop}>
                                        <h2>{galleryTitle[index]}</h2>
                                        <div>
                                            {galleryDescription[index].map((paragraph, descriptionIndex) => (
                                                <p className={galleryDescriptionIndent[index][descriptionIndex] === true ? '' : 'indent'} key={descriptionIndex}>
                                                    {paragraph}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                    <h3>{gallerySubTitle[index]}</h3>
                                </div>
                                <div className={styles.images}>
                                    <ImageGroup>
                                        <Masonry
                                            breakpointCols={breakpointColumnsObj}
                                            className="images-wrap"
                                            columnClassName="images-column">
                                            {galleryImage[index].map((image, imageIndex) => (
                                                <div key={imageIndex} className={styles.imageTop}>
                                                    <div key={imageIndex} className={styles.image}>
                                                        <Image src={`${image}`} alt="Картинка" />
                                                    </div>
                                                    <h3>{gallerySignature[index][imageIndex]}</h3>
                                                </div>
                                            ))}
                                        </Masonry>
                                    </ImageGroup>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {poemParagraphArray.length !== 0 ?
                    <Poem
                        title={poems.description}
                        description={poems.title}
                        titleTwo={poems.titleTwo}
                        content={poemParagraphArray}
                        indents={poemIndentsArray}
                    /> : null
                }
                {poemBlockArray.length !== 0 ?
                    <div className="container">
                        <div className={styles.poemBlock}>
                            <div className={styles.poemBlockImage}>
                                <img src={poemBlockImage.url} alt={poemBlockImage.alternativeText} />
                            </div>
                            <div className={styles.poemBlockInfo}>
                                <div className={styles.poemBlockInfoWrap}>
                                    <div className={styles.poemBlockParagraph}>
                                        {poemBlockArray.map((paragraph, index) => (
                                            <p className={poemBlockIndents[index] === true ? '' : 'indent'} key={index}>{paragraph}</p>
                                        ))}
                                    </div>
                                </div>
                                <Link to={poemBlockButton.link}>{poemBlockButton.name}</Link>
                            </div>
                        </div>
                    </div> : null
                }
                <PoemSection page='pantry' />
            </div>
            <Footer />
        </>
    );
};

export default Pantry;