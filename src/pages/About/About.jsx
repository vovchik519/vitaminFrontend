import React, { useState, useEffect } from 'react';

import styles from './About.module.scss';

import FirstScreen from './../../components/FirstScreen/FirstScreen';
import BlockList from './../../components/BlockList/BlockList';
import Poem from './../../components/Poem/Poem';
import FourImage from './../../components/FourImage/FourImage';

import Header from './../../components/Header/Header';
import Footer from './../../components/Footer/Footer';

const About = () => {
    let server = 'https://vitamin-strapi.onrender.com'

    let lang = localStorage.getItem('selectedLanguage');

    useEffect(() => {
        const newPromise = (ms = 0) => {
            return new Promise(r => setTimeout(() => r(), ms))
        }

        let AboutPage = `${server}/api/about?locale=${lang}&populate=deep`;

        async function fetchData() {
            try {
                await newPromise();
                const response = await fetch(AboutPage, {
                    headers: {
                        Authorization: `Bearer 7c8c0a4eb49f1a805223ddc1c4cf372097105591875a611b9a2441195a7b0a068f494b9d2e96d87517c7200383390c70ee5d90162b1f58c6f5826ce7356997dfdc33dfb3e67b4b2be5798450d7184b4fbbf1da25e56d8e672e6c668e9d1be6c8375c3623c908a7dc4f1f67f4cc6f855dffa8be229094f29eecda98e3dac9d0ce`
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
                // info
                setInfo(data.data.attributes.info);
                setInfoDescription(data.data.attributes.info.description);
                setInfoImage(data.data.attributes.info.image.data.attributes);
                let infoListArray = []
                for (let i = 0; i < data.data.attributes.info.list.length; i++) {
                    infoListArray.push(data.data.attributes.info.list[i])
                }
                setInfoList(infoListArray)
                // family
                setFamily(data.data.attributes.family);
                setFamilyDescription(data.data.attributes.family.description);
                setFamilyImage(data.data.attributes.family.image.data.attributes);
                let familyListArray = []
                for (let i = 0; i < data.data.attributes.family.list.length; i++) {
                    familyListArray.push(data.data.attributes.family.list[i])
                }
                setFamilyList(familyListArray)
                // poem
                setPoem(data.data.attributes.poem);
                // giclee
                setGiclee(data.data.attributes.giclee)
                setGicleeInfoTop(data.data.attributes.giclee.infoTop)
                setGicleeInfoBottom(data.data.attributes.giclee.infoBottom)
                setGicleeImageOne(data.data.attributes.giclee.images.one.data.attributes)
                setGicleeImageTwo(data.data.attributes.giclee.images.two.data.attributes)
                setGicleeImageThree(data.data.attributes.giclee.images.three.data.attributes)
                setGicleeImageFour(data.data.attributes.giclee.images.four.data.attributes)
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
    // info
    const [info, setInfo] = useState({});
    const [infoDescription, setInfoDescription] = useState({});
    const [infoList, setInfoList] = useState({});
    const [infoImage, setInfoImage] = useState({});

    const infoDescriptionsArray = [];
    let infoDescriptionsIndentsArray = [];
    let infoListIndentsArray = []

    multiData(infoDescriptionsArray, infoDescription, 'paragraph')
    multiData(infoDescriptionsIndentsArray, infoDescription, 'removeIndentation')
    multiData(infoListIndentsArray, infoList, 'removeIndentation')
    // family
    const [family, setFamily] = useState({});
    const [familyDescription, setFamilyDescription] = useState({});
    const [familyList, setFamilyList] = useState({});
    const [familyImage, setFamilyImage] = useState({});

    const familyDescriptionsArray = [];
    let familyDescriptionsIndentsArray = [];
    let familyListIndentsArray = []

    multiData(familyDescriptionsArray, familyDescription, 'paragraph')
    multiData(familyDescriptionsIndentsArray, familyDescription, 'removeIndentation')
    multiData(familyListIndentsArray, familyList, 'removeIndentation')
    // poem
    const [poem, setPoem] = useState({});
    let poemParagraphArray = []
    let poemIndentsArray = []
    multiData(poemParagraphArray, poem, 'paragraph')
    multiData(poemIndentsArray, poem, 'removeIndentation')
    // giclee
    const [giclee, setGiclee] = useState({})
    const [gicleeInfoTop, setGicleeInfoTop] = useState({})
    const [gicleeInfoBottom, setGicleeInfoBottom] = useState({})
    const [gicleeImageOne, setGicleeImageOne] = useState({})
    const [gicleeImageTwo, setGicleeImageTwo] = useState({})
    const [gicleeImageThree, setGicleeImageThree] = useState({})
    const [gicleeImageFour, setGicleeImageFour] = useState({})
    let gicleeDescriptionsTopArray = []
    let gicleeDescriptionsTopIndentsArray = []
    let gicleeDescriptionsBottomArray = []
    let gicleeDescriptionsBottomIndentsArray = []
    multiData(gicleeDescriptionsTopArray, gicleeInfoTop, 'paragraph')
    multiData(gicleeDescriptionsBottomArray, gicleeInfoBottom, 'paragraph')
    multiData(gicleeDescriptionsTopIndentsArray, gicleeInfoTop, 'removeIndentation')
    multiData(gicleeDescriptionsBottomIndentsArray, gicleeInfoBottom, 'removeIndentation')

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
                <BlockList
                    title={info.title}
                    descriptions={infoDescriptionsArray}
                    descriptionsIndents={infoDescriptionsIndentsArray}
                    list={infoList}
                    listIndents={infoListIndentsArray}
                    imageUrl={infoImage.url}
                    imageAlt={infoImage.alternativeText}
                />
                {poem.length !== 0 ?
                    <Poem
                        content={poemParagraphArray}
                        indents={poemIndentsArray}
                    /> : null
                }
                <BlockList
                    title={family.title}
                    descriptions={familyDescriptionsArray}
                    descriptionsIndents={familyDescriptionsIndentsArray}
                    list={familyList}
                    listIndents={familyListIndentsArray}
                    imageUrl={familyImage.url}
                    imageAlt={familyImage.alternativeText}
                    type="two"
                />
                <FourImage
                    title={giclee.title}
                    descriptionsTop={gicleeDescriptionsTopArray}
                    descriptionsTopIndents={gicleeDescriptionsTopIndentsArray}
                    descriptionsBottom={gicleeDescriptionsBottomArray}
                    descriptionsBottomIndents={gicleeDescriptionsBottomIndentsArray}
                    imageOneUrl={gicleeImageOne.url}
                    imageOneAlt={gicleeImageOne.alternativeText}
                    imageTwoUrl={gicleeImageTwo.url}
                    imageTwoAlt={gicleeImageTwo.alternativeText}
                    imageThreeUrl={gicleeImageThree.url}
                    imageThreeAlt={gicleeImageThree.alternativeText}
                    imageFourUrl={gicleeImageFour.url}
                    imageFourAlt={gicleeImageFour.alternativeText}
                />
            </div>
            <Footer />
        </>
    );
};

export default About;