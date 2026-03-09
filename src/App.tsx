import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, 
  CheckCircle2, 
  Circle, 
  ChevronRight, 
  ChevronLeft,
  Download,
  Settings,
  Server,
  Cpu,
  Copy,
  Check,
  AlertCircle
} from 'lucide-react';

const steps = [
  { id: 'welcome', title: '欢迎', icon: Download },
  { id: 'env', title: '运行环境', icon: Server },
  { id: 'config', title: '配置', icon: Settings },
  { id: 'install', title: '安装', icon: Terminal },
];

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [os, setOs] = useState('linux');
  const [components, setComponents] = useState({
    core: true,
    ui: true,
    api: false,
    docs: false
  });
  const [installPath, setInstallPath] = useState('/opt/openclaw');

  const nextStep = () => setCurrentStep(p => Math.min(p + 1, steps.length - 1));
  const prevStep = () => setCurrentStep(p => Math.max(p - 1, 0));

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-emerald-500/30">
      <div className="max-w-5xl mx-auto p-6 flex flex-col h-screen">
        {/* 头部 */}
        <header className="flex items-center justify-between py-6 border-b border-zinc-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Terminal className="text-zinc-950 w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">OpenClaw</h1>
              <p className="text-xs text-zinc-400 font-mono">v2.4.0 安装程序</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm font-mono text-zinc-500">
            <span>状态:</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              就绪
            </span>
          </div>
        </header>

        {/* 主体内容 */}
        <div className="flex-1 flex mt-8 gap-8 overflow-hidden">
          {/* 侧边栏 */}
          <div className="w-64 shrink-0 flex flex-col gap-2 overflow-y-auto hidden md:flex">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = idx === currentStep;
              const isPast = idx < currentStep;
              
              return (
                <div 
                  key={step.id}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    isActive ? 'bg-zinc-900 border border-zinc-800' : 
                    isPast ? 'text-zinc-400' : 'text-zinc-600'
                  }`}
                >
                  {isPast ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  ) : isActive ? (
                    <Icon className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                  <span className={`font-medium ${isActive ? 'text-zinc-100' : ''}`}>
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>

          {/* 内容区域 */}
          <div className="flex-1 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 md:p-8 overflow-y-auto relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                {currentStep === 0 && <WelcomeStep />}
                {currentStep === 1 && <EnvStep os={os} setOs={setOs} />}
                {currentStep === 2 && <ConfigStep components={components} setComponents={setComponents} installPath={installPath} setInstallPath={setInstallPath} />}
                {currentStep === 3 && <InstallStep os={os} components={components} installPath={installPath} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* 底部控制栏 */}
        <footer className="py-6 flex items-center justify-between border-t border-zinc-800 mt-6 shrink-0">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="px-4 py-2 rounded-lg font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            上一步
          </button>
          
          <button
            onClick={nextStep}
            disabled={currentStep === steps.length - 1}
            className="px-6 py-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 shadow-lg shadow-emerald-500/20"
          >
            {currentStep === steps.length - 2 ? '生成脚本' : '下一步'}
            <ChevronRight className="w-4 h-4" />
          </button>
        </footer>
      </div>
    </div>
  );
}

function WelcomeStep() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center max-w-lg mx-auto gap-6 py-10">
      <div className="w-20 h-20 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center mb-4">
        <Download className="w-10 h-10 text-emerald-400" />
      </div>
      <h2 className="text-3xl font-bold tracking-tight">安装 OpenClaw</h2>
      <p className="text-zinc-400 leading-relaxed">
        欢迎使用 OpenClaw 安装向导。此向导将帮助您配置环境并生成为您系统量身定制的一键安装脚本。
      </p>
      <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 w-full text-left mt-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <div className="text-sm text-zinc-300">
          <strong className="text-zinc-100 block mb-1">前置要求</strong>
          在继续之前，请确保您至少有 4GB 内存、10GB 可用磁盘空间以及可用的网络连接。
        </div>
      </div>
    </div>
  );
}

function EnvStep({ os, setOs }: { os: string, setOs: (os: string) => void }) {
  const osOptions = [
    { id: 'linux', name: 'Linux', desc: 'Ubuntu, Debian, CentOS' },
    { id: 'macos', name: 'macOS', desc: 'Intel 与 Apple 芯片' },
    { id: 'windows', name: 'Windows', desc: '推荐使用 WSL2' },
  ];

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto py-4">
      <h2 className="text-2xl font-bold mb-2">目标环境</h2>
      <p className="text-zinc-400 mb-8">选择将要安装 OpenClaw 的操作系统。</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {osOptions.map(opt => (
          <button
            key={opt.id}
            onClick={() => setOs(opt.id)}
            className={`p-4 rounded-xl border text-left transition-all ${
              os === opt.id 
                ? 'bg-emerald-500/10 border-emerald-500/50 ring-1 ring-emerald-500/50' 
                : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
            }`}
          >
            <div className="font-semibold text-zinc-100 mb-1">{opt.name}</div>
            <div className="text-xs text-zinc-500">{opt.desc}</div>
          </button>
        ))}
      </div>

      <div className="mt-8 p-4 bg-zinc-950 border border-zinc-800 rounded-xl">
        <h3 className="text-sm font-semibold text-zinc-300 mb-3 flex items-center gap-2">
          <Cpu className="w-4 h-4" /> 系统要求检查
        </h3>
        <ul className="space-y-2 text-sm text-zinc-400">
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 架构：支持 x86_64 / ARM64
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 网络：需要出站访问权限
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 依赖：curl, tar, git
          </li>
        </ul>
      </div>
    </div>
  );
}

function ConfigStep({ components, setComponents, installPath, setInstallPath }: any) {
  const toggleComponent = (key: string) => {
    if (key === 'core') return; // 核心组件是必需的
    setComponents({ ...components, [key]: !components[key] });
  };

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto py-4">
      <h2 className="text-2xl font-bold mb-2">配置选项</h2>
      <p className="text-zinc-400 mb-8">自定义您的 OpenClaw 安装。</p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">安装路径</label>
          <input 
            type="text" 
            value={installPath}
            onChange={(e) => setInstallPath(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-mono text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-3">组件</label>
          <div className="space-y-3">
            <div 
              className="flex items-center justify-between p-3 bg-zinc-950 border border-zinc-800 rounded-lg opacity-70 cursor-not-allowed"
            >
              <div>
                <div className="font-medium text-zinc-100">核心引擎</div>
                <div className="text-xs text-zinc-500">必需的基础系统</div>
              </div>
              <div className="w-5 h-5 rounded bg-emerald-500 flex items-center justify-center">
                <Check className="w-3 h-3 text-zinc-950" />
              </div>
            </div>

            {[
              { id: 'ui', name: 'Web 控制台', desc: '图形化用户界面' },
              { id: 'api', name: 'REST API', desc: '为外部集成提供接口' },
              { id: 'docs', name: '本地文档', desc: '离线参考资料' },
            ].map(comp => (
              <div 
                key={comp.id}
                onClick={() => toggleComponent(comp.id)}
                className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                  components[comp.id] 
                    ? 'bg-emerald-500/5 border-emerald-500/30' 
                    : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div>
                  <div className="font-medium text-zinc-100">{comp.name}</div>
                  <div className="text-xs text-zinc-500">{comp.desc}</div>
                </div>
                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                  components[comp.id]
                    ? 'bg-emerald-500 border-emerald-500'
                    : 'border-zinc-700'
                }`}>
                  {components[comp.id] && <Check className="w-3 h-3 text-zinc-950" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function InstallStep({ os, components, installPath }: any) {
  const [copied, setCopied] = useState(false);
  const [simulating, setSimulating] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const compFlags = Object.entries(components)
    .filter(([k, v]) => v && k !== 'core')
    .map(([k]) => `--with-${k}`)
    .join(' ');

  const scriptUrl = `https://get.openclaw.org/install.sh`;
  const command = os === 'windows' 
    ? `iwr -useb ${scriptUrl.replace('.sh', '.ps1')} | iex\nOpenClaw-Install -Path "${installPath}" ${compFlags}`
    : `curl -sSL ${scriptUrl} | bash -s -- --path ${installPath} ${compFlags}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const simulateInstall = () => {
    setSimulating(true);
    setLogs(['正在初始化安装...']);
    
    const steps = [
      `正在下载 OpenClaw 核心...`,
      `正在解压至 ${installPath}...`,
      ...Object.entries(components).filter(([k, v]) => v && k !== 'core').map(([k]) => `正在安装组件：${k}...`),
      `正在设置权限...`,
      `正在创建 systemd 服务...`,
      `正在启动 OpenClaw 服务...`,
      `安装完成！🎉`
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < steps.length) {
        setLogs(prev => [...prev, steps[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 800);
  };

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto py-4">
      <h2 className="text-2xl font-bold mb-2">准备安装</h2>
      <p className="text-zinc-400 mb-6">在您的终端中运行以下命令来安装 OpenClaw。</p>

      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative bg-zinc-950 border border-zinc-800 rounded-xl p-4 font-mono text-sm">
          <div className="flex justify-between items-center mb-2 border-b border-zinc-800 pb-2">
            <span className="text-zinc-500 text-xs">终端</span>
            <button 
              onClick={handleCopy}
              className="text-zinc-400 hover:text-zinc-100 flex items-center gap-1 text-xs transition-colors"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
              {copied ? '已复制！' : '复制'}
            </button>
          </div>
          <pre className="text-emerald-400 whitespace-pre-wrap break-all">
            {command}
          </pre>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-zinc-300">Web 安装器 (预览)</h3>
          {!simulating && (
            <button 
              onClick={simulateInstall}
              className="text-xs px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded text-zinc-300 transition-colors"
            >
              运行模拟
            </button>
          )}
        </div>
        
        {simulating && (
          <div className="bg-black border border-zinc-800 rounded-xl p-4 h-48 overflow-y-auto font-mono text-xs text-zinc-400 space-y-1">
            {logs.map((log, i) => (
              <div key={i} className="flex gap-2">
                <span className="text-zinc-600">[{new Date().toLocaleTimeString()}]</span>
                <span className={log.includes('完成') ? 'text-emerald-400 font-bold' : ''}>{log}</span>
              </div>
            ))}
            {logs.length < 8 && (
              <div className="flex gap-2 animate-pulse">
                <span className="text-zinc-600">[{new Date().toLocaleTimeString()}]</span>
                <span>_</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
