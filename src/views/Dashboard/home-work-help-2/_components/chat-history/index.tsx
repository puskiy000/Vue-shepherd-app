import ChatList from './list';
import useUserStore from '../../../../../state/userStore';
import useStudentConversations from './hooks/useStudentConversations';
import ConversationHistorySkeleton from '../../../../../components/skeletons/conversation-history';
import { Button } from '../../../../../components/ui/button';
import { CaretLeftIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import { cn } from '../../../../../library/utils';

// TODO: This component is rerendering on url id change, To fix it first we need to work in routes and then memoize this component
function ChatHistoryContent() {
  const user = useUserStore((state) => state.user);
  const userId = user?._id;
  const { data: conversations, isLoading } = useStudentConversations({
    studentId: userId
  });
  return (
    <div className="h-full p-4 no-scrollbar flex flex-col w-[348px]">
      <div className="title">
        <h4 className="font-medium text-sm">Chat History</h4>
      </div>
      <div className="w-full flex-1 overflow-y-hidden">
        {isLoading ? (
          <ConversationHistorySkeleton />
        ) : (
          <ChatList conversations={conversations} />
        )}
      </div>
      <div className="clear-conversations-button-section w-full flex justify-end mt-6">
        <button className="text-red-600 leading-4 text-xs font-normal">
          Clear History
        </button>
      </div>
    </div>
  );
}

const ChatHistory = () => {
  const [sidebarClosed, setSidebarClosed] = useState(
    () => window.screen.width < 1175
  );

  // For sidebar close on small screen
  useEffect(() => {
    const resizeListener = () => {
      if (window.innerWidth < 1175) {
        setSidebarClosed(true);
      } else {
        setSidebarClosed(false);
      }
    };
    window.addEventListener('resize', resizeListener);

    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, []);

  return (
    <div
      className={cn(
        'h-full max-h-screen flex w-[348px] border-r transition-all transform-gpu justify-end mr-[-1px] relative duration-1000',
        {
          'w-[0%]': sidebarClosed
        }
      )}
    >
      <Button
        className="absolute top-0 p-2 bg-white rounded-l-md right-[-32px] rounded-tl-none rounded-bl-none border-r border-b rounded-tr-none"
        onClick={() => setSidebarClosed((prev) => !prev)}
        variant="ghost"
      >
        <CaretLeftIcon
          className={cn({
            'transition-all': true,
            'transform rotate-180': sidebarClosed
          })}
        />
      </Button>
      <ChatHistoryContent />
    </div>
  );
};

export default ChatHistory;
