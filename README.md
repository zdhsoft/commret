# 通用的返回信息类
-  在我的xmcommon项目中，已经有了XCommonRet这个类，已经是我的工程必要的组成。但是，我在尝试编写前端程序的时候，发现xmcommon并不能在前端中使用。所以计划将一引起必要，前后端都可以用的东西拆出来使用。XCommRet将是我拆出来的第一个。
- 这里的代码全部使用typescript编写，并移除原来项目中，历史积累但是已经用不到的代码。并简化处理只保留必要的实现。

- 代码地址
  - github: https://github.com/zdhsoft/commret

- 发布包地址
  - npm: https://www.npmjs.com/package/@zdhsoft/commret

## 安装

npm install @zdhsoft/commret

## 版本变更说明
### 1.0.0
- \+ 第一版发布

## 示例
```typescript

const r = new XCommRet<number>();
console.log(r);

r.setError(-1, '失败了');
console.log(r);

r.setError(-2, '失败了', '你好:');
console.log(r, r.isOK, r.isNotOK);

const m = new XCommRet<number>();
m.assignFrom(r);
console.log(m, m.isOK, m.isNotOK);

r.setOK(1999, true);
console.log(r, r.isOK, r.isNotOK);

r.setOK(2000);
console.log(r.toJSON(), JSON.stringify(r), r.isOK, r.isNotOK);

function test() {
    const r = new XCommRet();
    do {
        r.setError(EnumErrorCode.FAIL, '这是一个错误', '', true);
        r.setError(-2, 'ccc', 'cccc', false, { aa: 99 });
        if (r.isNotOK) {
            break;
        }
    } while (false);
    return r;
}

test();

```
