import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => { //传入一个函数和一个bool变量
    if (isSignedIn) { // 如果当前是登陆状态，显示sign out按钮，点击时调用onRouteChange函数改变route变量
        return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p onClick={() => onRouteChange('signout')} className='f3 link dim black underline pa3 pointer'>Sign Out</p>
                {/*相应的按钮点击时调用onRouteChange函数改变route变量*/}
            </nav>
        );
    } else { // 如果当前未登录
        return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign In</p>
                <p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
            </nav>
        );
    }
};

export default Navigation;