'use client';

import { FC } from 'react';

const ConsoleLog: FC<{ log: any }> = ({ log }) => {
  console.log(log);
  return null;
};

export default ConsoleLog;
