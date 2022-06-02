# ThreeJS-Model-Tutorial

[![action][ci-image]][ci-url]
[![license][license-image]][repository-url]
[![GitHub last commit][last-commit-image]][repository-url]
[![GitHub commit activity][commit-activity-image]][repository-url]

基于 ThreeJS 做的 一些演示案例。

[所有示例快速预览。][github-pages-url]

## 预览

- [模型拆分展示/自动爆炸效果](https://funnyzak.github.io/threejs-model-tutorial/#/tutorial/dismantling)
  ![效果预览](https://raw.githubusercontent.com/funnyzak/threejs-model-tutorial/public/.assets/imgs/dismantling.gif)

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

## 参考

- [threejs](https://github.com/mrdoob/three.js/tree/master)
- [threejs-model-viewer](https://adjam93.github.io/threejs-model-viewer/#)

## License

MIT License © 2021 [funnyzak](https://github.com/funnyzak)

[ci-image]: https://img.shields.io/github/workflow/status/funnyzak/threejs-model-tutorial/Release
[ci-url]: https://github.com/funnyzak/threejs-model-tutorial/actions
[license-image]: https://img.shields.io/github/license/funnyzak/threejs-model-tutorial.svg?style=flat-square
[repository-url]: https://github.com/funnyzak/threejs-model-tutorial
[github-pages-image]: https://img.shields.io/github/pages/funnyzak/threejs-model-tutorial.svg?style=flat-square
[github-pages-url]: https://funnyzak.github.io/threejs-model-tutorial/
[commit-activity-image]: https://img.shields.io/github/commit-activity/m/funnyzak/threejs-model-tutorial?style=flat-square
[last-commit-image]: https://img.shields.io/github/last-commit/funnyzak/threejs-model-tutorial?style=flat-square
