# ThreeJS Tutorial

[![action][ci-image]][ci-url]
[![license][license-image]][repository-url]
[![GitHub last commit][last-commit-image]][repository-url]
[![GitHub commit activity][commit-activity-image]][repository-url]

基于 ThreeJS 做的 一些演示案例。

[所有示例快速预览。][github-pages-url]

## 预览

- [模型自动拆分展示/爆炸效果](https://funnyzak.github.io/threejs-tutorial/#/tutorial/dismantling2)
  ![效果预览](https://raw.githubusercontent.com/funnyzak/threejs-tutorial/dev/public/assets/imgs/dismantling2.gif)
- [模型自动拆分展示/爆炸效果](https://funnyzak.github.io/threejs-tutorial/#/tutorial/dismantling)
  ![效果预览](https://raw.githubusercontent.com/funnyzak/threejs-tutorial/dev/public/assets/imgs/dismantling.gif)

## 使用

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

[ci-image]: https://img.shields.io/github/actions/workflow/status/funnyzak/threejs-tutorial/build.yml
[ci-url]: https://github.com/funnyzak/threejs-tutorial/actions
[license-image]: https://img.shields.io/github/license/funnyzak/threejs-tutorial.svg?style=flat-square
[repository-url]: https://github.com/funnyzak/threejs-tutorial
[github-pages-image]: https://img.shields.io/github/pages/funnyzak/threejs-tutorial.svg?style=flat-square
[github-pages-url]: https://funnyzak.github.io/threejs-tutorial/
[commit-activity-image]: https://img.shields.io/github/commit-activity/m/funnyzak/threejs-tutorial?style=flat-square
[last-commit-image]: https://img.shields.io/github/last-commit/funnyzak/threejs-tutorial?style=flat-square
