import React, { useState } from 'react';
import styles from '../css/SideBar.module.css';
import point from '../img/point.png';
import point2 from '../img/point2.png';

const SideBar = ({ page, onPage }) => {

    const[isSidebarVisible, setSidebarVisibility] = useState(false)
    const userDTO = JSON.parse(window.sessionStorage.getItem('userDTO'));

    const toggleSidebarOn = () => {
        setSidebarVisibility(true)
    }

    const toggleSidebarClose =() => {
        setSidebarVisibility(false)
    }

    const onSidebar = (num) => {
        onPage(num)
        setSidebarVisibility(false)
    }


    return (
        <div>
            <img onClick={ isSidebarVisible ? toggleSidebarClose : toggleSidebarOn } className={ styles.sidebar_point } src={ isSidebarVisible ? point2 : point } alt='냥젤리'/> 
           
            <div className={ styles.sidebar_button }>
                <button onClick={ () => onPage(3)} style={{ backgroundColor : page === 3 && 'cadetblue', color : page === 3 && 'white' }}>소개 게시판</button>
                <button onClick={ () => onPage(4)} style={{ backgroundColor : page === 4 && 'cadetblue', color : page === 4 && 'white' }}>일상 게시판</button>
                <button onClick={ () => onPage(5)} style={{ backgroundColor : page === 5 && 'cadetblue', color : page === 5 && 'white' }}>건강과 관리 게시판</button>
                <button onClick={ () => onPage(6)} style={{ backgroundColor : page === 6 && 'cadetblue', color : page === 6 && 'white' }}>친구 찾기 게시판</button>
                <button onClick={ () => onPage(7)} style={{ backgroundColor : page === 7 && 'cadetblue', color : page === 7 && 'white' }}>Q & A 게시판</button>
                <button onClick={ () => onPage(8)} style={{ backgroundColor : page === 8 && 'cadetblue', color : page === 8 && 'white' }}>이벤트 게시판</button>
                <button onClick={ () => onPage(9)} style={{ backgroundColor : page === 9 && 'cadetblue', color : page === 9 && 'white' }}>나눔 게시판</button>
                { userDTO && <button onClick={ () => onPage(10)} style={{ backgroundColor : page === 10 && 'cadetblue', color : page === 10 && 'white' }}>내 정보 수정</button>}
            </div> 
            { isSidebarVisible && 
                <div className={ styles.sidebar2_button }>
                    <button onClick={ () => onSidebar(3)} style={{ backgroundColor : page === 3 && 'cadetblue', color : page === 3 && 'white' }}>소개 게시판</button>
                    <button onClick={ () => onSidebar(4)} style={{ backgroundColor : page === 4 && 'cadetblue', color : page === 4 && 'white' }}>일상 게시판</button>
                    <button onClick={ () => onSidebar(5)} style={{ backgroundColor : page === 5 && 'cadetblue', color : page === 5 && 'white' }}>건강과 관리 게시판</button>
                    <button onClick={ () => onSidebar(6)} style={{ backgroundColor : page === 6 && 'cadetblue', color : page === 6 && 'white' }}>친구 찾기 게시판</button>
                    <button onClick={ () => onSidebar(7)} style={{ backgroundColor : page === 7 && 'cadetblue', color : page === 7 && 'white' }}>Q & A 게시판</button>
                    <button onClick={ () => onSidebar(8)} style={{ backgroundColor : page === 8 && 'cadetblue', color : page === 8 && 'white' }}>이벤트 게시판</button>
                    <button onClick={ () => onSidebar(9)} style={{ backgroundColor : page === 9 && 'cadetblue', color : page === 9 && 'white' }}>나눔 게시판</button>
                    { userDTO && <button onClick={ () => onPage(10)} style={{ backgroundColor : page === 10 && 'cadetblue', color : page === 10 && 'white' }}>내 정보 수정</button>}
                </div> 
            }
        </div>
    );
  }
export default SideBar;