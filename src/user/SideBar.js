import React from 'react';
import styles from '../css/SideBar.module.css';

const SideBar = ({ page, onPage }) => {

    const userDTO = JSON.parse(window.sessionStorage.getItem('userDTO'));

    return (
        <div className={ styles.sidebar_button }>
            <button onClick={ () => onPage(3)} style={{ backgroundColor : page === 3 && 'cadetblue', color : page === 3 && 'white' }}>소개 게시판</button>
            <button onClick={ () => onPage(4)} style={{ backgroundColor : page === 4 && 'cadetblue', color : page === 4 && 'white' }}>일상 게시판</button>
            <button onClick={ () => onPage(5)} style={{ backgroundColor : page === 5 && 'cadetblue', color : page === 5 && 'white' }}>건강과 관리 게시판</button>
            <button onClick={ () => onPage(6)} style={{ backgroundColor : page === 6 && 'cadetblue', color : page === 6 && 'white' }}>친구 찾기 게시판</button>
            <button onClick={ () => onPage(7)} style={{ backgroundColor : page === 7 && 'cadetblue', color : page === 7 && 'white' }}>Q & A 게시판</button>
            <button onClick={ () => onPage(8)} style={{ backgroundColor : page === 8 && 'cadetblue', color : page === 8 && 'white' }}>이벤트 게시판</button>
            <button onClick={ () => onPage(9)} style={{ backgroundColor : page === 9 && 'cadetblue', color : page === 9 && 'white' }}>나눔 게시판</button>
            {userDTO && <button onClick={ () => onPage(10)} style={{ backgroundColor : page === 10 && 'cadetblue', color : page === 10 && 'white' }}>내 정보 수정</button>}
        </div>
    );
  }
export default SideBar;