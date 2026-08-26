export const evolutionConstraintsContent = {
  en: {
    sectionLabel: "SECTION 02",
    title: "Current Constraints",
    items: [
      {
        id: "01",
        title: "High-Dimensional Matrix Latency",
        description:
          "When processing inputs scaling over 10,000 dimensions of heterogeneous states, the AOT Planner architecture experiences ~14ms of initialization lookahead overhead, causing micro-jitters under extreme cold starts.",
      },
      {
        id: "02",
        title: "Hot-Swap Graph Lock Contention",
        description:
          "Mutating and replacing active DAG execution paths dynamically inside V3 engines causes intense cache synchronization spikes. Isolation is achieved by routing transient updates into memory-mapped shadow subgraphs.",
      },
      {
        id: "03",
        title: "Multi-Region Synchronization Overhead",
        description:
          "Distributed edge-mesh deployments suffer from network serialization costs when broadcasting state configurations via consensus mechanics, preventing linear scaling across globally separated server nodes.",
      },
    ],
  },
  zh: {
    sectionLabel: "SECTION 02",
    title: "当前约束",
    items: [
      {
        id: "01",
        title: "高维状态矩阵延迟",
        description:
          "当输入扩展到超过 10,000 维的异构状态时，AOT Planner 架构会产生约 14ms 的初始化前瞻开销，在极端冷启动场景下造成轻微抖动。",
      },
      {
        id: "02",
        title: "热切换图的锁竞争",
        description:
          "在 V3 引擎中动态修改或替换活跃 DAG 执行路径，会带来明显的缓存同步峰值。当前通过将瞬态更新路由至内存映射的影子子图来实现隔离。",
      },
      {
        id: "03",
        title: "多区域同步开销",
        description:
          "分布式边缘网格部署在通过共识机制广播状态配置时，会受到网络序列化成本影响，难以在全球分散的服务节点间实现线性扩展。",
      },
    ],
  },
};
