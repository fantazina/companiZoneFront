import React from 'react';
import styles from '../../src/css/Main.module.css';
import img01 from '../img/happy.jpg';



const Main = () => {
    return (
        <div>
            <div className={ styles.main_form }>
                <h1>우주 최강 반려Zone!</h1>
                <div className={ styles.img_div }>
                    <img style={{ width : '500px' }} src={ img01 } alt='happy' />
                    <div className={ styles.text }>
                        <h3>안녕하슈!</h3>
                        <div className={ styles.p}>
                            <p styel={{ display : 'flex' }}>세상의 모든 반려존재를 위한</p>
                            <div className={ styles.button }>
                                <button style={{ width : '100%', height : '80px' }}>반려Zone 입장하기</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;