export type ArchitectureFlowUseCase = "refund" | "marketing" | "workflow";
export type ArchitectureFlowLayerId =
  | "input"
  | "semantic"
  | "planning"
  | "execution"
  | "response";
export type ArchitectureFlowLocale = "en" | "zh";

export const architectureFlowUseCases: ArchitectureFlowUseCase[] = [
  "refund",
  "marketing",
  "workflow",
];

type ArchitectureFlowStatus = {
  id: "current" | "future";
  label: string;
};

export type ToolNode = {
  toolName: string;
  dtoName: string;
  badgeLabel?: string;
};

export type ToolSummary = {
  input: string;
  output: string;
  toolName: string;
  dtoName: string;
  secondaryTool?: ToolNode;
  tertiaryTool?: ToolNode;
};

export type ResponseSummary = {
  blockTitle?: string;
  input: string;
  output: string;
  notes: string[];
  finalAnswer: string;
};

export type SemanticSummary = {
  input: string;
  output: string;
  notes: string[];
};

export type PlanSummary = {
  input: string;
  output: string;
  notes: string[];
};

export type ParameterSummary = {
  input: string;
  output: string;
};

export type FoundationSummary = {
  entities: string[];
  graphRelations: string[];
  graphNotes: string[];
  entityMap: { entity: string; tool: string }[];
};

export type ArchitectureFlowUseCaseData = {
  label: string;
  status: ArchitectureFlowStatus;
  query: string;
  layerHighlights: ArchitectureFlowLayerId[];
  semanticSummary: SemanticSummary;
  planSummary: PlanSummary;
  parameterSummary: ParameterSummary;
  toolSummary: ToolSummary;
  responseSummary: ResponseSummary;
  foundation: FoundationSummary;
};

const defineSemanticSummary = (summary: SemanticSummary): SemanticSummary =>
  summary;

const definePlanSummary = (summary: PlanSummary): PlanSummary => summary;

const defineParameterSummary = (
  summary: ParameterSummary,
): ParameterSummary => summary;

const defineToolSummary = (summary: ToolSummary): ToolSummary => summary;

const defineResponseSummary = (summary: ResponseSummary): ResponseSummary =>
  summary;

const defineFoundationSummary = (
  summary: FoundationSummary,
): FoundationSummary => summary;

export type ArchitectureFlowContent = {
  header: {
    eyebrow: string;
    title: string;
    description: string;
  };
  cta: {
    description: string;
    button: string;
  };
  slider: {
    steps: { value: 1 | 2 | 3; label: string }[];
    ariaLabel: string;
  };
  columns: {
    runtime: string;
    foundation: string;
  };
  io: {
    input: string;
    output: string;
  };
  layers: {
    input: {
      title: string;
      subtitle: string;
      stageTitle: string;
    };
    semantic: {
      title: string;
      subtitle: string;
      stageTitle: string;
      blockTitle: string;
    };
    planning: {
      title: string;
      subtitle: string;
      stageTitle: string;
      blockTitle: string;
    };
    execution: {
      title: string;
      subtitle: string;
      stageTitle: string;
      loopInstruction: string;
      loopLabel: string;
      parameterBlockTitle: string;
      toolBlockTitle: string;
      policyMethod: string;
      policyNarrative: string;
      policyBadge: string;
      resultBlockTitle: string;
      resultPrefix: string;
      resultTarget: string;
    };
    response: {
      title: string;
      subtitle: string;
      stageTitle: string;
      blockTitle: string;
    };
  };
  foundationCards: {
    entities: {
      title: string;
      label: string;
    };
    graph: {
      title: string;
      label: string;
    };
    mapping: {
      title: string;
      label: string;
    };
  };
  cases: Record<ArchitectureFlowUseCase, ArchitectureFlowUseCaseData>;
};

export const architectureFlowContent: Record<
  ArchitectureFlowLocale,
  ArchitectureFlowContent
