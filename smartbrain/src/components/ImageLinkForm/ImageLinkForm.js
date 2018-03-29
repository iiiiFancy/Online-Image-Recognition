import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = () => {
    return (
        <div>
            <p className='f3'>
                {'message'}
            </p>

            <div className='center'> {/*把下面的元素整合 */}
                <div className='form center pa4 br3 shadow-5'>  {/* 搜索框外围 */}
                    <input className='f4 pa2 w-70 center' type='tex'/>
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-light bg-light-purple'> Detect </button>
                </ div>
            </ div>
        </div>
    );
}

export default ImageLinkForm;