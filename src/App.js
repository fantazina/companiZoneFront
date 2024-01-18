import React, { useState } from 'react';

import Main from './user/Main';
import SideBar from './user/SideBar';
import Header from './user/Header';
import styles from './css/Main.module.css';

const App = () => {
  const [page,setPage] = useState(0)

  const onPage = (num) => {
    setPage(num)
  }

  return (
    <div className={ styles.main_container }>
      <Header onPage={onPage}/>
      <SideBar page={page} onPage={onPage}/>
      <Main page={page} onPage={onPage}/>
    </div>
  );
};

export default App;