> = {
  en: {
    header: {
      eyebrow: "SECTION 03 // RUNTIME FLOW",
      title: "Runtime Flow",
      description:
        "A user query becomes a structured execution path, then a readable answer.",
    },
    cta: {
      description: "Why did the architecture evolve this way?",
      button: "Open Evolution",
    },
    slider: {
      steps: [
        { value: 1, label: "Layers" },
        { value: 2, label: "Runtime" },
        { value: 3, label: "Foundation" },
      ],
      ariaLabel: "Runtime flow detail level",
    },
    columns: {
      runtime: "Runtime Flow",
      foundation: "Semantic & Dependency Foundations",
    },
    io: {
      input: "Input",
      output: "Output",
    },
    layers: {
      input: {
        title: "Input",
        subtitle: "Request",
        stageTitle: "User Request",
      },
      semantic: {
        title: "Semantic Layer",
        subtitle: "Meaning",
        stageTitle: "Semantic Resolution",
        blockTitle: "Intent Parsing",
      },
      planning: {
        title: "Planning Layer",
        subtitle: "Plan",
        stageTitle: "Plan Construction",
        blockTitle: "plan_tools()",
      },
      execution: {
        title: "Execution Layer",
        subtitle: "Run",
        stageTitle: "Execution Orchestration",
        loopInstruction: "for step in steps:",
        loopLabel: "execution loop",
        parameterBlockTitle: "Runtime Parameter Resolution",
        toolBlockTitle: "Tool Execution",
        policyMethod: "policy.evaluate()",
        policyNarrative: "Policy is currently called inside tool execution.",
        policyBadge: "isolated policy logic",
        resultBlockTitle: "Result Collection",
        resultPrefix: "append tool outputs into",
        resultTarget: "tool_results[]",
      },
      response: {
        title: "Response Layer",
        subtitle: "Answer",
        stageTitle: "Response Generation",
        blockTitle: "Final LLM Response",
      },
    },
    foundationCards: {
      entities: {
        title: "Semantic Entities",
        label: "use-case slice",
      },
      graph: {
        title: "Dependency Graph",
        label: "pre-built relations",
      },
      mapping: {
        title: "Entity_to_Tool Map",
        label: "runtime bridge",
      },
    },
    cases: {
      refund: {
        label: "Refund Evaluation",
        status: {
          id: "current",
          label: "CURRENT IMPLEMENTATION",
        },
        query: `"Can order 123 be refunded?"`,
        layerHighlights: ["planning", "execution"],
        semanticSummary: defineSemanticSummary({
          input: "User Query",
          output: "runtime_intent { intent, order_id }",
          notes: ["parse intent", "extract order_id"],
        }),
        planSummary: definePlanSummary({
          input: "runtime_intent",
          output: "planned_steps [ get_order, check_refund ]",
          notes: ["resolve dependencies", "plan execution steps"],
        }),
        parameterSummary: defineParameterSummary({
          input: "tool_results",
          output: "resolved_params { order }",
        }),
        toolSummary: defineToolSummary({
          input: "resolved_params",
          output: "RefundDecisionDTO",
          toolName: "check_refund",
          dtoName: "RefundDecisionDTO",
          secondaryTool: undefined,
          tertiaryTool: undefined,
        }),
        responseSummary: defineResponseSummary({
          blockTitle: undefined,
          input: "tool_results",
          output: "human-readable answer",
          notes: [],
          finalAnswer: "“根据查询结果，订单123因商品已发货，无法进行退款。”",
        }),
        foundation: defineFoundationSummary({
          entities: ["Order", "RefundDecision"],
          graphRelations: ["OrderSummary ──▶ RefundDecision"],
          graphNotes: [
            "pre-built from entity relations",
            "only showing the use-case slice",
            "used by planner to derive execution sequence",
          ],
          entityMap: [
            { entity: "Order", tool: "get_order" },
            { entity: "RefundDecision", tool: "check_refund" },
          ],
        }),
      },
      marketing: {
        label: "Marketing Decision",
        status: {
          id: "future",
          label: "EXTENSION PATTERN",
        },
        query: `"Who should receive a retention coupon?"`,
        layerHighlights: ["semantic", "planning"],
        semanticSummary: defineSemanticSummary({
          input: "User Query",
          output: "runtime_intent { intent, campaign_id }",
          notes: ["parse campaign intent", "resolve user segment"],
        }),
        planSummary: definePlanSummary({
          input: "runtime_intent",
          output:
            "planned_steps [  \n\tget_user_profile, \n\tget_user_behavior, \n\tcompute_churn_risk, \n\tevaluate_campaign_policy, \n\tcompute_campaign_score, \n\tdecide_coupon \n]",
          notes: ["resolve dependencies", "build campaign steps"],
        }),
        parameterSummary: defineParameterSummary({
          input: "tool_results",
          output: "resolved_params { CampaignScore }",
        }),
        toolSummary: defineToolSummary({
          input: "resolved_params",
          output: "CouponDecisionDTO",
          toolName: "evaluate_campaign_policy()",
          dtoName: "CampaignEligibilityDTO",
          secondaryTool: {
            toolName: "compute_campaign_score()",
            dtoName: "CampaignScore",
            badgeLabel: "separate scoring logic",
          },
          tertiaryTool: {
            toolName: "decide_coupon()",
            dtoName: "CouponDecisionDTO",
            badgeLabel: undefined,
          },
        }),
        responseSummary: defineResponseSummary({
          blockTitle: undefined,
          input: "tool_results",
          output: "human-readable campaign decision",
          notes: [],
          finalAnswer:
            "“High-risk users were selected for the SAVE20 retention coupon campaign.”",
        }),
        foundation: defineFoundationSummary({
          entities: [
            "UserProfile",
            "UserBehavior",
            "ChurnRisk",
            "CampaignEligibility",
            "CampaignScore",
            "CouponDecision",
          ],
          graphRelations: [
            "UserProfile ──▶ UserBehavior",
            "UserBehavior ──▶ ChurnRisk",
            "UserProfile, ChurnRisk ──▶ CampaignEligibility",
            "CampaignEligibility, ChurnRisk ──▶ CampaignScore",
            "CampaignScore ──▶ CouponDecision",
          ],
          graphNotes: [
            "pre-built from entity relations",
            "only showing the extension-pattern slice",
            "maps campaign context to executable tools",
          ],
          entityMap: [
            { entity: "UserProfile", tool: "get_user_profile" },
            { entity: "UserBehavior", tool: "get_user_behavior" },
            { entity: "ChurnRisk", tool: "comput_churn_risk" },
            { entity: "CampaignEligibility", tool: "evaluate_campaign_policy" },
            { entity: "CampaignScore", tool: "compute_campaign_score" },
            { entity: "CouponDecision", tool: "decide_coupon" },
          ],
        }),
      },
      workflow: {
        label: "Workflow Automation",
        status: {
          id: "future",
          label: "EXTENSION PATTERN",
        },
        query: `"High-risk refunds require manual approval."`,
        layerHighlights: ["execution", "planning"],
        semanticSummary: defineSemanticSummary({
          input: "User Query",
          output: "runtime_intent { intent, refund_request_id }",
          notes: ["parse approval intent", "extract request id"],
        }),
        planSummary: definePlanSummary({
          input: "runtime_intent",
          output:
            "planned_steps [ \n\tget_refund_request, \n\tevaluate_risk, \n\tevaluate_approval_policy, \n\tdecide_approval_route \n]",
          notes: ["resolve dependencies", "plan execution steps"],
        }),
        parameterSummary: defineParameterSummary({
          input: "tool_results",
          output: "resolved_params { refund_request_id }",
        }),
        toolSummary: defineToolSummary({
          input: "resolved_params",
          output: "ApprovalDecisionDTO",
          toolName: "evaluate_approval_policy()",
          dtoName: "ApprovalEligibilityDTO",
          secondaryTool: {
            toolName: "decide_approval_route()",
            dtoName: "ApprovalRouteDTO",
            badgeLabel: undefined,
          },
          tertiaryTool: undefined,
        }),
        responseSummary: defineResponseSummary({
          blockTitle: "Workflow Status Response",
          input: "tool_results",
          output: "human-readable workflow status",
          notes: [],
          finalAnswer:
            "“This refund request was classified as HIGH RISK,  and routed to the L2 approval workflow.”",
        }),
        foundation: defineFoundationSummary({
          entities: [
            "RefundRequest",
            "RiskScore",
            "ApprovalEligibility",
            "ApprovalRoute",
          ],
          graphRelations: [
            "RefundRequest ──▶ RiskScore",
            "RiskScore ──▶ ApprovalEligibility",
            "ApprovalEligibility ──▶ ApprovalRoute",
          ],
          graphNotes: [
            "pre-built from entity relations",
            "only showing the workflow-related slice",
            "used to route approval execution",
          ],
          entityMap: [
            { entity: "RefundRequest", tool: "get_refund_request" },
            { entity: "RiskScore", tool: "evaluate_risk" },
            { entity: "ApprovalEligibility", tool: "evaluate_approval_policy" },
            { entity: "ApprovalRoute", tool: "decide_approval_route" },
          ],
        }),
      },
    },
  },

  zh: {
    header: {
      eyebrow: "SECTION 03 // RUNTIME FLOW",
      title: "运行时流程",
      description: "用户请求会被转换为结构化执行路径，并最终生成可读结果。",
    },

    cta: {
      description: "架构是如何演化至此的?",
      button: "查看演化过程",
    },

    slider: {
      steps: [
        { value: 1, label: "分层" },
        { value: 2, label: "运行流" },
        { value: 3, label: "基础层" },
      ],
      ariaLabel: "运行时流程层级",
    },

    columns: {
      runtime: "运行时流程",
      foundation: "语义与依赖基础层",
    },

    io: {
      input: "Input",
      output: "Output",
    },

    layers: {
      input: {
        title: "输入层",
        subtitle: "请求",
        stageTitle: "用户请求",
      },

      semantic: {
        title: "语义层",
        subtitle: "语义",
        stageTitle: "语义解析",
        blockTitle: "Intent Parsing",
      },

      planning: {
        title: "规划层",
        subtitle: "规划",
        stageTitle: "执行规划",
        blockTitle: "plan_tools()",
      },

      execution: {
        title: "执行层",
        subtitle: "运行",
        stageTitle: "执行编排",
        loopInstruction: "for step in steps:",
        loopLabel: "执行循环",

        parameterBlockTitle: "运行时参数解析",

        toolBlockTitle: "工具执行",

        policyMethod: "policy.evaluate()",

        policyNarrative: "当前 policy 逻辑仍在 tool execution 内部执行。",

        policyBadge: "独立 Policy Logic",

        resultBlockTitle: "结果收集",

        resultPrefix: "将 tool 输出追加到",

        resultTarget: "tool_results[]",
      },

      response: {
        title: "响应层",
        subtitle: "结果",
        stageTitle: "结果生成",
        blockTitle: "Final LLM Response",
      },
    },

    foundationCards: {
      entities: {
        title: "Semantic Entities",
        label: "当前用例的切片",
      },

      graph: {
        title: "Dependency Graph",
        label: "预构建的关系图",
      },

      mapping: {
        title: "Entity_to_Tool Map",
        label: "运行时桥接",
      },
    },

    cases: {
      refund: {
        label: "退款评估",

        status: {
          id: "current",
          label: "当前实现",
        },

        query: `"订单 123 可以退款吗？"`,

        layerHighlights: ["planning", "execution"],

        semanticSummary: defineSemanticSummary({
          input: "用户请求",

          output: "runtime_intent { intent, order_id }",

          notes: ["解析 intent", "提取 order_id"],
        }),

        planSummary: definePlanSummary({
          input: "runtime_intent",

          output: "planned_steps [ get_order, check_refund ]",

          notes: ["解析依赖关系", "规划执行步骤"],
        }),

        parameterSummary: defineParameterSummary({
          input: "tool_results",

          output: "resolved_params { order }",
        }),

        toolSummary: defineToolSummary({
          input: "resolved_params",

          output: "RefundDecisionDTO",

          toolName: "check_refund",

          dtoName: "RefundDecisionDTO",
          secondaryTool: undefined,

          tertiaryTool: undefined,
        }),

        responseSummary: defineResponseSummary({
          blockTitle: undefined,

          input: "tool_results",

          output: "可读结果",

          notes: [],

          finalAnswer: "“根据查询结果，订单123因商品已发货，无法进行退款。”",
        }),

        foundation: defineFoundationSummary({
          entities: ["Order", "RefundDecision"],

          graphRelations: ["OrderSummary ──▶ RefundDecision"],

          graphNotes: [
            "基于 entity relations 预构建",
            "这里只展示当前 use-case 的切片",
            "供 planner 推导执行顺序",
          ],

          entityMap: [
            {
              entity: "Order",
              tool: "get_order",
            },

            {
              entity: "RefundDecision",
              tool: "check_refund",
            },
          ],
        }),
      },

      marketing: {
        label: "营销决策",

        status: {
          id: "future",
          label: "扩展模式",
        },

        query: `"哪些用户应该收到 留存优惠券？"`,

        layerHighlights: ["semantic", "planning"],

        semanticSummary: defineSemanticSummary({
          input: "用户请求",

          output: "runtime_intent { intent, campaign_id }",

          notes: ["解析 campaign intent", "识别用户分群"],
        }),

        planSummary: definePlanSummary({
          input: "runtime_intent",

          output:
            "planned_steps [ \n\tget_user_profile, \n\tget_user_behavior, \n\tcompute_churn_risk, \n\tevaluate_campaign_policy, \n\tcompute_campaign_score, \n\tdecide_coupon \n]",

          notes: ["解析依赖关系", "构建 campaign 执行路径"],
        }),

        parameterSummary: defineParameterSummary({
          input: "tool_results",

          output: "resolved_params { CampaignScore }",
        }),

        toolSummary: defineToolSummary({
          input: "resolved_params",

          output: "CouponDecisionDTO",

          toolName: "evaluate_campaign_policy()",

          dtoName: "CampaignEligibilityDTO",

          secondaryTool: {
            toolName: "compute_campaign_score()",

            dtoName: "CampaignScore",

            badgeLabel: "独立 Scoring Logic",
          },

          tertiaryTool: {
            toolName: "decide_coupon()",

            dtoName: "CouponDecisionDTO",

            badgeLabel: undefined,
          },
        }),

        responseSummary: defineResponseSummary({
          blockTitle: undefined,

          input: "tool_results",

          output: "可读营销决策",

          notes: [],

          finalAnswer: "“高流失风险用户已被加入 立省20 留存活动。”",
        }),

        foundation: defineFoundationSummary({
          entities: [
            "UserProfile",
            "UserBehavior",
            "ChurnRisk",
            "CampaignEligibility",
            "CampaignScore",
            "CouponDecision",
          ],

          graphRelations: [
            "UserProfile ──▶ UserBehavior",
            "UserBehavior ──▶ ChurnRisk",
            "UserProfile, ChurnRisk ──▶ CampaignEligibility",
            "CampaignEligibility, ChurnRisk ──▶ CampaignScore",
            "CampaignScore ──▶ CouponDecision",
          ],

          graphNotes: [
            "基于 entity relations 预构建",
            "这里只展示该用例的相关切片",
            "将 campaign context 映射到可执行 tools",
          ],

          entityMap: [
            {
              entity: "UserProfile",
              tool: "get_user_profile",
            },

            {
              entity: "UserBehavior",
              tool: "get_user_behavior",
            },

            {
              entity: "ChurnRisk",
              tool: "comput_churn_risk",
            },

            {
              entity: "CampaignEligibility",
              tool: "evaluate_campaign_policy",
            },

            {
              entity: "CampaignScore",
              tool: "compute_campaign_score",
            },

            {
              entity: "CouponDecision",
              tool: "decide_coupon",
            },
          ],
        }),
      },

      workflow: {
        label: "工作流自动化",

        status: {
          id: "future",
          label: "扩展模式",
        },

        query: `"高风险退款需要人工审批。"`,

        layerHighlights: ["execution", "planning"],

        semanticSummary: defineSemanticSummary({
          input: "用户请求",

          output: "runtime_intent { intent, refund_request_id }",

          notes: ["解析审批 intent", "提取 request id"],
        }),

        planSummary: definePlanSummary({
          input: "runtime_intent",

          output:
            "planned_steps [ \n\tget_refund_request, \n\tevaluate_risk, \n\tevaluate_approval_policy, \n\tdecide_approval_route \n]",

          notes: ["解析依赖关系", "规划执行步骤"],
        }),

        parameterSummary: defineParameterSummary({
          input: "tool_results",

          output: "resolved_params { refund_request_id }",
        }),

        toolSummary: defineToolSummary({
          input: "resolved_params",

          output: "ApprovalDecisionDTO",

          toolName: "evaluate_approval_policy()",

          dtoName: "ApprovalEligibilityDTO",

          secondaryTool: {
            toolName: "decide_approval_route()",

            dtoName: "ApprovalRouteDTO",

            badgeLabel: undefined,
          },
          tertiaryTool: undefined,
        }),

        responseSummary: defineResponseSummary({
          blockTitle: "Workflow Status Response",

          input: "tool_results",

          output: "可读工作流状态",

          notes: [],

          finalAnswer:
            "“该退款请求被识别为 高风险，并已路由至 L2 审批工作流。”",
        }),

        foundation: defineFoundationSummary({
          entities: [
            "RefundRequest",
            "RiskScore",
            "ApprovalEligibility",
            "ApprovalRoute",
          ],

          graphRelations: [
            "RefundRequest ──▶ RiskScore",
            "RiskScore ──▶ ApprovalEligibility",
            "ApprovalEligibility ──▶ ApprovalRoute",
          ],

          graphNotes: [
            "基于 entity relations 预构建",
            "这里只展示 workflow 相关切片",
            "用于路由审批执行流程",
          ],

          entityMap: [
            {
              entity: "RefundRequest",
              tool: "get_refund_request",
            },

            {
              entity: "RiskScore",
              tool: "evaluate_risk",
            },

            {
              entity: "ApprovalEligibility",
              tool: "evaluate_approval_policy",
            },

            {
              entity: "ApprovalRoute",
              tool: "decide_approval_route",
            },
          ],
        }),
      },
    },
  },
};
