---
title: 最小最大宽高
author: 李嘉明
createTime: 2024/05/12 14:58:57
permalink: /defensive-css/ed64slmb/
---

最小宽度和最小高度

1. `min-width` || `max-width`
   - 给元素设置最小宽度那么元素最小就不会低于这个宽度
2. `max-height` || `max-height`
   - ``与宽度同理
3. 当 3 个冲突后怎么办：
   - 当 min-width 和 max-width 冲突的时候，min-width 是优先的
   - 当 width 和 min 或 max 冲突以后，min 或者 max 直接无视 width 的存在（无论是否添加 ！important）
