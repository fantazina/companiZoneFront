import React, { useState } from 'react';
import M_styles from '../css/MyPage.module.css';
import axios from 'axios';

const MyPage = ({onPage}) => {
    const[userDTO, setUserDTO] = useState(JSON.parse(window.sessionStorage.getItem('userDTO')))
     
    const[nameError, setNameError] = useState('');
    const[pwdError, setPwdError] = useState('');
    const[pwd_reError, setPwd_reError] = useState('');
    const[telError, setTelError] = useState('');
    
    const[pwdPass, setPwdPass] = useState(false)
    const[pwdSend, setPwdSend] = useState('')
    
    const onPwdSubmit = () => {
        axios.post(`http://localhost:8080/user/checkPwd`, { id: userDTO.id , password : pwdSend })
             .then(res => setPwdPass(res.data))
          
    }

    const onPwd = (e) => {
        setPwdSend(e.target.value)

    }

    const onInputChange = (e) => {
        const{ name, value } = e.target;

        setUserDTO({
            ...userDTO,
            [name] : value
        })
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
        axios.put(`http://localhost:8080/user/update`, userDTO)
        .then(
            alert('정보 수정이 완료되었습니다.')
        )
        .then(
            onPage(0)
        )
        .catch(error => console.log(error))
    }
}

    const onReset = (e) => {
        e.preventDefault()
        
        setUserDTO(JSON.parse(window.sessionStorage.getItem('userDTO')))
    }

    return (
        <div className={ M_styles.main_writeform }>
            <p style={{ fontSize : '25px', margin: '10px', marginTop : '20px' }}>정보 수정</p>
            <div className={ M_styles._ }></div>
                { !pwdPass && 
                    <div className={ M_styles.pwd_check }>
                        <h4>개인 정보 보호를 위해 비밀번호를 다시 입력해 주세요!</h4>
                            <span>비밀번호 확인</span>
                            <input placeholder='비밀번호를 입력해주세요.' value={ pwdSend } type='password' onChange={ onPwd }/>
                            <button onClick={ onPwdSubmit }>확인</button>
                    </div>
                }
                { pwdPass && <div className={ M_styles.write_main }>
                    <div className={ M_styles.name_start }>
                        <label htmlfor='name'>이름</label>
                        <input placeholder='이름을 입력해주세요.' name='name' value={ userDTO.name } onChange={ onInputChange } style={{ paddingLeft : '10px' }}/>
                        <div className={ M_styles.check }></div>
                    </div>

                    <div className={ M_styles.id }>
                            <label htmlfor='id'>아이디</label>
                            <input name='id' value={ userDTO.id } readOnly />
                        <div className={ M_styles.check } style={{ paddingTop:'12px' }}></div>
                    </div>

                    <div className={ M_styles.pwd }>
                        <label htmlfor='pwd'>비밀번호</label>
                        <input placeholder='비밀번호를 입력해주세요.' name='pwd' type='password' value={ userDTO.pwd } onChange={ onInputChange } />
                        <div className={ M_styles.check }></div>
                    </div>

                    <div className={ M_styles.pwd_re }>
                        <label htmlfor='pwd_re'>비밀번호 확인</label>
                        <input placeholder='동일한 비밀번호를 입력해주세요.' name='pwd_re' type='password' value={ userDTO.pwd_re } onChange={ onInputChange } />
                        <div className={ M_styles.check }></div>
                    </div>

                    
                    <div className={ M_styles.phone }>
                        <label className={ M_styles.label_phone }>휴대전화 번호</label>
                        <input placeholder='하이픈(-)을 빼고 입력해주세요.' type='tel' name='tel' value={ userDTO.tel } onChange={ onInputChange } style={{ paddingLeft : '10px' }}/>
                        <div className={ M_styles.check }></div>
                    </div>

                    <div style={{ clear : 'both' }}/>

                    <div className={ M_styles.buttons }>
                        <button onClick={ onWriteSubmit }>정보 수정</button>
                        <button onClick={ onReset }>취소</button>
                    </div>
                </div>}
        </div>   
    );
};

export default MyPage;