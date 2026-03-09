import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Mail, Phone, Cpu, Play, FileText, ChevronRight, History, X } from 'lucide-react';
import './App.css';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
};

// Scroll-triggered section component
function ScrollSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Timeline item component
function TimelineItem({ year, phase, desc, index }: { year: string; phase: string; desc: string; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative"
    >
      <div className="absolute -left-[61px] top-1 w-5 h-5 bg-[#050505] border-4 border-emerald-500 rounded-full" />
      <span className="font-mono text-emerald-500 font-bold">{year} — {phase}</span>
      <p className="text-gray-300 mt-2 text-lg">{desc}</p>
    </motion.div>
  );
}

function App() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  // 1. 工作经历数据
  const workHistory = [
    {
      time: "2024.04 - 至今",
      company: "深圳市奥盛达科技有限公司",
      role: "视觉设计师 / 实习组长",
      desc: "母婴、玩具、户外运动等。1.从执行转视觉策划，拆解受众意向；2.主导5个全流程策划案；3.研发n8n+ComfyUI工作流，实现一键出图、3C精修等，主导2个高转化AI广告视频。"
    },
    {
      time: "2023.08 - 2024.03",
      company: "深圳市猛狼科技有限公司",
      role: "电商设计师",
      desc: "童装、女装等。负责竞品分析与页面布局逻辑。主动利用SD/ComfyUI制作AI模型，实现0成本场景迭代。"
    },
    {
      time: "2023.03 - 2023.06",
      company: "深圳市正元智合科技有限公司",
      role: "电商设计师",
      desc: "负责女装品类精修、合成与A+制作，独立承担大型项目，保证品牌调性一致性。"
    },
    {
      time: "2020.09 - 2023.01",
      company: "深圳市谷龙科技有限公司",
      role: "电商设计师 / 服装开发",
      desc: "完成3D印花设计初稿，架构A+及Logo视觉系统，通过营销视频提升停留时间与转化率。"
    }
  ];

  // 2. 策划案数据
  const plans = [
    { title: "恐龙对讲机创意策划", file: "/files/dinosaur_plan.pdf" },
    { title: "电动充气创意策划", file: "/files/pump_plan.pdf" },
    { title: "Fitense 智能跑步机策划案", file: "/files/treadmill-plan.pdf" }
  ];

// 3. 作品展示数据：每个项目包含 [封面图] 和 [跳转文件]
const worksImages = [
  { 
    id: 1, 
    color: "from-emerald-500/30", 
    thumbnail: "/images/output-1.jpg",  // 这里放你做好的 JPG 封面图
    link: "/files/1.pdf"                // 这里放你点击后要看的 PDF 文件
  },
  { 
    id: 2, 
    color: "from-blue-500/30", 
    thumbnail: "/images/output-2.jpg", 
    link: "/files/2.pdf" 
  },
  { 
    id: 3, 
    color: "from-purple-500/30", 
    thumbnail: "/images/output-3.jpg", 
    link: "/files/3.pdf" 
  },
  { 
    id: 4, 
    color: "from-orange-500/30", 
    thumbnail: "/images/output-4.jpg", 
    link: "/files/4.pdf" 
  }
];
// 找到数据定义区域，添加或修改这一段
const n8nProject = {
  title: "n8n + Gemini Automation Workflow",
  desc: "实现视觉生产从需求到成品的自动化 SaaS 流转，彻底改变传统生产关系。",
  thumbnail: "/images/n8n-logic.jpg", // 右侧显示的截图
  videoUrl: "/videos/n8n-demo.mp4"    // 点击按钮打开的视频路径
};
  // n8n生成的图片案例
// --- 1. 修改这里：绑定真实的 AI 作品图片路径 ---
  // 请确保 public/images/ 目录下有 ai-1.jpg 到 ai-8.jpg 这 8 张图
  const n8nOutputs = [
    { id: 1, ratio: "aspect-[16/10]", img: "/images/ai-1.jpg" }, // ratio 用来微调长方形的比例
    { id: 2, ratio: "aspect-[16/10]", img: "/images/ai-2.jpg" },
    { id: 3, ratio: "aspect-[16/10]", img: "/images/ai-3.jpg" },
    { id: 4, ratio: "aspect-[16/10]", img: "/images/ai-4.jpg" },
    { id: 5, ratio: "aspect-[16/10]", img: "/images/ai-5.jpg" },
    { id: 6, ratio: "aspect-[16/10]", img: "/images/ai-6.jpg" },
    { id: 7, ratio: "aspect-[16/10]", img: "/images/ai-7.jpg" },
    { id: 8, ratio: "aspect-[16/10]", img: "/images/ai-8.jpg" }
  ];
