import dynamic from "next/dynamic"

const ChatInterface = dynamic(
  () => import("@/components/chat-interface").then((m) => m.ChatInterface),
  {
    ssr: true,
    loading: () => <div style={{ minHeight: 200 }} />,
  }
)

export default function Home() {
  return <ChatInterface />
}
