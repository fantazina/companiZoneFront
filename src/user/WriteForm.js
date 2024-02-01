import React, { useState } from 'react';
import styles from '../css/WriteForm.module.css';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

const WriteForm = ({onPage}) => { 
    const[userDTO, setUserDTO] = useState({
        name : '',
        id : '',
        pwd : '',
        pwd_re : '',
        tel : '',
    })

    const[nameError, setNameError] = useState('');
    const[idError, setIdError] = useState('');
    const[pwdError, setPwdError] = useState('');
    const[pwd_reError, setPwd_reError] = useState('');
    const[telError, setTelError] = useState('');

    const onInputChange = (e) => {
        const { name, value } = e.target;

        setUserDTO({ 
            ...userDTO,
            [name]: value
        });

        if (name === 'id') {
            onIsExistId();
        }
    }

    //아이디 중복체크
    const onIsExistId = () => {
        axios.get(`https://port-0-companizoneback-ll53u2blrj4us1b.sel5.cloudtype.app/user/isExistId?id=${ userDTO.id }`)
             .then(res => {
              setIdError(res.data === 'non_exist' ? '사용 가능' : '사용 불가능')
            })
             .catch(error => console.log(error))
    }

    const onWriteSubmit = (e) => {
        e.preventDefault()

        var sw = 1

        //유효성 검사
        if(!userDTO.name){
            setNameError('이름 입력')
            sw = 0
        }
        else {
            setNameError('')
        }
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
        if(!userDTO.pwd_re){
            setPwd_reError('비밀번호 재입력')
            sw = 0
        }
        else {
            setPwd_reError('')
        }
        if(!userDTO.tel){
            setTelError('휴대전화 입력')
            sw = 0
        }
        else {
            setTelError('')
        }

        if(sw === 1){
            axios.post(`https://port-0-companizoneback-ll53u2blrj4us1b.sel5.cloudtype.app/user/write`, null, {
                params : {
                    name : userDTO.name, // name으로 가능,
                    id : userDTO.id,
                    pwd : userDTO.pwd,
                    tel : userDTO.tel
                }
            }).then(
                alert('회원가입을 축하합니다.')
                )
                .then(
                onPage(0)
                
                )
            .catch(error => {  
                alert('회원가입에 실패하였습니다.')

            })
          }
    }
    const onReset = (e) => {
        e.preventDefault()
        
        setUserDTO({
            name : '',
            id : '',
            pwd : '',
            pwd_re : '',
            tel : ''
        })
    }

    return (
            <div className={ styles.main_writeform}>
                <p>회원가입</p>

                <div className={ styles._ }></div>

                    <div className={styles.write_main}>
                        <div className={ styles.name_start }>
                            <label htmlfor='name'>이름</label>
                            <input placeholder='이름을 입력해주세요.' name='name' value={ userDTO.name } onChange={ onInputChange } style={{ paddingLeft : '10px' }} />
                            <div className={styles.check}>{nameError}</div>
                        </div>

                        <div className={ styles.id }>
                                <label htmlfor='id'>아이디</label>
                                <input placeholder='아이디를 입력해주세요.' name='id' value={ userDTO.id } onChange={ onInputChange } />
                            <div className={styles.check} style={{paddingTop:'12px'}}>{idError}</div>
                        </div>

                        <div className={ styles.pwd }>
                            <label htmlfor='pwd'>비밀번호</label>
                            <input placeholder='비밀번호를 입력해주세요.' name='pwd' type='password' value={ userDTO.pwd } onChange={ onInputChange } />
                            <div className={styles.check}>{pwdError}</div>
                        </div>

                        <div className={ styles.pwd_re }>
                            <label htmlfor='pwd_re'>비밀번호 확인</label>
                            <input placeholder='동일한 비밀번호 입력' name='pwd_re' type='password' value={ userDTO.pwd_re } onChange={ onInputChange } />
                            <div className={styles.check}>{pwd_reError}</div>
                        </div>

                        
                        <div className={ styles.phone }>
                            <label className={ styles.label_phone }>휴대전화 번호</label>
                            <input placeholder='숫자만 입력해주세요.' type='tel' name='tel'
                                   value={ userDTO.tel } onChange={ onInputChange } style={{ paddingLeft : '10px' }} />
                            <div className={styles.check}>{telError}</div>
                        </div>

                        <div style={{ clear : 'both' }}/>

                        <div className={ styles.buttons }>
                            <button onClick={ onWriteSubmit }>회원가입</button>
                            <button onClick={ onReset }>취소</button>
                        </div>
                    </div>
            </div>   
    );
}

export default WriteForm;