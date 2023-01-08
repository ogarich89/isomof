import { useEffect } from 'react';

import type { FunctionComponent } from 'react';

const Remote: FunctionComponent = () => {
  useEffect(() => {
    console.log(1111);
  }, []);
  return <h2>Remote</h2>;
};

export default Remote;
