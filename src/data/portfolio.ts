export type SectionId =
  | "home"
  | "profile"
  | "projects"
  | "strengths"
  | "contact";

export interface NavItem {
  id: SectionId;
  label: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  summary: string;
  highlights?: string[];
}

export interface Stat {
  value: string;
  label: string;
}

export interface FeaturedProject {
  title: string;
  categoryLabel: string;
  description: string;
  image: string;
  imageAlt: string;
  repositoryUrl: string;
  language: string;
  highlights: string[];
  tags: string[];
}

export interface Repository {
  name: string;
  displayName: string;
  description: string;
  url: string;
  language: string;
  type: string;
}

export interface Strength {
  title: string;
  summary: string;
  detail: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface PortfolioData {
  profile: {
    name: string;
    direction: string;
    statement: string;
    introduction: string[];
    email: string;
    githubHandle: string;
    githubUrl: string;
  };
  navigation: NavItem[];
  stats: Stat[];
  galleryImages: GalleryImage[];
  experiences: Experience[];
  featuredProjects: FeaturedProject[];
  repositories: Repository[];
  strengths: Strength[];
  updatedAt: string;
}

export const portfolioData: PortfolioData = {
  profile: {
    name: "郭君茹",
    direction: "2027 校招 · 售前 / 解决方案工程师",
    statement: "把技术讲清楚，\n把方案做落地。",
    introduction: [
      "我是一名数据科学与大数据技术本科生，也是一名持续构建产品的实践者。我的项目涵盖企业 ERP 业务原型、Spark 离线数仓 ETL、AI 模拟面试平台，同时也实现了多套本地优先工具，包含个人作品集网站、PPT 批量生成器、简历网申助手以及网络平台评论数据自动化采集分析工具。",
      "我擅长从真实业务场景里找到结构：拆解业务需求、梳理业务流程、组织信息，再用原型、数据或代码把想法推进到可以验证、可交付的状态。",
    ],
    email: "guojunru101@163.com",
    githubHandle: "suhuideyu",
    githubUrl: "https://github.com/suhuideyu",
  },
  navigation: [
    { id: "home", label: "首页" },
    { id: "profile", label: "个人经历" },
    { id: "projects", label: "精选项目" },
    { id: "strengths", label: "个人优势" },
    { id: "contact", label: "联系我" },
  ],
  stats: [
    { value: "10", label: "个公开作品" },
    { value: "03", label: "段实践经历" },
    { value: "02", label: "个核心行业场景" },
    { value: "2027", label: "校招求职年份" },
  ],
  galleryImages: [
    {
      src: "profile/lifestyle1.jpg",
      alt: "郭君茹的书桌",
    },
    {
      src: "profile/lifestyle2.jpg",
      alt: "郭君茹的小猫",
    },
    {
      src: "profile/lifestyle3.jpg",
      alt: "郭君茹身穿白色外套自拍",
    },
  ],
  experiences: [
    {
      "company": "南京万迅网络科技有限公司",
      "role": "项目助理兼职（软件方向）",
      "period": "2025.11 — 至今",
      "summary": "支持软件项目实施与交付，串联设备配置、平台核查、异常分析、问题跟踪与资料沉淀。",
      "highlights": [
        "平台配置：参与站点与设备档案、属性及监测量配置，核查在线状态与数据上报。",
        "问题协同：结合设备状态、历史报警和监测量开展初步分析，记录异常并支持跨团队沟通。",
        "交付支持：参与项目会议，整理设备清单与实施材料，为现场核对和后续交付保留可追溯资料。"
      ],
    },
    {
      "company": "耕德电子有限公司",
      "role": "销售运营助理",
      "period": "2026.01 — 2026.02",
      "summary": "搭建20+家竞品参数对标台账，输出8套业务方案PPT及SOP标准化文档，通过业务台账跟进10+销售订单全流程节点，及时同步处理业务异常，支撑销售业务落地。",
      "highlights": [
        "竞品分析：梳理20余家厂商产品参数，搭建竞品对标表格，输出对比参考，辅助销售做方案选型与客户应答。",
        "物料沉淀：协助制作8套业务方案PPT、编写SOP标准化文档，沉淀销售交付物料，提升业务输出效率。",
        "订单运营：通过台账跟进10余条销售订单全流程进度，记录关键节点，跟进协调订单异常，保障业务推进。"
      ],
    },
    {
      "company": "苏州恒铭达电子科技股份有限公司",
      "role": "现场技术辅助",
      "period": "2025.01 — 2025.02",
      "summary": "驻生产车间开展现场辅助工作，收集一线信息化设备问题，配合内部IT完成问题上报与台账记录，熟悉制造业现场业务流程。",
      "highlights": [
        "问题登记：收集车间办公终端、打印机等设备故障现象，登记问题信息并反馈企业IT部门跟进处理。",
        "台账整理：维护简易设备故障记录台账，留存故障现象，便于IT人员快速定位现场问题。",
        "现场协同：对接车间一线员工，准确传递设备故障诉求，锻炼业务需求收集、跨岗位沟通能力。"
      ]    
    },
  ],
featuredProjects: [
    {
      title: "Smart‑Enterprise‑ERP",
      categoryLabel: "业务原型",
      description:
        "面向中小微企业的ERP进销存一体化业务原型，完成需求梳理、权限管控、业务单据流转，模拟售前阶段业务调研与方案交付全流程。",
      image: "projects/erp-cover.jpg",
      imageAlt: "Smart Enterprise ERP管理系统进销存业务原型界面概念图",
      repositoryUrl: "https://github.com/suhuideyu/Smart-Enterprise-ERP-Management-Platform",
      language: "Java",
      highlights: ["进销存全流程建模", "角色权限体系", "售前方案验证"],
      tags: ["SpringBoot", "Vue3", "MySQL", "ERP", "售前原型"],
    },
    {
      title: "device‑rag‑qa‑agent",
      categoryLabel: "AI业务原型",
      description:
        "面向设备商品知识库的RAG智能问答Agent原型，完成PDF文档解析、向量库入库、意图识别、多路检索与多轮问答完整业务链路验证。",
      image: "projects/rag‑agent‑cover.jpg",
      imageAlt: "设备商品RAG智能问答Agent系统概念示意图",
      repositoryUrl: "https://github.com/suhuideyu/device-rag-qa-agent",
      language: "Python",
      highlights: ["状态化Agent编排", "多路检索融合", "Prompt工程实践"],
      tags: ["Python", "LangGraph", "LangChain", "Milvus", "RAG", "Agent"],
    },
    {
      title: "淘宝美妆双11数据可视化分析",
      categoryLabel: "大数据ETL原型",
      description:
        "离线数仓Spark‑ETL实践项目，完成业务分层建模、数据清洗转换、批处理链路开发，模拟业务系统与数据链路联合交付验证。",
      image: "projects/spark-etl-cover.jpg",
      imageAlt: "离线数仓Spark‑ETL数据处理链路概念示意图",
      repositoryUrl: "https://github.com/suhuideyu/taobao-beauty-double11--course-completion",
      language: "Scala",
      highlights: ["数仓分层建模", "Spark批ETL", "业务‑数据联合验证"],
      tags: ["Spark‑Scala", "离线数仓", "ETL", "MySQL", "批处理"],
    },
    {
      title: "MockMaster‑AI面试平台",
      categoryLabel: "业务原型",
      description:
       "面向求职场景AI模拟面试业务原型，完成需求拆解、交互流程设计、大模型集成落地，模拟面向终端用户的产品方案设计与功能交付。",
      image: "projects/ai-interview-cover.jpg",
      imageAlt: "MockMaster AI面试平台系统界面概念图",
      repositoryUrl: "https://github.com/suhuideyu/MockMaster-AI-Interview-Platform",
      language: "Java",
      highlights: ["大模型能力集成", "业务评测逻辑", "完整原型文档"],
      tags: ["SpringBoot", "Vue3", "大模型集成", "产品原型"],
    },
    {
      title: "douyin_opinion_analysis",
      categoryLabel: "数据分析工具",
      description:
        "面向公开网络评论的NLP数据分析工具，完成数据采集、清洗预处理、文本情感分析与可视化输出，采用本地优先设计，原始数据不上传第三方服务。",
      image: "projects/douyin‑analysis‑cover.jpg",
      imageAlt: "网络评论NLP数据分析可视化概念示意图",
      repositoryUrl: "https://github.com/suhuideyu/douyin_opinion_analysis",
      language: "Python",
      highlights: ["评论数据预处理", "NLP情感分析", "本地优先数据安全"],
      tags: ["Python", "NLP文本分析", "数据可视化", "本地优先", "舆情分析"],
    },
  ],

  repositories: [
    {
      name: "junruguo‑portfolio",
      displayName: "个人求职作品集网站",
      description: "面向售前与解决方案工程师岗位的中文个人网站源码，React+TS+GSAP静态部署。",
      url: "https://github.com/suhuideyu/junruguo-portfolio",
      language: "TypeScript",
      type: "作品集",
    },
    {
      name: "skills",
      displayName: "PPT批量生成器 Skill",
      description: "PPT批量生成工具，基于本地模板输出演示文稿，全部文件本地处理，不上传用户文档。",
      url: "https://github.com/suhuideyu/skills/tree/main/ppt-generator",
      language: "Python",
      type: "本地工具",
    },
    {
      name: "JobArchiveTool",
      displayName: "JobArchive‑网申助手",
      description: "浏览器扩展，预览、脱敏并辅助填写网申表单，不自动提交，不上传隐私资料。",
      url: "https://github.com/suhuideyu/JobArchiveTool",
      language: "JavaScript",
      type: "浏览器扩展",
    },
    {
      name: "learn‑to‑Multi‑Agent_SyetemDesign",
      displayName: "多智能体系统学习实验",
      description: "探索多Agent任务拆解与协同执行流程的学习实验。",
      url: "https://github.com/suhuideyu/learn-to-Multi-Agent_SyetemDesign",
      language: "Python",
      type: "AI实验",
    },
    {
      name: "Smart‑Enterprise‑ERP",
      displayName: "Smart‑Enterprise‑ERP管理平台",
      description: "面向中小企业ERP进销存业务原型，完成需求梳理、权限管控、业务单据流转，模拟售前方案交付。",
      url: "https://github.com/suhuideyu/Smart-Enterprise-ERP-Management-Platform",
      language: "Java",
      type: "业务原型",
    },
    {
      name: "taobao‑beauty‑double11--course-completion",
      displayName: "离线数仓Spark‑ETL实践",
      description: "离线数仓业务原型，实现数据分层建模、清洗转换、Spark批处理ETL链路开发。",
      url: "https://github.com/suhuideyu/taobao-beauty-double11--course-completion",
      language: "Scala",
      type: "大数据实践",
    },
    {
      name: "MockMaster‑AI‑Interview‑Platform",
      displayName: "MockMaster‑AI面试平台",
      description: "AI模拟面试业务原型，需求拆解、交互设计、大模型集成与系统落地。",
      url: "https://github.com/suhuideyu/MockMaster-AI-Interview-Platform",
      language: "Java",
      type: "业务原型",
    },
    {
      name: "douyin_opinion_analysis",
      displayName: "网络评论数据分析工具",
      description: "公开网络评论采集、预处理、可视化、NLP文本/AI智能分析；本地优先设计。",
      url: "https://github.com/suhuideyu/douyin_opinion_analysis",
      language: "Python",
      type: "数据分析工具",
    },
    {
      name: "campus_bazaar‑Course‑Design‑Project",
      displayName: "校园二手集市",
      description: "课程设计项目，实现二手物品交易基础业务闭环，Vue+SpringBoot前后端分离原型。",
      url: "https://github.com/suhuideyu/campus_bazaar-Course-Design-Project",
      language: "Java",
      type: "课程实践",
    },
    {
      name: "card‑demo",
      displayName: "前端组件布局Demo",
      description: "前端组件布局练习Demo，页面交互与样式学习。",
      url: "https://github.com/suhuideyu/card-demo",
      language: "HTML",
      type: "前端练习",
    },
    {
      name: "ant‑online‑training‑materials",
      displayName: "线上技术实训资料集合",
      description: "存放随堂练习、实验案例与课程学习记录。",
      url: "https://github.com/suhuideyu/ant-online-training-materials",
      language: "Java",
      type: "学习归档",
    },
  ],
  strengths: [
    {
      title: "技术业务转译",
      summary: "不只理解参数，也能说明参数与客户场景的关系。",
      detail:
        "把设备、数据与系统信息整理成客户能理解、团队能执行的方案材料和演示路径。",
    },
    {
      title: "需求与流程建模",
      summary: "从模糊问题中建立角色、流程、字段与边界。",
      detail:
        "在动手实现前先确认事实与约束，减少方案表达和后续协作中的信息损耗。",
    },
    {
      title: "原型与产品验证",
      summary: "让想法尽快进入可以看、可以讲、可以测试的状态。",
      detail:
        "通过低代码原型、前端产品和本地工具验证业务路径，并根据实际反馈继续迭代。",
    },
    {
      title: "本地与隐私意识",
      summary: "在便利性之外，保留用户对数据和关键操作的控制。",
      detail:
        "作品优先采用本地存储、显式状态和人工确认，避免在求职与个人数据场景中越权自动化。",
    },
  ],
  updatedAt: "2026-08-23",
};
