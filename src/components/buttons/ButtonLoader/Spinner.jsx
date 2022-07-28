import React from 'react';
import { Spin } from 'antd';

import 'antd/dist/antd.css';
import s from './Spinner.scss';

function Spinner() {
  return (
    <div className={s.wrapper}>
      <Spin size="24" />
    </div>
  );
}

export default Spinner;
