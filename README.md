# OpenClaw 安装向导

一个现代化的、基于 Web 的 OpenClaw 安装辅助工具。此应用程序提供了一个用户友好的界面，用于配置并生成适用于不同操作系统的 OpenClaw 一键安装脚本。

## 功能特性

- 🖥️ **多系统支持**：生成适用于 Linux、macOS 和 Windows 的安装脚本。
- ⚙️ **自定义配置**：选择安装路径及可选组件（Web 控制台、REST API、本地文档）。
- 📋 **一键复制**：轻松将生成的安装命令复制到剪贴板。
- 🚀 **模拟模式**：在浏览器中通过模拟终端直接预览安装过程。
- 🎨 **现代 UI**：使用 React、Tailwind CSS 和 Framer Motion 构建的时尚、深色技术风界面。

## 技术栈

- **框架**: React 19
- **样式**: Tailwind CSS v4
- **动画**: Framer Motion
- **图标**: Lucide React
- **构建工具**: Vite

## 快速开始

### 前置要求

请确保您的系统已安装 Node.js。

### 安装步骤

1. 克隆仓库或下载源代码。
2. 安装依赖：

```bash
npm install
```

### 开发环境

启动开发服务器：

```bash
npm run dev
```

应用程序将在 `http://localhost:3000` 运行。

### 生产环境构建

创建生产环境构建版本：

```bash
npm run build
```

构建后的文件将位于 `dist` 目录中。

## 使用说明

1. **欢迎**：查看安装 OpenClaw 的前置要求。
2. **运行环境**：选择您的目标操作系统（Linux、macOS 或 Windows）。
3. **配置选项**：设置您的首选安装路径并切换可选组件。
4. **安装**：复制生成的命令并在您的终端中运行，或点击“运行模拟”以预览安装过程。

## 许可证

本项目基于 Apache License 2.0 许可证开源 - 详情请参阅 [LICENSE](LICENSE) 文件。
