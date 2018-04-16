+++
title = "Theme Preview | 主题预览"
subtitle = "主题预览"
description = "Hugo 主题，支持PWA"
date = 2018-03-11T12:36:38+08:00
lastmod = 2018-04-15
authors = "Quanyin Tang"
homepage = "https://quanyin.eu.org"

iframe = ""

keywords = ["Blog",]
tags = ["Github-pages",]
categories = ["编程",]

image = "/img/bg-default.jpg"
header_mask = 0.3

multilingual = false
toc = true
comment = true
mathjax = true
Mermaid = true
lazyload = true
+++
> 前两天动手把之前博客从Jekyll移植到Hugo上，原因是Hugo又快又方便

> Copy from [《Hugo 主题 Nuo 文章样式预览》](https://laozhu.me/post/hugo-nuo-post-preview/) ， 有部分修改。

这篇文章集中说明主题所支持的 Markdown 语法和 Hugo Shortcodes 插件，你也可以在这里预览到他们的样子。如果你不喜欢某些样式，可以去修改 less/ 文件夹进行调整。

<!--more-->
## 0.双语功能
使用方法：Front matter 中加入`multilingual = true`
```html
<div class="zh post-container">
{{</* file "content/post/test/test.zh" >}}
</div>
<div class="en post-container">
{{< file "content/post/test/test.en" */>}}
</div>
```
效果见[多语言测试](https://theme.quanyin.ml/2018/04/multilingual/)

## 1.标题

# H1
## H2
### H3
#### H4
##### H5
###### H6

## 2.段落

使用单引号 `*` 或者单下划线 `_` 标记 *斜体强调* 或者 _斜体强调_

使用两个引号 `**` 或者两个下划线 `__` 标记 **加粗强调** 或者 __加粗强调__

引号和下划线可叠加使用 → **只是加粗 _斜体并加粗_**

使用两个波浪线 `~~` 标记 ~~已删除文字~~

插入文字暂无 `Markdown` 标记，直接使用 `HTML` 标签 `<ins>` 标记 <ins>插入文字</ins>

行内代码使用反引号标记 → `print("hello world")`

上标 X<sup>2</sup> / 下标 X<sub>2</sub>

按键 <kbd>Ctrl</kbd>

外链 [chekun's blog](https://chekun.me)

页面内段落 [图片](#7-图片)

*注意：你可以通过 `{#section-id}` 方式自定义段落锚点*

参考资料 <sup>[[1]](#ref01)</sup><sup>[[2]](#ref02)</sup>

## 3.列表

以下的无序、有序和任务列表均支持二级嵌套，不建议使用二级以上嵌套。

### 3.1 无序列表

* 无序列表
  - 嵌套的无序列表
  - 嵌套的无序列表
* 无序列表
  1. 嵌套的有序列表
  2. 嵌套的有序列表
* 无序列表

### 3.2 有序列表

1. 有序列表
  1. 嵌套的有序列表
  2. 嵌套的有序列表
2. 有序列表
  - 嵌套的无序列表
  - 嵌套的无序列表
3. 有序列表

### 3.3 定义列表

CSS:
: 层叠样式表

### 3.4 任务列表

- [ ] Cmd Markdown 开发
  - [ ] 改进 Cmd 渲染算法，使用局部渲染技术提高渲染效率
  - [ ] 支持以 PDF 格式导出文稿
  - [x] 新增Todo列表功能 [语法参考](https://github.com/blog/1375-task-lists-in-gfm-issues-pulls-comments)
  - [x] 改进 LaTex 功能
  - [x] 修复 LaTex 公式渲染问题
  - [x] 新增 LaTex 公式编号功能 [语法参考](http://docs.mathjax.org/en/latest/tex.html#tex-eq-numbers)
- [ ] 七月旅行准备
  - [ ] 准备邮轮上需要携带的物品
  - [ ] 浏览日本免税店的物品
  - [x] 购买蓝宝石公主号七月一日的船票

## 4.引用

> 野火烧不尽，春风吹又生。
>
> <cite>-- 白居易《赋得古原草送别》</cite>

{{< blockquote cite="白居易《赋得古原草送别》" citelink="https://baike.baidu.com/item/%E8%B5%8B%E5%BE%97%E5%8F%A4%E5%8E%9F%E8%8D%89%E9%80%81%E5%88%AB/2873148" >}}
  <p>野火烧不尽，春风吹又生.</p>
{{< /blockquote >}}

## 5.代码

代码语法高亮演示。

```js
function helloWorld () {
  alert("Hello, World!")
}
```

```java
public class HelloWorld {
  public static void main(String[] args) {
    System.out.println("Hello, World!");
  }
}
```

```kotlin
package hello

fun main(args: Array<String>) {
  println("Hello World!")
}
```

```c
#include <stdio.h>

/* Hello */
int main(void){
  printf("Hello, World!");
  return 0;
}
```

```cpp
// 'Hello World!' program

#include <iostream>

int main(){
  std::cout << "Hello World!" << std::endl;
  return 0;
}
```

```cs
using System;
class HelloWorld{
  public static void Main(){
    System.Console.WriteLine("Hello, World!");
  }
}
```

```html
<html>
<body>
  Hello, World!
</body>
</html>
```

```go
package main
import fmt "fmt"

func main()
{
   fmt.Printf("Hello, World!\n");
}
```

```scala
object HelloWorld with Application {
  Console.println("Hello, World!");
}
```

```php
<?php
  echo 'Hello, World!';
?>
```

```python
print("Hello, World!")
```
## 6.分割线

---

中间能写字的分割线，如果你修改了分割线中字的内容，请配合修改 `CSS` 样式。

## 7.图片

不带标题的图片，如下图👇

`{{%/* figure src="/favicon.ico" */%}}`
{{% figure src="/favicon.ico" %}}

带标题的图片，如下图👇

`{{%/* figure class="center lazyload" src="/favicon.ico" alt="favicon" title="favicon" */%}}`
{{% figure class="center lazyload" src="/favicon.ico" alt="favicon" title="favicon" %}}

## 8.表格

使用 `Markdown` 画的表格，如下表👇

| Tables        | Are           | Cool  |
| :------------ |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

## 9.数学公式

主题使用了 [MathJax](https://www.mathjax.org/) 开源库来实现对数学公式的支持，使用 `$$` 标记。

$$ evidence\_{i}=\sum\_{j}W\_{ij}x\_{j}+b\_{i} $$

Marry has a little matrix `$ ( \begin{smallmatrix} a&b \\ c&d \end{smallmatrix} ) $`

## 10.流程图

[Mermaid](https://mermaidjs.github.io/) is a library helping you to generate diagram and flowcharts from text, in a similar manner as Markdown.

Just insert your mermaid code in the `mermaid` shortcode and that's it.

### Flowchart example
	{{</*mermaid align="left"*/>}}
	graph LR;
		A[Hard edge] -->|Link text| B(Round edge)
    	B --> C{Decision}
    	C -->|One| D[Result one]
    	C -->|Two| E[Result two]
    {{</* /mermaid */>}}

效果为：

{{<mermaid align="left">}}
graph LR;
	A[Hard edge] -->|Link text| B(Round edge)
    B --> C{Decision}
    C -->|One| D[Result one]
    C -->|Two| E[Result two]
{{< /mermaid >}}

### Sequence example

	{{</*mermaid*/>}}
	sequenceDiagram
	    participant Alice
	    participant Bob
	    Alice->>John: Hello John, how are you?
	    loop Healthcheck
	        John->John: Fight against hypochondria
	    end
	    Note right of John: Rational thoughts <br/>prevail...
	    John-->Alice: Great!
	    John->Bob: How about you?
	    Bob-->John: Jolly good!
	{{</* /mermaid */>}}

效果为：

{{<mermaid>}}
sequenceDiagram
    participant Alice
    participant Bob
    Alice->>John: Hello John, how are you?
    loop Healthcheck
        John->John: Fight against hypochondria
    end
    Note right of John: Rational thoughts <br/>prevail...
    John-->Alice: Great!
    John->Bob: How about you?
    Bob-->John: Jolly good!
{{< /mermaid >}}

### GANTT Example

	{{</*mermaid*/>}}
	gantt
	        dateFormat  YYYY-MM-DD
	        title Adding GANTT diagram functionality to mermaid
	        section A section
	        Completed task            :done,    des1, 2014-01-06,2014-01-08
	        Active task               :active,  des2, 2014-01-09, 3d
	        Future task               :         des3, after des2, 5d
	        Future task2               :         des4, after des3, 5d
	        section Critical tasks
	        Completed task in the critical line :crit, done, 2014-01-06,24h
	        Implement parser and jison          :crit, done, after des1, 2d
	        Create tests for parser             :crit, active, 3d
	        Future task in critical line        :crit, 5d
	        Create tests for renderer           :2d
	        Add to mermaid                      :1d
	{{</* /mermaid */>}}


效果：

{{<mermaid>}}
gantt
        dateFormat  YYYY-MM-DD
        title Adding GANTT diagram functionality to mermaid
        section A section
        Completed task            :done,    des1, 2014-01-06,2014-01-08
        Active task               :active,  des2, 2014-01-09, 3d
        Future task               :         des3, after des2, 5d
        Future task2               :         des4, after des3, 5d
        section Critical tasks
        Completed task in the critical line :crit, done, 2014-01-06,24h
        Implement parser and jison          :crit, done, after des1, 2d
        Create tests for parser             :crit, active, 3d
        Future task in critical line        :crit, 5d
        Create tests for renderer           :2d
        Add to mermaid                      :1d
{{</mermaid>}}



## 11. 音乐

主题文章中可以轻松插入 各大网站的指定音乐，由[Aplayer](https://github.com/MoePlayer/APlayer)提供支持，你可以根据需要将音乐设置为自动播放，在主题目录 `layouts/shortcodes` 文件夹下的 `music.html` 对该标签进行定义。

`{{%/* music "28196554" */%}}`
{{% music "28196554" %}}
`{{%/* music id="804530027" server="netease" type="playlist" */%}}`
{{% music id="804530027" server="netease" type="playlist" %}}

## 12. 附件
> 来自 Hugo-theme-Learn

1. If your page is a markdown file, attachements must be place in a **folder** named like your page and ending with **.files**.

    > * content
    >   * _index.md
    >   * page.files
    >      * attachment.pdf
    >   * page.md

2. If your page is a **folder**, attachements must be place in a nested **'files'** folder.

    > * content
    >   * _index.md
    >   * page
    >      * index.md
    >      * files
    >          * attachment.pdf

参数设置：

| Parameter | Default | Description |
|:--|:--|:--|
| title | "附件" | List's title  |
| ~~style~~ | "" | ~~Choose between "orange", "grey", "blue" and "green" for nice style~~ |
| pattern | ".*" | A regular expressions, used to filter the attachments by file name. <br/><br/>The **pattern** parameter value must be [regular expressions](https://en.wikipedia.org/wiki/Regular_expression).

例子：
列出所有以`pdf`和`mp4`结尾的文件:

`{{%/*attachments title="相关附件" pattern=".*(pdf|mp4)"/*/%}}`

效果：

{{%attachments title="相关附件" pattern=".*(pdf|mp4)"/%}}

## 13. 展开详细

自定义标题展开：

`{{%/*expand "好看吗?" */%}}Yes !.{{%/* /expand*/%}}`

{{%expand "好看吗?" %}}Yes !{{% /expand%}}

默认：

`{{%/*expand */%}}Yes !.{{%/* /expand*/%}}`

{{%expand %}}Yes !{{% /expand%}}

## 14. notice 等

Disclaimers to help you structure your page

### Note

```
{{%/* notice note */%}}
A notice disclaimer
{{%/* /notice */%}}
```

效果：

{{% notice note %}}
A notice disclaimer
{{% /notice %}}

### Info

```
{{%/* notice info */%}}
An information disclaimer
{{%/* /notice */%}}
```

效果:

{{% notice info %}}
An information disclaimer
{{% /notice %}}

### Tip

```
{{%/* notice tip */%}}
A tip disclaimer
{{%/* /notice */%}}
```

效果：

{{% notice tip %}}
A tip disclaimer
{{% /notice %}}

### Warning

```
{{%/* notice warning */%}}
An warning disclaimer
{{%/* /notice */%}}
```

效果：

{{% notice warning %}}
A warning disclaimer
{{% /notice %}}

## 官方提供的ShortCode
部分可能由于不明原因无法实现

- gist`{{</* gist spf13 7896402 "img.html" */>}}`
{{< gist spf13 7896402 "img.html" >}}
- instagram
`{{</* instagram BWNjjyYFxVx */>}}`
{{< instagram BWNjjyYFxVx >}}
`{{</* instagram BWNjjyYFxVx hidecaption */>}}`
{{< instagram BWNjjyYFxVx hidecaption >}}
- 引用与交叉引用
```
[About Me]({{</* ref "/about.md" */>}})
[测试]({{</* relref "multilingual.md#测试" */>}})
```
- speakerdeck
```
{{</* speakerdeck 4e8126e72d853c0060001f97 */>}}
```
{{< speakerdeck 4e8126e72d853c0060001f97 >}}
- tweet`{{</* tweet 877500564405444608 */>}}`
- vimeo `{{</* vimeo 146022717 */>}}`
{{< vimeo 146022717 >}}
- Youtube`{{</* youtube id="w7Ft2ymGmfc" autoplay="true" */>}}`或`{{%/* youtube "w7Ft2ymGmfc" */%}}`
{{% youtube "w7Ft2ymGmfc" %}}
{{< youtube id="w7Ft2ymGmfc" autoplay="true" >}}

## 参考资料

1. <a id="ref01">[Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)</a>
2. <a id="ref02">[Markdown 语法手册](https://www.zybuluo.com/EncyKe/note/120103)</a>