import React from 'react';
import styles from './Poem.module.scss';

const Poem = (props) => {

    const { content } = props;
    const { indents } = props;
    
    return (
        <section className={styles.wrapper}>
            <div className="container">
                <div className={styles.wrap}>
                    <h2>
                        {props.title}
                    </h2>
                    {content.map((paragraph, index) => (
                        <p className={props.indents[index] === true ? '' : 'indent'} key={index}>{paragraph}</p>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Poem;