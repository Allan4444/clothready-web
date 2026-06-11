# ClothReady Web — Next.js 14 Frontend

无头B2B外贸站前端，使用 Next.js 14 App Router + TypeScript + Tailwind CSS。

## 项目结构

```
clothready-web/
├── app/
│   ├── layout.tsx              # 根布局 + 全局 SEO
│   ├── page.tsx                # 首页 (/)
│   ├── globals.css             # 全局样式 + Geologica字体
│   ├── sitemap.ts              # 自动生成 sitemap.xml
│   ├── robots.ts               # 自动生成 robots.txt
│   ├── about/page.tsx          # 关于我们 (/about)
│   ├── products/page.tsx       # 产品页 (/products)
│   ├── contact/page.tsx        # 联系 + 询盘表单 (/contact)
│   ├── sample-order/page.tsx   # 样品下单 (/sample-order)
│   └── tracking/page.tsx       # 物流追踪 (/tracking)
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # 导航栏（响应式）
│   │   └── Footer.tsx          # 页脚
│   ├── sections/
│   │   ├── Hero.tsx            # 首屏Video
│   │   ├── Guarantees.tsx      # 4项保证
│   │   ├── WhoWeWorkWith.tsx   # 合作客户类型
│   │   ├── Process.tsx         # 6步生产流程
│   │   └── CTA.tsx             # 召唤行动
│   └── ui/
│       └── Reveal.tsx          # 滚动揭示动画
├── lib/
│   └── api.ts                  # FastAPI 后端调用封装
├── public/
│   └── logo.png                # 品牌Logo（白色透明PNG）
├── next.config.js              # Next.js配置 + 安全header
├── tailwind.config.ts          # Tailwind配置（自定义品牌色）
├── vercel.json                 # Vercel部署+裸域名重定向
└── package.json
```

---

## 本地开发

```bash
# 1. 安装依赖
npm install

# 2. 配置环境变量
cp .env.local.example .env.local
# 编辑 .env.local 填入：
# NEXT_PUBLIC_API_URL=https://api.clothready.com

# 3. 启动开发服务器
npm run dev
# 访问 http://localhost:3000
```

---

## 部署到 Vercel

### 第一步：推送到 GitHub

```bash
cd clothready-web
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourname/clothready-web.git
git push -u origin main
```

### 第二步：在 Vercel 部署

1. 登录 [vercel.com](https://vercel.com)，用 GitHub 账号登录
2. **Add New** → **Project** → 选择 `clothready-web` 仓库
3. Framework 自动识别为 Next.js，无需修改
4. **Environment Variables** 添加：

   | 变量名 | 值 |
   |--------|-----|
   | `NEXT_PUBLIC_API_URL` | `https://api.clothready.com` |
   | `NEXT_PUBLIC_SITE_URL` | `https://www.clothready.com` |
   | `NEXT_PUBLIC_SITE_NAME` | `ClothReady` |

5. 点 **Deploy**，约 2 分钟完成
6. 访问 `https://clothready-web.vercel.app` 验证

### 第三步：绑定自定义域名

#### 方案 A：使用 Cloudflare DNS（推荐）

1. 在 Vercel 项目 → **Settings** → **Domains** → 添加 `www.clothready.com` 和 `clothready.com`
2. Vercel 会显示需要在 DNS 添加的记录
3. 登录 Cloudflare → 选择域名 → **DNS Records**
4. 添加：

   | 类型 | 名称 | 值 | 代理状态 |
   |------|------|-----|---------|
   | A | @ | `76.76.21.21` | DNS only(灰云) |
   | CNAME | www | `cname.vercel-dns.com` | DNS only |

   > **重要**: 必须用 "DNS only"（灰云），不要 "Proxied"（橙云）。Vercel 自带 CDN，不与 Cloudflare 代理叠用。

5. 等待 DNS 生效（通常几分钟，最长24小时）
6. Vercel 自动签发 SSL 证书

#### 方案 B：在 Vercel 完整托管

1. Vercel → **Settings** → **Domains** → 添加域名
2. Vercel 给出 Nameservers（如 `ns1.vercel-dns.com`）
3. 在你的域名注册商（Namecheap/GoDaddy）将 Nameservers 替换为 Vercel 提供的
4. 自动完成

---

## 域名结构建议

| 域名 | 用途 | 部署平台 |
|------|------|---------|
| `www.clothready.com` | 网站前端 | **Vercel** |
| `clothready.com` | 重定向到 www | Vercel（自动） |
| `api.clothready.com` | FastAPI 后端 | **Railway** |
| `admin.clothready.com` | 后台管理 | Retool/Vercel |

---

## 上线后配置

### 1. 提交到搜索引擎

- Google Search Console: 验证 `https://www.clothready.com`，提交 `sitemap.xml`
- Bing Webmaster Tools: 同上

### 2. 性能监控

Vercel 自动提供：
- Analytics（PV/UV）
- Speed Insights（Core Web Vitals）
- 日志和错误追踪

### 3. 邮件域名验证

在 Resend 仪表盘添加 `clothready.com`，按指示在 Cloudflare 添加：
- `MX` 记录
- `TXT` 记录（SPF + DKIM）

这样 `info@clothready.com` 才能正常发邮件。

---

## 后续扩展

- **博客**: 在 `app/blog/[slug]/page.tsx` 添加 MDX 内容
- **多语言**: 加入 `next-intl` 支持 EN/ZH/ES
- **CMS**: 集成 Sanity / Contentful 让客户自己编辑产品
- **i18n SEO**: 使用 `hreflang` 标签
- **A/B 测试**: 用 Vercel Edge Config

---

## 故障排查

| 问题 | 解决 |
|------|------|
| 表单提交报 CORS 错误 | 检查 FastAPI `ALLOWED_ORIGINS` 包含你的前端域名 |
| 字体不显示 | 清浏览器缓存，确认 `globals.css` 中的 Google Fonts 链接可访问 |
| 域名指向 Vercel 失败 | 确认 Cloudflare 代理为"DNS only" |
| Build 报 TypeScript 错误 | 运行 `npm run lint` 检查 |

---

## 完整启动流程速查

```bash
# Backend (Railway)
git push → Railway自动部署 → 绑定 api.clothready.com

# Frontend (Vercel)
git push → Vercel自动部署 → 绑定 www.clothready.com

# Database (Supabase)
SQL Editor 运行建表脚本 → 启用 RLS → 添加API Key到Railway

# Email (Resend)
验证域名 → 添加 DNS 记录 → 测试发送
```

3条命令上线完整 B2B 平台。
