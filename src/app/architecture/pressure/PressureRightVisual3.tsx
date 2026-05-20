import { Boxes, FileCheck2, ShieldAlert, Sparkles } from "lucide-react";
import React from "react";

export default function PressureRightVisual3() {
  return (
    <div className="relative flex h-[460px] w-full items-center justify-center overflow-visible font-sans select-none">
      {/* 💡 顶部高空冷色环境微光 */}
      <div className="pointer-events-none absolute top-0 left-1/2 z-0 h-[220px] w-[300px] -translate-x-1/2 rounded-full bg-gradient-to-b from-emerald-400/[0.1] via-emerald-500/[0.01] to-transparent blur-2xl" />

      {/* 3D 舞台容器：全面开启显卡硬件加速与高级抗锯齿 */}
      <div className="relative flex h-full w-full flex-col items-center justify-center will-change-transform [image-rendering:--webkit-optimize-contrast] [perspective:1500px] [transform-style:preserve-3d]">
        {/* =========================================================================
           🌧️ 优化自然策略雨系统 (错落轨道、不同延时，绝不暴雨倾盆)
        ========================================================================= */}
        <div className="pointer-events-none absolute inset-x-0 top-[-50px] z-40 h-[150px] [transform-style:preserve-3d]">
          {/* 雨滴组 A（偏左轨道，落下较早） */}
          <div
            className="absolute top-[10px] left-[40px]"
            style={{
              animation: "naturalRainfall 5s linear infinite",
              animationDelay: "0s",
            }}
          >
            <div className="flex items-center gap-1 rounded-full border border-emerald-400/30 bg-[#051c17]/90 px-2 py-0.5 font-mono text-[8px] font-medium tracking-wider text-emerald-300 shadow-[0_0_8px_rgba(52,211,153,0.15)] backdrop-blur-xs">
              <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-400" />{" "}
              +VIP_Fix
            </div>
          </div>

          {/* 雨滴组 B（右侧轨道，延时中等） */}
          <div
            className="absolute top-[5px] right-[40px]"
            style={{
              animation: "naturalRainfall 5s linear infinite",
              animationDelay: "1.6s",
            }}
          >
            <div className="flex items-center gap-1 rounded-full border border-emerald-400/30 bg-[#051c17]/90 px-2 py-0.5 font-mono text-[8px] font-medium tracking-wider text-emerald-300 shadow-[0_0_8px_rgba(52,211,153,0.15)] backdrop-blur-xs">
              <span className="h-1 w-1 rounded-full bg-emerald-400" /> +Promo_90
            </div>
          </div>

          {/* 雨滴组 C（中部偏后轨道：调整延时至 2.8s，拉开与 D 的距离） */}
          <div
            className="absolute top-0 left-[140px]"
            style={{
              animation: "naturalRainfall 5s linear infinite",
              animationDelay: "2.8s",
            }}
          >
            <div className="flex items-center gap-1 rounded-full border border-emerald-400/30 bg-[#051c17]/90 px-2 py-0.5 font-mono text-[8px] font-medium tracking-wider text-emerald-300 shadow-[0_0_8px_rgba(52,211,153,0.15)] backdrop-blur-xs">
              <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-400" />{" "}
              +Region_CN
            </div>
          </div>

          {/* 雨滴组 D（左前侧轨道：延时推后到 4.1s，彻底打破齐落的死板感，形成完美的异步雨滴流） */}
          <div
            className="absolute top-[25px] left-[200px]"
            style={{
              animation: "naturalRainfall 5s linear infinite",
              animationDelay: "3.3s",
            }}
          >
            <div className="flex items-center gap-1 rounded-full border border-emerald-400/20 bg-[#051c17]/80 px-2 py-0.5 font-mono text-[8px] font-medium tracking-wider text-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.1)] backdrop-blur-xs">
              <span className="h-1 w-1 rounded-full bg-emerald-400" />{" "}
              +Tax_Override
            </div>
          </div>
        </div>

        {/* =========================================================================
           LAYER 1: TOP POLICY LAYER (高仿真实玻璃·去 Pop 墨化动态消溶池)
        ========================================================================= */}
        <div
          className="relative z-30 h-[115px] w-[300px] [transform:rotateX(42deg)_rotateZ(-12deg)] rounded-2xl border border-white/[0.08] bg-gradient-to-br from-emerald-500/[0.06] via-emerald-600/[0.02] to-transparent p-3 backdrop-blur-xs will-change-transform [transform-style:preserve-3d]"
          style={{
            // 通过极细的双层亮、暗 3D 边缘高光线勾勒，让磨砂玻璃在透视上立体且绝对真实
            boxShadow:
              "0 0 1px rgba(52,211,153,0.5), 1px 1px 0px rgba(52,211,153,0.25), 2px 2px 0px rgba(52,211,153,0.18), 3px 3px 1px rgba(4,120,87,0.1), 4px 4px 15px rgba(0,0,0,0.55)",
          }}
        >
          {/* 统一移动到左上角：去掉背板，改为纯文字全息钢印质感，与下层形成视觉对齐 */}
          <div className="absolute bottom-3 left-4 z-30">
            <LayerLabel
              icon={<Sparkles size={10} className="text-emerald-400" />}
              title="POLICY LAYER"
            />
          </div>

          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[linear-gradient(to_right,rgba(52,211,153,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(52,211,153,0.05)_1px,transparent_1px)] bg-[size:14px_14px]" />

          {/* 🎯 动态墨化融合池：通过在 3D 面板内部打散多组异构坐标（X/Y 轴全离散），绝不重复 */}
          <div className="relative h-full w-full [transform:translateZ(16px)] [transform-style:preserve-3d]">
            {/* 对应雨滴 A 的化开效果：位置位于左前 */}
            <Right3DPolicyPill
              title="VIP Policy"
              position="absolute top-[12px] left-[-5px]"
              delay="1.5s"
            />

            {/* 对应雨滴 B 的化开效果：位置位于右后 */}
            <Right3DPolicyPill
              title="Holiday Logic"
              position="absolute top-[42px] right-[-10px]"
              delay="3.1s"
            />

            {/* 对应雨滴 C 的化开效果：位置位于中部 */}
            <Right3DPolicyPill
              title="Region Policy"
              position="absolute top-[65px] left-[50px]"
              delay="4.7s"
            />

            {/* 对应雨滴 D 的化开效果：位置位于左后偏僻处 */}
            <Right3DPolicyPill
              title="Override Active"
              position="absolute top-[15px] right-[70px]"
              delay="5.0s"
            />
          </div>
        </div>

        {/* 🌊 上层垂直高速向下集线管 (L1 ➔ L2：像素级垂直流淌，方向正确) */}
        <div className="relative z-20 -mt-3.5 -mb-2 h-[55px] w-[100px] [transform:translateZ(10px)] overflow-visible">
          <svg
            className="h-full w-full overflow-visible"
            viewBox="0 0 100 55"
            fill="none"
          >
            <path
              d="M20 0 C20 25, 45 30, 45 55"
              stroke="#041a16"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M50 0 C50 25, 50 30, 50 55"
              stroke="#041a16"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M80 0 C80 25, 55 30, 55 55"
              stroke="#041a16"
              strokeWidth="3"
              strokeLinecap="round"
            />

            <path
              d="M20 0 C20 25, 45 30, 45 55"
              stroke="#34d399"
              strokeWidth="1.2"
              strokeDasharray="5 7"
              style={{ animation: "flowDownward 0.9s linear infinite" }}
              opacity="0.4"
            />
            <path
              d="M50 0 C50 25, 50 30, 50 55"
              stroke="#34d399"
              strokeWidth="2"
              strokeDasharray="6 8"
              style={{ animation: "flowDownward 0.7s linear infinite" }}
            />
            <path
              d="M80 0 C80 25, 55 30, 55 55"
              stroke="#34d399"
              strokeWidth="1.2"
              strokeDasharray="5 7"
              style={{ animation: "flowDownward 0.9s linear infinite" }}
              opacity="0.4"
            />
          </svg>
        </div>

        {/* =========================================================================
           LAYER 2: MIDDLE DTO BARRIER (真高透悬浮水晶玻璃镜片)
        ========================================================================= */}
        <div
          className="relative z-20 flex h-[85px] w-[315px] [transform:rotateX(42deg)_rotateZ(-12deg)] items-center justify-center rounded-xl border border-white/20 bg-gradient-to-br from-white/[0.08] to-transparent backdrop-blur-xs transition-all"
          style={{
            boxShadow:
              "0 0 1px rgba(255,255,255,0.4), 1px 1px 0px rgba(255,255,255,0.25), 2px 2px 0px rgba(255,255,255,0.15), 3px 3px 1px rgba(16,185,129,0.1), 4px 4px 16px rgba(0,0,0,0.6)",
          }}
        >
          <div className="absolute inset-0 rounded-xl bg-[linear-gradient(to_right,rgba(52,211,153,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(52,211,153,0.15)_1px,transparent_1px)] bg-[size:16px_14px]" />
          <div className="absolute bottom-3 left-4 z-20">
            <LayerLabel
              icon={<FileCheck2 size={10} className="text-emerald-400" />}
              title="DTO CONTRACT"
            />
          </div>

          <div className="pointer-events-none absolute inset-0 flex items-center justify-end pr-32 pb-6">
            <div className="font-mono text-[8px] font-black tracking-[0.32em] text-emerald-400/24 uppercase select-none">
              SCHEMA <br />
              LOCKED
            </div>
          </div>
        </div>

        {/* 🌊 下层数据流实体传输管道 (L2 ➔ L3：实体管道线 + 向下奔流) */}
        <div className="relative z-10 -mt-3 -mb-1.5 h-[45px] w-[40px] overflow-visible">
          <svg
            className="h-full w-full overflow-visible"
            viewBox="0 0 40 45"
            fill="none"
          >
            <line
              x1="20"
              y1="0"
              x2="20"
              y2="45"
              stroke="#041a16"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <line
              x1="20"
              y1="0"
              x2="20"
              y2="45"
              stroke="#10b981"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="5 6"
              opacity="0.95"
              style={{ animation: "flowDownward 0.6s linear infinite" }}
            />
          </svg>
        </div>

        {/* =========================================================================
           LAYER 3: BOTTOM EXECUTION CORE (黑金刚石服务器卡槽基座 - 绝对高对比度)
        ========================================================================= */}
        <div
          className="relative z-10 h-[95px] w-[335px] [transform:rotateX(42deg)_rotateZ(-12deg)] overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-[#091f1a] to-[#010605] p-3"
          style={{
            boxShadow:
              "0 0 1.5px rgba(52,211,153,0.6), 1px 1px 0px #041915, 2px 2px 0px #041915, 3px 3px 0px #03120f, 4px 4px 0px #03120f, 5px 5px 0px #010605, 6px 6px 0px #010605, 7px 7px 0px #000, 8px 8px 0px #000, 10px 10px 30px rgba(0,0,0,0.95)",
          }}
        >
          <div className="absolute inset-y-0 right-2 w-1.5 bg-[repeating-linear-gradient(to_bottom,transparent_0px,transparent_4px,rgba(255,255,255,0.02)_4px,rgba(255,255,255,0.02)_8px)]" />

          <div className="relative z-10 flex h-full w-full flex-col justify-between">
            <div className="p pointer-events-none absolute inset-0 flex items-center justify-center pb-4">
              <div className="font-mono text-[9px] font-black tracking-[0.32em] text-emerald-400/22 uppercase select-none">
                DETERMINISTIC <br /> EXECUTION
              </div>
            </div>
            <div className="mt-auto flex items-center justify-between">
              {/* 底座标签：注入渐变与半透明边框，使其融入底板 3D 深度中 */}
              <LayerLabel
                icon={<Boxes size={10} className="text-emerald-400" />}
                title="EXECUTION LAYER"
              />
              <div className="flex items-center gap-1.5 font-mono text-[8px] font-bold tracking-wider text-emerald-400/60">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]" />
                STABLE
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🚀 物理级降雨时间轴与洇化消溶引擎 */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes flowDownward {
          from { stroke-dashoffset: 12; }
          to { stroke-dashoffset: 0; }
        }
        
        @keyframes naturalRainfall {
          0% {
            transform: translate3d(0, -60px, 140px) scale(0.6);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          /* 🎯 极其精准的无缝吸收入水点：在 28% 时间节点刚好物理触及第一层顶面，并缓缓淡入 */
          26% {
            opacity: 0.9;
          }
          29%, 100% {
            transform: translate3d(0, 52px, 15px) scale(0.98);
            opacity: 0; /* 接触玻璃板表面瞬间丝滑隐没，绝不穿透到中层 */
          }
        }

        @keyframes inkMeltAbsorb {
          0%, 100% {
            /* 从更高、更深邃的透视坐标点切入(translateY -25px)，初始施加极强的虚化滤镜，营造业务规则初期的缈茫感 */
            transform: translate3d(0, -25px, 40px) scale(0.85);
            opacity: 0;
            filter: blur(12px);
          }
          /* 🎯 丝滑过渡：在下落进程中，雾气开始聚拢，透明度温和抬升 */
          6% {
            transform: translate3d(0, -10px, 15px) scale(0.95);
            opacity: 0.4;
            filter: blur(5px);
          }
          /* 🎯 稳固着陆：正好契合雨滴入水周期，卡片消除一切模糊，稳稳在 Policy Layer 确立落定 */
          14% {
            transform: translate3d(0, 0, 0) scale(1);
            opacity: 1;
            filter: blur(0px);
          }
          55% {
            transform: translate3d(0, 0, 0) scale(1);
            opacity: 1;
            filter: blur(0px);
          }
          /* 销溶退出阶段：也向下方轻轻飘落并再次虚化 */
          70% {
            transform: translate3d(0, 12px, -15px) scale(0.93);
            opacity: 0.15;
            filter: blur(4px);
          }
          80% {
            opacity: 0;
          }
        }
      `,
        }}
      />
    </div>
  );
}

function LayerLabel({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded border border-emerald-500/20 bg-gradient-to-b from-emerald-950/90 to-emerald-950/40 px-3 py-0.5 shadow-[0_2px_8px_rgba(0,0,0,0.5)] backdrop-blur-md">
      {icon}

      <span className="font-mono text-[8px] font-black tracking-widest text-emerald-400 uppercase">
        {title}
      </span>
    </div>
  );
}

/**
 * 带有“墨化洇开、缓缓消溶”自然生命周期的 3D Policy 胶囊组件
 */
function Right3DPolicyPill({
  title,
  position,
  delay,
}: {
  title: string;
  position: string;
  delay: string;
}) {
  return (
    <div
      className={`rounded-full border border-emerald-400/30 bg-[#0a2822]/95 px-3 py-1.5 shadow-md backdrop-blur-md ${position}`}
      style={{
        // 使用全新的 inkMeltAbsorb 缓动算法，消除死板的 Pop 突兀感
        animation: `inkMeltAbsorb 5s cubic-bezier(0.25, 1, 0.5, 1) infinite`,
        animationDelay: delay,
        opacity: 0,
      }}
    >
      <div className="flex items-center gap-1.5">
        <Sparkles size={11} className="text-emerald-400" />
        <span className="font-mono text-[9px] font-black tracking-wide text-slate-200 uppercase">
          {title}
        </span>
      </div>
    </div>
  );
}

// =========================================================================
// BOTTOM EXPLANATION SUB-COMPONENT
// =========================================================================
