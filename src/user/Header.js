import React from 'react';
import styles from '../css/Main.module.css';
import logo from '../img/logo.png';


const Header = ({onPage}) => {

    const userDTO = JSON.parse(window.sessionStorage.getItem('userDTO'))

    const onLogoutSubmit = () => {
        window.sessionStorage.removeItem('userDTO')
        alert('로그아웃 되었습니다.')
        window.location.reload();
        onPage(0)
    }

    return (
        <div>
            <div className={ styles.header_main }>
                <img className={ styles.header_img } id='logo' src={ logo } alt='로고' />
                    {!userDTO && (
                        <div className={ styles.header_span }>
                            <span onClick={ () => onPage(2) }>로그인</span>
                            <span onClick={ () => onPage(1) }>  |  회원가입</span>
                        </div>
                    )}
                {userDTO && (
                    <div className={ styles.header_span2 }>
                        <span>반가워요! {userDTO.name}님</span>
                        <button onClick={ onLogoutSubmit }>로그아웃</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;