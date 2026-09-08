# Myth Coloring 本地工作流

保留现有区域配色流程，统一执行 config/QUALITY_RULES.md。原始素材仍只在 input 内部使用。

## 固定素材路径

从网站项目根目录看，每个产品只在 public/products/[slug]/ 保存四个公开产物：

- lineart.png：干净黑白线稿，首页主图和打印来源。
- color-guide.png：推荐配色，底部色卡，仅网页展示。
- finished.png：纯完成效果，无色卡，用于 hover 和详情查看。
- print.pdf：单页，只有产品标题、黑白 lineart、品牌页脚。

三个图片均为 A4 比例 2100×2970，不拉伸。PDF 默认 A4，可用 --paper letter 切换纸型，仍只生成一个 PDF。
本地元数据保留于本工作流 output/[slug]/product.json；这里不再保存图片或 PDF。
所有元数据路径使用 /products/[slug]/lineart.png、color-guide.png、finished.png、print.pdf。
网站产品数据读取这份 JSON，保留 draft，不自动发布。现有路由和页面结构未变。

## 运行

Python 3.10+，安装 requirements.txt 后在本工作流目录执行：

```sh
python make_product.py --slug nine-colored-deer --title "Nine-Colored Deer Coloring Page" --replace
```

当前电脑可使用捆绑 Python：

```powershell
.\run.ps1 --slug nine-colored-deer --title "Nine-Colored Deer Coloring Page" --replace
```

--replace 在全部检查通过后替换产品。未知文件会阻止替换。--input 是可选内部素材路径，不参与公开图片渲染。
不会调用发布命令，不接数据库或登录，不加入数字填色、多版本配色、色卡高亮。

## 全局完整性检查

所有区域必须明确指定颜色，或在 intentional_white 中记录设计留白理由。没有默认留白，1px 区域也不跳过。
审核线稿哈希、区域种子点和预期面积必须匹配；漏口先修闭合边界，再更新审核方案。
导出后逐像素检查应上色区域中的异常白洞、错色、原黑线改变、两图不一致和留白被误填。
检测失败返回错误数量和位置，要求修复，不覆盖旧产品、不写新的 quality passed。产品始终保持 draft。
区域设计需要人工判断，自动检查不能替代对身体／背景等语义的审核。禁止为通过检查把漏填位置随意归为留白。

## 当前九色鹿

保留原来的 9 色方案。补齐全部漏判小区域并修复云朵边界开口后，共 84 个上色区域、5 个明确留白区域：
外部山景、三处腿间负空间、一处微小山体区域。彩色指南和完成图共用同一套定义，无阴影、渐变和纹理。
两图异常白像素为 0，未分类区域为 0；PNG 原黑线保留。PDF 唯一嵌入图逐像素核对为黑白 lineart。

## 新图片

```sh
python scripts/inspect_regions.py --lineart input/new-lineart.png --review-dir config/review-new
```

内部区域清单包含所有大小的区域和外部背景。参考 config/nine-colored-deer.colors.json：
将应上色区域放入 regions（seed、expected_area、color），将刻意留白区域放入 intentional_white（seed、expected_area、reason）。
每个区域必须出现且只能出现一次。修复漏口后重新提取区域并复查，不沿用旧哈希。
颜色为 8–12 种，指南文字和色卡使用现有上下白边，不覆盖线条。

```sh
python make_product.py --slug new-creature --title "New Creature Coloring Page" --lineart input/new-lineart.png --colors config/new-creature.colors.json
```

## 网页预览

沿用原卡片和弹窗，增加 Line Art / Color Guide / Finished Preview 三视图。
点击图片可进入占满屏幕的预览，支持双指缩放、拖动、缩放按钮和重置。桌面 hover 仍显示 finished；移动端不依赖 hover。
Print 仍走原打印弹窗，任何视图下实际打印都只使用黑白线稿；Download 指向固定 print.pdf。
未发布的九色鹿可在本地显式启用预览：网站根目录 PowerShell 执行：

```powershell
$env:MYTHCOLORING_PREVIEW_DRAFTS='1'
npm run dev
```

此开关仅开发环境有效，生产构建不会把 draft 放进目录。

## 校验

从本工作流目录：

```sh
python scripts/check_product.py ../public/products/nine-colored-deer
python scripts/test_workflow.py
```

检查器核对四文件清单、固定 URL、可打开 PNG、A4 尺寸、灰块、填色完整性、单页 PDF、标题和精确品牌页脚、PDF 唯一黑白内嵌图，并实际渲染 PDF。
--preview-dir 可指定产品目录外的临时目录保存 PDF 预览，默认不产生额外文件。
