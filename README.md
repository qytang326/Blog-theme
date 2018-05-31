# Quanyin Blog Hugo主题模板

[![Author](https://img.shields.io/badge/author-@qytang326-green.svg?style=flat)](https://qytang326.github.io/)
[![Hugo Build Status](https://travis-ci.org/qytang326/Blog-theme.svg?branch=hugo-theme "Hugo Build Status")](https://travis-ci.org/qytang326/Blog-theme)
[![License](https://img.shields.io/badge/License-Apache--2.0-blue.svg?style=flat)](LICENSE.md)

>移植自[@Huxpro](https://github.com/Huxpro/huxpro.github.io),感谢！

### [我的博客在这里 &rarr;](https://qytang326.github.io)
### [主题预览 &rarr;](https://qytang326.github.io/Blog-theme)

**郑重声明:** 本博客所有文章均采用 [署名-非商业性使用-相同方式共享 4.0 国际 (CC BY-NC-SA 4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/)，分享、演绎需准守以下原则:

1. 署名: 您需要标出原文链接和作者信息;如果更改了原文章内容,需要说明.
2. 非商业使用: 您不得将本作品用于商业目的.
3. 相同方式共享: 基于本博客文章修改的作品需适用同一类型的许可协议.

署名-非商业性使用-相同方式共享”许可协议该项许可协议规定，只要他人注明您的姓名并在以您的作品为基础创作的新作品上适用同一类型的许可协议，该他人就可基于非商业目的对您的作品重新编排、节选或者以您的作品为基础进行创作。基于您的作品创作的所有新作品都要适用同一类型的许可协议，因此适用该项协议，则对任何以您的原作为基础创作的演绎作品自然同样都不得进行商业性使用。

**关于博客样式主题及开源证书**

修改自[Hux](https://huangxuan.me). powered by [Hugo](https://gohugo.io) and [startbootstrap-clean-blog](https://github.com/humboldtux/startbootstrap-clean-blog).

Licensed under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0) 开源证书.

## 支持

* 你可以自由的fork。如果你能将主题作者和 github 的地址保留在你的页面底部，我将非常感谢你。
* 如果你喜欢我的这个博客模板，请给这个 repository 点个赞——右上角**star**一下。

## 说明文档

### 环境配置与主题安装

1. 安装Hugo

从[Hugo Release](https://github.com/spf13/hugo/releases)页上下载二进制文件安装即可。

2. 生成站点
```
$ hugo new site mysite
```
其中`mysite`可以是任意的路径，进入到这个文件夹下，有如下的目录结构：
```
  ▸ archetypes/
  ▸ content/
  ▸ layouts/
  ▸ static/
    config.toml
```
其中的`config`是站点的配置文件，`content/`目录放的是文章，`static/`里是静态文件。

3. 使用主题
```
$ git clone -b hugo-theme https://github.com/qytang326:Blog-theme.git themes/Quanyin
```
如果想预览下主题样式，只需运行：
```
$ hugo server --theme=Quanyin
```
或者进入到`themes/Quanyin/exampleSite/`目录下，执行：
```
$ hugo server
```
推荐后一种方式。

如果要使用主题，可以在`config.toml`里加上`theme = "Quanyin"`即可，更加推荐的方式是复制`exampleSite/`下的`config.toml`并进行修改。

参考文档：[使用hugo搭建个人博客站点](http://www.gohugo.org/post/coderzh-hugo/ ) & [Hugo官方主页](https://hugo.io) & [Hugo中文文档](http://www.gohugo.org)

### 主题使用详细说明

详细特性见`config.toml`文件以及原来的 [Jekyll 主题说明](https://github.com/qytang326/Blog-theme/blob/jekyll-theme/README.md)

### LICENSE

[Apache v2.0 © Quanyin Tang](./LICENSE.md)

```
          Copyright (c) 2018 Quanyin Tang

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
   
   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```