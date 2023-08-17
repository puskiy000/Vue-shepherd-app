import { Text } from '@chakra-ui/react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import moment from 'moment';
import React from 'react';

export default function Events({ event }: any) {
  const getTextByEventType = (eventType, name) => {
    switch (eventType) {
      case 'study':
        return `Flashcard deck "${name}" practice`;
      case 'booking':
        return `${name.subject} lesson with ${name.tutor} `;

      default:
        return undefined;
    }
  };

  const getBgColorByEventType = (eventType) => {
    switch (eventType) {
      case 'study':
        return `bg-green-500`;
      case 'booking':
        return `bg-orange-500`;
      default:
        return undefined;
    }
  };
  const getColorByEventType = (eventType) => {
    switch (eventType) {
      case 'study':
        return `bg-green-50`;
      case 'booking':
        return `bg-orange-50`;
      default:
        return undefined;
    }
  };
  const extractTime = (dateStr: string) => {
    const date = moment.utc(dateStr).local();
    return date.format('hh:mm A');
  };

  return (
    <li className={`flex gap-x-3 ${getColorByEventType(event.type)}`}>
      <div
        className={`min-h-fit w-1 rounded-tr-full rounded-br-full ${getBgColorByEventType(
          event.type
        )}`}
      />
      <div className="py-2">
        <div className="flex gap-x-1">
          <div className="min-w-0 flex-auto">
            <Text className="text-xs font-normal leading-6 text-gray-500">
              {getTextByEventType(
                event.type,
                event.data.entity?.deckname
                  ? event.data.entity.deckname
                  : {
                      subject: event.data.offer.course.label,
                      tutor: `${event.data.offer.tutor.user.name.first} ${event.data.offer.tutor.user.name.last}`
                    }
              )}
            </Text>
            <Text className="mt-1 flex items-center truncate text-xs leading-5 text-gray-500">
              <span>{extractTime(event.data.startDate)}</span>
              <ChevronRightIcon className="w-4 h-4" />
              <span>{extractTime(event.data.endDate)}</span>
            </Text>
          </div>
        </div>
        {/* <div className="flex -space-x-0.5">
          <dt className="sr-only">Commenters</dt>
          {event.commenters.map((commenter: any) => (
            <dd key={commenter.id}>
              <img
                className={`h-5 w-5 rounded-full ${
                  commenter.backgroundColor
                    ? commenter.backgroundColor
                    : 'bg-gray-50'
                } ring-2 ring-white`}
                src={commenter.imageUrl}
                alt={commenter.name}
              />
            </dd>
          ))}
        </div> */}
      </div>
    </li>
  );
}
