import React, { useState, useEffect } from 'react';

import styles from './Home.module.scss';
import FirstScreen from './../../components/FirstScreen/FirstScreen';
import BlockTextOne from './../../components/BlockTextOne/BlockTextOne';
import BlockTextTwo from './../../components/BlockTextTwo/BlockTextTwo';
import GalleryMain from './../../components/GalleryMain/GalleryMain';
import Feedback from './../../components/Feedback/Feedback';
import BannerOne from './../../components/BannerOne/BannerOne';
import BannerTwo from './../../components/BannerTwo/BannerTwo';
import Footer from './../../components/Footer/Footer';
import Header from './../../components/Header/Header';

const Home = () => {
    let server = 'http://localhost:1337'

    let lang = localStorage.getItem('selectedLanguage');

    useEffect(() => {
        const newPromise = (ms = 0) => {
            return new Promise(r => setTimeout(() => r(), ms))
        }

        let homePage = `${server}/api/home-page?locale=${lang}&populate=deep`;

        async function fetchData() {
            try {
                await newPromise();
                const response = await fetch(homePage, {
                    headers: {
                        Authorization: `Bearer b75776599df32545d6e9e7d468f8fc1ec3876b31a190232475eb3dcca0f7e663bee7cd2dbc1325dfd3564db055bfa8d8bfc340dffb204d04fd174cf984a4804392dec9c6efe62e185727c98b7475da3c75b80e66e6ab8e552126b86142c3ef265a3cfafe9602ffcb7de97d4344560640f4fcb1803592a23f3525cd13de183ade`
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
                // intro
                setIntro(data.data.attributes.intro);
                setIntroTitle(data.data.attributes.intro.title);
                setIntroImage(data.data.attributes.intro.image.data.attributes);
                setIntroDescription(data.data.attributes.intro.description);
                // about
                setAbout(data.data.attributes.about);
                setAboutImage(data.data.attributes.about.image.data.attributes);
                setAboutDescription(data.data.attributes.about.description);
                setAboutButton(data.data.attributes.about.button);
                // forKids
                setForKids(data.data.attributes.forKids);
                setForKidsTitle(data.data.attributes.forKids.title);
                setForKidsDescription(data.data.attributes.forKids.description);
                setForKidsButton(data.data.attributes.forKids.button);
                // gallery
                setGallery(data.data.attributes.gallery);
                setGalleryButton(data.data.attributes.gallery.button);
                let galleryImageArray = []
                for (let i = 0; i < data.data.attributes.gallery.gallery.data.attributes.Image.length; i++) {
                    galleryImageArray.push(data.data.attributes.gallery.gallery.data.attributes.Image[i].image.data.attributes.url)
                }
                setGalleryImage(galleryImageArray)
                // feedback
                setFeedback(data.data.attributes.feedback);
                setFeedbackImage(data.data.attributes.feedback.image.data.attributes);
                setFeedbackInputs(data.data.attributes.feedback.input);
                // storeroom
                setStoreroom(data.data.attributes.storeroom);
                setStoreroomTitle(data.data.attributes.storeroom.title);
                setStoreroomDescription(data.data.attributes.storeroom.description);
                setStoreroomButton(data.data.attributes.storeroom.button);
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
    // intro
    const [intro, setIntro] = useState({});
    const [introTitle, setIntroTitle] = useState({});
    const [introImage, setIntroImage] = useState({});
    const [introDescription, setIntroDescription] = useState({});
    const introDescriptionsArray = [];
    const introIndentsArray = [];
    multiData(introDescriptionsArray, introDescription, 'paragraph')
    multiData(introIndentsArray, introDescription, 'removeIndentation')

    // about
    const [about, setAbout] = useState({});
    const [aboutImage, setAboutImage] = useState({});
    const [aboutDescription, setAboutDescription] = useState({});
    const [aboutButton, setAboutButton] = useState({});
    const aboutDescriptionsArray = [];
    const aboutIndentsArray = [];
    multiData(aboutDescriptionsArray, aboutDescription, 'paragraph')
    multiData(aboutIndentsArray, aboutDescription, 'removeIndentation')
    // forKids
    const [forKids, setForKids] = useState({});
    const [forKidsTitle, setForKidsTitle] = useState({});
    const [forKidsDescription, setForKidsDescription] = useState({});
    const [forKidsButton, setForKidsButton] = useState({});
    const forKidsTitlesArray = [];
    const forKidsDescriptionsArray = [];
    multiData(forKidsTitlesArray, forKidsTitle, 'title')
    multiData(forKidsDescriptionsArray, forKidsDescription, 'paragraph')
    // gallery
    const [gallery, setGallery] = useState({});
    const [galleryImage, setGalleryImage] = useState([]);
    const [galleryButton, setGalleryButton] = useState({});
    // feedback
    const [feedback, setFeedback] = useState({});
    const [feedbackInputs, setFeedbackInputs] = useState([]);
    const [feedbackImage, setFeedbackImage] = useState({});
    // storeroom
    const [storeroom, setStoreroom] = useState({});
    const [storeroomTitle, setStoreroomTitle] = useState({});
    const [storeroomDescription, setStoreroomDescription] = useState({});
    const [storeroomButton, setStoreroomButton] = useState({});
    const storeroomTitlesArray = [];
    const storeroomDescriptionsArray = [];
    multiData(storeroomTitlesArray, storeroomTitle, 'title')
    multiData(storeroomDescriptionsArray, storeroomDescription, 'paragraph')
    function multiData(array, data, key) {
        for (let i = 0; i < data.length; i++) {
            array.push(data[i][key])
        }
    }
    return (
        <div className={styles.wrapper}>
            <Header />
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
            <BlockTextOne
                name={intro.name}
                titleStart={introTitle.titleStart}
                titleColored={introTitle.titleColored}
                titleEnd={introTitle.titleEnd}
                descriptions={introDescriptionsArray}
                indents={aboutIndentsArray}
                imageUrl={introImage.url}
                imageAlt={introImage.alternativeText} />
            <BlockTextTwo
                imageUrl={aboutImage.url}
                imageAlt={aboutImage.alternativeText}
                name={about.name}
                title={about.title}
                descriptions={aboutDescriptionsArray}
                indents={introIndentsArray}
                buttonLink={aboutButton.link}
                buttonName={aboutButton.name} />
            <BannerOne
                name={forKids.name}
                titles={forKidsTitlesArray}
                descriptions={forKidsDescriptionsArray}
                buttonName={forKidsButton.name}
                buttonLink={forKidsButton.link}
            />
            <GalleryMain
                name={gallery.name}
                buttonName={galleryButton.name}
                buttonLink={galleryButton.link}
                slides={galleryImage}
            />
            <Feedback
                name={feedback.name}
                title={feedback.title}
                inputs={feedbackInputs}
                button={feedback.button}
                imageUrl={feedbackImage.url}
                imageAlt={feedbackImage.alternativeText}
            />
            <BannerTwo
                name={storeroom.name}
                titles={storeroomTitlesArray}
                descriptions={storeroomDescriptionsArray}
                buttonName={storeroomButton.name}
                buttonLink={storeroomButton.link}
            />
            <Footer theme='white' />
        </div>
    );
};

export default Home;