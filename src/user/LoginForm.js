import React, { useState } from 'react';
import styles from '../css/Main.module.css';
import axios from 'axios';

const LoginForm = ({ onPage }) => {
    const[userDTO, setUserDTO] = useState({
        id : '',
        pwd : ''

    })
    const[idError, setIdError] = useState('');
    const[pwdError, setPwdError] = useState('');
    
    const onInputChange = (e) => {
        const {name, value} = e.target;

        setUserDTO({
            ...userDTO,
            [name] : value
        })
    }

    const onLoginSubmit = (e) => {
        e.preventDefault()

        var sw = 1

        if(!userDTO.id){
            setIdError('아이디 입력')
            sw = 0
        }
        else {
            setIdError('')
        }
        if(!userDTO.pwd){
            setPwdError('비밀번호 입력')
            sw = 0
        }
        else {
            setPwdError('')
        }
        
        if(sw === 1){
            axios.post(`http://localhost:8080/user/login`, null, {
                params : {
                    id : userDTO.id,
                    pwd : userDTO.pwd
                }
            }).then(res => { 
                if(res.data.login) {
                    alert('로그인이 완료되었습니다.')
                    console.log(res.data.userDTO)
                    window.sessionStorage.setItem('userDTO', JSON.stringify(res.data.userDTO));

                    onPage(0)
                    
                } else {
                    alert('로그인에 실패하였습니다.')
                }
            })
            .catch(error => console.log(error))
          }
    }

    const onReset = (e) => {
        e.preventDefault()

        setUserDTO({
            id : '',
            pwd : ''
        })
    }

    return (
        <div>
            <div className={ styles.login_page }>
                <div className={ styles.login_div }>
                    <div className={ styles.id }>
                        <label htmlfor='id'>아이디</label>
                        <input placeholder='아이디를 입력해주세요.' name='id' value={ userDTO.id } onChange={ onInputChange } />
                        <div className={styles.check} style={{paddingTop:'12px'}}>{idError}</div>
                    </div>

                    <div className={ styles.pwd }>
                        <label htmlfor='pwd'>비밀번호</label>
                        <input placeholder='비밀번호를 입력해주세요.' name='pwd' type='password' value={ userDTO.pwd } onChange={ onInputChange } />
                        <div className={styles.check} style={{paddingTop:'12px'}}>{pwdError}</div>
                    </div>
                </div>

                <div style={{ clear : 'both' }}/>

                <div className={ styles.buttons }>
                    <button onClick={ onLoginSubmit }>로그인</button>
                    <button onClick={ onReset }>취소</button>
                </div>

            </div>
        </div>
    );
};

export default LoginForm;