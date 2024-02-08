import { ShareIcon } from '../../../../../../components/icons';
import ChatMessage from './_components/chat-message';

function ChatRoom() {
  return (
    <div className="w-full h-full overflow-hidden bg-transparent flex justify-center pt-8">
      <div className="interaction-area w-full max-w-[832px] mx-auto flex flex-col">
        <header className="flex justify-center relative items-center w-full">
          <span>Chat name</span>
          <button className="absolute right-0 top-0 flex items-center justify-center mr-8 p-2 rounded-lg bg-white shadow-md">
            <ShareIcon />
          </button>
        </header>
        <div className="chat-area flex-1 overflow-y-scroll py-10 px-3 w-full mx-auto max-w-[728px] mt-6 flex flex-col gap-3 no-scrollbar">
          <ChatMessage message="Hello" type="user" />
          <ChatMessage
            message="Hi, 
          How can I help you today?"
            type="bot"
          />
          <ChatMessage message="What is AI?" type="user" />
          <ChatMessage
            message="AI is the simulation of human intelligence processes by machines, especially computer systems. These processes include learning, reasoning, and self-correction."
            type="bot"
          />
          <ChatMessage message="What is AI?" type="user" />
          <ChatMessage
            message="AI is the simulation of human intelligence processes by machines, especially computer systems. These processes include learning, reasoning, and self-correction."
            type="bot"
          />
          <ChatMessage message="What is AI?" type="user" />
          <ChatMessage
            message="AI is the simulation of human intelligence processes by machines, especially computer systems. These processes include learning, reasoning, and self-correction."
            type="bot"
          />
          <ChatMessage message="What is AI?" type="user" />
          <ChatMessage
            message="AI is the simulation of human intelligence processes by machines, especially computer systems. These processes include learning, reasoning, and self-correction."
            type="bot"
          />
        </div>
        <footer className="h-[127px] w-full">I am footer</footer>
      </div>
    </div>
  );
}

export default ChatRoom;
