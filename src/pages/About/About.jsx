import React, { useState, useEffect } from 'react';

import styles from './About.module.scss';

import FirstScreen from './../../components/FirstScreen/FirstScreen';
import BlockList from './../../components/BlockList/BlockList';
import Poem from './../../components/Poem/Poem';
import FourImage from './../../components/FourImage/FourImage';

const About = () => {
    let server = 'http://localhost:1337'

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
                        Authorization: `Bearer 52e194f58551bab2374b542d3d9485d74895558793cceba1cb9b6a4d0099470f0831ce59d8d24fbf8dd0c605680e71928ceb3f58eaca6050c6f3bef377ceae97c41312ad4dfa2fab427f65c72091aa183499cbb9ef49a231ed33cce46118eb7990bf7dccb35e9f0fa0fdaf6b0c15668ccb5a2a844eb6b50e8e42a2fb3569ac5b`
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
            <Poem
                content={poemParagraphArray}
                indents={poemIndentsArray}
            />
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
    );
};

export default About;