import React from 'react';
import styles from './LinkDark.module.scss';
import sprite from './../../images/icons/sprite.svg';

const LinkDark = (props) => {
    return (
        <a href={props.link} className={styles.link}>
            <span>
                {props.name}
            </span>
            <svg className='link'>
                <use xlinkHref={`${sprite}#icon-arrow-link`}></use>
            </svg>
        </a>
    );
};

export default LinkDark;