export * from './commret';

import { XCommRet } from './commret';

const r = new XCommRet<number>();
console.log(r);

r.setError(-1, '失败了');
console.log(r);

r.setError(-2, '失败了', '你好:');
console.log(r);

r.setOK(1999);
console.log(r);
