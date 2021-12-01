# Vue Quick Start

[![action][ci-image]][ci-url]
[![license][license-image]][repository-url]

Vue **3.0.0** 脚手架项目，快速开始一个 Vue 项目开发。[预览](https://funnyzak.github.io/vue-quick-start/)。

## 支持

- multi-page 支持
- babel 转换
- typescript 支持
- jest 支持
- eslint 支持
- vue router/vuex
- sass 支持
- png|svg|jpg|jpeg|gif 引入支持
- git commit hooks, no 💩

## 使用

使用的 Node 的构建版本为 **v16.6.2**，为避免冲突，建议使用此版本。可以使用 **_nvm_** 管理 Node 版本。

```bash
# 安装依赖
npm install

# 默认启动（所有）
npm run serve

# 全部构建（所有）
npm run build

# 仅启动**second**页
npm run serve:module second

# 仅构建**second**页
npm run build:module second

# Lint 格式化/检查
npm run eslint

# 运行 jest 测试
npm run test:unit
```

## 目录

    ├── babel.config.js                 // babel 配置
    ├── config                          // 配置
    │   └── build.js                    // 构建配置
    ├── dist                            // 构建输出
    ├── global.d.ts                     // typescript 全局声明
    ├── public                          // 静态资源
    ├── src                             // 前端源码
    │   ├── api                         // http api定义
    │   ├── assets                      // 资源文件
    │   ├── components                  // 通用组件
    │   ├── config                      // 应用配置
    │   ├── types                       // ts 声明文件
    │   ├── pages                       // 页面
    │   ├── shims-vue.d.ts              // vue ts定义
    │   ├── store                       // vuex
    │   └── utils                       // 工具库
    ├── tests                           // 测试
    ├── tsconfig.json                   // typescript 配置
    └── vue.config.js                   // vue配置

## 参考

- [Configuration Reference](https://cli.vuejs.org/zh/config/).
- [Babel Config](https://babel.docschina.org/docs/en/7.0.0/configuration/)
- [EsLint](https://eslint.org/docs/user-guide/configuring/)
- [eslintignore-file](https://eslint.org/docs/user-guide/configuring/ignoring-code#the-eslintignore-file)
- [TSconfig](https://www.typescriptlang.org/tsconfig/)
- [npmrc](https://docs.npmjs.com/cli/v7/configuring-npm/npmrc)
- [gitignore](https://git-scm.com/docs/gitignore)
- [webpack](https://webpack.docschina.org/guides/getting-started/)
- [prettier](https://prettier.io/docs/en/index.html)

## License

MIT License © 2021 [funnyzak](https://github.com/funnyzak)

[ci-image]: https://img.shields.io/github/workflow/status/funnyzak/vue-quick-start/Release
[ci-url]: https://github.com/funnyzak/vue-quick-start/actions
[license-image]: https://img.shields.io/github/license/funnyzak/vue-quick-start.svg?style=flat-square
[repository-url]: https://github.com/funnyzak/vue-quick-start
