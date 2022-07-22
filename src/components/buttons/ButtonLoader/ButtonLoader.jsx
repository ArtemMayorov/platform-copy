import React from 'react';
import { Spin } from 'antd';

import 'antd/dist/antd.css';
import s from './ButtonLoader.scss';

function ButtonLoader() {
  return (
    <div className={s.wrapper}>
      <Spin size="24" />
    </div>
  );
}

export default ButtonLoader;
