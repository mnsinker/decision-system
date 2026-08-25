import { redirect } from "next/navigation";

const STREAMLIT_DEMO_URL =
  "https://rag-agent-order-assistant-pmylymnsvoae742ilijbs7.streamlit.app/";

export default function DemoPage() {
  redirect(STREAMLIT_DEMO_URL);
}
