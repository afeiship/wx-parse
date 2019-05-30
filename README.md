# wx-parse
> Parse html to wxml.


## usage
1. Copy `dist` to your project.
2. Build `deepth` with gulp, you can use `pakcage.json`
   ```json
    "buildConfig": {
      "deepth": 8,
      "prefix": "html-tag-"
    }
   ```
3. Use template in your project
   ```html
    <import src="../../components/views/parser/html.wxml" />
    <template is="html" data="{{ item: nodes }}"></template>
   ```
4. VDOM JSON
   ```js
   {
      type: 'element',
      tagName: 'section',
      children: [
        {
          type: 'element',
          tagName: 'div',
          attributes: {
            style: 'height:10rpx;width: 20rpx; border:1px solid #f00;'
          },
          children: [
            {
              type: 'element',
              tagName: 'strong',
              attributes: {},
              children: [
                {
                  type: 'text',
                  content: 'Strong text'
                }
              ]
            },
            {
              type: 'element',
              tagName: 'tu-audio',
              attributes: {
                class: 'wp-audio',
                src:
                  'http://kolber.github.io/audiojs/demos/mp3/juicy.mp3'
              }
            },
            {
              type: 'element',
              tagName: 'img',
              attributes: {
                src: 'https://via.placeholder.com/200x100',
                class: 'image'
              }
            },
            {
              type: 'text',
              content: 'I am text'
            },
            {
              type: 'element',
              tagName: 'tu-chart'
            }
          ]
        },
        {
          type: 'element',
          tagName: 'tu-image',
          attributes: {
            src:
              'http://himg.bdimg.com/sys/portrait/item/be10475f686d6c73db00.jpg'
          }
        },
        {
          type: 'element',
          tagName: 'br'
        },
        {
          type: 'text',
          content: 'Just another text!!!'
        }
      ]
    }
   ```

## renderTimeChunk
```js
import { $interaction, $api } from '#';
import wxParse from 'wx-parse';
import nxTimeChunk from 'next-time-chunk';

nx.Component({
  options: {
    addGlobalClass: true
  },
  properties: {
    model: {
      type: Object,
      value: {}
    }
  },
  data: {
    nodes: {
      loops: []
    }
  },
  lifetimes: {
    attached() {
      const article_id = parseInt(this.data.model.elem_id);
      $api.article_content_detail({ article_id }).then((response) => {
        const nodes = wxParse(response.content, { chunkOffset: 100 });
        const { loops } = this.data.nodes;
        $interaction.loading(true, { title: '加载中' });
        nxTimeChunk(nodes, (index, node) => {
          loops.push(index);
          this.setData({
            'nodes.loops': loops,
            [`nodes.${index}`]: node
          });
          console.info('[ render chunk ]:', index);
        })().then(() => {
          this.triggerEvent('complete');
        });
      });
    }
  }
});
```

```json
{
    "loops":[0,1,2,3,4],
    "nodes":{
        "0": node0,
        "1": node1,
        "2": node2,
        "3": node3,
        "4": node4,
    }
}
```

```html
<import src="./dist/html.wxml" />
<view class="root-container tu-wx-parse">
  <block wx:for="{{ nodes.loops }}" wx:key="{{ index }}" wx:for-item="subItem">
    <block wx:if="{{ nodes[index] }}">
      <template is="html" data="{{ item: nodes[index] }}"></template>
    </block>
  </block>
</view>
```

## KENG
~~~
- 最大的坑：不支持递归 
- 不支持 createElement 之类的API
- 网上有说法是用 A->B / B->A 之类的方法代替递归，实际上是不行的，因为他们测试的层级只有2层而已
- 另外：感谢 wxParse 这个库，实现思路是参考这个的
~~~

## resources
- http://www.weikeba.cn/article-1618-1.html
- http://blog.nicksite.me/index.php/archives/418.html
