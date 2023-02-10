# Vaptcha TypeScript

_✨ 为Vaptcha提供在TypeScript中开发的良好体验。 ✨_

[![License](https://img.shields.io/github/license/ChongYing-Star/vaptcha-typescript)](https://github.com/ChongYing-Star/vaptcha-typescript/blob/main/LICENSE)
[![Typescript](https://img.shields.io/npm/types/@chongying-star/vaptcha-typescript)](https://www.typescriptlang.org/)
[![NPM Download](https://img.shields.io/npm/dw/@chongying-star/vaptcha-typescript)](https://www.npmjs.com/package/@chongying-star/vaptcha-typescript)
[![GitHub star](https://img.shields.io/github/stars/chongying-star/vaptcha-typescript?style=social)](https://github.com/ChongYing-Star/vaptcha-typescript)

本项目将对Vaptcha中的对象进行类型标注，并对功能进行二次封装，以提高开发体验。

## 什么是Vaptcha？

> VAPTCHA是“Variation Analysis based Public Turing Test to Tell Computers and Humans Apart”（基于变量分析来区分人类和计算机的图灵测试程序）的缩写，又称为手势验证码， 一种基于人工智能和大数据的人机验证解决方案 。用户仅需用鼠标绘制指定轨迹即可完成人机验证。VAPTCHA能有效防止恶意密码破解、论坛灌水、垃圾邮件、撞库等。

Vaptcha官网：[https://www.vaptcha.com/](https://www.vaptcha.com/)

## 如何使用

### 使用原始对象（仅类型标注）

你可以直接标注全局函数：

```typescript
import { GlobalFunction } from '@chongying-star/vaptcha-typescript';
declare global {
  interface Window {
    vaptcha: GlobalFunction;
  }
}
window.vaptcha({
  vid: '...'
}).then((obj) => {});
```
```typescript
import { GlobalFunction } from '@chongying-star/vaptcha-typescript';
((<any>window).vaptcha as GlobalFunction)({
  vid: '...'
}).then((obj) => {});
```

或者使用默认导出，它仅仅只是做了转发

```typescript
import vaptcha from '@chongying-star/vaptcha-typescript';
vaptcha({
  vid: '...'
}).then((obj) => {});
// vaptcha == (...args) => window.vaptcha(...args)
```


### 使用包装对象

`CyVaptcha`类是对官方对象的最简包装，与官方对象使用方式完全相同。它是一个ES Class，支持扩展，允许使用`instanceof`关键字判断继承关系。

```typescript
import { createVaptcha, CyVaptcha } from '@chongying-star/vaptcha-typescript';
createVaptcha({
  vid: '...',
  mode: 'invisible',
}).then((vaptcha) => {
  vaptcha instanceof CyVaptcha; // true
});
```

因此，可以通过扩展`CyVaptcha`类来实现更多的操作。

```typescript
import { createVaptcha, CyVaptcha } from '@chongying-star/vaptcha-typescript';

class MyVaptcha extends CyVaptcha {
  myMethod () {
    this.vaptcha; // this.vaptcha 是被包装的官方对象 可以通过该对象进行操作
    // ...
  }
}

createVaptcha({
  vid: '...',
  mode: 'invisible',
}, MyVaptcha).then((vaptcha) => {
  vaptcha instanceof CyVaptcha; // true
  vaptcha instanceof MyVaptcha; // true
});
```

## Api

### Type `CyVaptchaConfig`

配置项

**属性：**

- `immediateRender`
    - type: `boolean`
    - default: `true` *当为`true`且模式为点击式和嵌入式时，自动调用`render`方法*

### Function `createVaptcha`

构造封装后的Vaptcha对象

**参数：**

1. `option` Vaptcha配置项
    - type: `VaptchaOption`
2. `CyVaptchaType` 目标类型构造函数
    - type: 构造函数
    - default: `undefined` *当为`undefined`时构造函数为`CyVaptcha`*
3. `overrideConfig` 自定义覆盖配置
    - type: [`CyVaptchaConfig`](#type-cyvaptchaconfig)
