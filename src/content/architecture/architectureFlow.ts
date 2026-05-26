export type ArchitectureFlowUseCase = "refund" | "marketing" | "workflow";
export type ArchitectureFlowLayerId =
  | "input"
  | "semantic"
  | "planning"
  | "execution"
  | "response";

type ArchitectureFlowStatus = {
  id: "current" | "future";
  label: string;
};

export type ArchitectureFlowUseCaseData = {
  label: string;
  status: ArchitectureFlowStatus;
  query: string;
  layerHighlights: ArchitectureFlowLayerId[];
  semanticSummary: {
    input: string;
    output: string;
    notes: string[];
  };
  planSummary: {
    input: string;
    output: string;
    notes: string[];
  };
  parameterSummary: {
    input: string;
    output: string;
  };
  toolSummary: {
    input: string;
    output: string;
    toolName: string;
    dtoName: string;
    secondaryTool?: {
      toolName: string;
      dtoName: string;
    };
  };
  responseSummary: {
    blockTitle?: string;
    input: string;
    output: string;
    notes: string[];
    finalAnswer: string;
  };
  foundation: {
    entities: string[];
    graphRelations: string[];
    graphNotes: string[];
    entityMap: { entity: string; tool: string }[];
  };
};

export const architectureFlowContent = {
  en: {
    header: {
      eyebrow: "SECTION 03 // RUNTIME FLOW",
      title: "Runtime Flow",
      description:
        "A user query becomes a structured execution path, then a readable answer.",
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
        semanticSummary: {
          input: "User Query",
          output: "runtime_intent { intent, order_id }",
          notes: ["parse intent", "extract order_id"],
        },
        planSummary: {
          input: "runtime_intent",
          output: "execution_steps [ get_order, check_refund ]",
          notes: ["map entity to tool", "build execution order"],
        },
        parameterSummary: {
          input: "tool_results",
          output: "resolved_params { order }",
        },
        toolSummary: {
          input: "resolved_params",
          output: "RefundDecisionDTO",
          toolName: "check_refund",
          dtoName: "RefundDecisionDTO",
        },
        responseSummary: {
          input: "tool_results",
          output: "human-readable answer",
          notes: [],
          finalAnswer: "“根据查询结果，订单123因商品已发货，无法进行退款。”",
        },
        foundation: {
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
        },
      },
      marketing: {
        label: "Marketing Decision",
        status: {
          id: "future",
          label: "EXTENSION PATTERN",
        },
        query: `"Who should receive a retention coupon?"`,
        layerHighlights: ["semantic", "planning"],
        semanticSummary: {
          input: "User Query",
          output: "runtime_intent { intent, target_group }",
          notes: ["parse campaign intent", "resolve user segment"],
        },
        planSummary: {
          input: "runtime_intent",
          output:
            "execution_steps [ get_user_profile, check_coupon_policy, campaign_action ]",
          notes: ["map user context", "build campaign path"],
        },
        parameterSummary: {
          input: "tool_results",
          output: "resolved_params { user_profile, campaign }",
        },
        toolSummary: {
          input: "resolved_params",
          output: "CouponDecisionDTO",
          toolName: "check_coupon_policy",
          dtoName: "CouponDecisionDTO",
        },
        responseSummary: {
          input: "tool_results",
          output: "human-readable recommendation",
          notes: ["read campaign result", "write answer for user"],
          finalAnswer: "“Some users qualify for a retention coupon.”",
        },
        foundation: {
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
            { entity: "User", tool: "get_user_profile" },
            { entity: "CouponEligibility", tool: "check_coupon_policy" },
            { entity: "CampaignContext", tool: "campaign_action" },
          ],
        },
      },
      workflow: {
        label: "Workflow Automation",
        status: {
          id: "future",
          label: "EXTENSION PATTERN",
        },
        query: `"High-risk refunds require manual approval."`,
        layerHighlights: ["execution", "planning"],
        semanticSummary: {
          input: "User Query",
          output: "runtime_intent { intent, refund_request_id }",
          notes: ["parse approval intent", "extract request id"],
        },
        planSummary: {
          input: "runtime_intent",
          output:
            "execution_steps [ get_refund_request, evaluate_risk, evaluate_approval_policy, decide_approval_route ]",
          notes: ["resolve dependencies", "plan execution steps"],
        },
        parameterSummary: {
          input: "tool_results",
          output: "resolved_params { refund_request_id }",
        },
        toolSummary: {
          input: "resolved_params",
          output: "ApprovalDecisionDTO",
          toolName: "evaluate_approval_policy()",
          dtoName: "ApprovalEligibilityDTO",
          secondaryTool: {
            toolName: "decide_approval_route()",
            dtoName: "ApprovalRouteDTO",
          },
        },
        responseSummary: {
          blockTitle: "Workflow Status Response",
          input: "tool_results",
          output: "human-readable workflow status",
          notes: ["read routing result", "generate status response"],
          finalAnswer:
            "“This refund request was classified as HIGH RISK,  and routed to the L2 approval workflow.”",
        },
        foundation: {
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
        },
      },
    } satisfies Record<ArchitectureFlowUseCase, ArchitectureFlowUseCaseData>,
  },

  zh: {
    header: {
      eyebrow: "SECTION 03 // RUNTIME FLOW",
      title: "运行时流程",
      description: "用户问题会先变成结构化的执行路径，最后形成一条可读的回答",
    },

    slider: {
      steps: [
        { value: 1, label: "层级" },
        { value: 2, label: "运行流" },
        { value: 3, label: "基础层" },
      ],
      ariaLabel: "运行时流程细节层级",
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
        subtitle: "语义解析",
        stageTitle: "语义解析",
        blockTitle: "Intent Parsing",
      },

      planning: {
        title: "规划层",
        subtitle: "规划步骤",
        stageTitle: "规划步骤",
        blockTitle: "plan_tools()",
      },

      execution: {
        title: "执行层",
        subtitle: "执行",
        stageTitle: "执行编排",
        loopInstruction: "for step in steps:",
        loopLabel: "执行循环",
        parameterBlockTitle: "准备参数",
        toolBlockTitle: "Tool Execution",
        policyMethod: "policy.evaluate()",
        policyNarrative: "当前 policy 是在 Tool Execution 内部被调用的。",
        policyBadge: "隔离的 policy 逻辑",
        resultBlockTitle: "结果收集",
        resultPrefix: "append tool outputs into",
        resultTarget: "tool_results[]",
      },

      response: {
        title: "响应层",
        subtitle: "回答",
        stageTitle: "响应生成",
        blockTitle: "最终 LLM 响应",
      },
    },

    foundationCards: {
      entities: {
        title: "语义 Entities",
        label: "当前 use case 切片",
      },

      graph: {
        title: "依赖图",
        label: "预构建关系",
      },

      mapping: {
        title: "Entity_to_Tool Map",
        label: "运行时桥接层",
      },
    },

    cases: {
      refund: {
        label: "退款评估",

        status: {
          id: "current",
          label: "当前实现",
        },

        query: `"订单123可以退款吗？"`,

        layerHighlights: ["planning", "execution"],

        semanticSummary: {
          input: "用户问题",
          output: "runtime_intent { intent, order_id }",
          notes: ["解析 intent", "提取 order_id"],
        },

        planSummary: {
          input: "runtime_intent",
          output: "execution_steps [ get_order, check_refund ]",
          notes: ["entity 映射到 tool", "构建执行顺序"],
        },

        parameterSummary: {
          input: "tool_results",
          output: "resolved_params { order }",
        },

        toolSummary: {
          input: "resolved_params",
          output: "RefundDecisionDTO",
          toolName: "check_refund",
          dtoName: "RefundDecisionDTO",
        },

        responseSummary: {
          input: "tool_results",
          output: "可读的回答",
          notes: [],
          finalAnswer: "“根据查询结果，订单123因商品已发货，无法进行退款。”",
        },

        foundation: {
          entities: ["Order", "RefundDecision", "ShippingState"],

          graphRelations: ["OrderSummary ──▶ RefundDecision"],

          graphNotes: [
            "预构建的运行时依赖关系",
            "这里只展示当前 use case 相关切片",
            "用于帮助 planner 构建 tool 执行顺序",
          ],

          entityMap: [
            { entity: "OrderSummary", tool: "get_order" },
            { entity: "RefundDecision", tool: "check_refund" },
          ],
        },
      },

      marketing: {
        label: "营销决策",

        status: {
          id: "future",
          label: "扩展模式",
        },

        query: `"哪些用户应该收到 retention coupon？"`,

        layerHighlights: ["semantic", "planning"],

        semanticSummary: {
          input: "用户问题",
          output: "runtime_intent { intent, target_group }",
          notes: ["解析营销 intent", "识别用户分群"],
        },

        planSummary: {
          input: "runtime_intent",

          output:
            "execution_steps [ get_user_profile, check_coupon_policy, campaign_action ]",

          notes: ["映射用户上下文", "构建营销执行路径"],
        },

        parameterSummary: {
          input: "tool_results",
          output: "resolved_params { user_profile, campaign }",
        },

        toolSummary: {
          input: "resolved_params",
          output: "CouponDecisionDTO",
          toolName: "check_coupon_policy",
          dtoName: "CouponDecisionDTO",
        },

        responseSummary: {
          input: "tool_results",
          output: "可读的推荐结果",
          notes: ["读取营销结果", "生成用户回答"],
          finalAnswer: "“部分用户符合 retention coupon 发放条件。”",
        },

        foundation: {
          entities: ["User", "CouponEligibility", "CampaignContext"],

          graphRelations: [
            "UserProfile ──▶ UserBehavior",
            "UserBehavior ──▶ ChurnRisk",
            "UserProfile, ChurnRisk ──▶ CampaignEligibility",
            "CampaignEligibility, UserBehavior ──▶ CampaignScore",
            "CampaignScore ──▶ CouponDecision",
          ],

          graphNotes: [
            "预构建的运行时依赖关系",
            "这里只展示扩展模式相关切片",
            "将营销上下文映射到可执行 tools",
          ],

          entityMap: [
            { entity: "User", tool: "get_user_profile" },
            { entity: "CouponEligibility", tool: "check_coupon_policy" },
            { entity: "CampaignContext", tool: "campaign_action" },
          ],
        },
      },

      workflow: {
        label: "流程自动化",

        status: {
          id: "future",
          label: "扩展模式",
        },

        query: `"高风险退款需要人工审批。"`,

        layerHighlights: ["execution", "planning"],

        semanticSummary: {
          input: "用户问题",
          output: "runtime_intent { intent, risk_level }",
          notes: ["解析审批 intent", "识别风险信号"],
        },

        planSummary: {
          input: "runtime_intent",

          output:
            "execution_steps [ evaluate_risk, approval_gate, notify_reviewer ]",

          notes: ["映射审批依赖", "构建流程执行路径"],
        },

        parameterSummary: {
          input: "tool_results",
          output: "resolved_params { risk_result, approval_context }",
        },

        toolSummary: {
          input: "resolved_params",
          output: "ApprovalRouteDTO",
          toolName: "approval_gate",
          dtoName: "ApprovalDecisionDTO",
        },

        responseSummary: {
          input: "tool_results",
          output: "可读的流程结果",
          notes: ["读取审批结果", "生成用户回答"],
          finalAnswer: "“该退款请求风险等级较高，已路由至 L2 人工审批流程。”",
        },

        foundation: {
          entities: ["Request", "RiskLevel", "ApprovalRequirement"],

          graphRelations: [
            "Request ──▶ RiskLevel",
            "RiskLevel ──▶ ApprovalRequirement",
          ],

          graphNotes: [
            "预构建的运行时依赖关系",
            "这里只展示 workflow 相关切片",
            "用于路由审批执行路径",
          ],

          entityMap: [
            { entity: "RiskLevel", tool: "evaluate_risk" },
            { entity: "ApprovalRequirement", tool: "approval_gate" },
            { entity: "ReviewerNotification", tool: "notify_reviewer" },
          ],
        },
      },
    } satisfies Record<ArchitectureFlowUseCase, ArchitectureFlowUseCaseData>,
  },
};
