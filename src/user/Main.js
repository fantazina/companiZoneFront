import React from 'react';
import styles from '../css/Main.module.css';
import WriteForm from './WriteForm';
import LoginForm from './LoginForm';
import IntroductionMain from '../components/IntroductionMain';
import DailyMain from '../components/DailyMain';
import HealthMain from '../components/HealthMain';
import FriendMain from '../components/FriendMain';
import EventMain from '../components/EventMain';
import PresentMain from '../components/PresentMain';
import QuestionMain from '../components/QuestionMain';
import Index from './Index';
import MyPage from './MyPage';

const Main = ({ page, onPage }) => {
    const mainPage = document.getElementById('mainPage')

    return (
        <div>
            {/* {window.sessionStorage.getItem('userDTO') !== null &&
            <div>
                {JSON.parse(window.sessionStorage.getItem('userDTO')).name}|
                {JSON.parse(window.sessionStorage.getItem('userDTO')).id}|
                {JSON.parse(window.sessionStorage.getItem('userDTO')).pwd}
            </div>
            } */}
            <div className={ styles.main_page } id='mainPage'>
                { page === 0 && <Index /> }
                { page === 1 && <WriteForm onPage={ onPage }/> }
                { page === 2 && <LoginForm onPage={ onPage }/> }
                { page === 3 && <IntroductionMain mainPage={ mainPage } mainOnPage={ onPage } />}
                { page === 4 && <DailyMain mainPage={ mainPage } mainOnPage={ onPage } /> }
                { page === 5 && <HealthMain mainPage={ mainPage } mainOnPage={ onPage } /> }
                { page === 6 && <FriendMain mainPage={ mainPage } mainOnPage={ onPage } /> }
                { page === 7 && <QuestionMain mainPage={ mainPage } mainOnPage={ onPage } /> }
                { page === 8 && <EventMain  mainPage={ mainPage } mainOnPage={ onPage } /> }
                { page === 9 && <PresentMain mainPage={ mainPage } mainOnPage={ onPage } /> }
                { page === 10 && <MyPage onPage={ onPage }/> }
            </div>
        </div>
    );
};

export default Main;