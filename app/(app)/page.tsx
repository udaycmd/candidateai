import dynamic from "next/dynamic"

const ChatInterface = dynamic(
  () => import("@/components/chat-interface").then((m) => m.ChatInterface),
  {
    ssr: true,
    loading: () => <div className="" />,
  }
)

export default function Home() {
  return <ChatInterface />
}