// 品牌展示数据 -确保文件名和你的 public 文件夹内一致
  const brandProject = {
    logoImg: "/images/logo.jpg",       // 你的 logo 图片
    videoTitle: "Fitense品牌创意",      // 对应 Fitense品牌创意.mp4
    thumbnail: "/images/logo封面.jpg"   // 你的封面图
  };
  // Page 9: AI 视频脚本数据（点击看大图）
  const videoScriptCases = [
    { title: "小熊抱被脚本", desc: "电影级分镜构思 / 提示词逻辑", img: "/images/ai视频脚本1.jpg" },
    { title: "温奶瓶脚本", desc: "产品卖点拆解 / 视觉叙事编排", img: "/images/ai视频脚本2.jpg" }
  ];
// Page 11: 品牌策划 6 张展示图
  const brandPlanGallery = [
    { id: 1, img: "/images/品牌1.jpg", title: "品牌故事理念" },
    { id: 2, img: "/images/品牌2.jpg", title: "用户画像" },
    { id: 3, img: "/images/品牌3.jpg", title: "突破点" },
    { id: 4, img: "/images/品牌4.jpg", title: "品牌核心关键词" },
    { id: 5, img: "/images/品牌5.jpg", title: "LOGO创意思路" },
    { id: 6, img: "/images/品牌6.jpg", title: "视觉推导" }
  ]
  // AI 视频案例数据
  const aiVideos = [
    { 
      id: "ai-video-1", 
      title: "小熊抱被-电影级创意广告片", 
      thumbnail: "/images/ai视频1.jpg" // 建议用你的作品图做封面
    },
    { 
      id: "ai-video-2", 
      title: "温奶瓶创意广告片", 
      thumbnail: "/images/ai视频2.jpg" 
    }
    
  ];
  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden selection:bg-emerald-500/30">
      
      {/* Page 1: 英雄页 - 杂志感排版 */}
      <section className="h-screen flex items-center px-10 md:px-24 relative">
        <div className="max-w-5xl z-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 1 }} 
            className="border-l-2 border-emerald-500 pl-8 md:pl-16"
          >
            <h1 className="text-8xl md:text-[10rem] font-black tracking-tighter leading-none mb-6">黄兰淇</h1>
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <span className="bg-emerald-500 text-black px-4 py-1 text-xs font-black tracking-widest uppercase">求职意向</span>
              <p className="text-2xl md:text-3xl font-light tracking-widest text-emerald-400 italic">视觉设计组长 / AIGC视觉设计师</p>
            </div>
            <div className="max-w-2xl">
              <p className="text-gray-300 text-lg leading-relaxed font-light">
                工业设计+5年亚马逊全品类实战经验。坚持逻辑驱动视觉，拒绝美工作图，旨在为品牌提供高确定性的视觉增长方案。
                <br/><br/>
                参与研发 <span className="text-emerald-400 font-bold underline decoration-emerald-500/30 underline-offset-4">n8n + Gemini + 多维表格的 COSMO 算法自动化中台</span>，精通 ComfyUI 工作流架构，实现 AIGC 工业化。深谙欧美市场审美与转化逻辑。精通 3D 建模及 AI 视频，主导过 5 项产品视觉策划。
              </p>
            </div>
          </motion.div>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-emerald-500/5 to-transparent pointer-events-none" />
      </section>

      {/* Page 2: 工作经历 - 时间轴排版 */}
      <section className="py-32 px-6 bg-white/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-black mb-20 italic flex items-center gap-4"><History className="text-emerald-500"/> WORK EXPERIENCE</h2>
          <div className="space-y-12">
            {workHistory.map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 10 }} 
                className="relative pl-10 border-l border-white/10 group"
              >
                <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)] group-hover:scale-150 transition-transform" />
                <span className="text-emerald-500 font-mono text-sm tracking-widest">{item.time}</span>
                <h3 className="text-2xl font-bold mt-1 text-white">{item.company}</h3>
                <p className="text-emerald-400 font-medium mb-4">{item.role}</p>
                <p className="text-gray-400 text-sm leading-relaxed max-w-3xl bg-white/5 p-6 rounded-2xl border border-white/5">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

