import { format } from 'date-fns';

export const formatText = (textForCard, section) => {
  if (!textForCard) textForCard = 'No description';
  let clippedText = textForCard;
  if (textForCard.length >= 213) {
    clippedText = textForCard.split(' ');
    if (section === 'title') {
      clippedText = clippedText.slice(0, 10);
    } else if (section === 'description') {
      clippedText = clippedText.slice(0, 50);
    }
    clippedText = clippedText.join(' ');
    clippedText = `${clippedText}...`;
  }
  return clippedText;
};
export const formCreateDate = (dateStr) => format(new Date(dateStr), 'LLLL d, y');
