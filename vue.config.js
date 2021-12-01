const path = require('path');
const fs = require('fs');
const processArgs = require('minimist')(process.argv.slice(2));

const resolve = (dir) => path.resolve(__dirname, dir);

// 入口页面基础配置
const pageBaseConfig = {
  root: resolve('src/pages'),
  entry: 'main.ts',
  template: 'public/index.html',
  filename: 'index.html'
};

// https://www.npmjs.com/package/webpack-bundle-analyzer
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// https://www.npmjs.com/package/git-revision-webpack-plugin
const GitRevisionPlugin = require('git-revision-webpack-plugin');

const gitRevisionPlugin = new GitRevisionPlugin({
  branch: true
});

const package = require('./package.json');

const gitInfo = {
  VERSION: gitRevisionPlugin.version(),
  COMMITHASH: gitRevisionPlugin.commithash(),
  BRANCH: gitRevisionPlugin.branch()
};

// 模板参数，应用 template html
// 可在html 使用如： <%=webpackConfig.externals.gitInfo.BRANCH%>
const templateParameters = {
  nowTimeString: new Date().toISOString(),
  // package.json信息
  package,
  // 进程信息
  process: {
    env: process.env
  },
  // git信息
  gitInfo
};

// multi-page 模式, 获取所有page
const getPages = () => {
  // 同步读取pages下的文件
  const files = fs.readdirSync(pageBaseConfig.root);
  const pages = {};

  for (let i = 0; i < files.length; i++) {
    const pageInfo = { name: files[i] };
    pageInfo.path = path.join(pageBaseConfig.root, pageInfo.name);

    if (fs.lstatSync(pageInfo.path).isFile()) {
      continue;
    }

    // 如果没有入口文件，则跳过
    pageInfo.entry = path.join(pageInfo.path, pageBaseConfig.entry);
    if (!fs.existsSync(pageInfo.entry)) {
      continue;
    }

    // 如果对应page下有index模板，则使用该模板，否则使用默认
    const templatePath = path.join(pageInfo.path, 'index.html');
    const template = fs.existsSync(templatePath) ? templatePath : pageBaseConfig.template;

    pages[pageInfo.name] = {
      entry: pageInfo.entry,
      template,
      filename: pageInfo.name === 'index' ? 'index.html' : `${pageInfo.name}.html`,
      title: pageInfo.name
    };
  }
  return pages;
};

/**
 * 如果以单模块启动，则只构建单页面
 */
let entryPages = getPages();
if (processArgs.action === 'module' && processArgs.name && entryPages[processArgs.name]) {
  const tmpPage = {};
  tmpPage[processArgs.name] = entryPages[processArgs.name];
  entryPages = tmpPage;
}

module.exports = {
  pages: entryPages,
  // 使用相对路径
  publicPath: '',
  // 将 lint 错误输出为编译警告
  lintOnSave: 'warning',
  // 输出文件夹
  outputDir: 'dist',
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: 'static',
  // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
  indexPath: 'index.html',
  // 文件名hash
  filenameHashing: true,
  // 生产环境不生成sourcemap
  productionSourceMap: false,
  // 设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性。
  // crossorigin: 'anonymous',
  devServer: {
    open: process.env.NODE_ENV === 'development',
    host: '0.0.0.0',
    port: '2085',
    overlay: {
      warnings: false,
      errors: true
    },
    // 代理设置
    proxy: {
      // detail:https://github.com/chimurai/http-proxy-middleware#proxycontext-config
      '/api': {
        target: 'https://request.worktile.com/6n6gHbBDL',
        changeOrigin: true,
        pathRewrite: {
          '^/api/1': '/api/3', // rewrite path
          '^/api/remove/path': '/path' // remove base path
        }
      }
    }
  },
  // webpack 配置
  configureWebpack: (config) => {
    // config.resolve.alias['@'] = 'src'

    // 注入变量
    config.externals = { ...config.externals, ...templateParameters };

    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
    } else {
      config.plugins.push(new BundleAnalyzerPlugin());
      config.plugins.push(gitRevisionPlugin);
    }
  },
  // 是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。允许对内部的 webpack 配置进行更细粒度的修改。
  // https://cli.vuejs.org/zh/guide/webpack.html#%E9%93%BE%E5%BC%8F%E6%93%8D%E4%BD%9C-%E9%AB%98%E7%BA%A7
  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => options);

    // https://webpack.docschina.org/plugins/split-chunks-plugin/#splitchunkscachegroups
    // config.optimization.splitChunks({
    //   chunks: 'all',
    //   minSize: 1000,
    //   minChunks: 1,
    //   maxAsyncRequests: 30,
    //   maxInitialRequests: 30,
    //   cacheGroups: {
    //     libs: {
    //       name: 'chunk-libs',
    //       test: /[\\/]node_modules[\\/]/,
    //       priority: 30,
    //       chunks: 'initial' // only package third parties that are initially dependent
    //     },
    //     page: {
    //       name: 'page',
    //       priority: 20,
    //       chunks: 'initial'
    //     },
    //   }
    // })
  },
  // css 配置
  css: {
    sourceMap: process.env.NODE_ENV !== 'production'
  }
};
