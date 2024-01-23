import React from 'react';
import styles from '../../src/css/Main.module.css';
import img01 from '../img/happy.jpg';

const Index = () => {
    return (
        <div className={ styles.main_form }>
            <h1>우주 최강 반려Zone!</h1>
            <div className={ styles.img_div }>
                <img src={ img01 } alt='happy' />
                    <div className={ styles.text }>
                        <h3>안녕하슈!</h3>
                            <span>반려존재와 집사를 위한 커뮤니티! </span>
                            <span>세상의 모든 반려존재를 위한 반려Zone입니다. </span>
                            <br/>
                            <span> 호스트 : 해피 (행복이)</span>
                    </div>
            </div>
        </div>
            
       
    );
};

export default Index;