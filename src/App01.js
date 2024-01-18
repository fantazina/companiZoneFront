import React from 'react';
import { Route, Routes, Link, BrowserRouter } from 'react-router-dom';
import Main from './components/Main';
import IntroductionMain from './components/IntroductionMain';
import WriteForm from './user/WriteForm';
import UploadForm from './user/UploadForm';
import UploadList from './user/UploadList';
import HealthMain from './components/HealthMain';
import PresentMain from './components/PresentMain';
import QuestionMain from './components/QuestionMain';
import DailyMain from './components/DailyMain';

const App01 = () => {
    return (
        <BrowserRouter>
            <>
                <Routes>
                    <Route path='/' element={ <Main /> } />
                    <Route path='/introduction' element={ <IntroductionMain /> } />
                    <Route path='/writeform' element={ <WriteForm /> } />
                    <Route path='/uploadform' element={ <UploadForm /> } />
                    <Route path='/uploadlist' element={ <UploadList /> } />
                    <Route path='/daily' element={ <DailyMain /> } />
                    <Route path='/health' element={ <HealthMain /> } />
                    <Route path='/present' element={ <PresentMain /> } />
                    <Route path='/question' element={ <QuestionMain /> } />
                </Routes>
            </>
        </BrowserRouter>
    );
};

export default App01;