{/* Page 3: 策划方案 - 已更新跑步机策划 */}
      <section className="py-32 px-6 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <ScrollSection>
            <h2 className="text-center text-4xl font-black mb-20 tracking-widest italic uppercase">STRATEGIC PLANNING</h2>
          </ScrollSection>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {plans.map((p, i) => (
              <motion.a 
                key={i} 
                href={p.file} 
                target="_blank" 
                variants={scaleIn}
                whileHover={{ 
                  y: -10, 
                  backgroundColor: "rgba(16, 185, 129, 0.05)", // 悬停时淡淡的翠绿底色
                  transition: { duration: 0.3 } 
                }}
                className="p-12 rounded-[3.5rem] bg-white/5 border border-white/10 hover:border-emerald-500/50 transition-all flex flex-col justify-center items-center text-center group relative overflow-hidden"
              >
                {/* 装饰性光晕效果 */}
                <div className="absolute -right-8 -top-8 w-24 h-24 bg-emerald-500/5 blur-3xl group-hover:bg-emerald-500/20 transition-all duration-500" />

                <FileText 
                  className="mb-8 text-emerald-500 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500" 
                  size={56} // 稍微放大一点更有视觉冲击力
                />
                
                <h3 className="text-2xl font-bold tracking-tight text-white/90 group-hover:text-emerald-400 transition-colors">
                  {p.title}
                </h3>
                
                <div className="mt-10 flex items-center text-[10px] text-emerald-400 font-black tracking-[0.3em] group-hover:tracking-[0.4em] transition-all">
                  VIEW DOCUMENT <ChevronRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>
{/* Page 4: 视觉产出 - 封面看图，点击开PDF */}
      <section className="py-32 bg-white/5 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollSection>
            <h2 className="text-3xl font-black mb-16 italic tracking-widest">视觉产出 / VISUAL OUTPUTS</h2>
          </ScrollSection>
          
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {worksImages.map((work) => (
              <motion.a 
                key={work.id} 
                href={work.link}      // 这里指向你的 PDF 路径
                target="_blank"       // 在新窗口打开
                rel="noreferrer"
                variants={fadeInUp}
                className="aspect-[3/4] bg-gray-900 rounded-3xl overflow-hidden border border-white/5 group cursor-pointer relative block"
              >
                {/* 封面图片层 */}
                <div className="w-full h-full overflow-hidden">
                  <img 
                    src={work.thumbnail}  // 这里指向你的 JPG 封面路径
                    alt={`Work ${work.id}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    // 如果图片加载失败，显示渐变背景兜底
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>

                {/* 悬停时的文字提示层 */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-emerald-400 font-mono text-xs tracking-[0.2em] uppercase">View Portfolio</span>
                    <p className="text-white text-sm font-bold mt-1">点击查看详情</p>
                  </div>
                </div>

                {/* 如果图片没加载出来，显示的文字占位（备用） */}
                <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${work.color} to-gray-900 flex items-center justify-center`}>
                  <span className="text-gray-500 font-mono text-sm">LOADING...</span>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Page 5: AI ODYSSEY 时间轴 (图1样式) */}
      <section className="py-32 bg-emerald-950/20 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollSection>
            <h2 className="text-4xl font-bold mb-20 flex items-center gap-6">
              <Cpu className="text-emerald-500" /> AI ODYSSEY
            </h2>
          </ScrollSection>
          <div className="space-y-16 border-l-2 border-emerald-500/20 ml-6 pl-12">
            {[
              { year: "2023.03", phase: "探索期", desc: "率先将 MJ 引入童装精修流，实现模特成本 0 投入。" },
              { year: "2024.11", phase: "爆发期", desc: "主导 ComfyUI 工业化工作流，覆盖全品类高保真视觉。" },
              { year: "2025.10", phase: "跃迁期", desc: "研发 n8n + Gemini 自动化生产中台，实现 SaaS 化视觉流转。" }
            ].map((item, i) => (
              <TimelineItem key={i} year={item.year} phase={item.phase} desc={item.desc} index={i} />
            ))}
          </div>
        </div>
      </section>

{/* Page 6: n8n + Gemini Automation Workflow (图2样式 - 左文右图) */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <ScrollSection>
          <div className="bg-white/5 rounded-[3rem] p-12 border border-white/10 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 italic">{n8nProject.title}</h2>
              <p className="text-gray-400 mb-8 text-lg">{n8nProject.desc}</p>
              <motion.button 
                // 注意这里：改为 n8n-demo，对应你的文件名
                onClick={() => setSelectedVideo('n8n-demo')} 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-black font-black rounded-full flex items-center gap-3 hover:bg-emerald-500 transition-colors"
              >
                <Play size={18} fill="black" /> 观看流程生图视频演示
              </motion.button>
            </div>
            
            {/* 右侧：显示你的 n8n 截图 */}
            <div className="rounded-2xl border border-white/10 overflow-hidden shadow-2xl group relative aspect-video bg-gray-900">
              <img 
                src={n8nProject.thumbnail} 
                alt="n8n Workflow" 
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700"
                onError={(_e) => {
                  // 如果图片路径错了，显示一个提示，方便你排查
                  console.error("图片加载失败，请检查路径:", n8nProject.thumbnail);
                }}
              />
              {/* 装饰层：保留原来的图标感，但做成半透明悬浮 */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-black/40 backdrop-blur-sm p-4 rounded-2xl border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                   <Cpu size={32} className="text-emerald-500 mx-auto" />
                   <span className="text-white font-mono text-[10px] mt-2 block text-center">INTERFACE</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollSection>
      </section>

{/* Page 7: n8n生成的图片案例展示 (长方形画廊版) */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <ScrollSection>
          <h2 className="text-center text-gray-500 text-xs tracking-[0.8em] mb-12 uppercase">
            n8n Automation Outputs
          </h2>
        </ScrollSection>
        
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6" // 保持 4 列长方形布局
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {n8nOutputs.map((item) => (
            <motion.a 
              key={item.id} 
              href={item.img}      // 点击跳转到图片原图路径
              target="_blank"      // 在新标签页打开实现放大查看
              rel="noreferrer"
              variants={scaleIn}
              className="aspect-[16/10] bg-gray-900 rounded-2xl overflow-hidden border border-white/10 shadow-2xl group relative block"
            >
              {/* 真正的图片展示层 */}
              <img 
                src={item.img} 
                alt={`AI Output ${item.id}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                  e.currentTarget.style.opacity = '0.5'; // 图片加载失败时的处理
                }}
              />
              
              {/* 悬停时的遮罩和提示 */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                <div className="text-center">
                  <span className="text-emerald-400 font-mono text-[10px] tracking-widest uppercase">Full View</span>
                  <p className="text-white text-xs font-bold mt-1">点击查看大图</p>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </section>

{/* Page 8: ComfyUI 工作流 - 真实逻辑图版 */}
      <section className="py-32 bg-white/5 px-6 text-center">
        <ScrollSection>
          <h2 className="text-3xl font-bold mb-6 italic underline decoration-emerald-500 underline-offset-8">ComfyUI Logic Nodes</h2>
          <p className="text-gray-400 mb-16 max-w-2xl mx-auto">模块化逻辑锁定 SKU 材质、光影与结构。实现 AIGC 在工业化生产中的高度可控性。</p>
        </ScrollSection>

        <motion.div 
          className="max-w-6xl mx-auto rounded-3xl border border-white/10 overflow-hidden shadow-2xl relative group bg-black"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* 装饰性顶部栏 - 增加专业工具感 */}
          <div className="absolute top-0 inset-x-0 h-10 bg-white/5 border-b border-white/5 flex items-center px-4 gap-2 z-10">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/30" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/30" />
            </div>
            <span className="ml-4 text-[10px] font-mono text-gray-500 uppercase tracking-widest">Node Interface / Workflow Layout</span>
          </div>

          {/* 核心展示图 */}
          <div className="aspect-[21/9] w-full overflow-hidden pt-10">
            <img 
              src="/images/comfyui-logic.jpg" // 确保图片放在 public/images 文件夹下，名字对应
              alt="ComfyUI Workflow Logic"
              className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>

          {/* 悬停提示遮罩 */}
          <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none duration-500" />
          
          {/* 查看原图按钮 */}
          <a 
            href="/images/comfyui-logic.jpg" 
            target="_blank" 
            rel="noreferrer"
            className="absolute bottom-6 right-6 px-6 py-2 bg-emerald-500 text-black text-[10px] font-black rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-xl"
          >
            VIEW HIGH-RES NODES
          </a>
        </motion.div>
      </section>
{/* Page 9: AI 视频脚本 - 双框展示 */}
      <section className="py-32 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <ScrollSection>
            {/* 这里的文字已更新为动感版 */}
            <h2 className="text-3xl font-black mb-16 italic text-emerald-500 uppercase tracking-tighter">
              AI STORYBOARDING
            </h2>
          </ScrollSection>
          
          <div className="grid md:grid-cols-2 gap-12">
            {videoScriptCases.map((script, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white/5 border border-white/10 rounded-[3.5rem] overflow-hidden group flex flex-col"
              >
                <div className="p-12">
                  <span className="text-emerald-500 font-mono text-[10px] tracking-[0.3em] uppercase block mb-3">
                    Script Case 0{i+1}
                  </span>
                  <h3 className="text-3xl font-bold text-white mb-2">{script.title}</h3>
                  <p className="text-gray-400 font-light text-sm">{script.desc}</p>
                </div>
                
                {/* 点击查看大图的区域 */}
                <a 
                  href={script.img} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex-grow px-10 pb-10 relative cursor-zoom-in"
                >
                  <div className="rounded-[2rem] overflow-hidden aspect-[16/10] border border-white/5">
                    <img 
                      src={script.img} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
                      alt={script.title}
                    />
                  </div>
                  {/* 悬停提示 */}
                  <div className="absolute inset-x-10 bottom-14 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="bg-emerald-500 text-black px-4 py-1 text-[10px] font-black rounded-full shadow-2xl">
                      点击查看高清脚本
                    </span>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
{/* Page 10: AI 视频展示 (已绑定真实数据) */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <ScrollSection>
          <h2 className="text-3xl font-black mb-16 italic uppercase tracking-tighter">AI Creative Video</h2>
        </ScrollSection>
        
        <div className="grid md:grid-cols-2 gap-12">
          {aiVideos.map((video, i) => (
            <motion.div 
              key={video.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="aspect-video bg-gray-900 rounded-[2.5rem] border border-white/10 flex items-center justify-center cursor-pointer overflow-hidden group relative shadow-2xl"
              // 点击时传递 video.title，用于匹配对应的视频文件
              onClick={() => setSelectedVideo(video.title)}
            >
              {/* 背景封面图层 */}
              <img 
                src={video.thumbnail} 
                alt={video.title}
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-all duration-700 group-hover:scale-110"
              />

              {/* 装饰性暗色遮罩 */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              {/* 播放按钮 */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-20 h-20 bg-emerald-500 text-black rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.4)] z-10"
              >
                <Play fill="black" size={32} className="ml-1" />
              </motion.div>

              {/* 视频信息浮层 */}
              <div className="absolute bottom-8 left-8 text-left z-10">
                <span className="text-emerald-400 font-mono text-[10px] tracking-[0.3em] uppercase block mb-2">
                  Creative Showcase 0{i + 1}
                </span>
                <h3 className="text-white font-bold text-lg tracking-wide group-hover:text-emerald-400 transition-colors">
                  {video.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
{/* Page 11: 品牌策划图片 - 6张全案展示 */}
      <section className="py-32 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <ScrollSection>
            {/* 这里的样式已经和 Page 09 完美对齐：动感、大写、亮绿色 */}
            <h2 className="text-center text-4xl md:text-5xl font-[1000] mb-20 italic text-emerald-400 uppercase tracking-[-0.02em]">
              BRAND STRATEGY CASE
            </h2>
          </ScrollSection>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {brandPlanGallery.map((item) => (
              <motion.a
                key={item.id}
                href={item.img}
                target="_blank"
                whileHover={{ y: -10, scale: 1.02 }}
                className="aspect-[16/10] bg-[#222] rounded-[2rem] overflow-hidden border border-white/10 group relative block shadow-2xl"
              >
                <img 
                  src={item.img} 
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" 
                  alt={item.title}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                  <p className="text-white font-bold tracking-[0.3em] uppercase text-xs">{item.title}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
{/* Page 12: 品牌视频展示 - 比例还原版 */}
      <section className="py-32 bg-emerald-500/5 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollSection>
            <h2 className="text-5xl font-bold text-emerald-400 italic mb-8">品牌视频展示</h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-12 max-w-2xl">通过 3D 渲染与动态捕捉技术，将品牌核心视觉进行动态化诠释。</p>
          </ScrollSection>

          <motion.div 
            className="grid md:grid-cols-2 gap-0 items-stretch bg-black border border-white/10 rounded-[4rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.3)]"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* --- 左侧：Logo 居中展示区 --- */}
            <div className="relative group bg-[#080808] flex items-center justify-center p-8 border-r border-white/5 min-h-[450px]">
              {/* 微弱的渐变背景，增加深度感 */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-50" />
              
              <img 
                src={brandProject.logoImg} 
                alt="Fitense Logo" 
                // ✅ 关键修改：使用 object-contain 保持原图大小，max-h 限制不撑破框
                className="relative z-10 w-full h-full object-contain filter brightness-110 group-hover:scale-105 transition-transform duration-700"
                style={{ maxHeight: '350px' }} 
                onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/400x300?text=Logo"; }}
              />

              <div className="absolute bottom-6 left-8 z-20">
                <span className="text-white/20 font-mono text-[10px] tracking-[0.4em] uppercase">Visual Identity</span>
              </div>
            </div>

            {/* --- 右侧：视频预览居中展示区 --- */}
            <div className="relative group bg-[#050505] flex items-center justify-center p-8">
              <motion.div 
                className="relative w-full h-full flex items-center justify-center cursor-pointer"
                onClick={() => setSelectedVideo(brandProject.videoTitle)} 
              >
                {/* 视频封面图 */}
                <img 
                  src={brandProject.thumbnail} 
                  alt="Fitense Video Cover"
                  // ✅ 关键修改：使用 object-contain 保持封面比例，不强制铺满
                  className="w-full h-full object-contain opacity-80 group-hover:opacity-60 transition-all duration-500"
                  style={{ maxHeight: '350px' }}
                />
                
                {/* 播放按钮 - 依然居中 */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-20 h-20 bg-emerald-500 text-black rounded-full flex items-center justify-center shadow-2xl"
                  >
                    <Play fill="black" size={32} className="ml-1" />
                  </motion.div>
                </div>

                <div className="absolute bottom-6 left-8 z-10">
                  <span className="text-white/20 font-mono text-[10px] tracking-[0.4em] uppercase">Motion Graphics</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Page 13: 结束页 */}
      <footer className="py-48 text-center px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-8xl md:text-9xl font-black mb-12 italic tracking-tighter bg-gradient-to-r from-white via-emerald-200 to-emerald-500 bg-clip-text text-transparent">
            THANK YOU.
          </h2>
        </motion.div>
        
        <motion.div 
          className="flex flex-col md:flex-row justify-center gap-16 text-emerald-500 font-mono tracking-widest uppercase"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-3">
            <Phone size={20} />
            <span>18290053233</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail size={20} />
            <span>674832315@qq.com</span>
          </div>
        </motion.div>
        
        {/* Background glow */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/5 rounded-full blur-[150px]" />
        </div>
      </footer>

{/* 全屏视频浮层 - 已修复播放功能 */}
{/* 视频弹窗播放器  */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-5xl aspect-video bg-[#0a0a0a] rounded-[2rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 核心视频标签 */}
              <video 
                key={selectedVideo} // 关键：切换视频时重新加载
                src={`/videos/${selectedVideo}.mp4`} 
                controls 
                autoPlay 
                className="w-full h-full object-contain"
              >
                您的浏览器不支持视频播放。
              </video>

              {/* 关闭按钮 */}
              <button 
                className="absolute top-6 right-6 w-12 h-12 bg-black/50 hover:bg-emerald-500 text-white hover:text-black rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md z-20 group"
                onClick={() => setSelectedVideo(null)}
              >
                <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>

              {/* 左下角显示当前播放的标题 */}
              <div className="absolute bottom-6 left-8 pointer-events-none">
                <p className="text-white/40 font-mono text-[10px] tracking-widest uppercase">Now Playing</p>
                <h4 className="text-white/90 text-sm font-bold">{selectedVideo}</h4>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
